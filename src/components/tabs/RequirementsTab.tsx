import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckSquare, 
  Square, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { REQUIREMENT_DOCS, RENTAL_RULES } from '../../data/requirements';
import { COMPANY } from '../../data/company';

export const RequirementsTab: React.FC = () => {
  const [selectedService, setSelectedService] = useState<'lepas_kunci' | 'sopir'>('lepas_kunci');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    ktp: true,
    sim_a: true,
  });
  const [openRuleIndex, setOpenRuleIndex] = useState<number | null>(0);

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

  const handleShareChecklistToWA = () => {
    const checkedList = relevantDocs.map((d) => 
      `${checkedDocs[d.id] ? '✅' : '❌'} ${d.name}`
    ).join('\n');

    const message = `Halo Admin DCS Rent Car,\n\nSaya ingin verifikasi kelayakan sewa mobil *${isLepasKunci ? 'Lepas Kunci' : 'Dengan Sopir'}*:\n\n*Kelengkapan Berkas:* (${totalChecked}/${totalRequired} - ${percentage}%):\n${checkedList}\n\nApakah berkas saya memenuhi syarat untuk disetujui? Mohon infonya ya admin. Terima kasih!`;

    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="pb-24 pt-2 space-y-4 px-3.5 max-w-md mx-auto text-white">
      {/* Top Banner */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30 mb-1">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Self-Verification Tool</span>
        </div>
        <h1 className="text-lg font-extrabold text-white">Cek Kelayakan Sewa</h1>
        <p className="text-xs text-slate-400">Centang dokumen yang Anda miliki untuk verifikasi kilat</p>
      </div>

      {/* Service Selector */}
      <div className="p-1 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-1 text-xs font-bold">
        <button
          onClick={() => setSelectedService('lepas_kunci')}
          className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
            isLepasKunci
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🔑 Lepas Kunci</span>
        </button>
        <button
          onClick={() => setSelectedService('sopir')}
          className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
            !isLepasKunci
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>👨‍✈️ Dengan Sopir / All-In</span>
        </button>
      </div>

      {/* Progress & Readiness Meter */}
      <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-300">Skor Kesiapan Dokumen:</span>
          <span className={`font-black ${percentage === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {percentage}% Siap
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-[11px] text-slate-400">
          {percentage === 100
            ? '🎉 Berkas Anda sudah lengkap! Proses persetujuan & antar mobil dijamin prioritas kilat.'
            : isLepasKunci
            ? '💡 Jika ada dokumen yang belum lengkap, Anda bisa diskusi opsi alternatif penjamin via WhatsApp.'
            : 'Sewa dengan sopir sangat mudah, cukup sediakan KTP pemesan tanpa deposit jaminan!'}
        </p>
      </div>

      {/* Document Checklist Items */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Daftar Kelengkapan Dokumen:
        </h2>

        {relevantDocs.map((doc) => {
          const isChecked = !!checkedDocs[doc.id];

          return (
            <div
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer active:scale-[0.99] flex items-start gap-3 ${
                isChecked
                  ? 'bg-slate-800/90 border-emerald-500/50 shadow-sm'
                  : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="mt-0.5 text-emerald-400">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 fill-emerald-500/20" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                    {doc.name}
                  </h3>
                  {doc.isRequiredLepasKunci && isLepasKunci && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-semibold">
                      Wajib
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{doc.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share Checklist to WhatsApp Button */}
      <button
        onClick={handleShareChecklistToWA}
        className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <span>Kirim Kelayakan Berkas ke WhatsApp CS</span>
      </button>

      {/* Rules and FAQ Accordion */}
      <div className="p-4 rounded-3xl bg-slate-800/50 border border-slate-800 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Aturan & Tata Tertib Sewa
        </h2>

        <div className="space-y-2">
          {RENTAL_RULES.map((rule, idx) => {
            const isOpen = openRuleIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenRuleIndex(isOpen ? null : idx)}
                  className="w-full p-3 flex items-center justify-between text-left text-xs font-bold text-white hover:text-sky-400 transition"
                >
                  <span>{rule.title}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-3 pt-0 text-[11px] text-slate-300 space-y-1.5 border-t border-slate-800/80">
                    {rule.items.map((item, itemIdx) => (
                      <p key={itemIdx} className="leading-relaxed flex items-start gap-1.5">
                        <span className="text-sky-400">•</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
