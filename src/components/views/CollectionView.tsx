import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import { MOBILE_CARS, getCarPrice } from '../../data/cars';
import type { MobileCarItem } from '../../data/cars';
import type { RentalServiceType } from '../../data/company';

interface CollectionViewProps {
  onBack: () => void;
  onSelectCar: (car: MobileCarItem) => void;
  activeService: RentalServiceType;
  onServiceChange: (service: RentalServiceType) => void;
  selectedRouteInfo?: { origin: string; destination: string; service: RentalServiceType } | null;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  onBack,
  onSelectCar,
  activeService,
  onServiceChange,
  selectedRouteInfo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'MPV' | 'City Car'>('All');

  const filteredCars = MOBILE_CARS.filter(
    (car) => selectedCategory === 'All' || car.category === selectedCategory
  );

  return (
    <div className="pb-28 max-w-md mx-auto animate-view-transition">
      {/* Sticky Top Header Nav Bar with Safe Headroom */}
      <header className="sticky top-0 z-40 bg-[#f1f3f7]/90 backdrop-blur-md pt-8 pb-3 px-4 border-b border-zinc-200/50 shadow-xs flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center text-zinc-700 active:scale-95 transition"
          title="Kembali ke Dashboard"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <h1 className="text-sm font-bold text-zinc-900 tracking-tight">Our Collection</h1>
        <div className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full shadow-2xs">
          {filteredCars.length} Unit
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-4 pt-3 space-y-4">
        {/* Selected Route Context Banner if applicable */}
        {selectedRouteInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs space-y-1 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-blue-700 text-[10px] uppercase tracking-wider">
                Rute Pilihan Anda:
              </span>
              <span className="text-[10px] text-blue-600 font-semibold bg-white px-2 py-0.5 rounded-full border border-blue-200">
                {selectedRouteInfo.service === 'lepas_kunci' ? 'Lepas Kunci' : selectedRouteInfo.service === 'dengan_sopir' ? 'Dengan Sopir' : 'All-In'}
              </span>
            </div>
            <div className="text-zinc-800 font-bold flex items-center gap-1.5 truncate">
              <span className="truncate">{selectedRouteInfo.origin}</span>
              <span className="text-blue-500">➔</span>
              <span className="truncate">{selectedRouteInfo.destination}</span>
            </div>
          </div>
        )}

        {/* Animated Service Filter Tabs (Lepas Kunci, Sopir, All-In) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-zinc-200/70 rounded-2xl text-xs font-semibold shadow-inner">
          {(['lepas_kunci', 'dengan_sopir', 'all_in'] as const).map((service) => {
            const isActive = activeService === service;
            const label = service === 'lepas_kunci' ? 'Lepas Kunci' : service === 'dengan_sopir' ? 'Dengan Sopir' : 'All-In';
            return (
              <button
                key={service}
                onClick={() => onServiceChange(service)}
                className={`flex-1 py-2 rounded-xl transition-all duration-300 text-[11px] relative cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-white text-zinc-900 shadow-md font-extrabold scale-[1.02]'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Animated Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {(['All', 'MPV', 'City Car'] as const).map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-50'
                }`}
              >
                <span>{cat === 'All' ? 'Semua Armada' : cat}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
              </button>
            );
          })}
        </div>

        {/* 2-Column Staggered Animated Grid matching Screen 2 in the mockup */}
        <div 
          key={`${selectedCategory}-${activeService}`}
          className="grid grid-cols-2 gap-3 pt-1 animate-view-transition"
        >
          {filteredCars.map((car, index) => {
            const pricing = getCarPrice(car, activeService);

            return (
              <div
                key={car.id}
                onClick={() => onSelectCar(car)}
                style={{ animationDelay: `${index * 45}ms` }}
                className="group bg-white rounded-3xl p-3.5 app-card-shadow hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.96] border border-zinc-100 flex flex-col justify-between animate-card-enter hover:-translate-y-1"
              >
                <div>
                  {/* Car Photo Container with Studio Shadow & Clean Transparent Rendering */}
                  <div className="h-24 bg-gradient-to-b from-zinc-50/60 to-white rounded-2xl flex flex-col items-center justify-center p-2 mb-2 relative overflow-hidden group-hover:bg-blue-50/20 transition-colors duration-300">
                    <img
                      src={car.photoUrl}
                      alt={car.name}
                      className="max-h-18 w-auto object-contain mix-blend-multiply drop-shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Studio floor shadow so car floats cleanly with 3D depth */}
                    <div className="w-3/4 h-2 bg-black/15 rounded-full blur-[3px] -mt-1 pointer-events-none transition-transform duration-300 group-hover:scale-110"></div>
                  </div>

                  {/* Car Title */}
                  <h2 className="text-xs font-bold text-zinc-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{car.name}</h2>

                  {/* Seat badge & plate */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-0.5">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-zinc-400" />
                      <span>{car.specs.capacity} Seat</span>
                    </div>
                    {car.specs.plateNumber && (
                      <span className="text-[9px] font-semibold text-zinc-500 bg-zinc-100 px-1.5 py-0.2 rounded">
                        {car.specs.plateNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price with Strikethrough and Interactive Circle Arrow */}
                <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-zinc-100">
                  <div>
                    <span className="line-through text-[9px] text-zinc-400 font-semibold block leading-tight">
                      Rp {(pricing.originalPrice / 1000).toLocaleString('id-ID')}k
                    </span>
                    <div className="text-xs font-black text-blue-600 animate-price-pop">
                      Rp {(pricing.promoPrice / 1000).toLocaleString('id-ID')}k<span className="text-[9px] text-zinc-400 font-normal">/D</span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full border border-blue-600/30 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:scale-110 transition-all duration-300 shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
