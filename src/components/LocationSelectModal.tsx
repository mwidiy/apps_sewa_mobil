import React from 'react';
import { X, MapPin, Clock, Check, Sparkles } from 'lucide-react';
import { JABODETABEK_AREAS } from '../data/locations';
import type { LocationArea } from '../data/locations';

interface LocationSelectModalProps {
  selectedAreaId: string;
  onSelectArea: (area: LocationArea) => void;
  onClose: () => void;
}

export const LocationSelectModal: React.FC<LocationSelectModalProps> = ({
  selectedAreaId,
  onSelectArea,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md max-h-[85vh] bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-y-auto no-scrollbar flex flex-col shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-400" />
              Pilih Area Antar-Jemput
            </h2>
            <p className="text-[11px] text-slate-400">Jangkauan layanan sewa mobil se-Jabodetabek</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of areas */}
        <div className="p-4 space-y-2">
          {JABODETABEK_AREAS.map((area) => {
            const isSelected = area.id === selectedAreaId;

            return (
              <div
                key={area.id}
                onClick={() => {
                  onSelectArea(area);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-500/80 shadow-md shadow-sky-500/10'
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{area.name}</span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-800 text-sky-400 border border-slate-700">
                      {area.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      Estimasi: {area.deliveryTime}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-700 shrink-0"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
