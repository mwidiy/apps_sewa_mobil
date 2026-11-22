import { useState } from 'react';
import { FloatingDock } from './components/FloatingDock';
import type { NavTab } from './components/FloatingDock';
import { HomeView } from './components/views/HomeView';
import { CollectionView } from './components/views/CollectionView';
import { RentDetailsView } from './components/views/RentDetailsView';
import { BookingSheet } from './components/views/BookingSheet';
import { SyaratView } from './components/views/SyaratView';
import { ContactView } from './components/views/ContactView';
import { IntroModal } from './components/views/IntroModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';

import type { MobileCarItem } from './data/cars';
import type { BookingPayload, RentalServiceType } from './data/company';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCar, setSelectedCar] = useState<MobileCarItem | null>(null);
  const [activeService, setActiveService] = useState<RentalServiceType>('lepas_kunci');
  
  // User name & Intro Onboarding state
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('dcs_user_name') || '';
  });
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(() => {
    return !localStorage.getItem('dcs_user_name');
  });

  // Selected route state (from HomeView Route Calculator)
  const [selectedRoute, setSelectedRoute] = useState<{
    origin: string;
    destination: string;
    service: RentalServiceType;
  } | null>(null);

  // Booking sheet state
  const [bookingSheetOpen, setBookingSheetOpen] = useState(false);
  const [bookingSheetCar, setBookingSheetCar] = useState<MobileCarItem | null>(null);
  const [bookingSheetService, setBookingSheetService] = useState<RentalServiceType>('lepas_kunci');

  // Success modal
  const [successBooking, setSuccessBooking] = useState<BookingPayload | null>(null);

  // Handlers
  const handleSaveName = (name: string) => {
    setUserName(name);
    localStorage.setItem('dcs_user_name', name);
    setIsIntroOpen(false);
  };

  const handleSkipIntro = () => {
    setUserName('Sewa Mobil DCS');
    localStorage.setItem('dcs_user_name', 'Sewa Mobil DCS');
    setIsIntroOpen(false);
  };

  const handleSelectCar = (car: MobileCarItem) => {
    setSelectedCar(car);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetails = () => {
    setSelectedCar(null);
  };

  const handleRentNow = (car: MobileCarItem, service: RentalServiceType) => {
    setBookingSheetCar(car);
    setBookingSheetService(service);
    setBookingSheetOpen(true);
  };

  const handleCompleteBooking = (booking: BookingPayload) => {
    setBookingSheetOpen(false);
    setSuccessBooking(booking);
  };

  const handleSeeAllArmadaFromRoute = (routeInfo?: {
    origin: string;
    destination: string;
    service: RentalServiceType;
  }) => {
    if (routeInfo) {
      setSelectedRoute(routeInfo);
      setActiveService(routeInfo.service);
    }
    setActiveTab('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#e8ecf2] flex justify-center selection:bg-blue-600 selection:text-white">
      {/* Mobile viewport container */}
      <div className="w-full max-w-md bg-[#f1f3f7] min-h-screen flex flex-col relative shadow-2xl border-x border-zinc-200/60 overflow-x-hidden">
        
        {/* Main Content Router */}
        <main className="flex-1">
          {/* If a car is selected, show Screen 3: Rent Details */}
          {selectedCar ? (
            <RentDetailsView
              car={selectedCar}
              defaultService={activeService}
              onBack={handleBackFromDetails}
              onRentNow={handleRentNow}
            />
          ) : (
            <>
              {activeTab === 'home' && (
                <HomeView
                  userName={userName}
                  onOpenNameEdit={() => setIsIntroOpen(true)}
                  onSeeAllArmada={handleSeeAllArmadaFromRoute}
                  activeService={activeService}
                  onServiceChange={setActiveService}
                />
              )}

              {activeTab === 'collection' && (
                <CollectionView
                  onBack={() => setActiveTab('home')}
                  onSelectCar={handleSelectCar}
                  activeService={activeService}
                  onServiceChange={setActiveService}
                  selectedRouteInfo={selectedRoute}
                />
              )}

              {activeTab === 'syarat' && (
                <SyaratView onBack={() => setActiveTab('home')} />
              )}

              {activeTab === 'contact' && (
                <ContactView onBack={() => setActiveTab('home')} />
              )}
            </>
          )}
        </main>

        {/* Floating Bottom Navigation Dock (Visible when not in full details mode) */}
        {!selectedCar && (
          <FloatingDock
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Bottom Booking Sheet */}
        {bookingSheetOpen && (
          <BookingSheet
            car={bookingSheetCar}
            initialService={bookingSheetService}
            userName={userName}
            routeInfo={selectedRoute ? `Dari ${selectedRoute.origin} ke ${selectedRoute.destination}` : undefined}
            onClose={() => setBookingSheetOpen(false)}
            onCompleteBooking={handleCompleteBooking}
          />
        )}

        {/* Intro / Name Input Modal */}
        {isIntroOpen && (
          <IntroModal
            currentName={userName !== 'Sewa Mobil DCS' ? userName : ''}
            onSaveName={handleSaveName}
            onSkip={handleSkipIntro}
          />
        )}

        {/* Order Success & WhatsApp Redirection Modal */}
        <BookingSuccessModal
          booking={successBooking}
          onClose={() => setSuccessBooking(null)}
        />
      </div>
    </div>
  );
}

export default App;
