import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Coffee, 
  Footprints, 
  Radio, 
  Navigation,
  BookOpen
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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            CHRONO-WAYFINDING SPINE
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono text-amber-400">TODAY'S TIMELINE</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 tabular-nums">
          4 SESSIONS · 1 FREE
        </span>
      </div>

      {/* The Timeline Spine Layout */}
      <div className="relative">
        {/* Continuous Left Spine Track */}
        <div className="absolute left-[39px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-slate-700 via-amber-400/40 to-slate-800 pointer-events-none"></div>

        <div className="space-y-3.5">
          {items.map((item, index) => {
            // Free Period Item
            if ('isFree' in item && item.isFree) {
              const free = item.free;
              return (
                <div key={free.id} className="relative flex items-start gap-3">
                  {/* Spine Node */}
                  <div className="w-[78px] shrink-0 text-right pr-3 pt-2">
                    <div className="text-xs font-mono font-bold text-slate-400 tabular-nums">
                      {free.startTime.split(' ')[0]}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400">
                      {free.startTime.split(' ')[1]}
                    </div>
                  </div>

                  {/* Node Marker */}
                  <div className="relative z-10 mt-2.5 -ml-1.5 w-3 h-3 rounded-full bg-[#0a0d14] border-2 border-emerald-400/60 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
                  </div>

                  {/* Free Slot Card */}
                  <button
                    onClick={() => onSelectFreePeriod?.(free)}
                    className="flex-1 p-2.5 bg-emerald-950/20 border border-dashed border-emerald-500/30 rounded-sm text-left hover:bg-emerald-950/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>{free.durationMinutes} MIN FREE RECESS</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {free.startTime} — {free.endTime}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                      <span className="text-slate-400">Campus suggestion:</span>
                      <span className="text-emerald-300/90 font-medium truncate">
                        Central Library Quiet Pods / Tech Cafe
                      </span>
                    </div>
                  </button>
                </div>
              );
            }

            // Normal Class Session
            const session = item as ClassSession;
            const isCompleted = session.startMinutes < 600; // 09:00 class
            const isNext = session.id === currentClassId;  // 10:00 CYBER SECURITY
            const isUpcoming = session.startMinutes > 600;  // 11:15 & 01:30

            return (
              <div key={session.id} className="relative flex items-start gap-3">
                {/* Time Column (Left Node) */}
                <div className="w-[78px] shrink-0 text-right pr-3 pt-2">
                  <div className={`text-xs font-mono font-bold tabular-nums ${
                    isNext ? 'text-amber-400 text-sm' : isCompleted ? 'text-slate-400' : 'text-slate-200'
                  }`}>
                    {session.startTime.split(' ')[0]}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase">
                    {session.startTime.split(' ')[1]}
                  </div>
                  <div className="text-[8px] font-mono text-slate-400 mt-0.5">
                    {session.endTime.split(' ')[0]}
                  </div>
                </div>

                {/* Spine Marker Pin */}
                <div className="relative z-10 mt-2.5 -ml-1.5 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5 text-slate-400" />
                    </div>
                  ) : isNext ? (
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-amber-400 opacity-75"></span>
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md shadow-amber-400/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-[#0a0d14] border-2 border-slate-500"></div>
                  )}
                </div>

                {/* Session Card */}
                <div 
                  className={`flex-1 rounded-sm border p-3 transition-all ${
                    isNext 
                      ? 'bg-gradient-to-r from-amber-500/[0.08] to-[#121822] border-amber-400/50 shadow-lg shadow-black/40 ring-1 ring-amber-400/20'
                      : isCompleted
                      ? 'bg-[#0c1017]/70 border-white/[0.04] opacity-75'
                      : 'bg-[#10151f] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Top Card Kicker: Status Badge & Code */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {isCompleted && (
                        <span className="text-[10px] font-mono font-medium text-slate-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          COMPLETED
                        </span>
                      )}
                      {isNext && (
                        <span className="px-1.5 py-0.2 bg-amber-400 text-black font-mono text-[9px] font-extrabold tracking-wider uppercase rounded-xs">
                          NEXT IN LINE
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="text-[10px] font-mono text-cyan-400 font-medium">
                          UPCOMING
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-400">
                        · {session.code}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {session.type}
                    </span>
                  </div>

                  {/* Title & Core Location */}
                  <div className="cursor-pointer" onClick={() => onSelectSession(session)}>
                    <h3 className={`text-base font-bold tracking-tight ${
                      isNext ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-100'
                    }`}>
                      {session.title}
                    </h3>

                    {/* Room & Building Coordinates */}
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1 text-xs font-mono">
                      <span className="flex items-center gap-1 text-amber-300 font-semibold">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {session.room}
                      </span>
                      <span className="text-slate-400 text-[11px] truncate">
                        {session.building}
                      </span>
                    </div>

                    {/* Professor & Distance */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-white/[0.05]">
                      <span className="truncate">
                        {session.professor.name}
                      </span>
                      <span className="flex items-center gap-1 text-slate-300 shrink-0 ml-2">
                        <Footprints className="w-3 h-3 text-amber-400/80" />
                        {session.walkingMinutes} min walk ({session.distanceMeters}m)
                      </span>
                    </div>
                  </div>

                  {/* Special Next-Action Buttons for Next Class */}
                  {isNext && (
                    <div className="mt-2.5 pt-2 border-t border-amber-400/20 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onOpenMap(session)}
                        className="flex-1 py-1.5 px-2 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold rounded-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Navigation className="w-3 h-3 text-amber-400" />
                        <span>WAYFIND ROUTE</span>
                      </button>

                      <button
                        onClick={() => onSelectSession(session)}
                        className="py-1.5 px-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 font-mono text-[11px] rounded-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>DETAILS</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Quick assignment tag if present */}
                  {!isCompleted && session.assignmentDue && (
                    <div className="mt-2 text-[10px] font-mono text-amber-400/90 bg-amber-400/[0.06] px-2 py-1 rounded-xs flex items-center justify-between">
                      <span className="truncate">Due: {session.assignmentDue.title}</span>
                      <span className="shrink-0 ml-1 text-amber-300 font-semibold">{session.assignmentDue.deadline.split('•')[0]}</span>
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
