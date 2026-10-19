import React from 'react';
import { useResearch } from '../../context/ResearchContext';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Users,
  BarChart3,
  Lightbulb,
  MessageSquareText,
  FileText,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, personas, product, isSimulatedMode } = useResearch();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'setup', label: 'Research Setup', icon: SlidersHorizontal },
    { id: 'personas', label: 'Synthetic Personas', icon: Users, badge: personas.length },
    { id: 'surveys', label: 'Survey Results', icon: BarChart3 },
    { id: 'insights', label: 'AI Research Insights', icon: Lightbulb },
    { id: 'interviews', label: 'Persona Interview', icon: MessageSquareText },
    { id: 'reports', label: 'Research Reports', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#070B14] border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-57px)]">
      {/* Current Project Card */}
      <div className="p-4 border-b border-slate-800/80 bg-[#090E1B]">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
          <span>Active Product Research</span>
        </div>
        <div className="font-semibold text-sm text-white truncate" title={product.name}>
          {product.name}
        </div>
        <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
          {product.targetAudience}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400">
          RESEARCH WORKFLOW
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-violet-600/15 text-violet-200 border border-violet-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-1 bg-[#060911]">
        <div className="flex items-center justify-between">
          <span>Cohort Size</span>
          <span className="font-mono text-slate-300 tabular-nums">{personas.length} Personas</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Data Origin</span>
          <span className="font-mono text-slate-300">
            {isSimulatedMode ? 'Simulated' : 'Live FastAPI'}
          </span>
        </div>
      </div>
    </aside>
  );
};
