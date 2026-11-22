import React from 'react';
import { Home, Car, Calculator, FileCheck2, HeadphonesIcon } from 'lucide-react';

export type TabType = 'home' | 'armada' | 'hitung' | 'syarat' | 'bantuan';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Beranda', icon: Home },
    { id: 'armada' as TabType, label: 'Armada', icon: Car },
    { id: 'hitung' as TabType, label: 'Hitung Sewa', icon: Calculator, isSpecial: true },
    { id: 'syarat' as TabType, label: 'Syarat', icon: FileCheck2 },
    { id: 'bantuan' as TabType, label: 'Bantuan', icon: HeadphonesIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-[max(env(safe-area-inset-bottom,0px),0.5rem)] pt-1 px-3 shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="group relative -top-3.5 flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white ring-4 ring-slate-900 shadow-sky-500/30'
                      : 'bg-gradient-to-tr from-sky-600 to-indigo-600 text-white ring-4 ring-slate-900'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-150 active:scale-90"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-sky-400 stroke-[2.5]' : 'text-slate-400 hover:text-slate-200'
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping"></span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
