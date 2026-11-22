import React, { useEffect } from 'react';
import { CheckCircle2, MessageSquare, Copy, Check, X, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY } from '../data/company';
import type { BookingPayload } from '../data/company';

interface BookingSuccessModalProps {
  booking: BookingPayload | null;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [booking]);

  if (!booking) return null;

  const serviceLabelMap = {
    lepas_kunci: "Lepas Kunci (Self-Drive)",
    dengan_sopir: "Dengan Sopir",
    all_in: "Paket All-In (Sopir+BBM+Tol)",
  };

  const whatsappMessage = `*FORM ORDER SEWA MOBIL - DCS RENT CAR*
🚗 Unit: ${booking.carName}
📋 Paket: ${serviceLabelMap[booking.serviceType]}
📅 Tanggal: ${booking.startDate || "Menyesuaikan"} (${booking.durationDays} Hari)
⏰ Jam: ${booking.startTime || "09:00 WIB"}
📍 Titik: ${booking.needDelivery ? `Antar ke ${booking.pickupLocation}` : "Ambil di Pool Cinere"}
${booking.customLocationDetail ? `📝 Detail: ${booking.customLocationDetail}\n` : ""}💰 Estimasi: Rp ${booking.estimatedPrice.toLocaleString('id-ID')}

Halo Admin DCS, saya mau order rental via Aplikasi Mobile. Apakah unit dan jadwal ini ready? Terima kasih!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-2xl text-zinc-900 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center pt-2">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-3 shadow-md shadow-emerald-500/10">
            <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h2 className="text-base font-black text-zinc-900">Draft Booking Siap!</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Data pesanan Anda telah tersusun rapi. Lanjutkan chat ke WhatsApp CS untuk konfirmasi unit.
          </p>
        </div>

        {/* Summary Card */}
        <div className="my-4 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
            <span className="text-zinc-500">Unit Mobil</span>
            <span className="font-bold text-zinc-900 text-right">{booking.carName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Layanan</span>
            <span className="font-semibold text-blue-600">{serviceLabelMap[booking.serviceType]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Durasi</span>
            <span className="font-semibold text-zinc-800">{booking.durationDays} Hari</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Pengambilan</span>
            <span className="font-semibold text-zinc-700 truncate max-w-[150px]">
              {booking.needDelivery ? `Antar (${booking.pickupLocation})` : "Pool Cinere"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-zinc-200">
            <span className="font-bold text-zinc-700">Total Estimasi</span>
            <span className="font-black text-sm text-blue-600">
              Rp {booking.estimatedPrice.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Kirim Pesan ke WhatsApp CS</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
            <span>{copied ? "Format Pesan Berhasil Disalin!" : "Salin Teks Pesan"}</span>
          </button>
        </div>

        {/* Trust info */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Resmi DCS Rent Car • Tanpa Biaya Tersembunyi</span>
        </div>
      </div>
    </div>
  );
};
