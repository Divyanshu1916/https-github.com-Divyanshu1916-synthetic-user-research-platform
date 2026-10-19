import React from 'react';
import { useResearch } from '../../context/ResearchContext';
import { Server, Settings, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  const { product, apiHealth, isSimulatedMode, setApiConfigModalOpen, activeTab, setActiveTab } = useResearch();

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-[#070B14] sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('dashboard');
          }}
          className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 inline-block" />
          <span>Synthetic User Research</span>
        </a>
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'dashboard' ? 'text-violet-300 font-semibold' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('setup')}
          className={`hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'setup' ? 'text-violet-300 font-semibold' : ''
          }`}
        >
          Product Setup
        </button>
        <button
          onClick={() => setActiveTab('personas')}
          className={`hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'personas' ? 'text-violet-300 font-semibold' : ''
          }`}
        >
          Synthetic Personas
        </button>
        <button
          onClick={() => setActiveTab('surveys')}
          className={`hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'surveys' ? 'text-violet-300 font-semibold' : ''
          }`}
        >
          Survey Results
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'reports' ? 'text-violet-300 font-semibold' : ''
          }`}
        >
          Reports & Export
        </button>
      </nav>

      {/* Zone 3: 1 primary action / API control */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setApiConfigModalOpen(true)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
            apiHealth?.online && !isSimulatedMode
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40'
              : isSimulatedMode
              ? 'bg-slate-900 border-slate-700/80 text-slate-300 hover:border-slate-600'
              : 'bg-rose-950/30 border-rose-500/30 text-rose-300 hover:bg-rose-900/40'
          }`}
          title="Configure FastAPI base URL and execution mode"
        >
          <Server className="w-3.5 h-3.5" />
          <span>
            {apiHealth?.online && !isSimulatedMode
              ? 'FastAPI Online'
              : isSimulatedMode
              ? 'Simulated Mode'
              : 'FastAPI Offline'}
          </span>
          <span className="text-slate-500">|</span>
          <Settings className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
