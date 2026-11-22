import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  KeyRound, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star,
  Fuel,
  Users,
  Calendar,
  Flame
} from 'lucide-react';
import { MOBILE_CARS } from '../../data/cars';
import type { MobileCarItem } from '../../data/cars';
import { COMPANY } from '../../data/company';
import type { RentalServiceType } from '../../data/company';
import type { LocationArea } from '../../data/locations';

interface HomeTabProps {
  currentLocation: LocationArea;
  onOpenLocationModal: () => void;
  onNavigateTab: (tab: 'armada' | 'hitung' | 'syarat' | 'bantuan') => void;
  onSelectCar: (car: MobileCarItem) => void;
  onSelectServiceForCalculator: (service: RentalServiceType) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  currentLocation,
  onOpenLocationModal,
  onNavigateTab,
  onSelectCar,
  onSelectServiceForCalculator,
}) => {
  const popularCars = MOBILE_CARS.filter(c => c.isPopular);

  return (
    <div className="pb-24 pt-2 space-y-4 px-3.5 max-w-md mx-auto text-white">
      {/* Promo Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 p-5 shadow-xl border border-sky-400/20">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-sky-100 border border-white/20">
            <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-bounce" />
            <span>Promo Sewa Mobil Harian 2026</span>
          </div>

          <h1 className="text-xl font-black tracking-tight text-white leading-tight">
            Sewa Mobil Jabodetabek <br />
            <span className="text-amber-300">Lepas Kunci & Driver</span>
          </h1>

          <p className="text-xs text-sky-100/90 leading-relaxed">
            Unit baru, bersih, wangi & siap jalan. Siap antar ke rumah, kantor, stasiun atau bandara.
          </p>

          {/* Location Delivery Indicator */}
          <div 
            onClick={onOpenLocationModal}
            className="mt-2 inline-flex items-center gap-2 p-2 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 cursor-pointer active:scale-95 transition"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="text-[11px] font-medium text-slate-100">
              Coverage: <strong className="text-amber-300">{currentLocation.name}</strong> ({currentLocation.deliveryTime})
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-sky-400/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* 3 Core Services Buttons (Lepas Kunci, Sopir, All-In) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Pilih Jenis Layanan Sewa
          </h2>
          <span className="text-[10px] text-sky-400 font-semibold">Tersedia 3 Opsi</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Service 1: Lepas Kunci */}
          <button
            onClick={() => {
              onSelectServiceForCalculator('lepas_kunci');
              onNavigateTab('hitung');
            }}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-sky-500 active:scale-95 transition flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-lg mb-1.5 group-hover:scale-110 transition">
              🔑
            </div>
            <span className="text-xs font-bold text-white group-hover:text-sky-400 transition">
              Lepas Kunci
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Bebas 24 Jam</span>
            <span className="text-[9px] font-bold text-emerald-400 mt-1">Mulai 280rb</span>
          </button>

          {/* Service 2: Dengan Sopir */}
          <button
            onClick={() => {
              onSelectServiceForCalculator('dengan_sopir');
              onNavigateTab('hitung');
            }}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500 active:scale-95 transition flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg mb-1.5 group-hover:scale-110 transition">
              👨‍✈️
            </div>
            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
              Pakai Sopir
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Driver Standby</span>
            <span className="text-[9px] font-bold text-emerald-400 mt-1">Mulai 420rb</span>
          </button>

          {/* Service 3: All-In */}
          <button
            onClick={() => {
              onSelectServiceForCalculator('all_in');
              onNavigateTab('hitung');
            }}
            className="p-3 rounded-2xl bg-gradient-to-b from-amber-500/10 to-slate-800/80 border border-amber-500/30 hover:border-amber-400 active:scale-95 transition flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg mb-1.5 group-hover:scale-110 transition">
              ✨
            </div>
            <span className="text-xs font-bold text-white group-hover:text-amber-400 transition">
              Paket All-In
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Sopir+BBM+Tol</span>
            <span className="text-[9px] font-bold text-amber-400 mt-1">Bebas Ribet</span>
          </button>
        </div>
      </div>

      {/* Quick Calculator Shortcut Banner */}
      <div 
        onClick={() => onNavigateTab('hitung')}
        className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between cursor-pointer active:scale-[0.99] transition hover:border-sky-500"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Simulasi Biaya & Durasi Sewa</h3>
            <p className="text-[10px] text-slate-400">Pilih mobil & tanggal, langsung tahu total harganya</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-sky-400">
          <span>Hitung</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Popular Fleet Carousel / Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-sm font-bold text-white">Armada Terfavorit</h2>
            <p className="text-[11px] text-slate-400">Paling banyak dipesan di Jabodetabek</p>
          </div>
          <button
            onClick={() => onNavigateTab('armada')}
            className="text-xs text-sky-400 font-semibold flex items-center gap-0.5"
          >
            <span>Semua Unit</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {popularCars.slice(0, 4).map((car) => (
            <div
              key={car.id}
              onClick={() => onSelectCar(car)}
              className="p-3 rounded-2xl bg-slate-800/80 border border-slate-800 hover:border-sky-500/70 transition cursor-pointer active:scale-[0.98] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400">
                    {car.brand}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    {car.badge}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-1">{car.name}</h3>

                <div className="my-2 h-24 flex items-center justify-center">
                  <img
                    src={car.photoUrl}
                    alt={car.name}
                    className="max-h-24 w-auto object-contain drop-shadow"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/60">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-sky-400" />
                    {car.specs.capacity} Seat
                  </span>
                  <span>{car.specs.transmission}</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 block">Lepas Kunci:</span>
                  <span className="text-xs font-black text-sky-400">
                    Rp {car.pricing.lepasKunciPerDay / 1000}rb<span className="text-[9px] font-normal text-slate-400">/hr</span>
                  </span>
                </div>
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why DCS Rent Car Trust Box */}
      <div className="p-4 rounded-3xl bg-slate-800/40 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-white">4.9 / 5.0</span>
          <span className="text-[10px] text-slate-400">({COMPANY.reviewCount}+ Review Nyata)</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Unit Baru & Wangi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Bebas Antar-Jemput</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Driver Sopan & Resmi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Support Darurat 24 Jam</span>
          </div>
        </div>
      </div>
    </div>
  );
};
