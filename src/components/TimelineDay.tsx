import React from 'react';
import { 
  Check, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Coffee, 
  Footprints, 
  Navigation
} from 'lucide-react';
import { ClassSession, FreePeriod } from '../types';

interface TimelineDayProps {
  items: (ClassSession | { isFree: true; free: FreePeriod })[];
  currentClassId?: string; // 'c2'
  onSelectSession: (session: ClassSession) => void;
  onOpenMap: (session: ClassSession) => void;
  onSelectFreePeriod?: (free: FreePeriod) => void;
}

export const TimelineDay: React.FC<TimelineDayProps> = ({
  items,
  currentClassId = 'c2',
  onSelectSession,
  onOpenMap,
  onSelectFreePeriod,
}) => {
  return (
    <div className="px-4 py-3">
      {/* Section Kicker */}
      <div className="flex items-center justify-between mb-3 pb-1 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
            CAMPUS TRANSIT SPINE
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono text-amber-400 font-bold">TODAY'S SCHEDULE</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 tabular-nums">
          4 SESSIONS · 1 FREE
        </span>
      </div>

      {/* The Timeline Spine Layout */}
      <div className="relative">
        {/* Continuous Left Spine Track: Muted line with active segment */}
        <div className="absolute left-[38px] top-4 bottom-6 w-[2px] bg-white/[0.08] pointer-events-none"></div>

        <div className="space-y-3">
          {items.map((item, index) => {
            // FREE PERIOD STATE
            if ('isFree' in item && item.isFree) {
              const free = item.free;
              return (
                <div key={free.id} className="relative flex items-start gap-3">
                  {/* Time Node */}
                  <div className="w-[74px] shrink-0 text-right pr-2.5 pt-2">
                    <div className="text-xs font-mono font-bold text-slate-400 tabular-nums">
                      {free.startTime.split(' ')[0]}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase">
                      {free.startTime.split(' ')[1]}
                    </div>
                  </div>

                  {/* Marker Node */}
                  <div className="relative z-10 mt-2.5 -ml-1.5 w-3 h-3 rounded-xs bg-[#090c12] border-2 border-emerald-400/80 flex items-center justify-center">
                    <div className="w-1 h-1 bg-emerald-400"></div>
                  </div>

                  {/* Free Period Module */}
                  <button
                    onClick={() => onSelectFreePeriod?.(free)}
                    className="flex-1 p-2.5 bg-emerald-950/20 border border-dashed border-emerald-500/40 rounded-xs text-left hover:bg-emerald-950/30 active:bg-emerald-950/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>75 MIN FREE RECESS</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {free.startTime} — {free.endTime}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 mt-1 flex items-center gap-1.5">
                      <span className="text-slate-400">Open zones:</span>
                      <span className="text-emerald-300 font-medium truncate">
                        Central Library Quiet Pods · Tech Cafe
                      </span>
                    </div>
                  </button>
                </div>
              );
            }

            // CLASS SESSION
            const session = item as ClassSession;
            const isCompleted = session.startMinutes < 600; // 09:00 NETWORK SECURITY
            const isNext = session.id === currentClassId;  // 10:00 CYBER SECURITY
            const isUpcoming = session.startMinutes > 600;  // 11:15 CRYPTOGRAPHY & 01:30 CLOUD SECURITY

            return (
              <div key={session.id} className="relative flex items-start gap-3">
                {/* Time Column (Left Node) */}
                <div className="w-[74px] shrink-0 text-right pr-2.5 pt-2">
                  <div className={`text-xs font-mono font-bold tabular-nums ${
                    isNext ? 'text-amber-400 text-sm' : isCompleted ? 'text-slate-400' : 'text-slate-200'
                  }`}>
                    {session.startTime.split(' ')[0]}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase">
                    {session.startTime.split(' ')[1]}
                  </div>
                </div>

                {/* Spine Marker Pin */}
                <div className="relative z-10 mt-2.5 -ml-1.5 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-3.5 h-3.5 rounded-xs bg-slate-800 border border-slate-600 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-slate-400" />
                    </div>
                  ) : isNext ? (
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-amber-400 opacity-75"></span>
                      <div className="w-3.5 h-3.5 rounded-xs bg-amber-400 text-black flex items-center justify-center shadow-md shadow-amber-400/50">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-xs bg-[#090c12] border-2 border-slate-600"></div>
                  )}
                </div>

                {/* Session Card with Explicit Visual State */}
                <div 
                  className={`flex-1 rounded-xs border p-3 transition-all ${
                    isNext 
                      ? 'bg-[#121824] border-2 border-amber-400 shadow-lg shadow-black/50 ring-1 ring-amber-400/20'
                      : isCompleted
                      ? 'bg-[#0a0d14] border-white/[0.04] opacity-70'
                      : 'bg-[#0f141f] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Top Header: Explicit State Label + Code */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      {isCompleted && (
                        <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                          COMPLETED
                        </span>
                      )}
                      {isNext && (
                        <span className="px-1.5 py-0.2 bg-amber-400 text-black font-mono text-[10px] font-black tracking-wider uppercase rounded-xs">
                          NEXT
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          UPCOMING
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-400">
                        · {session.code}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {session.startTime} — {session.endTime}
                    </span>
                  </div>

                  {/* Course Name */}
                  <div className="cursor-pointer" onClick={() => onSelectSession(session)}>
                    <h3 className={`text-base font-bold tracking-tight uppercase ${
                      isNext ? 'text-white' : isCompleted ? 'text-slate-400 line-through' : 'text-slate-100'
                    }`}>
                      {session.title}
                    </h3>

                    {/* Room & Building Coordinates */}
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1 text-xs font-mono">
                      <span className={`flex items-center gap-1 font-bold ${isNext ? 'text-amber-300' : 'text-slate-300'}`}>
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {session.room}
                      </span>
                      <span className="text-slate-400 text-[11px] truncate">
                        {session.building}
                      </span>
                    </div>

                    {/* Professor & Walking Distance */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-1.5 border-t border-white/[0.05]">
                      <span className="truncate">
                        {session.professor.name}
                      </span>
                      <span className="flex items-center gap-1 text-slate-300 shrink-0 ml-2">
                        <Footprints className="w-3 h-3 text-amber-400/80" />
                        {session.walkingMinutes} min walk ({session.distanceMeters}m)
                      </span>
                    </div>
                  </div>

                  {/* Immediate Action Buttons for NEXT Class */}
                  {isNext && (
                    <div className="mt-2.5 pt-2 border-t border-amber-400/30 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onOpenMap(session)}
                        className="flex-1 py-1.5 px-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-mono text-[11px] font-black rounded-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Navigation className="w-3 h-3 fill-black" />
                        <span>WAYFIND ROUTE</span>
                      </button>

                      <button
                        onClick={() => onSelectSession(session)}
                        className="py-1.5 px-3 bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-mono text-[11px] rounded-xs border border-white/10 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>DETAILS</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
