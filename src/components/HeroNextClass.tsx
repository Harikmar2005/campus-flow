import React from 'react';
import { 
  Navigation, 
  MapPin, 
  User, 
  Clock, 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight,
  Footprints,
  Compass
} from 'lucide-react';
import { ClassSession } from '../types';

interface HeroNextClassProps {
  session: ClassSession;
  minutesUntilStart: number;
  secondsRemaining?: number;
  isInProgress?: boolean;
  onOpenDetails: (session: ClassSession) => void;
  onOpenMap: (session: ClassSession) => void;
}

export const HeroNextClass: React.FC<HeroNextClassProps> = ({
  session,
  minutesUntilStart,
  secondsRemaining = 42,
  isInProgress = false,
  onOpenDetails,
  onOpenMap,
}) => {
  // Calculate progress ratio (e.g. 60 min countdown window)
  const windowMinutes = 60;
  const progressRatio = Math.max(0, Math.min(1, (windowMinutes - minutesUntilStart) / windowMinutes));
  const progressPercent = Math.round(progressRatio * 100);

  return (
    <section className="relative px-4 pt-3 pb-2">
      {/* Outer Container with Architectural Precision Frame */}
      <div className="relative rounded-md bg-gradient-to-b from-[#131924] to-[#0c1017] border border-amber-400/30 p-4 shadow-xl shadow-black/40 overflow-hidden">
        {/* Subtle background technical grid line and crosshair */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-2 right-2 text-[9px] font-mono text-white/20 select-none tracking-widest">
          SYS//REF: 07-CS703
        </div>

        {/* Top Kicker Row: Visual Status & Urgency Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-400 text-black font-mono text-[11px] font-bold tracking-wider uppercase rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
              NEXT CLASS
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {session.code}
            </span>
          </div>

          {/* Starts in 24 min - High-Impact Countdown Tag */}
          <div className="flex items-center gap-1.5 text-right font-mono">
            {isInProgress ? (
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                CLASS IN SESSION
              </span>
            ) : (
              <div className="flex items-baseline gap-1 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-xs">
                <span className="text-[10px] text-amber-300 uppercase tracking-tight">Starts in</span>
                <span className="text-sm font-bold text-amber-300 tabular-nums">
                  {minutesUntilStart} min
                </span>
                <span className="text-[10px] text-amber-400/70 tabular-nums">
                  {secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Course Title - Crisp, Bold, Architectural Typography */}
        <div className="mb-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {session.title}
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
            <span className="text-amber-200 font-medium">{session.startTime} — {session.endTime}</span>
            <span className="text-white/25">·</span>
            <span className="text-slate-300">{session.type}</span>
          </div>
        </div>

        {/* Core Location & Professor Grid - Immediate answers */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-black/40 border border-white/[0.07] rounded-sm mb-3.5">
          {/* Room / Location Node */}
          <div className="flex flex-col justify-between">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              LOCATION
            </div>
            <div className="mt-1">
              <div className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
                {session.room}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {session.building}
              </div>
            </div>
          </div>

          {/* Professor Node */}
          <div className="flex flex-col justify-between border-l border-white/[0.07] pl-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <User className="w-3 h-3 text-cyan-400" />
              INSTRUCTOR
            </div>
            <div className="mt-1">
              <div className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">
                {session.professor.name}
              </div>
              <div className="text-[11px] text-slate-400 font-mono truncate">
                {session.professor.cabin}
              </div>
            </div>
          </div>
        </div>

        {/* Visually Distinctive Calibrated Wayfinding & Countdown Mechanism */}
        <div className="p-2.5 bg-white/[0.02] border border-white/[0.08] rounded-sm mb-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
            <span className="flex items-center gap-1 text-slate-300">
              <Footprints className="w-3 h-3 text-amber-400" />
              TRANSIT TIME: <strong className="text-white font-bold">{session.walkingMinutes} MIN WALK</strong> ({session.distanceMeters}m)
            </span>
            <span className="text-amber-400/90 font-medium">
              GATE LOCK: {session.startTime}
            </span>
          </div>

          {/* Calibrated Flight Strip / Wayfinding Gauge */}
          <div className="relative pt-1 pb-2">
            {/* Background calibrated scale with tick notches */}
            <div className="relative h-2 w-full bg-slate-800/80 rounded-xs overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Calibration tick marks */}
            <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1 px-0.5">
              <span>-60m</span>
              <span>-45m</span>
              <span>-30m</span>
              <span className="text-amber-400 font-bold">-24m (NOW)</span>
              <span>-15m</span>
              <span className="text-slate-300">10:00 (START)</span>
            </div>
          </div>

          {/* Campus Wayfinding Vector Path Teaser */}
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.04] text-[10px] font-mono text-slate-400">
            <span className="truncate">
              ROUTE: <span className="text-slate-300 font-medium">East Quad → C-Wing Stairs → Level 2</span>
            </span>
            <span className="text-emerald-400 font-semibold shrink-0 ml-2">
              ON SCHEDULE
            </span>
          </div>
        </div>

        {/* Action Bar: Floor Route & Class Syllabus Brief */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenMap(session)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold rounded-xs transition-colors cursor-pointer tracking-wider"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>CAMPUS WAYFINDING</span>
          </button>

          <button
            onClick={() => onOpenDetails(session)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-mono text-xs font-medium rounded-xs border border-white/10 transition-colors cursor-pointer"
          >
            <span>SYLLABUS & NOTES</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
