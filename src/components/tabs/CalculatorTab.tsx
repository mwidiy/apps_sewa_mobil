import React, { useState, useId } from 'react';
import { 
  Calculator, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Minus, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle,
  Car as CarIcon,
  CheckCircle2
} from 'lucide-react';
import { MOBILE_CARS, getCarPrice } from '../../data/cars';
import type { MobileCarItem } from '../../data/cars';
import { 
  COMPANY, 
  generateWhatsAppBookingUrl 
} from '../../data/company';
import type { 
  BookingPayload, 
  RentalServiceType 
} from '../../data/company';
import { JABODETABEK_AREAS } from '../../data/locations';
import type { LocationArea } from '../../data/locations';

interface CalculatorTabProps {
  initialCarId?: string;
  initialService?: RentalServiceType;
  onBookingCreated: (booking: BookingPayload) => void;
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  initialCarId,
  initialService = 'lepas_kunci',
  onBookingCreated,
}) => {
  const [selectedCarId, setSelectedCarId] = useState<string>(initialCarId || MOBILE_CARS[3].id); // default Avanza
  const [serviceType, setServiceType] = useState<RentalServiceType>(initialService);
  const [durationDays, setDurationDays] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState<string>('09:00');
  const [deliveryOption, setDeliveryOption] = useState<'pool' | 'delivery'>('delivery');
  const [selectedLocationId, setSelectedLocationId] = useState<string>(JABODETABEK_AREAS[1].id); // Jaksel default
  const [addressDetail, setAddressDetail] = useState<string>('');

  const selectedCar = MOBILE_CARS.find((c) => c.id === selectedCarId) || MOBILE_CARS[0];
  const selectedArea = JABODETABEK_AREAS.find((a) => a.id === selectedLocationId) || JABODETABEK_AREAS[0];

  // Pricing calculation
  const carPricing = getCarPrice(selectedCar, serviceType);
  const basePricePerDay = durationDays >= 7 && selectedCar.pricing.weeklyPerDay && serviceType === 'lepas_kunci'
    ? selectedCar.pricing.weeklyPerDay
    : carPricing.promoPrice;

  const totalCarRent = basePricePerDay * durationDays;
  const deliveryFee = deliveryOption === 'delivery' ? selectedArea.deliveryFee : 0;
  const estimatedTotal = totalCarRent + deliveryFee;

  const handleBookingSubmit = () => {
    const payload: BookingPayload = {
      carName: selectedCar.name,
      serviceType: serviceType,
      durationDays: durationDays,
      startDate: startDate,
      startTime: startTime,
      pickupLocation: deliveryOption === 'delivery' ? selectedArea.name : 'Pool Cinere Depok',
      customLocationDetail: addressDetail,
      needDelivery: deliveryOption === 'delivery',
      estimatedPrice: estimatedTotal,
    };

    onBookingCreated(payload);
  };

  return (
    <div className="pb-28 pt-2 space-y-4 px-3.5 max-w-md mx-auto text-white">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[11px] font-bold border border-sky-500/30 mb-1">
          <Calculator className="w-3.5 h-3.5" />
          <span>Cost Estimator & Booking</span>
        </div>
        <h1 className="text-lg font-extrabold text-white">Hitung Biaya & Pesan</h1>
        <p className="text-xs text-slate-400">Simulasikan durasi sewa & langsung amankan unit ke WhatsApp</p>
      </div>

      {/* Step 1: Select Car */}
      <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
        <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
          <span>1. Pilih Unit Mobil:</span>
          <span className="text-[10px] text-sky-400 font-semibold">{selectedCar.specs.capacity} Penumpang</span>
        </label>

        {/* Horizontal Car Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {MOBILE_CARS.map((car) => {
            const isSelected = car.id === selectedCarId;
            return (
              <button
                key={car.id}
                onClick={() => setSelectedCarId(car.id)}
                className={`flex-shrink-0 p-2.5 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <img src={car.photoUrl} alt={car.name} className="w-12 h-8 object-contain" />
                <div>
                  <div className="text-xs font-bold line-clamp-1">{car.name}</div>
                  <div className="text-[10px] text-slate-400">Rp {car.pricing.lepasKunciPerDay / 1000}rb/hr</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Car Highlight Display */}
        <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-sky-400 font-bold">
              {selectedCar.brand}
            </span>
            <span className="text-xs font-bold text-white">{selectedCar.name}</span>
          </div>
          <span className="text-xs font-bold text-emerald-400">
            {selectedCar.specs.transmission}
          </span>
        </div>
      </div>

      {/* Step 2: Select Service Type */}
      <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
        <label className="text-xs font-bold text-slate-300 block">
          2. Pilih Layanan Sewa:
        </label>

        <div className="grid grid-cols-3 gap-2">
          {/* Lepas Kunci */}
          <button
            onClick={() => setServiceType('lepas_kunci')}
            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center ${
              serviceType === 'lepas_kunci'
                ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20 font-bold'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-lg mb-1">🔑</span>
            <span className="text-xs">Lepas Kunci</span>
            <span className={`text-[9px] mt-0.5 ${serviceType === 'lepas_kunci' ? 'text-sky-100' : 'text-slate-500'}`}>
              Bebas 24 Jam
            </span>
          </button>

          {/* Dengan Sopir */}
          <button
            onClick={() => setServiceType('dengan_sopir')}
            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center ${
              serviceType === 'dengan_sopir'
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-lg mb-1">👨‍✈️</span>
            <span className="text-xs">Pakai Sopir</span>
            <span className={`text-[9px] mt-0.5 ${serviceType === 'dengan_sopir' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Driver Standby
            </span>
          </button>

          {/* All-In */}
          <button
            onClick={() => setServiceType('all_in')}
            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center ${
              serviceType === 'all_in'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-black'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-lg mb-1">✨</span>
            <span className="text-xs">Paket All-In</span>
            <span className={`text-[9px] mt-0.5 ${serviceType === 'all_in' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
              +BBM+Tol
            </span>
          </button>
        </div>
      </div>

      {/* Step 3: Duration & Dates */}
      <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
        <label className="text-xs font-bold text-slate-300 block">
          3. Durasi & Tanggal Pemakaian:
        </label>

        {/* Duration Stepper */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div>
            <span className="text-xs font-semibold text-white block">Durasi Sewa:</span>
            <span className="text-[10px] text-slate-400">
              {durationDays >= 7 ? '🎉 Diskon Mingguan Aktif!' : 'Hitungan per 24 Jam'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold active:scale-95 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-base font-black text-sky-400 min-w-[30px] text-center">
              {durationDays} <span className="text-xs font-normal text-slate-300">Hari</span>
            </span>
            <button
              onClick={() => setDurationDays(durationDays + 1)}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold active:scale-95 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Date and Time Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">
              Tanggal Mulai:
            </label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">
              Jam Ambil / Jemput:
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="07:00">07:00 WIB (Pagi)</option>
              <option value="08:00">08:00 WIB (Pagi)</option>
              <option value="09:00">09:00 WIB (Pagi)</option>
              <option value="10:00">10:00 WIB (Pagi)</option>
              <option value="12:00">12:00 WIB (Siang)</option>
              <option value="14:00">14:00 WIB (Siang)</option>
              <option value="16:00">16:00 WIB (Sore)</option>
              <option value="19:00">19:00 WIB (Malam)</option>
              <option value="21:00">21:00 WIB (Malam)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 4: Pickup & Delivery Location */}
      <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
        <label className="text-xs font-bold text-slate-300 block">
          4. Metode Pengambilan Unit:
        </label>

        {/* Pickup Switch */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setDeliveryOption('delivery')}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              deliveryOption === 'delivery'
                ? 'bg-sky-500 text-white border-sky-400 shadow-md'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Antar ke Lokasi</span>
          </button>

          <button
            onClick={() => setDeliveryOption('pool')}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              deliveryOption === 'pool'
                ? 'bg-sky-500 text-white border-sky-400 shadow-md'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            <span>Ambil di Pool</span>
            <span className="text-[9px] bg-emerald-500/30 text-emerald-300 px-1 py-0.2 rounded">Gratis</span>
          </button>
        </div>

        {deliveryOption === 'delivery' ? (
          <div className="space-y-2 pt-1">
            <label className="text-[10px] font-semibold text-slate-400 block">
              Pilih Wilayah Jabodetabek:
            </label>
            <select
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              {JABODETABEK_AREAS.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name} (Ongkir: {area.deliveryFee === 0 ? 'Gratis' : `Rp ${area.deliveryFee.toLocaleString('id-ID')}`})
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Detail alamat (cth: Apartemen Kemang Village / Jl. Raya No. 4)"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-white block mb-0.5">Alamat Pool Cinere:</span>
            {COMPANY.address.fullAddress}
          </div>
        )}
      </div>

      {/* Price Summary Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-sky-500/30 shadow-xl space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-700">
          <span>Sewa {selectedCar.name} ({durationDays} Hari)</span>
          <span className="text-white font-semibold">
            Rp {(basePricePerDay * durationDays).toLocaleString('id-ID')}
          </span>
        </div>

        {deliveryOption === 'delivery' && (
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Biaya Antar-Jemput ({selectedArea.name})</span>
            <span className="text-white font-semibold">
              {deliveryFee === 0 ? 'Gratis' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-700">
          <div>
            <span className="text-xs font-bold text-slate-300 block">Total Estimasi:</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Sudah Termasuk Diskon Promo
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-amber-300">
              Rp {estimatedTotal.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* WhatsApp Booking Button */}
        <button
          onClick={handleBookingSubmit}
          className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>Kirim Booking via WhatsApp</span>
        </button>

        <p className="text-[10px] text-center text-slate-400">
          Format order langsung terisi otomatis. Anda dapat diskusi syarat & negosiasi di WhatsApp.
        </p>
      </div>
    </div>
  );
};
