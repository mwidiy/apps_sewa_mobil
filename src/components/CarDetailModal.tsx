import React from 'react';
import { X, Users, Briefcase, Fuel, Cog, Calendar, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import type { MobileCarItem } from '../data/cars';
import type { RentalServiceType } from '../data/company';

interface CarDetailModalProps {
  car: MobileCarItem | null;
  onClose: () => void;
  onSelectForBooking: (car: MobileCarItem, service: RentalServiceType) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onSelectForBooking,
}) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg max-h-[90vh] bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-y-auto no-scrollbar flex flex-col shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
              {car.category} • {car.brand}
            </span>
            <h2 className="text-lg font-bold text-white mt-1">{car.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4">
          {/* Car Image with Badge */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-800 p-3 overflow-hidden flex items-center justify-center">
            <img
              src={car.photoUrl}
              alt={car.name}
              className="w-full h-48 object-contain drop-shadow-xl"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-black tracking-wide shadow">
                {car.badge}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-bold">
                {car.discountBadge}
              </span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800">
              <Users className="w-4 h-4 mx-auto text-sky-400 mb-1" />
              <span className="block text-[10px] text-slate-400">Kapasitas</span>
              <span className="text-xs font-bold text-white">{car.specs.capacity} Kursi</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800">
              <Cog className="w-4 h-4 mx-auto text-sky-400 mb-1" />
              <span className="block text-[10px] text-slate-400">Transmisi</span>
              <span className="text-xs font-bold text-white">{car.specs.transmission}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800">
              <Briefcase className="w-4 h-4 mx-auto text-sky-400 mb-1" />
              <span className="block text-[10px] text-slate-400">Bagasi</span>
              <span className="text-xs font-bold text-white">{car.specs.luggage} Koper</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800">
              <Fuel className="w-4 h-4 mx-auto text-sky-400 mb-1" />
              <span className="block text-[10px] text-slate-400">Bahan Bakar</span>
              <span className="text-xs font-bold text-white">{car.specs.fuel}</span>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <p className="text-xs text-slate-300 leading-relaxed">{car.shortDesc}</p>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {car.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Options by Service */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Pilih Layanan & Tarif Harian:
            </h3>

            <div className="space-y-2">
              {/* Option 1: Lepas Kunci */}
              <div 
                onClick={() => onSelectForBooking(car, 'lepas_kunci')}
                className="group p-3 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-800/40 border border-slate-700/60 hover:border-sky-500 cursor-pointer transition active:scale-[0.99] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
                    🔑
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-400 transition">
                      Lepas Kunci (Self-Drive)
                    </h4>
                    <p className="text-[10px] text-slate-400">Sewa 24 Jam bebas kemana saja</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="line-through text-[10px] text-slate-500 block">
                    Rp {car.pricing.originalLepasKunci.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm font-black text-sky-400">
                    Rp {car.pricing.lepasKunciPerDay.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400">/hari</span>
                </div>
              </div>

              {/* Option 2: Dengan Sopir */}
              <div 
                onClick={() => onSelectForBooking(car, 'dengan_sopir')}
                className="group p-3 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-800/40 border border-slate-700/60 hover:border-emerald-500 cursor-pointer transition active:scale-[0.99] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    👨‍✈️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                      Dengan Sopir (Driver)
                    </h4>
                    <p className="text-[10px] text-slate-400">Driver sopan & hafal jalanan</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="line-through text-[10px] text-slate-500 block">
                    Rp {car.pricing.originalSopir.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm font-black text-emerald-400">
                    Rp {car.pricing.sopirPerDay.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400">/hari</span>
                </div>
              </div>

              {/* Option 3: All-In */}
              <div 
                onClick={() => onSelectForBooking(car, 'all_in')}
                className="group p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-800/80 to-slate-800/40 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition active:scale-[0.99] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    ✨
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                        Paket All-In (Praktis)
                      </h4>
                      <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1 py-0.2 rounded font-bold">
                        Bebas Ribet
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">Mobil + Sopir + BBM + Tol/Parkir</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="line-through text-[10px] text-slate-500 block">
                    Rp {car.pricing.originalAllIn.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm font-black text-amber-400">
                    Rp {car.pricing.allInPerDay.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400">/hari</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => onSelectForBooking(car, 'lepas_kunci')}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition"
          >
            <span>Hitung & Booking Unit Ini</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
