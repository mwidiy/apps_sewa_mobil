import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

interface IntroModalProps {
  onSaveName: (name: string) => void;
  onSkip: () => void;
  currentName?: string;
}

export const IntroModal: React.FC<IntroModalProps> = ({
  onSaveName,
  onSkip,
  currentName = '',
}) => {
  const [inputName, setInputName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      onSaveName(inputName.trim());
    } else {
      onSkip();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div 
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-zinc-100 text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Logo & Glow */}
        <div className="relative inline-block mx-auto pt-2">
          <div className="w-20 h-20 rounded-3xl overflow-hidden mx-auto shadow-xl ring-4 ring-blue-500/20 bg-white p-0.5">
            <img
              src="/logo.jpeg"
              alt="Sewa Mobil DCS"
              className="w-full h-full object-cover rounded-[22px]"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            Official Rental App
          </span>
          <h1 className="text-xl font-black text-zinc-900 tracking-tight pt-1">
            Sewa Mobil DCS
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-[260px] mx-auto">
            Sewa mobil harian Jabodetabek lepas kunci, dengan sopir, & paket all-in terpercaya.
          </p>
        </div>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="text-left space-y-1">
            <label className="text-[11px] font-bold text-zinc-700 block px-1">
              Siapa nama Anda?
            </label>
            <div className="bg-zinc-50 rounded-2xl px-3.5 py-3 border border-zinc-200 focus-within:border-blue-600 focus-within:bg-white transition flex items-center gap-2">
              <input
                type="text"
                placeholder="Ketik nama Anda (cth: Budi / Siti)"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                autoFocus
                className="w-full text-xs text-zinc-900 placeholder-zinc-400 bg-transparent focus:outline-none font-medium"
              />
            </div>
            <p className="text-[10px] text-zinc-400 px-1">
              Nama ini akan otomatis terisi saat Anda konsultasi atau booking ke WhatsApp.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
          >
            <span>Mulai Hitung Rute & Sewa</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="w-full py-2 text-xs text-zinc-400 hover:text-zinc-600 font-medium transition"
          >
            Lewati untuk sekarang
          </button>
        </form>

        {/* Trust Badge */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Tanpa Login Akun • Langsung Bisa Hitung Rute</span>
        </div>
      </div>
    </div>
  );
};
