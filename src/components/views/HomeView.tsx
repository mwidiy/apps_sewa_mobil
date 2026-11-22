import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bell, ArrowRight, Sparkles } from 'lucide-react';
import { MOBILE_CARS, getCarPrice } from '../../data/cars';
import type { MobileCarItem } from '../../data/cars';
import type { RentalServiceType } from '../../data/company';

interface HomeViewProps {
  onSelectCar: (car: MobileCarItem) => void;
  onSeeAll: () => void;
  activeService: RentalServiceType;
  onServiceChange: (service: RentalServiceType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectCar,
  onSeeAll,
  activeService,
  onServiceChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Popular cars to show in the list
  const popularCars = MOBILE_CARS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-28 pt-4 px-4 max-w-md mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Top Header: Welcome & Notification */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="DCS User"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <div>
            <div className="text-xs text-zinc-400 font-medium flex items-center gap-1">
              <span>Welcome</span>
              <span>👋</span>
            </div>
            <h1 className="text-base font-bold text-zinc-900 tracking-tight">
              Pelanggan DCS
            </h1>
          </div>
        </div>

        <button
          onClick={onSeeAll}
          className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-700 shadow-sm relative active:scale-95 transition"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
        </button>
      </div>

      {/* Search Bar with Orange Filter Icon */}
      <div className="relative flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-4 py-3 flex items-center gap-2.5 border border-zinc-200/60 shadow-sm">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search for a vehicle"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none"
          />
        </div>

        <button
          onClick={onSeeAll}
          className="w-11 h-11 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/25 active:scale-95 transition shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
        </button>
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

      {/* Promo Banner Card (Dark luxury gradient matching the screenshot) */}
      <div 
        onClick={onSeeAll}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b0f19] via-[#111827] to-[#1e1b4b] p-5 text-white shadow-xl cursor-pointer active:scale-[0.99] transition group"
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="w-1/2">
            <img
              src={MOBILE_CARS[3].photoUrl}
              alt="Promo Car"
              className="w-full object-contain drop-shadow-2xl group-hover:scale-105 transition duration-300"
            />
          </div>

          <div className="w-1/2 pl-3 text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block mb-1">
              Jabodetabek Promo
            </span>
            <h2 className="text-sm font-extrabold leading-tight text-white">
              Get up to <br />
              <span className="text-amber-400">20% DISCOUNT</span>
            </h2>
            <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 group-hover:text-blue-300">
              <span>Explore Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

        {/* Ambient background light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Popular Cars Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-zinc-900 tracking-tight">Popular Cars</h2>
          <button
            onClick={onSeeAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            See All
          </button>
        </div>

        {/* List of Cars (White Cards exactly like Screen 1) */}
        <div className="space-y-2.5">
          {popularCars.map((car) => {
            const pricing = getCarPrice(car, activeService);

            return (
              <div
                key={car.id}
                onClick={() => onSelectCar(car)}
                className="bg-white rounded-2xl p-3 app-card-shadow hover:shadow-md transition cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3 border border-zinc-100"
              >
                {/* Left: Car Thumbnail */}
                <div className="w-20 h-14 bg-zinc-50 rounded-xl p-1 flex items-center justify-center shrink-0">
                  <img
                    src={car.photoUrl}
                    alt={car.name}
                    className="max-h-12 w-auto object-contain drop-shadow"
                    loading="lazy"
                  />
                </div>

                {/* Middle: Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-zinc-900 truncate">{car.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-zinc-400 font-medium">Available</span>
                    <span className="text-[10px] text-zinc-300">•</span>
                    <span className="text-[10px] text-zinc-500 font-semibold">{car.specs.capacity} Seat</span>
                  </div>
                  <div className="text-[11px] font-bold text-blue-600 mt-1">
                    Rp {(pricing.promoPrice / 1000).toLocaleString('id-ID')}k<span className="text-[9px] text-zinc-400 font-normal">/hari</span>
                  </div>
                </div>

                {/* Right: Circle Arrow Button */}
                <div className="w-8 h-8 rounded-full border border-blue-600/30 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
