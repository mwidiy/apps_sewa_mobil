import React from 'react';
import { Home, LayoutGrid, FileText, PhoneCall, MapPin } from 'lucide-react';

export type NavTab = 'home' | 'collection' | 'syarat' | 'contact';

interface FloatingDockProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home' as NavTab, icon: Home, label: 'Home' },
    { id: 'collection' as NavTab, icon: LayoutGrid, label: 'Collection' },
    { id: 'syarat' as NavTab, icon: FileText, label: 'Syarat' },
    { id: 'contact' as NavTab, icon: PhoneCall, label: 'Kontak' },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
      <nav className="pointer-events-auto bg-[#0a0a0c] text-white rounded-full px-4 py-2 flex items-center justify-between gap-6 shadow-[0_12px_32px_rgba(0,0,0,0.35)] border border-white/10 backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (isActive) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 transition-transform active:scale-95"
                title={item.label}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="p-2 text-zinc-400 hover:text-white transition-colors active:scale-90"
              title={item.label}
            >
              <Icon className="w-5 h-5 stroke-[1.8]" />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
