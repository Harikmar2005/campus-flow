import React from 'react';
import { User, Shield, CreditCard, Award, Phone, MapPin, QrCode, Lock } from 'lucide-react';
import { USER_PROFILE } from '../data/scheduleData';

export const ProfileView: React.FC = () => {
  return (
    <div className="pb-24 pt-2 px-4 space-y-4">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
          STUDENT CREDENTIAL MATRIX
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Academic Identity & Card
        </h2>
      </div>

      {/* Digital Campus Smart Card */}
      <div className="relative p-4 bg-gradient-to-br from-[#161d2a] via-[#0f141f] to-[#0a0d14] border border-amber-400/40 rounded-lg shadow-xl shadow-black/50 overflow-hidden">
        {/* Subtle holographic watermark */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
              CAMPUS SMART PASS // RFID ACTIVE
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">
              {USER_PROFILE.fullName}
            </h3>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              ID: {USER_PROFILE.regNumber}
            </div>
          </div>

          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center p-1">
            <QrCode className="w-full h-full text-amber-300" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/[0.08] text-xs font-mono">
          <div>
            <div className="text-[9px] text-slate-400 uppercase">PROGRAM</div>
            <div className="font-bold text-white mt-0.5">B.TECH CSE</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase">SEMESTER</div>
            <div className="font-bold text-amber-300 mt-0.5">SEM 07</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase">STATUS</div>
            <div className="font-bold text-emerald-400 mt-0.5">GOOD STANDING</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/[0.05]">
          <span>WALK PASS: UNRESTRICTED</span>
          <span className="text-emerald-400 font-semibold">VALID THRU: MAY 2027</span>
        </div>
      </div>

      {/* Academic standing breakdown */}
      <div className="grid grid-cols-2 gap-2 font-mono">
        <div className="p-3 bg-[#0e131b] border border-white/[0.08] rounded-sm">
          <div className="text-[10px] uppercase text-slate-400">CUMULATIVE GPA</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {USER_PROFILE.cgpa}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Top 5% in Cyber Security</div>
        </div>

        <div className="p-3 bg-[#0e131b] border border-white/[0.08] rounded-sm">
          <div className="text-[10px] uppercase text-slate-400">CAMPUS WALLET</div>
          <div className="text-2xl font-bold text-white mt-1">
            $42.50
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Print Labs & Cafeteria</div>
        </div>
      </div>

      {/* Campus Facility Allocations */}
      <div className="p-3.5 bg-[#0e131b] border border-white/[0.08] rounded-sm space-y-2 text-xs font-mono">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
          ASSIGNED PHYSICAL ALLOCATIONS
        </div>
        <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
          <span className="text-slate-400">Academic Advisor:</span>
          <span className="text-white font-medium">Dr. Kumar (Cabin C-412)</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
          <span className="text-slate-400">Assigned Campus Locker:</span>
          <span className="text-amber-300 font-bold">Locker #C-214 (Shannon Annex)</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-slate-400">Cyber Defense Sandbox Seat:</span>
          <span className="text-white font-medium">Lab B-201 / Terminal 14</span>
        </div>
      </div>

      {/* Emergency & Security Wayfinding contacts */}
      <div className="p-3.5 bg-black/40 border border-white/[0.08] rounded-sm space-y-2 text-xs font-mono">
        <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
          CAMPUS DISPATCH & SECURITY
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Campus Security Hotline:</span>
          <span className="text-amber-300 font-bold">ext. 4400 / 011-8291</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Medical Urgent Care:</span>
          <span className="text-cyan-400 font-bold">ext. 108 (Health Ctr Block E)</span>
        </div>
      </div>
    </div>
  );
};
