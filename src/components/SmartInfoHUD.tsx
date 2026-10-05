import React from 'react';
import { Coffee, Layers, Percent, AlertCircle } from 'lucide-react';

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
  assignmentTitle = 'Lab Report #4',
  assignmentDue = '23:59',
  onSelectInsight,
}) => {
  return (
    <div className="px-4 py-2">
      {/* Information Modules Grid: Compact, structured, subtle depth without competing with Hero */}
      <div className="bg-[#0b0f17] border border-white/[0.08] rounded-xs divide-y divide-white/[0.06]">
        {/* Upper Row: Free Time & Remaining Classes */}
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          {/* 42 MIN FREE / Before Cryptography */}
          <button
            onClick={() => onSelectInsight?.('free')}
            className="p-2.5 text-left hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Coffee className="w-3 h-3 text-amber-400" />
                BUFFER
              </span>
              <span className="text-[9px] text-slate-500">RECESS</span>
            </div>
            <div className="mt-1 font-mono text-base font-bold text-white tracking-tight tabular-nums">
              {freeMinutes} MIN FREE
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              Before Cryptography
            </div>
          </button>

          {/* 2 CLASSES LEFT / End of day: 02:45 PM */}
          <button
            onClick={() => onSelectInsight?.('classes')}
            className="p-2.5 text-left hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Layers className="w-3 h-3 text-slate-400" />
                DAY REMAINING
              </span>
              <span className="text-[9px] text-slate-500">2/4</span>
            </div>
            <div className="mt-1 font-mono text-base font-bold text-white tracking-tight tabular-nums">
              {classesRemaining} CLASSES LEFT
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              End of day: 02:45 PM
            </div>
          </button>
        </div>

        {/* Lower Row: Attendance & Submission Due Tomorrow */}
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          {/* ATTENDANCE / 87% / Eligible for exam halls */}
          <button
            onClick={() => onSelectInsight?.('attendance')}
            className="p-2.5 text-left hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Percent className="w-3 h-3 text-emerald-400" />
                ATTENDANCE
              </span>
              <span className="text-[9px] text-emerald-400 font-bold">SAFE</span>
            </div>
            <div className="mt-1 font-mono text-base font-bold text-emerald-400 tracking-tight tabular-nums">
              {Math.round(overallAttendance)}%
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              Eligible for exam halls
            </div>
          </button>

          {/* SUBMISSION / DUE TOMORROW / 23:59 */}
          <button
            onClick={() => onSelectInsight?.('assignment')}
            className="p-2.5 text-left hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-amber-400/90">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                SUBMISSION
              </span>
              <span className="text-[9px] font-mono font-bold text-amber-400 tabular-nums">
                23:59
              </span>
            </div>
            <div className="mt-1 font-mono text-base font-bold text-amber-300 tracking-tight">
              DUE TOMORROW
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              {assignmentTitle}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
