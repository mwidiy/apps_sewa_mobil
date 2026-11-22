import React, { useState } from 'react';
import { 
  Navigation, 
  ArrowRight, 
  Clock, 
  Route, 
  ShieldCheck, 
  Car,
  Edit3,
  Check
} from 'lucide-react';
import { POPULAR_ROUTES, POPULAR_ORIGINS, POPULAR_DESTINATIONS } from '../../data/routes';
import { COMPANY } from '../../data/company';
import type { RentalServiceType } from '../../data/company';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface HomeViewProps {
  userName: string;
  onOpenNameEdit: () => void;
  onSeeAllArmada: (selectedRouteInfo?: { origin: string; destination: string; service: RentalServiceType }) => void;
  activeService: RentalServiceType;
  onServiceChange: (service: RentalServiceType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  onOpenNameEdit,
  onSeeAllArmada,
  activeService,
  onServiceChange,
}) => {
  // Route selection states
  const [origin, setOrigin] = useState<string>(POPULAR_ORIGINS[0]);
  const [destination, setDestination] = useState<string>(POPULAR_DESTINATIONS[0]);
  
  // Custom manual inputs
  const [isCustomOrigin, setIsCustomOrigin] = useState(false);
  const [customOriginText, setCustomOriginText] = useState('');
  
  const [isCustomDest, setIsCustomDest] = useState(false);
  const [customDestText, setCustomDestText] = useState('');

  const [durationDays, setDurationDays] = useState(1);

  // Computed effective locations
  const currentOrigin = isCustomOrigin && customOriginText.trim() ? customOriginText.trim() : origin;
  const currentDestination = isCustomDest && customDestText.trim() ? customDestText.trim() : destination;

  // Approximate distance calculation
  const destLower = currentDestination.toLowerCase();
  const estimatedKm = destLower.includes('bandung') ? 155
    : destLower.includes('puncak') ? 85
    : destLower.includes('anyer') ? 135
    : destLower.includes('cirebon') ? 220
    : destLower.includes('soekarno') || destLower.includes('soetta') ? 42
    : destLower.includes('halim') ? 30
    : destLower.includes('bogor') ? 60
    : 40;

  const estimatedHours = destLower.includes('bandung') ? '2.5 - 3.5 Jam'
    : destLower.includes('puncak') ? '1.5 - 2.5 Jam'
    : destLower.includes('anyer') ? '2.5 - 3 Jam'
    : destLower.includes('cirebon') ? '3.5 - 4.5 Jam'
    : destLower.includes('soetta') || destLower.includes('soekarno') ? '45 - 60 Menit'
    : '1 - 2 Jam';

  const isLuarKota = estimatedKm > 60;

  // Pricing: Original (dicoret) vs Promo Diskon
  const originalDailyPrice = activeService === 'lepas_kunci' ? 380000
    : activeService === 'dengan_sopir' ? 580000
    : 850000;

  const promoDailyPrice = activeService === 'lepas_kunci' ? 280000
    : activeService === 'dengan_sopir' ? 420000
    : 620000;

  const totalOriginal = originalDailyPrice * durationDays;
  const totalPromo = promoDailyPrice * durationDays;
  const totalDiscount = totalOriginal - totalPromo;

  const handleConsultWhatsApp = () => {
    const serviceName = activeService === 'lepas_kunci' ? 'Lepas Kunci (Self-Drive)'
      : activeService === 'dengan_sopir' ? 'Dengan Sopir'
      : 'Paket All-In (Sopir+BBM+Tol)';

    const text = `Halo Admin DCS Rent Car,
Saya *${userName || 'Pelanggan'}* ingin konsultasi sewa mobil untuk rute berikut:

📍 *Titik Jemput (Dari)*: ${currentOrigin}
🏁 *Tujuan (Mau Ke)*: ${currentDestination}
⏳ *Durasi*: ${durationDays} Hari
📋 *Layanan*: ${serviceName}
🛣️ *Estimasi Jarak*: ~${estimatedKm} KM (${estimatedHours})
💰 *Estimasi Promo*: Rp ${totalPromo.toLocaleString('id-ID')}

Mohon info ketersediaan unit dan kelanjutan verifikasinya ya admin. Terima kasih!`;

    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSelectArmadaForRoute = () => {
    onSeeAllArmada({
      origin: currentOrigin,
      destination: currentDestination,
      service: activeService,
    });
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-md mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Top Header: Welcome & Personalized Name */}
      <div className="flex items-center justify-between pt-1">
        <div 
          onClick={onOpenNameEdit}
          className="flex items-center gap-3 cursor-pointer group"
          title="Klik untuk ubah nama"
        >
          <div className="relative">
            <img
              src="/logo.jpeg"
              alt="Sewa Mobil DCS"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:scale-105 transition"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 font-medium flex items-center gap-1">
              <span>Welcome</span>
              <span>👋</span>
            </div>
            <h1 className="text-base font-extrabold text-zinc-900 tracking-tight group-hover:text-blue-600 transition flex items-center gap-1.5">
              <span>{userName || 'Sewa Mobil DCS'}</span>
              <span className="text-[10px] text-zinc-400 font-normal underline">ubah</span>
            </h1>
          </div>
        </div>

        <button
          onClick={handleSelectArmadaForRoute}
          className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold shadow-sm active:scale-95 transition flex items-center gap-1.5"
        >
          <Car className="w-3.5 h-3.5" />
          <span>Lihat Armada</span>
        </button>
      </div>

      {/* CORE FEATURE: Trip & Route Cost Calculator */}
      <div className="bg-white rounded-3xl p-5 app-card-shadow border border-zinc-100 space-y-4">
        {/* Header Title (Tanpa tulisan realtime) */}
        <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Route className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-zinc-900">Kalkulator Rute & Biaya Sewa</h2>
            <p className="text-[11px] text-zinc-400">Pilih atau ketik rute perjalanan Anda secara fleksibel</p>
          </div>
        </div>

        {/* Visual Map Route Stepper Card with Custom Option */}
        <div className="relative bg-zinc-50 rounded-2xl p-4 border border-zinc-200/70 space-y-4">
          
          {/* Origin: Dari Mana */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                <span>Dari Mana (Titik Penjemputan):</span>
              </label>

              <button
                type="button"
                onClick={() => setIsCustomOrigin(!isCustomOrigin)}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 underline"
              >
                <Edit3 className="w-2.5 h-2.5" />
                <span>{isCustomOrigin ? 'Pilih dari List' : 'Ketik Alamat Sendiri'}</span>
              </button>
            </div>

            {isCustomOrigin ? (
              <input
                type="text"
                placeholder="Ketik alamat jemput (cth: Jl. Margonda No. 10 / Lobi Hotel...)"
                value={customOriginText}
                onChange={(e) => setCustomOriginText(e.target.value)}
                autoFocus
                className="w-full bg-white border border-blue-400 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 placeholder-zinc-400 focus:outline-none shadow-sm"
              />
            ) : (
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-blue-600 transition"
              >
                {POPULAR_ORIGINS.map((orig, i) => (
                  <option key={i} value={orig}>{orig}</option>
                ))}
              </select>
            )}
          </div>

          {/* Dotted divider */}
          <div className="border-t border-dashed border-zinc-200 relative my-1">
            <div className="absolute left-1.5 -top-1.5 w-3 h-3 bg-zinc-100 rounded-full flex items-center justify-center">
              <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>
            </div>
          </div>

          {/* Destination: Mau Ke Mana */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                <span>Mau Ke Mana (Tujuan Perjalanan):</span>
              </label>

              <button
                type="button"
                onClick={() => setIsCustomDest(!isCustomDest)}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 underline"
              >
                <Edit3 className="w-2.5 h-2.5" />
                <span>{isCustomDest ? 'Pilih dari List' : 'Ketik Tujuan Sendiri'}</span>
              </button>
            </div>

            {isCustomDest ? (
              <input
                type="text"
                placeholder="Ketik tujuan (cth: Lembang Bandung / Pantai Carita / BSD...)"
                value={customDestText}
                onChange={(e) => setCustomDestText(e.target.value)}
                autoFocus
                className="w-full bg-white border border-rose-400 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 placeholder-zinc-400 focus:outline-none shadow-sm"
              />
            ) : (
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-blue-600 transition"
              >
                {POPULAR_DESTINATIONS.map((dest, i) => (
                  <option key={i} value={dest}>{dest}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Distance & Travel Time Badges */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-zinc-50 rounded-2xl p-2.5 border border-zinc-100 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="text-left">
              <span className="text-[9px] text-zinc-400 block font-medium">Estimasi Jarak</span>
              <span className="text-xs font-bold text-zinc-800">~{estimatedKm} KM</span>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-2.5 border border-zinc-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-left">
              <span className="text-[9px] text-zinc-400 block font-medium">Waktu Tempuh</span>
              <span className="text-xs font-bold text-zinc-800">{estimatedHours}</span>
            </div>
          </div>
        </div>

        {/* Layanan Switcher */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-bold text-zinc-700 block">
            Pilih Paket Layanan:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onServiceChange('lepas_kunci')}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                activeService === 'lepas_kunci'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="text-xs font-bold">Lepas Kunci</div>
              <div className="text-[9px] text-zinc-400 mt-0.5">24 Jam</div>
            </button>

            <button
              type="button"
              onClick={() => onServiceChange('dengan_sopir')}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                activeService === 'dengan_sopir'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="text-xs font-bold">Dengan Sopir</div>
              <div className="text-[9px] text-zinc-400 mt-0.5">Driver Standby</div>
            </button>

            <button
              type="button"
              onClick={() => onServiceChange('all_in')}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                activeService === 'all_in'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="text-xs font-bold">Paket All-In</div>
              <div className="text-[9px] text-zinc-400 mt-0.5">+BBM+Tol</div>
            </button>
          </div>
        </div>

        {/* Durasi Sewa */}
        <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl border border-zinc-200/80">
          <div>
            <span className="text-xs font-bold text-zinc-800 block">Durasi Pemakaian:</span>
            <span className="text-[10px] text-zinc-400">
              {isLuarKota ? 'Rekomendasi luar kota: 1-2 hari' : 'Hitungan per 24 jam'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 5].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDurationDays(d)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                  durationDays === d
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-zinc-200 text-zinc-700'
                }`}
              >
                {d}h
              </button>
            ))}
          </div>
        </div>

        {/* Calculation Result Breakdown Card (DENGAN HARGA CORET & DISKON) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-50 to-blue-50/50 border border-blue-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span>Rute & Durasi:</span>
            <span className="font-semibold text-zinc-900">
              {durationDays} Hari ({isLuarKota ? 'Luar Kota' : 'Dalam Kota'})
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span>Diskon Promo:</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
              Hemat Rp {totalDiscount.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-zinc-200">
            <div>
              <span className="text-xs font-bold text-zinc-800 block">Estimasi Biaya:</span>
              <span className="text-[10px] text-zinc-400">Mulai harga promo</span>
            </div>

            <div className="text-right">
              {/* HARGA CORET */}
              <span className="line-through text-xs text-zinc-400 font-semibold block">
                Rp {totalOriginal.toLocaleString('id-ID')}
              </span>
              {/* HARGA DISKON PROMO */}
              <span className="text-lg font-black text-blue-600">
                Rp {totalPromo.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: 1. See Fleet, 2. Chat WA */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleSelectArmadaForRoute}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
          >
            <Car className="w-4 h-4" />
            <span>Pilih Mobil untuk Rute Ini ({estimatedKm} KM)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={handleConsultWhatsApp}
            className="w-full py-2.5 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 active:scale-95 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
            <span>Konsultasi Rute Ini via WhatsApp CS</span>
          </button>
        </div>
      </div>

      {/* Trust & Guarantee Box */}
      <div className="p-4 bg-white rounded-3xl app-card-shadow border border-zinc-100 flex items-center justify-around text-center text-[10px] text-zinc-500">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span className="font-medium">Unit Resmi & Bersih</span>
        </div>
        <div className="w-[1px] h-6 bg-zinc-200"></div>
        <div className="flex flex-col items-center gap-1">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span className="font-medium">Standby 24 Jam</span>
        </div>
        <div className="w-[1px] h-6 bg-zinc-200"></div>
        <div className="flex flex-col items-center gap-1">
          <Navigation className="w-4 h-4 text-amber-500" />
          <span className="font-medium">Pool Utama Cinere</span>
        </div>
      </div>
    </div>
  );
};
