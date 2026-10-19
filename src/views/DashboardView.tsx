import React from 'react';
import { useResearch } from '../context/ResearchContext';
import {
  Users,
  BarChart3,
  Lightbulb,
  FileText,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  MessageSquareText,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    product,
    personas,
    surveyResults,
    insights,
    report,
    setActiveTab,
    setSelectedPersona,
    isSimulatedMode,
    setApiConfigModalOpen,
    apiHealth
  } = useResearch();

  const handleStartInterview = (personaId: string) => {
    const target = personas.find((p) => p.id === personaId);
    if (target) {
      setSelectedPersona(target);
    }
    setActiveTab('interviews');
  };

  return (
    <div className="space-y-8">
      {/* Product Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Research Campaign</span>
            <span aria-hidden="true">·</span>
            <span>Academic Software &amp; EdTech</span>
            <span aria-hidden="true">·</span>
            <span className="text-violet-400">Cohort Phase 1 Active</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            {product.name}
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('setup')}
            className="px-4 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Configure Parameters</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className="px-4 py-2 text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Full Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Row - Tabular figures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Synthetic Cohort</span>
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {personas.length}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span>4 Academic archetypes represented</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Syllabus Pain Rating</span>
            <BarChart3 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            4.45 <span className="text-sm font-normal text-slate-400">/ 5.0</span>
          </div>
          <div className="text-xs text-slate-400">
            <span>87% report severe startup friction</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Top Desired Feature</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white truncate" title="AI Syllabus Auto-Extraction">
            AI Syllabus Parser
          </div>
          <div className="text-xs text-slate-400">
            <span>Supported by 94% of synthetic students</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Optimal Monetization</span>
            <DollarSign className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            $14.99 <span className="text-sm font-normal text-slate-400">/ term</span>
          </div>
          <div className="text-xs text-slate-400">
            <span>2.4x higher intent than $4.99/mo</span>
          </div>
        </div>
      </div>

      {/* Research Workflow Pipeline Tracker */}
      <div className="p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm font-semibold text-white">Research Pipeline Status</h2>
            <p className="text-xs text-slate-400">Current progress of synthetic participant sampling, surveys, and insights generation</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {isSimulatedMode ? 'Source: Simulated Baseline' : 'Source: FastAPI Connected'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div
            onClick={() => setActiveTab('setup')}
            className="p-3 rounded-lg border border-slate-800 bg-[#070B14] hover:border-slate-700 cursor-pointer transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">01. Setup</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">Product brief &amp; parameters</p>
          </div>

          <div
            onClick={() => setActiveTab('personas')}
            className="p-3 rounded-lg border border-slate-800 bg-[#070B14] hover:border-slate-700 cursor-pointer transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">02. Personas</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">{personas.length} student profiles generated</p>
          </div>

          <div
            onClick={() => setActiveTab('surveys')}
            className="p-3 rounded-lg border border-slate-800 bg-[#070B14] hover:border-slate-700 cursor-pointer transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">03. Surveys</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">{surveyResults.length} questions aggregated</p>
          </div>

          <div
            onClick={() => setActiveTab('insights')}
            className="p-3 rounded-lg border border-slate-800 bg-[#070B14] hover:border-slate-700 cursor-pointer transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">04. AI Insights</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">{insights.length} synthesis themes</p>
          </div>

          <div
            onClick={() => setActiveTab('reports')}
            className="p-3 rounded-lg border border-slate-800 bg-[#070B14] hover:border-slate-700 cursor-pointer transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">05. Final Report</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">Available for export</p>
          </div>
        </div>
      </div>

      {/* Two Column Section: Key Insights & Featured Personas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Key Findings (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-violet-400" />
              <span>Core Research Findings</span>
            </h2>
            <button
              onClick={() => setActiveTab('insights')}
              className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
            >
              <span>View all insights</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {insights.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-100">{item.title}</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Category: {item.category.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                <div className="pt-2 border-t border-slate-800 text-xs text-violet-300 flex items-center gap-1.5">
                  <span className="font-medium">Strategic Takeaway:</span>
                  <span className="text-slate-300">{item.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Featured Synthetic Personas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-violet-400" />
              <span>Synthetic Cohort</span>
            </h2>
            <button
              onClick={() => setActiveTab('personas')}
              className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
            >
              <span>All personas</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {personas.slice(0, 3).map((persona) => (
              <div
                key={persona.id}
                className="p-4 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={persona.avatarUrl}
                    alt={persona.name}
                    className="w-11 h-11 rounded-lg object-cover border border-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="font-semibold text-sm text-white truncate">{persona.name}</div>
                    <div className="text-xs text-slate-400 truncate">
                      {persona.academicYear} · {persona.major}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {persona.archetype} · {persona.university}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic line-clamp-2">
                  &ldquo;{persona.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 font-mono tabular-nums">
                    {persona.weeklyStudyHours} hrs study/wk
                  </span>
                  <button
                    onClick={() => handleStartInterview(persona.id)}
                    className="text-xs text-violet-400 hover:text-violet-200 font-medium flex items-center gap-1 transition-colors"
                  >
                    <MessageSquareText className="w-3 h-3" />
                    <span>Interview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
