import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import type { TabType } from './components/BottomNav';
import { HomeTab } from './components/tabs/HomeTab';
import { FleetTab } from './components/tabs/FleetTab';
import { CalculatorTab } from './components/tabs/CalculatorTab';
import { RequirementsTab } from './components/tabs/RequirementsTab';
import { SupportTab } from './components/tabs/SupportTab';
import { CarDetailModal } from './components/CarDetailModal';
import { LocationSelectModal } from './components/LocationSelectModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';

import type { MobileCarItem } from './data/cars';
import type { BookingPayload, RentalServiceType } from './data/company';
import { JABODETABEK_AREAS } from './data/locations';
import type { LocationArea } from './data/locations';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentLocation, setCurrentLocation] = useState<LocationArea>(JABODETABEK_AREAS[0]); // Depok Cinere Hub
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedCarForModal, setSelectedCarForModal] = useState<MobileCarItem | null>(null);

  // States passed to Calculator
  const [calcCarId, setCalcCarId] = useState<string | undefined>(undefined);
  const [calcService, setCalcService] = useState<RentalServiceType>('lepas_kunci');

  // Booking success modal
  const [successBooking, setSuccessBooking] = useState<BookingPayload | null>(null);

  // Handlers
  const handleSelectCarForModal = (car: MobileCarItem) => {
    setSelectedCarForModal(car);
  };

  const handleBookFromModalOrFleet = (car: MobileCarItem, service: RentalServiceType) => {
    setSelectedCarForModal(null);
    setCalcCarId(car.id);
    setCalcService(service);
    setActiveTab('hitung');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceFromHome = (service: RentalServiceType) => {
    setCalcService(service);
    setActiveTab('hitung');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingCreated = (booking: BookingPayload) => {
    setSuccessBooking(booking);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center">
      {/* Mobile container viewport */}
      <div className="w-full max-w-md bg-slate-900 min-h-screen flex flex-col relative shadow-2xl border-x border-slate-800/80">
        {/* Top Header */}
        <Header
          selectedLocationName={currentLocation.name.split(' ')[0]}
          onOpenLocationSelect={() => setIsLocationModalOpen(true)}
        />

        {/* Tab Content Router */}
        <main className="flex-1 overflow-x-hidden">
          {activeTab === 'home' && (
            <HomeTab
              currentLocation={currentLocation}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCar={handleSelectCarForModal}
              onSelectServiceForCalculator={handleSelectServiceFromHome}
            />
          )}

          {activeTab === 'armada' && (
            <FleetTab
              onSelectCar={handleSelectCarForModal}
              onBookCar={handleBookFromModalOrFleet}
            />
          )}

          {activeTab === 'hitung' && (
            <CalculatorTab
              key={`${calcCarId || 'default'}-${calcService}`}
              initialCarId={calcCarId}
              initialService={calcService}
              onBookingCreated={handleBookingCreated}
            />
          )}

          {activeTab === 'syarat' && <RequirementsTab />}

          {activeTab === 'bantuan' && <SupportTab />}
        </main>

        {/* Bottom Tab Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Modals */}
        <CarDetailModal
          car={selectedCarForModal}
          onClose={() => setSelectedCarForModal(null)}
          onSelectForBooking={handleBookFromModalOrFleet}
        />

        {isLocationModalOpen && (
          <LocationSelectModal
            selectedAreaId={currentLocation.id}
            onSelectArea={(area) => setCurrentLocation(area)}
            onClose={() => setIsLocationModalOpen(false)}
          />
        )}

        <BookingSuccessModal
          booking={successBooking}
          onClose={() => setSuccessBooking(null)}
        />
      </div>
    </div>
  );
}

export default App;
