import React from 'react';
import { 
  Navigation, 
  MapPin, 
  User, 
  Clock, 
  ArrowRight,
  Footprints,
  Compass,
  FileText
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
  // 60-min countdown progress calculation
  const windowMinutes = 60;
  const progressRatio = Math.max(0, Math.min(1, (windowMinutes - minutesUntilStart) / windowMinutes));
  const progressPercent = Math.round(progressRatio * 100);

  return (
    <section className="relative px-4 pt-2.5 pb-2">
      {/* Outer Priority Frame: Dark graphite with crisp technical border & warm yellow focus */}
      <div className="relative rounded-lg bg-[#0e131d] border-2 border-amber-400/80 p-4 shadow-xl shadow-black/60 overflow-hidden ring-1 ring-amber-400/30">
        {/* Subtle engineering corner markers */}
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400 pointer-events-none"></div>

        {/* 1. TOP KICKER: NEXT IN LINE · CS703 & Clear Countdown */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-400 text-black font-mono text-[11px] font-black tracking-wider uppercase rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
              NEXT IN LINE
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold tracking-wider">
              · {session.code}
            </span>
          </div>

          {/* STARTS IN 24 MIN Countdown */}
          <div>
            {isInProgress ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30 rounded-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                CLASS IN SESSION
              </span>
            ) : (
              <div className="inline-flex items-baseline gap-1 text-right font-mono bg-amber-400/15 border border-amber-400/40 px-2.5 py-0.5 rounded-xs">
                <span className="text-[10px] uppercase tracking-wide text-amber-300 font-medium">STARTS IN</span>
                <span className="text-sm font-black text-amber-300 tabular-nums">
                  {minutesUntilStart} MIN
                </span>
                <span className="text-[10px] text-amber-400/80 tabular-nums font-bold">
                  {secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2. COURSE NAME: High-impact condensed title */}
        <div>
          <h2 className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-none uppercase">
            {session.title}
          </h2>
          {/* 3. TIME SLOT */}
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold mt-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{session.startTime} — {session.endTime}</span>
            <span className="text-white/20">·</span>
            <span className="text-slate-400 font-normal">{session.type}</span>
          </div>
        </div>

        {/* 4. ROOM & PROFESSOR SECTION */}
        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/[0.08]">
          {/* Room / Building */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              ROOM
            </div>
            <div className="text-lg font-mono font-black text-white tracking-tight mt-0.5">
              {session.room}
            </div>
            <div className="text-[11px] text-slate-300 font-medium truncate mt-0.5">
              {session.building}
            </div>
          </div>

          {/* Professor */}
          <div className="border-l border-white/[0.08] pl-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
              <User className="w-3 h-3 text-slate-300 shrink-0" />
              PROFESSOR
            </div>
            <div className="text-base font-bold text-white tracking-tight mt-0.5 truncate">
              {session.professor.name}
            </div>
            <div className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
              {session.professor.cabin}
            </div>
          </div>
        </div>

        {/* 5. SMART CAMPUS WAYFINDING TELEMETRY (CampusFlow Signature Feature) */}
        <div className="mt-3 p-2.5 bg-black/50 border border-white/[0.08] rounded-xs">
          <div className="flex items-center justify-between text-xs font-mono">
            {/* Campus Route Vector */}
            <div className="flex items-center gap-1.5 text-white font-medium truncate">
              <span className="text-amber-400 font-bold">East Quad</span>
              <span className="text-white/40">→</span>
              <span className="text-white font-bold">C-Wing</span>
            </div>

            {/* On Schedule Status */}
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              ON SCHEDULE
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mt-1.5 pt-1.5 border-t border-white/[0.06]">
            <span className="flex items-center gap-1.5 font-bold text-amber-300">
              <Footprints className="w-3.5 h-3.5 text-amber-400" />
              {session.walkingMinutes} MIN WALK · {session.distanceMeters}m
            </span>
            <span className="text-[10px] text-slate-400">
              Gate check-in: {session.startTime}
            </span>
          </div>

          {/* Subtle Progress / Time Gauge */}
          <div className="mt-2">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-0.5">
              <span>-60m</span>
              <span className="text-amber-400 font-bold">Now (-{minutesUntilStart}m)</span>
              <span>Class Gate</span>
            </div>
          </div>
        </div>

        {/* 6. PRIMARY ACTIONS: WAYFIND ROUTE & DETAILS */}
        <div className="mt-3 grid grid-cols-5 gap-2">
          <button
            onClick={() => onOpenMap(session)}
            className="col-span-3 py-2.5 px-3 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-mono text-xs font-black rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md tracking-wider uppercase"
          >
            <Navigation className="w-3.5 h-3.5 fill-black" />
            <span>WAYFIND ROUTE</span>
          </button>

          <button
            onClick={() => onOpenDetails(session)}
            className="col-span-2 py-2.5 px-2 bg-white/[0.06] hover:bg-white/[0.1] active:bg-white/[0.15] text-slate-200 font-mono text-xs font-semibold rounded-xs border border-white/10 flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <FileText className="w-3 h-3 text-slate-400" />
            <span>DETAILS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
