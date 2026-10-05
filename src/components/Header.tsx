import React from 'react';
import { Compass, Clock, Bell, Radio } from 'lucide-react';
import { USER_PROFILE, WEEK_SCHEDULES } from '../data/scheduleData';

interface HeaderProps {
  selectedDay: string;
  onSelectDay: (dayShort: string) => void;
  currentSimulatedTime: string;
  onOpenNotifications?: () => void;
  onOpenMap?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDay,
  onSelectDay,
  currentSimulatedTime,
  onOpenNotifications,
  onOpenMap,
}) => {
  const currentSchedule = WEEK_SCHEDULES[selectedDay] || WEEK_SCHEDULES['WED'];
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  return (
    <header className="relative pt-2 pb-3 px-4 bg-[#0a0d14]/95 border-b border-white/[0.08] backdrop-blur-md">
      {/* Top Telemetry & Status Row */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-slate-400 pb-2 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            KRONOS GPS
          </span>
          <span className="text-white/20">/</span>
          <span className="text-slate-300">CAMPUS CENTRAL</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-300 tabular-nums">
            <Clock className="w-3 h-3 text-amber-400/80" />
            <span>{currentSimulatedTime}</span>
          </div>

          <button
            onClick={onOpenMap}
            aria-label="Campus Wayfinding Map"
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] hidden sm:inline">MAP</span>
          </button>
        </div>
      </div>

      {/* Main Student Greeting & Academic Status Block */}
      <div className="pt-3 pb-2 flex items-start justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90 font-medium">
            Academic Command // {USER_PROFILE.semester}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
            GOOD MORNING, {USER_PROFILE.name}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
            <span className="text-slate-200 font-medium">{currentSchedule.fullDate}</span>
            <span className="text-white/30">·</span>
            <span className="text-amber-300/80 font-semibold">{USER_PROFILE.department}</span>
          </div>
        </div>

        {/* Academic Status Node */}
        <div className="text-right">
          <div className="inline-flex flex-col items-end border border-white/10 bg-white/[0.03] px-2.5 py-1.5 rounded-sm">
            <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">Standing</span>
            <span className="text-xs font-mono font-bold text-emerald-400">CGPA 8.92</span>
          </div>
        </div>
      </div>

      {/* Day Selector Strip - Crisp Wayfinding Rail */}
      <div className="mt-2.5 flex items-center justify-between gap-1 p-1 bg-black/40 border border-white/[0.07] rounded-sm">
        {days.map((day) => {
          const sched = WEEK_SCHEDULES[day];
          const isSelected = selectedDay === day;
          const isToday = day === 'WED';

          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`flex-1 py-1.5 px-1 rounded-sm text-center transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-amber-400 text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="text-[10px] font-mono leading-none tracking-tight flex items-center justify-center gap-1">
                {day}
                {isToday && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                )}
              </div>
              <div className={`text-xs font-mono mt-0.5 tabular-nums ${isSelected ? 'text-black' : 'text-slate-300'}`}>
                0{sched.dateNum}
              </div>
              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-amber-400"></div>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
