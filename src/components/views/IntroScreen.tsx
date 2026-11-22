import React, { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';

interface IntroScreenProps {
  onSaveName: (name: string) => void;
  onSkip: () => void;
  currentName?: string;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
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
    <div className="fixed inset-0 z-50 bg-[#f1f3f7] flex justify-center animate-in fade-in duration-300">
      <div className="w-full max-w-md h-[100dvh] bg-white flex flex-col justify-between p-6 relative overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="pt-3 flex items-center justify-end relative z-10">
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 px-3.5 py-1.5 rounded-full bg-zinc-100/80 transition active:scale-95"
          >
            Lewati
          </button>
        </div>

        {/* Main Center Content */}
        <div className="space-y-6 my-auto py-4 relative z-10 text-center">
          {/* Animated Logo Showcase with Ambient Glow */}
          <div className="relative inline-block mx-auto">
            {/* Pulsing ambient halo behind logo */}
            <div className="absolute -inset-3 rounded-full bg-blue-500/20 blur-xl animate-pulse-halo pointer-events-none"></div>

            {/* Gentle floating logo card */}
            <div className="relative z-10 w-24 h-24 rounded-3xl overflow-hidden mx-auto shadow-2xl ring-4 ring-blue-500/20 bg-white p-1 animate-float-logo">
              <img
                src="/logo.jpeg"
                alt="Rental Mobil"
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black tracking-wider uppercase border border-blue-200/80">
              Rental Mobil Jabodetabek
            </span>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-tight">
              Sewa Mobil Harian
            </h1>
          </div>

          {/* Form Input Card */}
          <form onSubmit={handleSubmit} className="pt-2 text-left space-y-2 max-w-sm mx-auto">
            <label className="text-xs font-bold text-zinc-700 block px-1">
              Siapa nama panggilan Anda?
            </label>
            <div className="bg-zinc-50 rounded-2xl px-4 py-3.5 border-2 border-zinc-200/90 focus-within:border-blue-600 focus-within:bg-white transition flex items-center gap-3 shadow-inner">
              <User className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Ketik nama Anda (cth: Budi / Siti)"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                autoFocus
                className="w-full text-sm font-semibold text-zinc-900 placeholder-zinc-400 bg-transparent focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-zinc-400 px-1 leading-normal">
              Nama ini akan otomatis terisi saat Anda kalkulasi rute dan booking langsung ke WhatsApp CS.
            </p>
          </form>
        </div>

        {/* Bottom Action Section */}
        <div className="pb-6 relative z-10 max-w-sm mx-auto w-full">
          <button
            onClick={handleSubmit}
            className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/35 transition"
          >
            <span>Mulai Jelajah & Hitung Rute</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
