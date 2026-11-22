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
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  onBack,
  onSelectCar,
  activeService,
  onServiceChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'MPV' | 'City Car'>('All');

  const filteredCars = MOBILE_CARS.filter(
    (car) => selectedCategory === 'All' || car.category === selectedCategory
  );

  return (
    <div className="pb-28 pt-4 px-4 max-w-md mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Top Header with Circular Back Button */}
      <div className="relative flex items-center justify-center pt-1">
        <button
          onClick={onBack}
          className="absolute left-0 w-9 h-9 rounded-full bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center text-zinc-700 active:scale-95 transition"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <h1 className="text-sm font-bold text-zinc-900 tracking-tight">Our Collection</h1>
      </div>

      {/* Service Filter Tabs (Lepas Kunci, Sopir, All-In) */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-200/60 rounded-full text-xs font-semibold">
        <button
          onClick={() => onServiceChange('lepas_kunci')}
          className={`flex-1 py-1.5 rounded-full transition text-[11px] ${
            activeService === 'lepas_kunci'
              ? 'bg-white text-zinc-900 shadow-sm font-bold'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Lepas Kunci
        </button>
        <button
          onClick={() => onServiceChange('dengan_sopir')}
          className={`flex-1 py-1.5 rounded-full transition text-[11px] ${
            activeService === 'dengan_sopir'
              ? 'bg-white text-zinc-900 shadow-sm font-bold'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Dengan Sopir
        </button>
        <button
          onClick={() => onServiceChange('all_in')}
          className={`flex-1 py-1.5 rounded-full transition text-[11px] ${
            activeService === 'all_in'
              ? 'bg-white text-zinc-900 shadow-sm font-bold'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          All-In
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {(['All', 'MPV', 'City Car'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-zinc-600 border border-zinc-200/70 hover:bg-zinc-50'
            }`}
          >
            {cat === 'All' ? 'Semua Armada' : cat}
          </button>
        ))}
      </div>

      {/* 2-Column Grid matching Screen 2 in the mockup */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {filteredCars.map((car) => {
          const pricing = getCarPrice(car, activeService);

          return (
            <div
              key={car.id}
              onClick={() => onSelectCar(car)}
              className="bg-white rounded-3xl p-3.5 app-card-shadow hover:shadow-md transition cursor-pointer active:scale-[0.98] border border-zinc-100 flex flex-col justify-between"
            >
              <div>
                {/* Car Photo */}
                <div className="h-24 flex items-center justify-center p-1 mb-2">
                  <img
                    src={car.photoUrl}
                    alt={car.name}
                    className="max-h-20 w-auto object-contain drop-shadow"
                    loading="lazy"
                  />
                </div>

                {/* Car Title */}
                <h2 className="text-xs font-bold text-zinc-900 line-clamp-1">{car.name}</h2>

                {/* Seat badge */}
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 mt-0.5">
                  <User className="w-3 h-3 text-zinc-400" />
                  <span>{car.specs.capacity} Seat</span>
                </div>
              </div>

              {/* Price and Circle Arrow */}
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-zinc-50">
                <div className="text-xs font-extrabold text-zinc-900">
                  Rp {(pricing.promoPrice / 1000).toLocaleString('id-ID')}k<span className="text-[10px] text-zinc-400 font-normal">/D</span>
                </div>

                <div className="w-7 h-7 rounded-full border border-blue-600/30 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
