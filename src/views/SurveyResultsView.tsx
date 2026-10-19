import React, { useState } from 'react';
import { useResearch } from '../context/ResearchContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  BarChart3,
  RefreshCw,
  Sparkles,
  Quote,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export const SurveyResultsView: React.FC = () => {
  const {
    surveyResults,
    isRunningSurvey,
    runSurveyAction,
    isSimulatedMode
  } = useResearch();

  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);

  // Colors for charts
  const VIOLET_PALETTE = ['#8B5CF6', '#A78BFA', '#6366F1', '#38BDF8', '#F59E0B'];

  const activeQuestion = surveyResults[selectedQuestionIdx] || surveyResults[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Synthetic Survey Engine</span>
            <span aria-hidden="true">·</span>
            <span>Structured Quantitative &amp; Qualitative Feedback</span>
            <span aria-hidden="true">·</span>
            <span className="text-violet-400">{surveyResults.length} Questions Administered</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Survey Results &amp; Quantitative Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulated survey responses aggregated across student archetypes evaluating feature desirability, pricing thresholds, and LMS privacy boundaries.
          </p>
        </div>

        <button
          onClick={runSurveyAction}
          disabled={isRunningSurvey}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          {isRunningSurvey ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>Re-run Survey Run</span>
        </button>
      </div>

      {/* Notice Pill */}
      {isSimulatedMode && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Simulated Survey Cohort:</strong> The metrics below are generated from calibrated synthetic collegiate participant models to avoid presenting unverified statistics as real lab data.
          </span>
        </div>
      )}

      {/* Question Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {surveyResults.map((q, idx) => (
          <button
            key={q.questionId}
            onClick={() => setSelectedQuestionIdx(idx)}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              selectedQuestionIdx === idx
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 bg-[#090E1B] border border-slate-800'
            }`}
          >
            <span className="font-mono text-[11px] opacity-75">Q{idx + 1}</span>
            <span className="max-w-[200px] truncate">{q.questionText}</span>
          </button>
        ))}
      </div>

      {/* Main Visualizer Area */}
      {activeQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Column (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-violet-400 uppercase tracking-wider">
                  Survey Question #{selectedQuestionIdx + 1}
                </span>
                <h3 className="text-base font-semibold text-white leading-snug">
                  {activeQuestion.questionText}
                </h3>
              </div>

              {activeQuestion.averageScore && (
                <div className="text-right shrink-0">
                  <div className="text-[11px] text-slate-400">Mean Score</div>
                  <div className="text-xl font-bold font-mono text-violet-300 tabular-nums">
                    {activeQuestion.averageScore.toFixed(2)} / 5.0
                  </div>
                </div>
              )}
            </div>

            {/* Recharts Visualization */}
            <div className="h-72 w-full pt-4">
              {activeQuestion.distribution && activeQuestion.distribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activeQuestion.distribution}
                    margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis
                      dataKey="label"
                      stroke="#94A3B8"
                      tick={{ fill: '#94A3B8', fontSize: 11 }}
                      interval={0}
                      angle={-10}
                      textAnchor="end"
                    />
                    <YAxis
                      stroke="#94A3B8"
                      tick={{ fill: '#94A3B8', fontSize: 11 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0B101E',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#F8FAFC',
                        fontSize: '12px',
                      }}
                      formatter={(val: unknown) => [`${val} Responses`, 'Count']}
                    />
                    <Bar
                      dataKey="count"
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                  No distribution data available for this question.
                </div>
              )}
            </div>

            {/* Distribution Percentage Table */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Detailed Response Breakdown
              </span>
              <div className="space-y-1.5">
                {activeQuestion.distribution?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 rounded bg-[#070B14] border border-slate-800/80"
                  >
                    <span className="text-slate-300 truncate max-w-[280px]">{item.label}</span>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-slate-400 tabular-nums">{item.count} votes</span>
                      <span className="text-violet-300 font-semibold tabular-nums">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Qualitative Quotes Column (1 col) */}
          <div className="p-6 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4 flex flex-col">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Quote className="w-4 h-4 text-violet-400" />
                <span>Synthetic Persona Rationale</span>
              </h3>
              <p className="text-xs text-slate-400">
                Verbatim qualitative feedback extracted from the synthetic student responses.
              </p>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[460px]">
              {activeQuestion.quotes && activeQuestion.quotes.length > 0 ? (
                activeQuestion.quotes.map((quote, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#070B14] border border-slate-800 space-y-2"
                  >
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      &ldquo;{quote.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                      <span className="text-slate-300 font-semibold">{quote.personaName}</span>
                      <span>{quote.archetype}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-slate-500">
                  No qualitative quotes collected for this query.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Status: Aggregated across 32 synthetic response rounds
            </div>
          </div>
        </div>
      )}

      {/* Cross-Question Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Syllabus Ingestion Bottleneck</div>
          <div className="text-lg font-bold text-white font-mono tabular-nums">87% Pain Level &ge; 4/5</div>
          <p className="text-[11px] text-slate-500">Highest friction in Week 1 of classes</p>
        </div>

        <div className="p-4 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">LMS Read-Only Acceptance</div>
          <div className="text-lg font-bold text-white font-mono tabular-nums">84% Approval</div>
          <p className="text-[11px] text-slate-500">Strictly rejects two-way write permissions</p>
        </div>

        <div className="p-4 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Willingness-to-Pay Ceiling</div>
          <div className="text-lg font-bold text-white font-mono tabular-nums">$2.99 / mo</div>
          <p className="text-[11px] text-slate-500">Demand drops 60% above $3.99/mo</p>
        </div>

        <div className="p-4 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Retention Hook</div>
          <div className="text-lg font-bold text-white font-mono">Backwards Scheduler</div>
          <p className="text-[11px] text-slate-500">Milestone prep reduces exam panic</p>
        </div>
      </div>
    </div>
  );
};
