import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  User, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Mail, 
  FileText, 
  AlertTriangle, 
  Navigation, 
  Compass, 
  Bookmark,
  Share2,
  Building,
  Check
} from 'lucide-react';
import { ClassSession } from '../types';

interface ClassDetailModalProps {
  session: ClassSession | null;
  onClose: () => void;
  onOpenMap: (session: ClassSession) => void;
}

export const ClassDetailModal: React.FC<ClassDetailModalProps> = ({
  session,
  onClose,
  onOpenMap,
}) => {
  const [attendedMarked, setAttendedMarked] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  if (!session) return null;

  const attendancePct = session.attendance.percentage;
  const isHealthy = attendancePct >= 75;

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (userNote.trim()) {
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg max-h-[90vh] bg-[#0c1017] border border-white/10 rounded-t-xl sm:rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Grab bar affordance for mobile */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-[#0f141f]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
              ACADEMIC DOSSIER // {session.code}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] font-mono text-slate-400">{session.type}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-5 space-y-4 text-slate-200">
          {/* Main Title & Time Header */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {session.title}
            </h2>
            <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {session.startTime} — {session.endTime}
              </span>
              <span className="text-white/20">|</span>
              <span>1 Hour Session</span>
            </div>
          </div>

          {/* Physical Campus Wayfinding Card */}
          <div className="p-3.5 bg-gradient-to-br from-[#131924] to-[#0c1017] border border-amber-400/30 rounded-sm">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Building className="w-3.5 h-3.5" />
                PHYSICAL CAMPUS COORDINATES
              </span>
              <span className="text-slate-400">ELEVATION: {session.floor}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-lg font-mono font-extrabold text-white">
                  {session.room}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  {session.building} • {session.wing || 'Main Wing'}
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-xs font-bold text-amber-400">
                  {session.walkingMinutes} MIN WALK
                </div>
                <div className="text-[10px] text-slate-400">
                  {session.distanceMeters}m from Quad
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenMap(session)}
                className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>VIEW ARCHITECTURAL FLOOR ROUTE</span>
              </button>
            </div>
          </div>

          {/* Attendance Safety Analysis */}
          <div className="p-3.5 bg-[#0e131b] border border-white/[0.08] rounded-sm">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              <span>ATTENDANCE THRESHOLD MONITOR</span>
              <span className={`font-bold ${isHealthy ? 'text-emerald-400' : 'text-rose-400'}`}>
                {session.attendance.attended}/{session.attendance.total} LOGGED
              </span>
            </div>

            <div className="flex items-center justify-between my-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-white tabular-nums">
                  {session.attendance.percentage}%
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  {isHealthy ? 'Eligible for Finals' : 'Attendance Shortage Risk'}
                </span>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-400">
                Safe skips: <strong className="text-emerald-400">{session.attendance.safeSkips} classes</strong>
              </div>
            </div>

            {/* Attendance Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-xs overflow-hidden relative">
              <div 
                className="h-full bg-emerald-500 rounded-xs"
                style={{ width: `${session.attendance.percentage}%` }}
              ></div>
              {/* 75% threshold line */}
              <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-rose-500 z-10" title="75% Mandatory threshold"></div>
            </div>
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
              <span>0%</span>
              <span className="text-rose-400 font-semibold">75% MIN REQUIRED</span>
              <span>100%</span>
            </div>

            {/* Quick Simulation Attendance Log */}
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-slate-400">Mark today's attendance:</span>
              <button
                onClick={() => setAttendedMarked(!attendedMarked)}
                className={`py-1 px-2.5 rounded-xs font-mono text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  attendedMarked 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-white/[0.05] text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {attendedMarked ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MARKED PRESENT</span>
                  </>
                ) : (
                  <span>CHECK IN NOW</span>
                )}
              </button>
            </div>
          </div>

          {/* Professor & Faculty Information */}
          <div className="p-3.5 bg-[#0e131b] border border-white/[0.08] rounded-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              FACULTY DOSSIER
            </div>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-white text-base">
                  {session.professor.name}
                </div>
                <div className="text-xs text-slate-400">
                  {session.professor.title}
                </div>
                <div className="text-xs font-mono text-amber-300 mt-1">
                  Office: {session.professor.cabin}
                </div>
              </div>
              <a
                href={`mailto:${session.professor.email}`}
                className="py-1.5 px-3 bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 rounded-xs flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3 h-3 text-cyan-400" />
                <span>EMAIL</span>
              </a>
            </div>
          </div>

          {/* Syllabus & Today's Topic */}
          <div className="p-3.5 bg-[#0e131b] border border-white/[0.08] rounded-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
              TODAY'S LECTURE SCOPE
            </div>
            <p className="text-sm font-medium text-white mt-1">
              {session.topicToday}
            </p>
            {session.notes && (
              <div className="mt-2.5 p-2 bg-black/40 border border-white/[0.05] rounded-xs text-xs text-slate-300 font-mono">
                <span className="text-amber-400 font-semibold">NOTE: </span>
                {session.notes}
              </div>
            )}
          </div>

          {/* Assignment Module */}
          {session.assignmentDue && (
            <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-sm">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                <span>ASSIGNMENT MILESTONE</span>
                <span className="font-bold">{session.assignmentDue.deadline}</span>
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {session.assignmentDue.title}
              </div>
              <div className="text-xs text-amber-200/80 mt-1">
                Portal upload opens 4 hours before deadline.
              </div>
            </div>
          )}

          {/* Personal Quick Note Input */}
          <form onSubmit={handleSaveNote} className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>PERSONAL STUDY NOTE FOR THIS CLASS</span>
              {noteSaved && <span className="text-emerald-400 font-bold">SAVED!</span>}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="e.g. Ask prof about question 4 in lab sheet..."
                className="flex-1 bg-black/50 border border-white/10 rounded-xs px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-xs cursor-pointer transition-colors"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
