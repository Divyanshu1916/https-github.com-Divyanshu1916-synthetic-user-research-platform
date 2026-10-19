import React, { useState } from 'react';
import { useResearch } from '../context/ResearchContext';
import {
  SlidersHorizontal,
  Plus,
  Trash2,
  Sparkles,
  Users,
  Check,
  RefreshCw,
  Server,
  AlertCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { INITIAL_PRODUCT_DETAILS } from '../data/mockData';

export const ResearchSetupView: React.FC = () => {
  const {
    product,
    setProduct,
    isGeneratingPersonas,
    generatePersonasAction,
    runSurveyAction,
    generateInsightsAction,
    generateReportAction,
    setActiveTab,
    isSimulatedMode,
    setApiConfigModalOpen,
    apiHealth
  } = useResearch();

  const [newObjective, setNewObjective] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<string>('');

  const handleAddObjective = () => {
    if (!newObjective.trim()) return;
    setProduct((prev) => ({
      ...prev,
      objectives: [...prev.objectives, newObjective.trim()],
    }));
    setNewObjective('');
  };

  const handleRemoveObjective = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setProduct((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleRestoreDefaults = () => {
    setProduct(INITIAL_PRODUCT_DETAILS);
  };

  const handleRunFullPipeline = async () => {
    setPipelineRunning(true);
    try {
      setPipelineStep('Step 1/4: Synthesizing student persona cohort...');
      await generatePersonasAction();

      setPipelineStep('Step 2/4: Administering structured survey to synthetic cohort...');
      await runSurveyAction();

      setPipelineStep('Step 3/4: Synthesizing friction points and feature opportunities...');
      await generateInsightsAction();

      setPipelineStep('Step 4/4: Compiling research report...');
      await generateReportAction();

      setPipelineStep('Research synthesis complete!');
      setTimeout(() => {
        setPipelineRunning(false);
        setActiveTab('personas');
      }, 1000);
    } catch {
      setPipelineRunning(false);
      setPipelineStep('Pipeline interrupted.');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Research Configuration</span>
            <span aria-hidden="true">·</span>
            <span>Product Brief &amp; Cohort Scope</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Research Setup &amp; Prompt Parameters
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Specify the product specifications, audience profile, core features, and test cohort size before generating personas.
          </p>
        </div>

        <button
          onClick={handleRestoreDefaults}
          className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 transition-colors self-start sm:self-auto"
        >
          Reset to Smart Student Planner Defaults
        </button>
      </div>

      {/* Main Form Cards */}
      <div className="space-y-6">
        {/* Product Details Section */}
        <div className="p-6 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" />
            <span>01. Product Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Product Name
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="w-full bg-[#070B14] border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                placeholder="e.g. Smart Student Planner"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                One-Line Value Proposition
              </label>
              <input
                type="text"
                value={product.tagline}
                onChange={(e) => setProduct({ ...product, tagline: e.target.value })}
                className="w-full bg-[#070B14] border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                placeholder="e.g. AI-driven syllabus parsing and LMS sync"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Product Description &amp; Core Value Proposition
            </label>
            <textarea
              rows={3}
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="w-full bg-[#070B14] border border-slate-700/80 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 leading-relaxed"
              placeholder="Describe the product mechanics, workflow integration, and main benefit..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Target Audience Definition
            </label>
            <input
              type="text"
              value={product.targetAudience}
              onChange={(e) => setProduct({ ...product, targetAudience: e.target.value })}
              className="w-full bg-[#070B14] border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="e.g. Undergraduate and graduate university students juggling coursework and jobs"
            />
          </div>
        </div>

        {/* Features & Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Research Objectives */}
          <div className="p-6 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">02. Research Objectives</h2>
              <span className="text-[11px] font-mono text-slate-400">
                {product.objectives.length} active
              </span>
            </div>

            <p className="text-xs text-slate-400">
              What critical hypotheses or assumptions do you want the synthetic cohort to challenge?
            </p>

            <div className="space-y-2">
              {product.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-slate-200"
                >
                  <span className="flex-1 leading-snug">{obj}</span>
                  <button
                    onClick={() => handleRemoveObjective(idx)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                    title="Remove objective"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddObjective()}
                placeholder="Add another research hypothesis..."
                className="flex-1 bg-[#070B14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={handleAddObjective}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Core Features */}
          <div className="p-6 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">03. Core Features to Test</h2>
              <span className="text-[11px] font-mono text-slate-400">
                {product.features.length} features
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Key capabilities submitted to the synthetic personas for desirability &amp; willingness-to-pay scoring.
            </p>

            <div className="space-y-2">
              {product.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-slate-200"
                >
                  <span className="flex-1 leading-snug">{feat}</span>
                  <button
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                    title="Remove feature"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                placeholder="Add feature capability..."
                className="flex-1 bg-[#070B14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={handleAddFeature}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cohort Sampling Size */}
        <div className="p-6 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-violet-400" />
                <span>04. Synthetic Cohort Size</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Number of unique synthetic student personas to generate and survey.
              </p>
            </div>
            <div className="text-xl font-bold font-mono text-violet-300 tabular-nums">
              {product.personaCount} Personas
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={2}
              max={12}
              step={1}
              value={product.personaCount}
              onChange={(e) => setProduct({ ...product, personaCount: Number(e.target.value) })}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>2 (Focused Core)</span>
              <span>4 (Default Archetypes)</span>
              <span>8 (Expanded Cross-Discipline)</span>
              <span>12 (Comprehensive Cohort)</span>
            </div>
          </div>
        </div>

        {/* Execution & Launch Card */}
        <div className="p-6 rounded-xl bg-[#0B1224] border border-violet-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-violet-300 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Execute Synthetic Research</span>
              </div>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {isSimulatedMode
                  ? 'Running in Simulated Mode. Instant generation using curated student personas and survey synthesis algorithms.'
                  : `Targeting live FastAPI backend at ${apiHealth?.baseUrl || 'configured URL'}. Dispatches real HTTP requests to /generate-personas, /survey, /insights.`}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={generatePersonasAction}
                disabled={isGeneratingPersonas || pipelineRunning}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700 flex items-center gap-2"
              >
                {isGeneratingPersonas ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Users className="w-3.5 h-3.5" />
                )}
                <span>Generate Personas Only</span>
              </button>

              <button
                onClick={handleRunFullPipeline}
                disabled={pipelineRunning || isGeneratingPersonas}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all shadow-md flex items-center gap-2"
              >
                {pipelineRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>Launch Full Research Run</span>
              </button>
            </div>
          </div>

          {pipelineRunning && (
            <div className="pt-3 border-t border-violet-500/20 flex items-center gap-3 text-xs text-violet-300 font-mono">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{pipelineStep}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
