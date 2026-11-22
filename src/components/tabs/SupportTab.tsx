import React from 'react';
import { 
  HeadphonesIcon, 
  MapPin, 
  PhoneCall, 
  MessageSquare, 
  AlertOctagon, 
  Clock, 
  Navigation, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { COMPANY, getEmergencyWhatsAppUrl, getGeneralWhatsAppUrl } from '../../data/company';

export const SupportTab: React.FC = () => {
  return (
    <div className="pb-24 pt-2 space-y-4 px-3.5 max-w-md mx-auto text-white">
      {/* Top Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[11px] font-bold border border-sky-500/30 mb-1">
          <HeadphonesIcon className="w-3.5 h-3.5" />
          <span>Customer Care 24 Jam</span>
        </div>
        <h1 className="text-lg font-extrabold text-white">Bantuan & Lokasi Pool</h1>
        <p className="text-xs text-slate-400">Hubungi kami atau kunjungi pool fisik kami langsung di Cinere</p>
      </div>

      {/* Pool Location Card (For On-site Visit / Ambil di Tempat) */}
      <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              Pool & Kantor Pusat
            </span>
            <h2 className="text-sm font-bold text-white mt-1">DCS Rent Car Cinere</h2>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 text-sky-400 border border-slate-800">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {COMPANY.address.fullAddress}
        </p>

        <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Buka 24 Jam Setiap Hari (Melayani Pengambilan di Tempat)</span>
        </div>

        {/* Google Maps Button */}
        <a
          href={COMPANY.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition"
        >
          <Navigation className="w-4 h-4" />
          <span>Buka Rute di Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Contact Channels */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* WhatsApp CS */}
        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-3xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/60 active:scale-95 transition flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
            <MessageSquare className="w-5 h-5 fill-emerald-400/20" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Chat WhatsApp</h3>
            <p className="text-[10px] text-slate-400">Respon cepat 24 jam</p>
            <span className="text-xs font-semibold text-emerald-400 mt-1 block">
              {COMPANY.whatsappDisplay}
            </span>
          </div>
        </a>

        {/* Telepon Langsung */}
        <a
          href={`tel:${COMPANY.phone}`}
          className="p-3.5 rounded-3xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/60 active:scale-95 transition flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Telepon CS</h3>
            <p className="text-[10px] text-slate-400">Panggilan darurat</p>
            <span className="text-xs font-semibold text-sky-400 mt-1 block">
              {COMPANY.phone}
            </span>
          </div>
        </a>
      </div>

      {/* Emergency Roadside Assistance (Killer Retention Feature) */}
      <div className="p-4 rounded-3xl bg-rose-950/40 border border-rose-500/30 space-y-2.5 shadow-lg">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertOctagon className="w-5 h-5" />
          <h2 className="text-xs font-black uppercase tracking-wider">
            Bantuan Darurat Penyewa (Roadside Support)
          </h2>
        </div>

        <p className="text-[11px] text-rose-200/80 leading-relaxed">
          Sedang dalam masa sewa dan mengalami kendala mesin, ban kempes, atau insiden di jalan? Tim teknis kami standby 24 jam untuk meluncur.
        </p>

        <a
          href={getEmergencyWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
        >
          <span>🚨 Hubungi Bantuan Darurat 24 Jam</span>
        </a>
      </div>

      {/* Guarantee & Trust Badges */}
      <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-around text-center text-[10px] text-slate-400">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Resmi & Berizin</span>
        </div>
        <div className="w-[1px] h-6 bg-slate-700"></div>
        <div className="flex flex-col items-center gap-1">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Standby 24/7</span>
        </div>
        <div className="w-[1px] h-6 bg-slate-700"></div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-amber-400 font-bold text-xs">★ 4.9</span>
          <span>500+ Pelanggan</span>
        </div>
      </div>
    </div>
  );
};
