import React from 'react';
import { BookOpen, ShieldAlert, Award, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { COURSES_LIST } from '../data/scheduleData';
import { CourseSummary } from '../types';

interface CoursesViewProps {
  onSelectCourse?: (course: CourseSummary) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onSelectCourse }) => {
  return (
    <div className="pb-24 pt-2 px-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
            CURRICULUM ARCHITECTURE
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Enrolled Courses & Attendance
          </h2>
        </div>

        <div className="text-right font-mono">
          <div className="text-xs font-bold text-emerald-400">87.4% AVG</div>
          <div className="text-[9px] text-slate-400">5 Registered</div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-3 gap-2 p-2.5 bg-black/40 border border-white/[0.08] rounded-sm text-center font-mono">
        <div>
          <div className="text-[9px] text-slate-400 uppercase">TOTAL CREDITS</div>
          <div className="text-sm font-bold text-white mt-0.5">18.5</div>
        </div>
        <div className="border-x border-white/[0.08]">
          <div className="text-[9px] text-slate-400 uppercase">EXAM ELIGIBILITY</div>
          <div className="text-sm font-bold text-emerald-400 mt-0.5">100% CLEAR</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-400 uppercase">NEXT EXAM</div>
          <div className="text-sm font-bold text-amber-300 mt-0.5">OCT 15</div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-3">
        {COURSES_LIST.map((course) => {
          const isHigh = course.attendancePct >= 85;

          return (
            <div
              key={course.code}
              onClick={() => onSelectCourse?.(course)}
              className="p-3.5 bg-[#101520] border border-white/[0.08] hover:border-amber-400/30 rounded-sm cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className="text-amber-400 font-bold">{course.code}</span>
                <span className="text-slate-400">{course.credits} Credits · {course.type}</span>
              </div>

              <h3 className="text-base font-bold text-white">
                {course.name}
              </h3>

              <div className="text-xs font-mono text-slate-400 mt-1">
                {course.faculty} · <span className="text-slate-300">{course.room}</span>
              </div>

              {/* Attendance and Progress Indicators */}
              <div className="mt-3 pt-2.5 border-t border-white/[0.06] space-y-2">
                {/* Attendance Metric */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">Attendance ({course.classesAttended}/{course.totalClasses} classes)</span>
                    <span className={`font-bold ${isHigh ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {course.attendancePct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isHigh ? 'bg-emerald-500' : 'bg-amber-400'}`}
                      style={{ width: `${course.attendancePct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Syllabus Progress */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Syllabus: {course.syllabusProgress}% Complete</span>
                  <span className="text-amber-300 font-medium">{course.nextExam}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
