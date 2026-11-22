import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  User, 
  RotateCw, 
  Gauge, 
  Zap, 
  Fuel, 
  Armchair,
  CheckCircle2,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { getCarPrice } from '../../data/cars';
import type { MobileCarItem } from '../../data/cars';
import type { RentalServiceType } from '../../data/company';

interface RentDetailsViewProps {
  car: MobileCarItem;
  onBack: () => void;
  onRentNow: (car: MobileCarItem, service: RentalServiceType) => void;
  defaultService?: RentalServiceType;
}

export const RentDetailsView: React.FC<RentDetailsViewProps> = ({
  car,
  onBack,
  onRentNow,
  defaultService = 'lepas_kunci',
}) => {
  const [selectedService, setSelectedService] = useState<RentalServiceType>(defaultService);
  const pricing = getCarPrice(car, selectedService);

  return (
    <div className="min-h-screen bg-[#f1f3f7] pb-32 pt-4 px-4 max-w-md mx-auto text-zinc-900 animate-in fade-in duration-200">
      {/* Top Header with Back Button */}
      <div className="relative flex items-center justify-center pt-1 mb-3">
        <button
          onClick={onBack}
          className="absolute left-0 w-9 h-9 rounded-full bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center text-zinc-700 active:scale-95 transition"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <h1 className="text-sm font-bold text-zinc-900 tracking-tight">Rent Details</h1>
      </div>

      {/* Hero Car Showcase */}
      <div className="relative py-4 flex flex-col items-center justify-center">
        <div className="w-full h-52 flex items-center justify-center">
          <img
            src={car.photoUrl}
            alt={car.name}
            className="max-h-48 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* 360 degree rotation indicator */}
        <div className="mt-2 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-blue-600">
            <RotateCw className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Vehicle Title & Rating Header */}
      <div className="bg-white rounded-3xl p-5 app-card-shadow border border-zinc-100/80 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-zinc-900 tracking-tight">{car.name}</h2>
            <div className="flex items-center gap-1 text-xs font-bold text-zinc-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium mt-1">
            <User className="w-3.5 h-3.5" />
            <span>{car.specs.capacity} Seater</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">Tersedia di Pool Cinere & Antar</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-500 leading-relaxed">
          {car.shortDesc} Unit terawat, kabin bersih wangi, serta siap jalan untuk keperluan keluarga, bisnis, maupun operasional harian se-Jabodetabek.
        </p>

        {/* 4 Specification Cards in a Row (Exactly matching Screen 3) */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {/* Spec 1: Speed / Engine */}
          <div className="bg-zinc-50 rounded-2xl p-2.5 flex flex-col items-center text-center border border-zinc-100">
            <Gauge className="w-5 h-5 text-zinc-600 mb-1.5" />
            <span className="text-[11px] font-bold text-zinc-900 leading-tight">
              {car.specs.engineCc.split(' ')[0]}
            </span>
            <span className="text-[9px] text-zinc-400">Mesin</span>
          </div>

          {/* Spec 2: Power / Transmisi */}
          <div className="bg-zinc-50 rounded-2xl p-2.5 flex flex-col items-center text-center border border-zinc-100">
            <Zap className="w-5 h-5 text-zinc-600 mb-1.5" />
            <span className="text-[11px] font-bold text-zinc-900 leading-tight">
              {car.specs.transmission.split(' ')[0]}
            </span>
            <span className="text-[9px] text-zinc-400">Gigi</span>
          </div>

          {/* Spec 3: Fuel */}
          <div className="bg-zinc-50 rounded-2xl p-2.5 flex flex-col items-center text-center border border-zinc-100">
            <Fuel className="w-5 h-5 text-zinc-600 mb-1.5" />
            <span className="text-[11px] font-bold text-zinc-900 leading-tight">
              {car.specs.fuel}
            </span>
            <span className="text-[9px] text-zinc-400">BBM</span>
          </div>

          {/* Spec 4: Seat */}
          <div className="bg-zinc-50 rounded-2xl p-2.5 flex flex-col items-center text-center border border-zinc-100">
            <Armchair className="w-5 h-5 text-zinc-600 mb-1.5" />
            <span className="text-[11px] font-bold text-zinc-900 leading-tight">
              {car.specs.capacity}
            </span>
            <span className="text-[9px] text-zinc-400">Kursi</span>
          </div>
        </div>

        {/* Service Type Selection */}
        <div className="pt-2 space-y-2 border-t border-zinc-100">
          <label className="text-xs font-bold text-zinc-700 block">
            Pilih Paket Layanan:
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedService('lepas_kunci')}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center ${
                selectedService === 'lepas_kunci'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span className="text-xs">Lepas Kunci</span>
              <span className="text-[9px] text-zinc-400 mt-0.5">24 Jam</span>
            </button>

            <button
              onClick={() => setSelectedService('dengan_sopir')}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center ${
                selectedService === 'dengan_sopir'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span className="text-xs">Pakai Sopir</span>
              <span className="text-[9px] text-zinc-400 mt-0.5">Standby</span>
            </button>

            <button
              onClick={() => setSelectedService('all_in')}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center ${
                selectedService === 'all_in'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span className="text-xs">All-In</span>
              <span className="text-[9px] text-zinc-400 mt-0.5">+BBM+Tol</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar (Screen 3 Bottom Bar with Strikethrough Price) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-zinc-200/80 px-6 py-3.5 shadow-lg flex items-center justify-between max-w-md mx-auto">
        <div>
          <span className="text-[10px] text-zinc-400 font-medium block">Harga Sewa / Rent Price</span>
          <div className="flex items-baseline gap-1.5">
            <span className="line-through text-xs text-zinc-400 font-bold">
              Rp {(pricing.originalPrice / 1000).toLocaleString('id-ID')}k
            </span>
            <span className="text-lg font-black text-blue-600">
              Rp {(pricing.promoPrice / 1000).toLocaleString('id-ID')}k
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">/hari</span>
          </div>
        </div>

        <button
          onClick={() => onRentNow(car, selectedService)}
          className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
        >
          <span>Rent Now</span>
        </button>
      </div>
    </div>
  );
};
