import React, { useState } from 'react';
import { X, MapPin, Compass, Navigation, Footprints, Layers, ZoomIn, Building } from 'lucide-react';

interface CampusMapModalProps {
  onClose: () => void;
  targetRoom?: string;
  onNavigateToRoom?: (room: string) => void;
}

export const CampusMapModal: React.FC<CampusMapModalProps> = ({
  onClose,
  targetRoom = 'Room C-204',
}) => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('Block C');

  const buildings = [
    {
      name: 'Block C (Shannon Annex)',
      code: 'C',
      rooms: ['Room C-204 (Cyber Security)', 'Room C-105 (Cloud Security)'],
      dist: '140m • 3 min walk',
      desc: 'Cyber Defense Lab & Research Floor. Level 2 North Wing.',
      isTarget: true,
    },
    {
      name: 'Block B (Turing Hall)',
      code: 'B',
      rooms: ['Room B-102 (Network Security)', 'Lab B-201 (Hardware)'],
      dist: '140m • 2 min walk',
      desc: 'Systems & Network Engineering Lab facilities.',
      isTarget: false,
    },
    {
      name: 'Block A (Academic Tower)',
      code: 'A',
      rooms: ['Room A-301 (Cryptography)'],
      dist: '310m • 4 min walk',
      desc: 'Main lecture theatre and mathematics division.',
      isTarget: false,
    },
    {
      name: 'Central Library & Tech Pods',
      code: 'LIB',
      rooms: ['Quiet Study Floor 2', 'Digital Archives Floor 3'],
      dist: '180m • 2.5 min walk',
      desc: 'High-speed fiber connectivity, study pods, printing station.',
      isTarget: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0c1017] border border-white/10 rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111724] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              CampusFlow WAYFINDING // MASTER CAMPUS GRID
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Campus Map Canvas */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Interactive SVG Campus Map */}
          <div className="relative bg-[#07090e] border border-white/[0.08] rounded-sm p-3 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
              <span className="text-amber-400 font-bold">
                CAMPUS SECTOR NORTH-EAST // MASTER GRID
              </span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE BEACON: ROOM C-204
              </span>
            </div>

            <div className="w-full aspect-[16/10] bg-[#090d14] border border-white/[0.06] rounded-xs relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 600 360" className="w-full h-full select-none">
                {/* Lawn & Quad green zone */}
                <rect x="220" y="110" width="160" height="140" fill="#061c16" stroke="#047857" strokeWidth="1" strokeDasharray="2 2" rx="6" />
                <text x="300" y="175" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  CENTRAL QUAD
                </text>
                <text x="300" y="195" fill="#059669" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  OPEN LAWN & STUDY ZONE
                </text>

                {/* You are here marker */}
                <circle cx="280" cy="220" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <circle cx="280" cy="220" r="14" fill="none" stroke="#38bdf8" strokeWidth="1" className="animate-ping opacity-75" />
                <text x="280" y="244" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  YOU (09:36 AM)
                </text>

                {/* Block B (Turing Hall) */}
                <g 
                  onClick={() => setSelectedBuilding('Block B')} 
                  className="cursor-pointer transition-opacity hover:opacity-90"
                >
                  <rect x="40" y="130" width="130" height="100" fill="#111827" stroke="#475569" strokeWidth="1.5" rx="4" />
                  <text x="105" y="170" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">BLOCK B</text>
                  <text x="105" y="190" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">TURING HALL</text>
                  <text x="105" y="208" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Room B-102 (Done)</text>
                </g>

                {/* Block A (Academic Tower) */}
                <g 
                  onClick={() => setSelectedBuilding('Block A')} 
                  className="cursor-pointer transition-opacity hover:opacity-90"
                >
                  <rect x="235" y="15" width="130" height="75" fill="#111827" stroke="#475569" strokeWidth="1.5" rx="4" />
                  <text x="300" y="48" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">BLOCK A</text>
                  <text x="300" y="65" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">ACADEMIC TOWER</text>
                  <text x="300" y="78" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Room A-301 (11:15)</text>
                </g>

                {/* Block C (Shannon Annex) - TARGET HIGHLIGHT */}
                <g 
                  onClick={() => setSelectedBuilding('Block C')} 
                  className="cursor-pointer transition-opacity hover:opacity-95"
                >
                  <rect 
                    x="430" 
                    y="120" 
                    width="140" 
                    height="120" 
                    fill="#1e180d" 
                    stroke="#f59e0b" 
                    strokeWidth="2.5" 
                    rx="4" 
                  />
                  <rect x="430" y="120" width="140" height="22" fill="#f59e0b" rx="2" />
                  <text x="500" y="135" fill="#000000" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    TARGET SECTOR
                  </text>
                  <text x="500" y="172" fill="#ffffff" fontSize="14" fontWeight="extrabold" fontFamily="monospace" textAnchor="middle">
                    BLOCK C
                  </text>
                  <text x="500" y="190" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    SHANNON ANNEX
                  </text>
                  <text x="500" y="210" fill="#fef08a" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    ROOM C-204 (NEXT)
                  </text>
                </g>

                {/* Central Library */}
                <g 
                  onClick={() => setSelectedBuilding('Central Library')} 
                  className="cursor-pointer transition-opacity hover:opacity-90"
                >
                  <rect x="235" y="270" width="130" height="70" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" rx="4" />
                  <text x="300" y="305" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">LIBRARY</text>
                  <text x="300" y="322" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">QUIET PODS (FREE RECESS)</text>
                </g>

                {/* Primary Pedestrian Wayfinding Route from You to Block C */}
                <path 
                  d="M 280 220 L 360 220 L 410 180 L 430 180" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="3.5" 
                  strokeDasharray="8 4" 
                />
                <circle cx="430" cy="180" r="5" fill="#f59e0b" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                Current Position: Central Quad
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                Active Path: 240m (3 min) via East Walkway
              </span>
            </div>
          </div>

          {/* Building Directory Cards */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              CAMPUS PRECINCT DIRECTORY
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {buildings.map((b) => (
                <div
                  key={b.name}
                  onClick={() => setSelectedBuilding(b.name)}
                  className={`p-3 rounded-sm border cursor-pointer transition-all ${
                    b.isTarget
                      ? 'bg-amber-400/[0.08] border-amber-400/50 ring-1 ring-amber-400/20'
                      : 'bg-[#101520] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${b.isTarget ? 'text-amber-300' : 'text-white'}`}>
                      {b.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{b.dist}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    {b.desc}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/[0.05] text-[10px] font-mono text-slate-400">
                    Active classes: <span className="text-slate-200">{b.rooms.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0a0d14] border-t border-white/[0.08] flex items-center justify-between">
          <div className="text-[10px] font-mono text-slate-400">
            CAMPUS COORDINATES: LAT 12.8231° N, LON 80.0454° E
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold rounded-xs cursor-pointer transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
