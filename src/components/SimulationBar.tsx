import React from 'react';
import { Play, RotateCcw, Smartphone, Monitor, Clock } from 'lucide-react';

interface SimulationBarProps {
  currentScenario: 'default' | 'in_class' | 'free_period';
  onSetScenario: (scenario: 'default' | 'in_class' | 'free_period') => void;
  isLiveTicking: boolean;
  onToggleLiveTicking: () => void;
  isDeviceFramed: boolean;
  onToggleDeviceFrame: () => void;
}

export const SimulationBar: React.FC<SimulationBarProps> = ({
  currentScenario,
  onSetScenario,
  isLiveTicking,
  onToggleLiveTicking,
  isDeviceFramed,
  onToggleDeviceFrame,
}) => {
  return (
    <div className="bg-[#05070a] border-b border-white/[0.1] px-4 py-2 text-xs font-mono flex flex-wrap items-center justify-between gap-2 z-50">
      {/* Left: Time Machine Scenario Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mr-1">
          CHRONO SIM:
        </span>

        <button
          onClick={() => onSetScenario('default')}
          className={`px-2 py-1 rounded-xs transition-colors cursor-pointer text-[11px] ${
            currentScenario === 'default'
              ? 'bg-amber-400 text-black font-bold'
              : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]'
          }`}
        >
          09:36 (Starts in 24m)
        </button>

        <button
          onClick={() => onSetScenario('in_class')}
          className={`px-2 py-1 rounded-xs transition-colors cursor-pointer text-[11px] ${
            currentScenario === 'in_class'
              ? 'bg-amber-400 text-black font-bold'
              : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]'
          }`}
        >
          10:15 (In Session)
        </button>

        <button
          onClick={() => onSetScenario('free_period')}
          className={`px-2 py-1 rounded-xs transition-colors cursor-pointer text-[11px] ${
            currentScenario === 'free_period'
              ? 'bg-amber-400 text-black font-bold'
              : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]'
          }`}
        >
          12:30 (Free Recess)
        </button>
      </div>

      {/* Right: Live Ticking & Device Frame Switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLiveTicking}
          className={`px-2 py-1 rounded-xs flex items-center gap-1 cursor-pointer transition-colors text-[11px] ${
            isLiveTicking 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
              : 'bg-white/[0.05] text-slate-400 hover:text-white'
          }`}
          title="Toggle live countdown clock ticking"
        >
          <Clock className="w-3 h-3" />
          <span>{isLiveTicking ? 'LIVE SECONDS: ON' : 'PAUSED'}</span>
        </button>

        <button
          onClick={onToggleDeviceFrame}
          className="hidden md:flex px-2 py-1 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 rounded-xs items-center gap-1 cursor-pointer transition-colors text-[11px]"
          title="Toggle Smartphone Frame vs Full Width"
        >
          {isDeviceFramed ? (
            <>
              <Monitor className="w-3 h-3 text-cyan-400" />
              <span>FULL WIDTH</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>MOBILE CHASSIS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
