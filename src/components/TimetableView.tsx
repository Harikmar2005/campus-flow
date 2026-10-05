import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight, Download, Filter } from 'lucide-react';
import { WEEK_SCHEDULES } from '../data/scheduleData';
import { ClassSession } from '../types';

interface TimetableViewProps {
  onSelectClass: (session: ClassSession) => void;
  onOpenMap: (session: ClassSession) => void;
}

export const TimetableView: React.FC<TimetableViewProps> = ({
  onSelectClass,
  onOpenMap,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('WED');
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const daySchedule = WEEK_SCHEDULES[selectedDay] || WEEK_SCHEDULES['WED'];

  return (
    <div className="pb-24 pt-2 px-4 space-y-4">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
            SEMESTER 07 SCHEDULE MATRIX
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Weekly Master Timetable
          </h2>
        </div>

        <div className="text-right font-mono text-[11px] text-slate-400">
          <span className="text-white font-bold">22</span> Contact Hrs/Wk
        </div>
      </div>

      {/* Day Selector Buttons */}
      <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/[0.08] rounded-sm">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-2 text-center rounded-xs transition-colors cursor-pointer font-mono ${
                isSelected
                  ? 'bg-amber-400 text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="text-xs">{day}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span className="text-slate-200 font-semibold">{daySchedule.fullDate}</span>
          <span>{daySchedule.items.length} Slots scheduled</span>
        </div>

        <div className="space-y-2.5">
          {daySchedule.items.map((item, idx) => {
            if ('isFree' in item && item.isFree) {
              return (
                <div 
                  key={item.free.id}
                  className="p-3 bg-emerald-950/20 border border-dashed border-emerald-500/30 rounded-sm flex items-center justify-between text-xs font-mono"
                >
                  <div className="text-emerald-400 font-bold">
                    {item.free.startTime} — {item.free.endTime} · FREE PERIOD ({item.free.durationMinutes}m)
                  </div>
                  <span className="text-slate-400 text-[10px]">Open Study Pods</span>
                </div>
              );
            }

            const session = item as ClassSession;
            return (
              <div
                key={session.id || idx}
                onClick={() => onSelectClass(session)}
                className="p-3.5 bg-[#101520] border border-white/[0.08] hover:border-amber-400/40 rounded-sm cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span className="text-amber-300 font-bold">{session.startTime} — {session.endTime}</span>
                  <span className="text-slate-400">{session.type}</span>
                </div>

                <div className="flex items-start justify-between mt-1">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {session.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {session.room}
                      </span>
                      <span className="text-white/20">·</span>
                      <span className="truncate">{session.building}</span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors mt-1" />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2.5 pt-2 border-t border-white/[0.05]">
                  <span>{session.professor.name}</span>
                  <span className="text-emerald-400 font-medium">{session.attendance.percentage}% Attd</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Calendar Notice */}
      <div className="p-3 bg-[#0c1017] border border-white/[0.06] rounded-sm text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <div>
          <span className="text-amber-400 font-bold">FALL 2026: </span>
          <span>Week 08 of 16 (Midterm Cycle 2)</span>
        </div>
        <span className="text-slate-300 font-semibold">SEM 07</span>
      </div>
    </div>
  );
};
