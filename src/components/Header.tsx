import React from 'react';
import { MapPin, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY } from '../data/company';

interface HeaderProps {
  onOpenLocationSelect?: () => void;
  selectedLocationName?: string;
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLocationName = "Jabodetabek",
  onOpenLocationSelect,
  onOpenContact,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 pt-3 pb-2 text-white shadow-md">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src="/logo.jpeg"
              alt="DCS Rent Car"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-sky-500/40 shadow-sm"
              onError={(e) => {
                // fallback if image not loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" title="Armada Standby"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">DCS RENT CAR</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                PROMO
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Unit Terawat & Resmi 24 Jam</span>
            </div>
          </div>
        </div>

        {/* Location Pill & Call CTA */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenLocationSelect}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700/80 active:scale-95 transition text-[11px] font-medium text-slate-200 border border-slate-700"
          >
            <MapPin className="w-3 h-3 text-sky-400 animate-pulse" />
            <span className="max-w-[70px] truncate">{selectedLocationName}</span>
          </button>

          <a
            href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Halo Admin DCS, saya ingin tanya ketersediaan armada mobil.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 active:scale-95 transition"
            title="Chat CS WhatsApp"
          >
            <PhoneCall className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
