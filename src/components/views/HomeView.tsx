import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ArrowRight, 
  Clock, 
  Route, 
  Fuel, 
  ShieldCheck, 
  MessageSquare, 
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Car
} from 'lucide-react';
import { POPULAR_ROUTES, POPULAR_ORIGINS, POPULAR_DESTINATIONS } from '../../data/routes';
import type { RoutePreset } from '../../data/routes';
import { COMPANY } from '../../data/company';
import type { RentalServiceType } from '../../data/company';

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
  const [customOrigin, setCustomOrigin] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [durationDays, setDurationDays] = useState(1);

  // Match preset or calculate dynamic estimate
  const currentOrigin = customOrigin.trim() || origin;
  const currentDestination = customDestination.trim() || destination;

  // Find if current selection matches a known preset
  const matchedPreset = POPULAR_ROUTES.find(
    (r) => destination.toLowerCase().includes(r.id.split('-')[0])
  ) || POPULAR_ROUTES[0];

  const estimatedKm = destination.includes('Bandung') ? 155
    : destination.includes('Puncak') ? 85
    : destination.includes('Anyer') ? 135
    : destination.includes('Cirebon') ? 220
    : destination.includes('Bandara') ? 42
    : 45;

  const estimatedHours = destination.includes('Bandung') ? '2.5 - 3.5 Jam'
    : destination.includes('Puncak') ? '1.5 - 2.5 Jam'
    : destination.includes('Anyer') ? '2.5 - 3 Jam'
    : destination.includes('Cirebon') ? '3.5 - 4.5 Jam'
    : destination.includes('Bandara') ? '45 - 60 Menit'
    : '1 - 2 Jam';

  const isLuarKota = estimatedKm > 60;

  // Base rental estimate (starting price of popular family car Avanza/Calya)
  const baseDailyPrice = activeService === 'lepas_kunci' ? 300000
    : activeService === 'dengan_sopir' ? 450000
    : 700000;

  // Estimated toll & fuel based on route
  const tollFuelEstimate = activeService === 'all_in'
    ? 0 // Already included in All-In
    : isLuarKota ? (estimatedKm * 1800) : 100000;

  const totalEstimate = (baseDailyPrice * durationDays) + (activeService === 'all_in' ? 0 : 0);

  const handleConsultWhatsApp = () => {
    const serviceName = activeService === 'lepas_kunci' ? 'Lepas Kunci (Self-Drive)'
      : activeService === 'dengan_sopir' ? 'Dengan Sopir'
      : 'Paket All-In (Sopir+BBM+Tol)';

    const text = `Halo Admin DCS Rent Car,
Saya *${userName || 'Pelanggan'}* ingin tanya estimasi sewa mobil untuk rute berikut:

📍 *Titik Jemput (Dari)*: ${currentOrigin}
🏁 *Tujuan (Mau Ke)*: ${currentDestination}
⏳ *Durasi*: ${durationDays} Hari
📋 *Layanan*: ${serviceName}
🛣️ *Estimasi Jarak*: ~${estimatedKm} KM (${estimatedHours})

Mohon info rekomendasi armada yang cocok dan rincian harganya ya admin. Terima kasih!`;

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
          className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold shadow-sm active:scale-95 transition flex items-center gap-1"
        >
          <Car className="w-3.5 h-3.5" />
          <span>Armada</span>
        </button>
      </div>

      {/* Promo Banner Card (Compact Luxury Indigo) */}
      <div 
        onClick={handleSelectArmadaForRoute}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b0f19] via-[#111827] to-[#1e1b4b] p-4 text-white shadow-lg cursor-pointer active:scale-[0.99] transition group"
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="w-2/3 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
              Promo Jabodetabek & Luar Kota
            </span>
            <h2 className="text-sm font-extrabold text-white leading-snug">
              Hitung Biaya Rute <br />
              <span className="text-blue-400">Dapatkan Diskon s/d 20%</span>
            </h2>
          </div>
          <div className="w-1/3 flex justify-end">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
        </div>
      </div>

      {/* CORE FEATURE: Trip & Route Calculator (Dari Mana & Mau Ke Mana) */}
      <div className="bg-white rounded-3xl p-5 app-card-shadow border border-zinc-100 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Route className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-zinc-900">Kalkulator Rute & Biaya</h2>
              <p className="text-[10px] text-zinc-400">Simulasi perjalanan dari mana ke mana</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Realtime
          </span>
        </div>

        {/* Visual Map Route Stepper Card */}
        <div className="relative bg-zinc-50 rounded-2xl p-3.5 border border-zinc-200/70 space-y-3">
          {/* Origin: Dari Mana */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
              <div className="w-0.5 h-10 bg-dashed border-l border-zinc-300 my-1"></div>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                Dari Mana (Titik Jemput):
              </label>
              <select
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value);
                  setCustomOrigin('');
                }}
                className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-blue-600 transition"
              >
                {POPULAR_ORIGINS.map((orig, i) => (
                  <option key={i} value={orig}>{orig}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Destination: Mau Ke Mana */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-100"></div>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                Mau Ke Mana (Tujuan):
              </label>
              <select
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setCustomDestination('');
                }}
                className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-blue-600 transition"
              >
                {POPULAR_DESTINATIONS.map((dest, i) => (
                  <option key={i} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Route Stats Summary (Distance & Time in visual badges) */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-zinc-50 rounded-2xl p-2.5 border border-zinc-100 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="text-left">
              <span className="text-[9px] text-zinc-400 block">Estimasi Jarak</span>
              <span className="text-xs font-bold text-zinc-800">~{estimatedKm} KM</span>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-2.5 border border-zinc-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-left">
              <span className="text-[9px] text-zinc-400 block">Waktu Tempuh</span>
              <span className="text-xs font-bold text-zinc-800">{estimatedHours}</span>
            </div>
          </div>
        </div>

        {/* Service Type Switcher */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-bold text-zinc-700 block">
            Pilih Paket Layanan:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => onServiceChange('lepas_kunci')}
              className={`p-2 rounded-xl text-xs font-semibold border transition text-center ${
                activeService === 'lepas_kunci'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="text-xs">Lepas Kunci</div>
              <div className="text-[9px] text-zinc-400 mt-0.5">24 Jam</div>
            </button>

            <button
              onClick={() => onServiceChange('dengan_sopir')}
              className={`p-2 rounded-xl text-xs font-semibold border transition text-center ${
                activeService === 'dengan_sopir'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="text-xs">Dengan Sopir</div>
              <div className="text-[9px] text-zinc-400 mt-0.5">Driver Standby</div>
            </button>

            <button
              onClick={() => onServiceChange('all_in')}
              className={`p-2 rounded-xl text-xs font-semibold border transition text-center ${
                activeService === 'all_in'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-sm'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="text-xs">Paket All-In</div>
              <div className="text-[9px] text-zinc-400 mt-0.5">+BBM+Tol</div>
            </button>
          </div>
        </div>

        {/* Duration Days */}
        <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl border border-zinc-200/80">
          <div>
            <span className="text-xs font-bold text-zinc-800 block">Durasi Pemakaian:</span>
            <span className="text-[10px] text-zinc-400">
              {isLuarKota ? 'Rekomendasi luar kota: 1-2 hari' : 'Hitungan harian per 24 jam'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((d) => (
              <button
                key={d}
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

        {/* Calculation Result Breakdown Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-50 to-blue-50/40 border border-blue-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span>Sewa Harian ({durationDays} Hari):</span>
            <span className="font-semibold text-zinc-900">
              Mulai Rp {(baseDailyPrice * durationDays).toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span>Zonasi Perjalanan:</span>
            <span className="font-semibold text-blue-600">
              {isLuarKota ? 'Trip Luar Kota' : 'Area Jabodetabek'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
            <div>
              <span className="text-xs font-bold text-zinc-800 block">Estimasi Tarif:</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Tersedia Banyak Pilihan Mobil</span>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-blue-600">
                Rp {totalEstimate.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-zinc-400 font-normal block">/estimasi paket</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: 1. See Fleet for this Route, 2. Chat CS WA */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleSelectArmadaForRoute}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
          >
            <Car className="w-4 h-4" />
            <span>Pilih Mobil untuk Rute Ini ({estimatedKm} KM)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            onClick={handleConsultWhatsApp}
            className="w-full py-2.5 px-3 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 active:scale-95 font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Konsultasi Rute Ini via WhatsApp CS</span>
          </button>
        </div>
      </div>

      {/* Trust & Guarantees */}
      <div className="p-4 bg-white rounded-3xl app-card-shadow border border-zinc-100 flex items-center justify-around text-center text-[10px] text-zinc-500">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span className="font-medium">Unit Resmi & Bersih</span>
        </div>
        <div className="w-[1px] h-6 bg-zinc-200"></div>
        <div className="flex flex-col items-center gap-1">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span className="font-medium">Standby Antar 24 Jam</span>
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
