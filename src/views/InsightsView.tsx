import React, { useState } from 'react';
import { useResearch } from '../context/ResearchContext';
import {
  Lightbulb,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldAlert,
  Target,
  Zap,
  Info
} from 'lucide-react';

export const InsightsView: React.FC = () => {
  const {
    insights,
    featureOpportunities,
    isGeneratingInsights,
    generateInsightsAction,
    isSimulatedMode
  } = useResearch();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Insights' },
    { id: 'core_bottleneck', label: 'Core Bottlenecks' },
    { id: 'market_validation', label: 'Market Validation' },
    { id: 'churn_risk', label: 'Churn & Trust Risks' },
    { id: 'feature_priority', label: 'Feature Priorities' },
  ];

  const filteredInsights = insights.filter(
    (ins) => categoryFilter === 'all' || ins.category === categoryFilter
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Research Synthesis</span>
            <span aria-hidden="true">·</span>
            <span>AI Thematic Clustering</span>
            <span aria-hidden="true">·</span>
            <span className="text-violet-400">Smart Student Planner Strategy</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Research Insights &amp; Strategic Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesized product findings, friction patterns, feature opportunity quadrants, and risk mitigations derived from the synthetic student cohort.
          </p>
        </div>

        <button
          onClick={generateInsightsAction}
          disabled={isGeneratingInsights}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          {isGeneratingInsights ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>Regenerate Insights</span>
        </button>
      </div>

      {/* Feature Opportunity Matrix (2x2 Grid) */}
      <div className="p-6 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-400" />
              <span>Feature Opportunity Matrix (Impact vs Implementation Effort)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Balancing synthetic student desirability against engineering complexity.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            5 Features Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Quick Wins */}
          <div className="p-4 rounded-lg bg-[#070B14] border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>Quick Wins (High Desirability / Low Effort)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Sprint 1 Target</span>
            </div>
            <div className="space-y-2 pt-1">
              {featureOpportunities
                .filter((f) => f.quadrant === 'Quick Win')
                .map((f, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-medium text-slate-200">{f.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Support: {f.personaSupportPercent}% of cohort
                      </div>
                    </div>
                    <div className="text-right font-mono text-emerald-300 font-bold tabular-nums">
                      {f.desirabilityScore} / 10
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Core Bets */}
          <div className="p-4 rounded-lg bg-[#070B14] border border-violet-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-violet-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />
                <span>Core Bets (High Desirability / Medium-High Effort)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">P0 Roadmap</span>
            </div>
            <div className="space-y-2 pt-1">
              {featureOpportunities
                .filter((f) => f.quadrant === 'Core Bet')
                .map((f, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-medium text-slate-200">{f.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Support: {f.personaSupportPercent}% of cohort
                      </div>
                    </div>
                    <div className="text-right font-mono text-violet-300 font-bold tabular-nums">
                      {f.desirabilityScore} / 10
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Nice to Have */}
          <div className="p-4 rounded-lg bg-[#070B14] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />
                <span>Nice to Have (Moderate Desirability / Low Effort)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Backlog</span>
            </div>
            <div className="space-y-2 pt-1">
              {featureOpportunities
                .filter((f) => f.quadrant === 'Nice to Have')
                .map((f, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-medium text-slate-200">{f.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Support: {f.personaSupportPercent}% of cohort
                      </div>
                    </div>
                    <div className="text-right font-mono text-slate-300 font-bold tabular-nums">
                      {f.desirabilityScore} / 10
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Reconsider */}
          <div className="p-4 rounded-lg bg-[#070B14] border border-rose-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                <span>Deprioritize / Reconsider (High Effort / Low Value)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Deprioritize</span>
            </div>
            <div className="space-y-2 pt-1">
              {featureOpportunities
                .filter((f) => f.quadrant === 'Reconsider')
                .map((f, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-medium text-slate-200">{f.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Support: {f.personaSupportPercent}% of cohort
                      </div>
                    </div>
                    <div className="text-right font-mono text-rose-300 font-bold tabular-nums">
                      {f.desirabilityScore} / 10
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thematic Synthesis Filter */}
      <div className="flex items-center gap-1 p-1 bg-[#090E1B] border border-slate-800 rounded-lg overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              categoryFilter === cat.id
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredInsights.map((insight) => (
          <div
            key={insight.id}
            className="p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 hover:border-slate-700 transition-colors space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-mono text-violet-400">
                  {insight.category.replace('_', ' ').toUpperCase()}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    insight.severity === 'high'
                      ? 'border-rose-500/30 text-rose-300 bg-rose-500/10'
                      : insight.severity === 'opportunity'
                      ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
                      : 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                  }`}
                >
                  {insight.severity === 'high'
                    ? 'Critical Friction'
                    : insight.severity === 'opportunity'
                    ? 'Growth Opportunity'
                    : 'Design Consideration'}
                </span>
              </div>

              <h2 className="text-base font-semibold text-white leading-snug">
                {insight.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                {insight.description}
              </p>

              {/* Quantitative Evidence */}
              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Synthetic Evidence Base
                </span>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {insight.evidence}
                </p>
              </div>

              {/* Affected Personas */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Resonates with:</span>
                <div className="flex flex-wrap gap-1">
                  {insight.affectedPersonas.map((name, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Recommendation */}
            <div className="pt-3 border-t border-slate-800 text-xs text-violet-200 bg-violet-950/20 p-3 rounded-lg border border-violet-500/20 space-y-1">
              <span className="font-semibold text-violet-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Actionable Recommendation:</span>
              </span>
              <p className="text-slate-300 leading-relaxed">{insight.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
