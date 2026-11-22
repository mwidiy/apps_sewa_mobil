import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  PhoneCall, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { COMPANY, getEmergencyWhatsAppUrl, getGeneralWhatsAppUrl } from '../../data/company';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface ContactViewProps {
  onBack: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="relative flex items-center justify-center pt-1 mb-2">
        <button
          onClick={onBack}
          className="absolute left-0 w-9 h-9 rounded-full bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center text-zinc-700 active:scale-95 transition"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <h1 className="text-sm font-bold text-zinc-900 tracking-tight">Kontak & Lokasi Pool</h1>
      </div>

      {/* Pool Location Card */}
      <div className="bg-white rounded-3xl p-5 app-card-shadow border border-zinc-100 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
              Pool & Hub Utama
            </span>
            <h2 className="text-base font-black text-zinc-900">DCS Rent Car Cinere</h2>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed">
          {COMPANY.address.fullAddress}
        </p>

        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <Clock className="w-4 h-4 text-emerald-500" />
          <span>Melayani Ambil di Tempat 24 Jam</span>
        </div>

        <a
          href={COMPANY.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition"
        >
          <Navigation className="w-4 h-4" />
          <span>Buka di Google Maps</span>
        </a>
      </div>

      {/* Direct Contact Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-3xl border border-zinc-100 app-card-shadow flex flex-col justify-between active:scale-95 transition"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-900">Chat WhatsApp</h3>
            <p className="text-[10px] text-zinc-400 mt-0.5">Respon cepat 24 jam</p>
            <span className="text-xs font-extrabold text-emerald-600 mt-1 block">
              {COMPANY.whatsappDisplay}
            </span>
          </div>
        </a>

        <a
          href={`tel:${COMPANY.phone}`}
          className="bg-white p-4 rounded-3xl border border-zinc-100 app-card-shadow flex flex-col justify-between active:scale-95 transition"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-900">Telepon CS</h3>
            <p className="text-[10px] text-zinc-400 mt-0.5">Panggilan langsung</p>
            <span className="text-xs font-extrabold text-blue-600 mt-1 block">
              {COMPANY.phone}
            </span>
          </div>
        </a>
      </div>

      {/* Emergency Hotline for Active Renters */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-rose-700">
          <AlertCircle className="w-4 h-4" />
          <h3 className="text-xs font-bold">Bantuan Darurat Penyewa (Roadside)</h3>
        </div>
        <p className="text-[11px] text-rose-600 leading-relaxed">
          Mengalami kendala ban atau mesin di jalan saat masa sewa? Tim teknis kami standby 24 jam.
        </p>
        <a
          href={getEmergencyWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
        >
          <span>Hubungi Bantuan Darurat</span>
        </a>
      </div>
    </div>
  );
};
