import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Compass, 
  Footprints, 
  Layers, 
  Navigation, 
  ArrowUp, 
  CornerDownRight, 
  CheckCircle2, 
  Info,
  Maximize2
} from 'lucide-react';
import { ClassSession } from '../types';

interface FloorRouteModalProps {
  session: ClassSession | null;
  onClose: () => void;
}

export const FloorRouteModal: React.FC<FloorRouteModalProps> = ({
  session,
  onClose,
}) => {
  const [activeFloor, setActiveFloor] = useState<'1' | '2' | '3'>('2');

  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-[#0c1017] border border-amber-400/40 rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
      >
        {/* Top Wayfinding Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111723] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              CAMPUS PHYSICAL WAYFINDING // {session.room}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subheader info bar */}
        <div className="px-4 py-2 bg-black/40 border-b border-white/[0.05] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-bold">{session.building}</span>
            <span className="text-white/20">/</span>
            <span>Target: {session.room}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Footprints className="w-3.5 h-3.5" />
            <span>{session.walkingMinutes} min walk ({session.distanceMeters}m)</span>
          </div>
        </div>

        {/* Scrollable blueprint and route guidance */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Architectural Blueprint SVG Canvas */}
          <div className="relative bg-[#070a0f] border border-white/[0.1] rounded-sm p-3 overflow-hidden">
            {/* Blueprint Grid Watermark */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
            
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
              <span className="text-amber-400 font-bold">
                SCHEMATIC: BLOCK C — LEVEL 0{activeFloor}
              </span>
              <div className="flex gap-1">
                {(['1', '2', '3'] as const).map((floor) => (
                  <button
                    key={floor}
                    onClick={() => setActiveFloor(floor)}
                    className={`px-2 py-0.5 rounded-xs font-mono text-[10px] cursor-pointer transition-colors ${
                      activeFloor === floor 
                        ? 'bg-amber-400 text-black font-bold' 
                        : 'bg-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    LVL 0{floor}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG Architectural Floorplan with Dynamic Route */}
            <div className="w-full aspect-[16/10] bg-[#090d14] border border-white/[0.08] relative rounded-xs overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 500 300" className="w-full h-full select-none">
                {/* Structural Outer Walls */}
                <rect x="20" y="20" width="460" height="260" fill="#0d131d" stroke="#334155" strokeWidth="2" />

                {/* Central Corridor */}
                <rect x="40" y="125" width="420" height="50" fill="#131b28" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <text x="250" y="155" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  CENTRAL WAYFINDING CORRIDOR — LEVEL 0{activeFloor}
                </text>

                {/* Room blocks along north side */}
                <g>
                  {/* C-201 */}
                  <rect x="40" y="30" width="90" height="95" fill="#111827" stroke="#334155" strokeWidth="1" />
                  <text x="85" y="75" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">C-201</text>
                  <text x="85" y="90" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">SEMINAR</text>

                  {/* C-202 */}
                  <rect x="140" y="30" width="90" height="95" fill="#111827" stroke="#334155" strokeWidth="1" />
                  <text x="185" y="75" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">C-202</text>
                  <text x="185" y="90" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">FACULTY</text>

                  {/* C-203 */}
                  <rect x="240" y="30" width="90" height="95" fill="#111827" stroke="#334155" strokeWidth="1" />
                  <text x="285" y="75" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">C-203</text>
                  <text x="285" y="90" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">IOT LAB</text>

                  {/* TARGET ROOM C-204 (Highlighted Target Zone) */}
                  <rect 
                    x="340" 
                    y="30" 
                    width="120" 
                    height="95" 
                    fill="#1e1b10" 
                    stroke="#f59e0b" 
                    strokeWidth="2.5" 
                    className="animate-pulse"
                  />
                  <rect x="340" y="30" width="120" height="20" fill="#f59e0b" />
                  <text x="400" y="44" fill="#000000" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    DESTINATION
                  </text>
                  <text x="400" y="80" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    ROOM C-204
                  </text>
                  <text x="400" y="98" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    CYBER SECURITY
                  </text>
                </g>

                {/* South side rooms */}
                <g>
                  {/* Restrooms */}
                  <rect x="40" y="175" width="80" height="95" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <text x="80" y="225" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">RESTROOMS</text>

                  {/* C-205 */}
                  <rect x="130" y="175" width="100" height="95" fill="#111827" stroke="#334155" strokeWidth="1" />
                  <text x="180" y="225" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">C-205 LAB</text>

                  {/* C-206 */}
                  <rect x="240" y="175" width="100" height="95" fill="#111827" stroke="#334155" strokeWidth="1" />
                  <text x="290" y="225" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">C-206 LECTURE</text>

                  {/* Stairs & Elevator Core */}
                  <rect x="350" y="175" width="110" height="95" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="405" y="215" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    STAIRWELL 02
                  </text>
                  <text x="405" y="235" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                    ELEVATOR BANK
                  </text>
                </g>

                {/* Animated Pedestrian Wayfinding Path Vector */}
                <path 
                  d="M 50 150 L 350 150 L 400 150 L 400 125" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="3" 
                  strokeDasharray="6 4"
                />

                {/* User start pin (West entrance) */}
                <circle cx="50" cy="150" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <text x="50" y="170" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  YOU ENTER HERE
                </text>

                {/* Target Door Pin */}
                <circle cx="400" cy="125" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <polygon points="396,120 404,120 400,126" fill="#000000" />
              </svg>
            </div>
            
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                West Entrance
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-400 inline-block"></span>
                Active Turn Route
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span>
                Stairs & Elevator
              </span>
            </div>
          </div>

          {/* Turn-by-Turn Wayfinding Steps */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              STEP-BY-STEP CAMPUS ROUTE
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-start gap-2.5 p-2 bg-[#0e131b] border border-white/[0.06] rounded-xs">
                <div className="w-5 h-5 rounded-full bg-white/10 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="text-white font-semibold">Leave Quad towards Block C (Shannon Annex)</div>
                  <div className="text-[11px] text-slate-400">Paved walkway between Turing Hall and Student Lawn (~120m).</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-[#0e131b] border border-white/[0.06] rounded-xs">
                <div className="w-5 h-5 rounded-full bg-white/10 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="text-white font-semibold">Enter West Glazed Entrance & Ascend to Level 2</div>
                  <div className="text-[11px] text-slate-400">Swipe student card RA2111003010482 at turnstile. Take Stairwell 02 up one flight.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-amber-400/[0.08] border border-amber-400/30 rounded-xs">
                <div className="w-5 h-5 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="text-amber-300 font-bold">Arrive at Room C-204 (Cyber Security Lab)</div>
                  <div className="text-[11px] text-slate-300">Third room on your left after the stairwell door. Terminal 14 assigned.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Specs & Facilities */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-black/40 border border-white/[0.06] rounded-sm text-center font-mono">
            <div>
              <div className="text-[9px] text-slate-400 uppercase">CAPACITY</div>
              <div className="text-xs font-bold text-white mt-0.5">60 Seats</div>
            </div>
            <div className="border-x border-white/[0.06]">
              <div className="text-[9px] text-slate-400 uppercase">WIFI AP</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">AP-C204-5G</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-400 uppercase">POWER OUTLETS</div>
              <div className="text-xs font-bold text-amber-300 mt-0.5">All Desks</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0a0d14] border-t border-white/[0.08] flex items-center justify-between">
          <div className="text-[10px] font-mono text-slate-400">
            OFFLINE MAP CACHED • NO CELL SIGNAL REQUIRED
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold rounded-xs cursor-pointer transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
