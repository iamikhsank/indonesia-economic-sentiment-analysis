import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Grid02Icon,
  TradeUpIcon,
  BarChartIcon,
  File01Icon
} from '@hugeicons/core-free-icons';

interface SidebarProps {
  activeTab: 'overview' | 'divergence' | 'statistics' | 'data_info';
  setActiveTab: (tab: 'overview' | 'divergence' | 'statistics' | 'data_info') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Grid02Icon },
    { id: 'divergence', label: 'Divergence', icon: TradeUpIcon },
    { id: 'statistics', label: 'Statistics', icon: BarChartIcon },
    { id: 'data_info', label: 'Data Info', icon: File01Icon }
  ] as const;

  return (
    <aside className={`w-20 lg:w-24 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col items-center py-5 shrink-0 transition-all font-body ${
      isOpen ? 'block' : 'hidden md:flex'
    }`}>
      {/* Brand Icon */}
      <div className="w-10 h-10 rounded-xl bg-[var(--accent)] text-white font-extrabold flex items-center justify-center text-sm shadow-md mb-8 shrink-0">
        BPS
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col items-center gap-4 w-full px-2">
        {menuItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full py-3 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent)] text-white font-bold shadow-md'
                  : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-alt)] font-semibold'
              }`}
            >
              <HugeiconsIcon icon={item.icon} size={20} className={isActive ? 'text-white' : 'text-[var(--muted)]'} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
