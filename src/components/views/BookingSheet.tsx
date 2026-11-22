import React, { useState } from 'react';
import { X, Plus, Minus, MapPin, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getCarPrice } from '../../data/cars';
import type { MobileCarItem } from '../../data/cars';
import { COMPANY } from '../../data/company';
import type { BookingPayload, RentalServiceType } from '../../data/company';
import { JABODETABEK_AREAS } from '../../data/locations';

interface BookingSheetProps {
  car: MobileCarItem | null;
  initialService: RentalServiceType;
  userName?: string;
  routeInfo?: string;
  onClose: () => void;
  onCompleteBooking: (booking: BookingPayload) => void;
}

export const BookingSheet: React.FC<BookingSheetProps> = ({
  car,
  initialService,
  userName,
  routeInfo,
  onClose,
  onCompleteBooking,
}) => {
  if (!car) return null;

  const [service, setService] = useState<RentalServiceType>(initialService);
  const [days, setDays] = useState(1);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pool'>('delivery');
  const [areaId, setAreaId] = useState(JABODETABEK_AREAS[1].id); // Jaksel
  const [addressDetail, setAddressDetail] = useState('');

  const pricing = getCarPrice(car, service);
  const selectedArea = JABODETABEK_AREAS.find((a) => a.id === areaId) || JABODETABEK_AREAS[0];
  const deliveryFee = deliveryMethod === 'delivery' ? selectedArea.deliveryFee : 0;
  const totalPrice = (pricing.promoPrice * days) + deliveryFee;

  const handleSubmit = () => {
    const payload: BookingPayload = {
      customerName: userName,
      carName: car.name,
      serviceType: service,
      durationDays: days,
      startDate: date,
      startTime: '09:00 WIB',
      pickupLocation: deliveryMethod === 'delivery' ? selectedArea.name : 'Pool Cinere Depok',
      customLocationDetail: addressDetail,
      routeInfo: routeInfo,
      needDelivery: deliveryMethod === 'delivery',
      estimatedPrice: totalPrice,
    };

    onCompleteBooking(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md max-h-[90vh] bg-white rounded-t-3xl overflow-y-auto no-scrollbar shadow-2xl p-5 space-y-4 text-zinc-900 border-t border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
              Form Booking
            </span>
            <h2 className="text-base font-black text-zinc-900">{car.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Layanan Switch */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700">Pilih Layanan:</label>
          <div className="grid grid-cols-3 gap-2">
            {(['lepas_kunci', 'dengan_sopir', 'all_in'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setService(s)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold border transition ${
                  service === s
                    ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                }`}
              >
                {s === 'lepas_kunci' ? 'Lepas Kunci' : s === 'dengan_sopir' ? 'Pakai Sopir' : 'All-In'}
              </button>
            ))}
          </div>
        </div>

        {/* Duration & Date */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200/80">
            <span className="text-[10px] text-zinc-400 font-semibold block mb-1">Durasi Sewa:</span>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setDays(Math.max(1, days - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center active:scale-95"
              >
                <Minus className="w-3 h-3 text-zinc-700" />
              </button>
              <span className="text-sm font-black text-zinc-900">{days} Hari</span>
              <button
                onClick={() => setDays(days + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center active:scale-95"
              >
                <Plus className="w-3 h-3 text-zinc-700" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200/80">
            <span className="text-[10px] text-zinc-400 font-semibold block mb-1">Tanggal Mulai:</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs text-zinc-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Delivery / Pool Method */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-700">Metode Pengambilan:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDeliveryMethod('delivery')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                deliveryMethod === 'delivery'
                  ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600'
              }`}
            >
              Antar ke Lokasi
            </button>
            <button
              onClick={() => setDeliveryMethod('pool')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                deliveryMethod === 'pool'
                  ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600'
              }`}
            >
              Ambil di Pool (Gratis)
            </button>
          </div>

          {deliveryMethod === 'delivery' && (
            <div className="space-y-2 pt-1">
              <select
                value={areaId}
                onChange={(e) => setAreaId(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none"
              >
                {JABODETABEK_AREAS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.deliveryFee === 0 ? 'Gratis Ongkir' : `+Rp ${a.deliveryFee.toLocaleString('id-ID')}`})
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Alamat detail (cth: Kemang Village / Rumah No. 12)"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Total Price Summary & WhatsApp Launch */}
        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Estimasi Total ({days} Hari):</span>
            <span className="text-base font-black text-blue-600">
              Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Kirim Pesan Booking ke WhatsApp CS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
