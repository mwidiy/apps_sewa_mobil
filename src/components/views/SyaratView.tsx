import React, { useState } from 'react';
import { FileText, CheckSquare, Square, ArrowLeft, ShieldCheck } from 'lucide-react';
import { REQUIREMENT_DOCS, RENTAL_RULES } from '../../data/requirements';
import { COMPANY } from '../../data/company';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface SyaratViewProps {
  onBack: () => void;
}

export const SyaratView: React.FC<SyaratViewProps> = ({ onBack }) => {
  const [selectedService, setSelectedService] = useState<'lepas_kunci' | 'sopir'>('lepas_kunci');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    ktp: true,
    sim_a: true,
  });

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isLepasKunci = selectedService === 'lepas_kunci';
  const relevantDocs = REQUIREMENT_DOCS.filter((doc) => 
    isLepasKunci ? doc.isRequiredLepasKunci : (doc.isRequiredSopir || doc.isRequiredAllIn)
  );

  const totalRequired = relevantDocs.length;
  const totalChecked = relevantDocs.filter((d) => checkedDocs[d.id]).length;
  const percentage = Math.round((totalChecked / totalRequired) * 100);

  const handleShareToWA = () => {
    const checkedList = relevantDocs.map((d) => 
      `${checkedDocs[d.id] ? '✅' : '❌'} ${d.name}`
    ).join('\n');

    const message = `Halo Admin DCS Rent Car,\n\nSaya ingin verifikasi kelayakan berkas sewa *${isLepasKunci ? 'Lepas Kunci' : 'Dengan Sopir'}*:\n\n*Kelengkapan Berkas:* (${totalChecked}/${totalRequired} - ${percentage}%):\n${checkedList}\n\nApakah berkas saya memenuhi syarat untuk diverifikasi? Terima kasih!`;

    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="pb-32 max-w-md mx-auto animate-view-transition">
      {/* Sticky Top Header Nav Bar with Safe Headroom */}
      <header className="sticky top-0 z-40 bg-[#f1f3f7]/90 backdrop-blur-md pt-8 pb-3 px-4 border-b border-zinc-200/50 shadow-xs flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center text-zinc-700 active:scale-95 transition"
          title="Kembali"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <h1 className="text-sm font-bold text-zinc-900 tracking-tight">Syarat & Dokumen</h1>
        <div className="w-10 h-10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 pt-3 space-y-4">

      {/* Service Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-200/60 rounded-full text-xs font-semibold">
        <button
          onClick={() => setSelectedService('lepas_kunci')}
          className={`flex-1 py-1.5 rounded-full transition text-[11px] ${
            isLepasKunci ? 'bg-white text-zinc-900 shadow-sm font-bold' : 'text-zinc-500'
          }`}
        >
          Lepas Kunci
        </button>
        <button
          onClick={() => setSelectedService('sopir')}
          className={`flex-1 py-1.5 rounded-full transition text-[11px] ${
            !isLepasKunci ? 'bg-white text-zinc-900 shadow-sm font-bold' : 'text-zinc-500'
          }`}
        >
          Dengan Sopir / All-In
        </button>
      </div>

      {/* Readiness meter */}
      <div className="bg-white rounded-3xl p-4 app-card-shadow border border-zinc-100 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-zinc-700">Kesiapan Berkas:</span>
          <span className="font-extrabold text-blue-600">{percentage}% Siap</span>
        </div>

        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-[11px] text-zinc-400">
          {percentage === 100
            ? '🎉 Berkas lengkap! Verifikasi cepat & prioritas antar.'
            : 'Centang dokumen yang Anda miliki untuk verifikasi kilat oleh CS.'}
        </p>
      </div>

      {/* Docs Checklist */}
      <div className="space-y-2">
        {relevantDocs.map((doc) => {
          const isChecked = !!checkedDocs[doc.id];

          return (
            <div
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer active:scale-[0.99] flex items-start gap-3 ${
                isChecked
                  ? 'bg-white border-blue-500/50 shadow-sm'
                  : 'bg-white/70 border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <div className="mt-0.5 text-blue-600">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 fill-blue-50" />
                ) : (
                  <Square className="w-5 h-5 text-zinc-300" />
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold text-zinc-900">{doc.name}</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5">{doc.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share Button */}
      <button
        onClick={handleShareToWA}
        className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
      >
        <WhatsAppIcon className="w-4 h-4 text-white" />
        <span>Kirim Kelayakan Berkas ke WhatsApp CS</span>
      </button>
      </div>
    </div>
  );
};
