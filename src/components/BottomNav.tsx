import React from 'react';
import { Calendar, Compass, BookOpen, User, Clock } from 'lucide-react';

export type NavTab = 'TODAY' | 'TIMETABLE' | 'COURSES' | 'PROFILE';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  nextClassKicker?: string; // e.g. "Starts in 24 min"
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  nextClassKicker,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'TODAY', label: 'TODAY', icon: Clock },
    { id: 'TIMETABLE', label: 'TIMETABLE', icon: Calendar },
    { id: 'COURSES', label: 'COURSES', icon: BookOpen },
    { id: 'PROFILE', label: 'PROFILE', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090c12]/95 border-t border-white/[0.08] backdrop-blur-lg">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-colors relative cursor-pointer ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active state hairline indicator on top */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-amber-400"></div>
              )}

              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              
              <span className={`text-[10px] font-mono tracking-wider mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>

              {/* Tiny indicator badge for TODAY if class approaching */}
              {tab.id === 'TODAY' && nextClassKicker && !isActive && (
                <span className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
