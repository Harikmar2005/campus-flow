import React from 'react';
import { Coffee, Layers, Percent, AlertCircle, ArrowRight } from 'lucide-react';

interface SmartInfoHUDProps {
  freeMinutes: number;
  classesRemaining: number;
  overallAttendance: number;
  assignmentTitle: string;
  assignmentDue: string;
  onSelectInsight?: (type: 'free' | 'classes' | 'attendance' | 'assignment') => void;
}

export const SmartInfoHUD: React.FC<SmartInfoHUDProps> = ({
  freeMinutes = 42,
  classesRemaining = 2,
  overallAttendance = 87.4,
  assignmentTitle = 'Lab Report #4: Snort Rule Writing',
  assignmentDue = 'Tomorrow • 11:59 PM',
  onSelectInsight,
}) => {
  return (
    <div className="px-4 py-2">
      {/* Container with technical telemetry styling */}
      <div className="bg-[#0e131b] border border-white/[0.08] rounded-sm divide-y divide-white/[0.06]">
        {/* Upper Row: 2-metric telemetry */}
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          {/* 42 MIN FREE */}
          <button
            onClick={() => onSelectInsight?.('free')}
            className="p-2.5 text-left hover:bg-white/[0.02] transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Coffee className="w-3 h-3 text-amber-400" />
                BUFFER WINDOW
              </span>
              <span className="text-[9px] font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                RECESS
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-mono font-bold text-white tracking-tight tabular-nums">
                {freeMinutes} MIN FREE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 truncate mt-0.5">
              Before Cryptography & Cloud Sec
            </div>
          </button>

          {/* 2 CLASSES LEFT */}
          <button
            onClick={() => onSelectInsight?.('classes')}
            className="p-2.5 text-left hover:bg-white/[0.02] transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" />
                LOAD BALANCE
              </span>
              <span className="text-[9px] font-mono text-slate-400 tabular-nums">
                2/4 DONE
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-mono font-bold text-white tracking-tight tabular-nums">
                {classesRemaining} CLASSES LEFT
              </span>
            </div>
            <div className="text-[10px] text-slate-400 truncate mt-0.5">
              End of day: 02:45 PM
            </div>
          </button>
        </div>

        {/* Lower Row: Attendance & Urgent Academic Alert */}
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          {/* ATTENDANCE 87% */}
          <button
            onClick={() => onSelectInsight?.('attendance')}
            className="p-2.5 text-left hover:bg-white/[0.02] transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Percent className="w-3 h-3 text-emerald-400" />
                HEALTH INDEX
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-semibold">
                SAFE &gt;75%
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-mono font-bold text-emerald-400 tracking-tight tabular-nums">
                ATTENDANCE {Math.round(overallAttendance)}%
              </span>
            </div>
            <div className="text-[10px] text-slate-400 truncate mt-0.5">
              Eligible for all exam halls
            </div>
          </button>

          {/* ASSIGNMENT DUE TOMORROW */}
          <button
            onClick={() => onSelectInsight?.('assignment')}
            className="p-2.5 text-left hover:bg-white/[0.02] transition-colors group cursor-pointer bg-amber-400/[0.02]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                SUBMISSION
              </span>
              <span className="text-[9px] font-mono text-amber-300">
                23:59
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-300 truncate">
                DUE TOMORROW
              </span>
            </div>
            <div className="text-[10px] text-slate-300 truncate mt-0.5">
              {assignmentTitle}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
