import React from 'react';
import { useResearch } from '../../context/ResearchContext';
import { Sparkles, Server, ArrowRight } from 'lucide-react';

export const SimulatedBanner: React.FC = () => {
  const { isSimulatedMode, apiHealth, setApiConfigModalOpen } = useResearch();

  if (!isSimulatedMode) return null;

  return (
    <div className="bg-amber-950/20 border-b border-amber-500/20 px-6 py-2 flex items-center justify-between text-xs text-amber-200/90">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-amber-300">Notice: Simulated Demo Mode Active</span>
        <span aria-hidden="true" className="text-amber-500/40">·</span>
        <span className="text-slate-300">
          Displaying synthetic sample data for &ldquo;Smart Student Planner&rdquo;. Responses and stats are simulated.
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-slate-400 hidden sm:inline">
          {apiHealth?.online
            ? 'FastAPI server detected online'
            : 'FastAPI server not connected'}
        </span>
        <button
          onClick={() => setApiConfigModalOpen(true)}
          className="text-amber-300 hover:text-amber-100 font-medium underline flex items-center gap-1 transition-colors"
        >
          <span>Connect Backend</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
