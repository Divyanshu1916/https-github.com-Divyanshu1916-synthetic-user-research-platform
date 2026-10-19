import React, { useState } from 'react';
import { useResearch } from '../context/ResearchContext';
import { SyntheticPersona } from '../types';
import {
  Users,
  MessageSquareText,
  Clock,
  Briefcase,
  GraduationCap,
  BookOpen,
  DollarSign,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  X,
  Code
} from 'lucide-react';

export const PersonasView: React.FC = () => {
  const {
    personas,
    selectedPersona,
    setSelectedPersona,
    setActiveTab,
    isGeneratingPersonas,
    generatePersonasAction,
    isSimulatedMode
  } = useResearch();

  const [archetypeFilter, setArchetypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectModalPersona, setInspectModalPersona] = useState<SyntheticPersona | null>(null);

  const archetypes = [
    { id: 'all', label: 'All Archetypes' },
    { id: 'Overachiever', label: 'Overachiever' },
    { id: 'Struggling Balancer', label: 'Struggling Balancer' },
    { id: 'Tech-Savvy Optimizer', label: 'Tech Optimizer' },
    { id: 'Non-Traditional / Working', label: 'Working Student' },
  ];

  const filteredPersonas = personas.filter((p) => {
    const matchesArchetype =
      archetypeFilter === 'all' || p.archetype === archetypeFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.university.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArchetype && matchesSearch;
  });

  const handleStartInterview = (persona: SyntheticPersona) => {
    setSelectedPersona(persona);
    setActiveTab('interviews');
  };

  return (
    <div className="space-y-6">
      {/* Top bar & summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Synthetic Cohort</span>
            <span aria-hidden="true">·</span>
            <span>{personas.length} Generated Personas</span>
            <span aria-hidden="true">·</span>
            <span className="text-violet-400">Smart Student Planner Target Market</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Synthetic Student Personas
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Independently simulated student personas with unique schedules, tools, academic stress tolerances, and willingness-to-pay.
          </p>
        </div>

        <button
          onClick={generatePersonasAction}
          disabled={isGeneratingPersonas}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          {isGeneratingPersonas ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>Regenerate Cohort</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Segmented archetype buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#090E1B] border border-slate-800 rounded-lg overflow-x-auto">
          {archetypes.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setArchetypeFilter(arch.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                archetypeFilter === arch.id
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {arch.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by major, school, name..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#090E1B] border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Personas Grid */}
      {filteredPersonas.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-slate-800 bg-[#090E1B] space-y-3">
          <Users className="w-8 h-8 text-slate-500 mx-auto" />
          <div className="text-sm font-semibold text-white">No personas match your criteria</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try resetting your search query or archetype filter to view the available personas.
          </p>
          <button
            onClick={() => {
              setArchetypeFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-violet-400 hover:text-violet-300 underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPersonas.map((persona) => (
            <div
              key={persona.id}
              className="p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              {/* Header profile info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={persona.avatarUrl}
                      alt={persona.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-base text-white">{persona.name}</h2>
                        <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          Simulated Persona
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        {persona.academicYear} · {persona.major}
                      </div>
                      <div className="text-xs text-slate-400">
                        {persona.university} · Age {persona.age}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {persona.archetype}
                  </span>
                </div>

                {/* Quote */}
                <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800/80 text-xs text-slate-300 italic leading-relaxed">
                  &ldquo;{persona.quote}&rdquo;
                </div>

                {/* Key stats breakdown */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                    <div className="text-[11px] text-slate-400">Study Load</div>
                    <div className="text-xs font-bold text-slate-200 tabular-nums">
                      {persona.weeklyStudyHours} hrs/wk
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                    <div className="text-[11px] text-slate-400">Credits</div>
                    <div className="text-xs font-bold text-slate-200 tabular-nums">
                      {persona.creditHours} units
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                    <div className="text-[11px] text-slate-400">Willingness-to-Pay</div>
                    <div className="text-xs font-bold text-emerald-300 tabular-nums">
                      {persona.willingnessToPayMonthly === 0
                        ? '$0 (Free only)'
                        : `$${persona.willingnessToPayMonthly.toFixed(2)}/mo`}
                    </div>
                  </div>
                </div>

                {/* Tools currently used */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-slate-400 font-medium">Current Tools Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {persona.currentTools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary pain point */}
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400 font-medium">Top Bottleneck</div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {persona.primaryPainPoints[0]}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => setInspectModalPersona(persona)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Inspect Trait Breakdown</span>
                </button>

                <button
                  onClick={() => handleStartInterview(persona)}
                  className="px-3.5 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>Interview Persona</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Persona Detail Modal */}
      {inspectModalPersona && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-[#0B101E] border border-slate-800 rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070B14]">
              <div className="flex items-center gap-3">
                <img
                  src={inspectModalPersona.avatarUrl}
                  alt={inspectModalPersona.name}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                />
                <div>
                  <h3 className="font-bold text-white text-base">{inspectModalPersona.name}</h3>
                  <p className="text-xs text-slate-400">
                    {inspectModalPersona.academicYear} · {inspectModalPersona.major}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectModalPersona(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
              {/* Persona Trait Bars */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                  Psychographic &amp; Behavioral Traits
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Organization Discipline</span>
                      <span className="font-mono tabular-nums">{inspectModalPersona.traits.organization}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div
                        className="bg-violet-500 h-1.5 rounded-full"
                        style={{ width: `${inspectModalPersona.traits.organization}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Tech Adoption &amp; Tool Openness</span>
                      <span className="font-mono tabular-nums">{inspectModalPersona.traits.techAdoption}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div
                        className="bg-violet-500 h-1.5 rounded-full"
                        style={{ width: `${inspectModalPersona.traits.techAdoption}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Stress Tolerance / Exam Anxiety</span>
                      <span className="font-mono tabular-nums">{inspectModalPersona.traits.stressTolerance}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{ width: `${inspectModalPersona.traits.stressTolerance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* All Pain Points */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                  All Identified Pain Points
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                  {inspectModalPersona.primaryPainPoints.map((p, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Goals */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                  Core Semester Goals
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                  {inspectModalPersona.coreGoals.map((g, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Raw JSON inspection */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="font-semibold text-slate-400 text-[11px] font-mono">
                  Raw Persona JSON Object
                </h4>
                <pre className="p-3 bg-[#070B14] border border-slate-800 rounded-lg text-[10px] font-mono text-slate-400 max-h-36 overflow-auto">
                  {JSON.stringify(inspectModalPersona, null, 2)}
                </pre>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-slate-800 bg-[#070B14] flex justify-end gap-2">
              <button
                onClick={() => setInspectModalPersona(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const p = inspectModalPersona;
                  setInspectModalPersona(null);
                  handleStartInterview(p);
                }}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>Start 1-on-1 Interview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
