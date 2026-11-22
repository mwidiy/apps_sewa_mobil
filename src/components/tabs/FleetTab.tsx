import React, { useState } from 'react';
import { Search, Filter, Users, Briefcase, Fuel, Cog, ArrowRight, Sparkles } from 'lucide-react';
import { MOBILE_CARS, getCarPrice } from '../../data/cars';
import type { MobileCarItem } from '../../data/cars';
import type { RentalServiceType } from '../../data/company';

interface FleetTabProps {
  onSelectCar: (car: MobileCarItem) => void;
  onBookCar: (car: MobileCarItem, service: RentalServiceType) => void;
}

export const FleetTab: React.FC<FleetTabProps> = ({ onSelectCar, onBookCar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'MPV' | 'City Car'>('All');
  const [activeService, setActiveService] = useState<RentalServiceType>('lepas_kunci');
  const [selectedTransmission, setSelectedTransmission] = useState<'All' | 'Matic' | 'Manual'>('All');

  const filteredCars = MOBILE_CARS.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesTrans = selectedTransmission === 'All' || 
                         (selectedTransmission === 'Matic' && (car.specs.transmission.includes('Matic') || car.specs.transmission.includes('Automatic'))) ||
                         (selectedTransmission === 'Manual' && car.specs.transmission.includes('Manual'));

    return matchesSearch && matchesCategory && matchesTrans;
  });

  return (
    <div className="pb-24 pt-2 space-y-4 px-3.5 max-w-md mx-auto text-white">
      {/* Top Title & Search */}
      <div className="space-y-2.5">
        <div>
          <h1 className="text-lg font-extrabold text-white">Katalog Armada</h1>
          <p className="text-xs text-slate-400">Pilihan mobil terawat & siap jalan untuk harian</p>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari Avanza, Innova, Brio, Xpander..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition shadow-inner"
          />
        </div>
      </div>

      {/* Service Mode Selector Switch */}
      <div className="p-1 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-1 text-[11px] font-semibold">
        <button
          onClick={() => setActiveService('lepas_kunci')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeService === 'lepas_kunci'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🔑 Lepas Kunci
        </button>
        <button
          onClick={() => setActiveService('dengan_sopir')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeService === 'dengan_sopir'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          👨‍✈️ Pakai Sopir
        </button>
        <button
          onClick={() => setActiveService('all_in')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeService === 'all_in'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ✨ All-In
        </button>
      </div>

      {/* Category Pills & Transmission Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        {(['All', 'MPV', 'City Car'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition border ${
              selectedCategory === cat
                ? 'bg-sky-500/20 text-sky-400 border-sky-500'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            {cat === 'All' ? 'Semua Tipe' : cat}
          </button>
        ))}

        <div className="w-[1px] h-5 bg-slate-700 shrink-0 mx-1"></div>

        {(['All', 'Matic', 'Manual'] as const).map((trans) => (
          <button
            key={trans}
            onClick={() => setSelectedTransmission(trans)}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition border ${
              selectedTransmission === trans
                ? 'bg-slate-700 text-white border-slate-500'
                : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {trans === 'All' ? 'Semua Gigi' : trans}
          </button>
        ))}
      </div>

      {/* Fleet Cards List */}
      <div className="space-y-3">
        {filteredCars.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            Tidak ada armada yang cocok dengan pencarian.
          </div>
        ) : (
          filteredCars.map((car) => {
            const pricing = getCarPrice(car, activeService);

            return (
              <div
                key={car.id}
                className="p-4 rounded-3xl bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition shadow-md flex flex-col gap-3"
              >
                {/* Top Card Info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-400">
                        {car.category}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300">
                        {car.badge}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-white">{car.name}</h2>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{car.shortDesc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 whitespace-nowrap">
                    {car.discountBadge}
                  </span>
                </div>

                {/* Car Photo Display */}
                <div 
                  onClick={() => onSelectCar(car)}
                  className="h-32 rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-900/90 border border-slate-800/80 p-2 flex items-center justify-center cursor-pointer group"
                >
                  <img
                    src={car.photoUrl}
                    alt={car.name}
                    className="max-h-28 w-auto object-contain drop-shadow-md group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Specs Row */}
                <div className="grid grid-cols-4 gap-1 text-center py-1 border-y border-slate-750 text-[10px] text-slate-400">
                  <span className="flex items-center justify-center gap-1">
                    <Users className="w-3 h-3 text-sky-400" />
                    {car.specs.capacity} Seat
                  </span>
                  <span className="flex items-center justify-center gap-1">
                    <Cog className="w-3 h-3 text-sky-400" />
                    {car.specs.transmission}
                  </span>
                  <span className="flex items-center justify-center gap-1">
                    <Briefcase className="w-3 h-3 text-sky-400" />
                    {car.specs.luggage} Koper
                  </span>
                  <span className="flex items-center justify-center gap-1">
                    <Fuel className="w-3 h-3 text-sky-400" />
                    {car.specs.fuel}
                  </span>
                </div>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 line-through block">
                      Rp {pricing.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-sky-400">
                        Rp {pricing.promoPrice.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-400">/24 Jam</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCar(car)}
                      className="px-3 py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold active:scale-95 transition"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => onBookCar(car, activeService)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold active:scale-95 shadow-md shadow-sky-500/20 transition flex items-center gap-1"
                    >
                      <span>Sewa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
