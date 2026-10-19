import React, { useState } from 'react';
import { useResearch } from '../../context/ResearchContext';
import {
  X,
  Server,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Code2,
  ExternalLink,
  Sliders,
  ChevronRight,
  Database
} from 'lucide-react';

export const ApiConfigModal: React.FC = () => {
  const {
    apiBaseUrl,
    setApiBaseUrlState,
    apiHealth,
    isCheckingHealth,
    checkHealthNow,
    isSimulatedMode,
    setIsSimulatedMode,
    apiConfigModalOpen,
    setApiConfigModalOpen,
    lastApiLog,
    resetAllToSimulatedDemo
  } = useResearch();

  const [inputUrl, setInputUrl] = useState(apiBaseUrl);
  const [activeTab, setActiveTab] = useState<'connection' | 'endpoints' | 'logs'>('connection');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  if (!apiConfigModalOpen) return null;

  const handleSaveAndTest = async () => {
    setApiBaseUrlState(inputUrl);
    setSaveMessage('Saved! Testing connection...');
    const result = await checkHealthNow(inputUrl);
    if (result.online) {
      setSaveMessage(`Connected successfully (${result.latencyMs}ms)`);
    } else {
      setSaveMessage(`Offline: ${result.errorMessage || 'Unable to connect'}`);
    }
    setTimeout(() => setSaveMessage(null), 4000);
  };

  const presetUrls = [
    { label: 'Localhost (8000)', url: 'http://localhost:8000' },
    { label: 'Localhost (8080)', url: 'http://localhost:8080' },
    { label: 'Local Loopback (127.0.0.1)', url: 'http://127.0.0.1:8000' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#0B101E] border border-slate-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#070B14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">FastAPI Backend Configuration</h3>
              <p className="text-xs text-slate-400">Configure base URL, test endpoints, or switch to simulated demo mode</p>
            </div>
          </div>
          <button
            onClick={() => setApiConfigModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-800 bg-[#090D18]">
          <button
            onClick={() => setActiveTab('connection')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'connection'
                ? 'border-violet-500 text-violet-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Connection & Mode
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'endpoints'
                ? 'border-violet-500 text-violet-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Endpoint Specs
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'logs'
                ? 'border-violet-500 text-violet-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Last Request Inspector
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'connection' && (
            <div className="space-y-6">
              {/* Mode switch */}
              <div className="p-4 rounded-lg border border-slate-800 bg-[#070B14]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-violet-400" />
                    <span className="font-semibold text-slate-200">Execution Mode</span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    isSimulatedMode
                      ? 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                      : 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
                  }`}>
                    {isSimulatedMode ? 'Simulated Demo Mode' : 'Live FastAPI Backend'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  When your FastAPI backend is running locally or on a server, connect to it directly. If it is offline or in development, you can use the realistic simulated demo mode.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsSimulatedMode(true)}
                    className={`px-3 py-2 rounded-md text-xs font-medium text-left transition-colors border ${
                      isSimulatedMode
                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-200'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold">Simulated Demo Mode</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Use pre-configured student dataset & instant local agent</div>
                  </button>
                  <button
                    onClick={() => {
                      setIsSimulatedMode(false);
                      checkHealthNow(inputUrl);
                    }}
                    className={`px-3 py-2 rounded-md text-xs font-medium text-left transition-colors border ${
                      !isSimulatedMode
                        ? 'border-violet-500/50 bg-violet-500/10 text-violet-200'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold">Live FastAPI Backend</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Sends HTTP requests to your configured base URL</div>
                  </button>
                </div>
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  FastAPI Base URL (<code className="text-violet-300 font-mono">VITE_API_BASE_URL</code>)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="http://localhost:8000"
                    className="flex-1 bg-[#070B14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    onClick={handleSaveAndTest}
                    disabled={isCheckingHealth}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {isCheckingHealth ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Testing...</span>
                      </>
                    ) : (
                      <>
                        <span>Test & Save</span>
                      </>
                    )}
                  </button>
                </div>

                {saveMessage && (
                  <p className="text-xs text-violet-300 font-mono mt-1">{saveMessage}</p>
                )}

                {/* Preset shortcuts */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
                  <span>Presets:</span>
                  {presetUrls.map((p) => (
                    <button
                      key={p.url}
                      onClick={() => setInputUrl(p.url)}
                      className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] rounded transition-colors font-mono"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Report Card */}
              <div className="p-4 rounded-lg border border-slate-800 bg-[#070B14] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Backend Health Status (GET /health)</span>
                  <button
                    onClick={() => checkHealthNow(inputUrl)}
                    disabled={isCheckingHealth}
                    className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isCheckingHealth ? 'animate-spin' : ''}`} />
                    <span>Check again</span>
                  </button>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-md bg-[#0B101E] border border-slate-800">
                  {apiHealth?.online ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium">
                      <span className={apiHealth?.online ? 'text-emerald-300' : 'text-amber-300'}>
                        {apiHealth?.online ? 'Backend Connected' : 'Backend Unreachable / Offline'}
                      </span>
                      {apiHealth?.latencyMs !== undefined && (
                        <span className="text-xs text-slate-500 font-mono">
                          {apiHealth.latencyMs}ms response
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {apiHealth?.online
                        ? `FastAPI responded with healthy status on ${apiHealth.baseUrl}. Ready to dispatch live synthetic research requests.`
                        : `Could not reach ${apiHealth?.baseUrl || inputUrl}/health. Make sure your Python FastAPI server is running with CORS enabled (e.g. uvicorn main:app --reload --port 8000).`}
                    </p>
                    {apiHealth?.errorMessage && (
                      <div className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                        {apiHealth.errorMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick reset */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800">
                <span>Need to reset state back to default simulated data?</span>
                <button
                  onClick={resetAllToSimulatedDemo}
                  className="text-slate-400 hover:text-slate-200 underline"
                >
                  Reset Demo Dataset
                </button>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                The frontend communicates with the following FastAPI contract. All endpoints accept JSON and return structured responses:
              </p>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 bg-[#070B14] border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px]">GET</span>
                    <span>/health</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400">Pings server readiness. Returns 200 OK.</p>
                </div>

                <div className="p-3 bg-[#070B14] border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold mb-1">
                    <span className="px-1.5 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-[10px]">POST</span>
                    <span>/generate-personas</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400">
                    Body: <code className="text-slate-300">&#123; product_name, product_description, target_audience, objectives, features, persona_count &#125;</code>
                  </p>
                </div>

                <div className="p-3 bg-[#070B14] border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold mb-1">
                    <span className="px-1.5 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-[10px]">POST</span>
                    <span>/survey</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400">
                    Body: <code className="text-slate-300">&#123; personas, questions &#125;</code>. Returns aggregate distributions and persona quotes.
                  </p>
                </div>

                <div className="p-3 bg-[#070B14] border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold mb-1">
                    <span className="px-1.5 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-[10px]">POST</span>
                    <span>/interview</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400">
                    Body: <code className="text-slate-300">&#123; persona_id, persona, message, history, product_context &#125;</code>. Returns conversational reply.
                  </p>
                </div>

                <div className="p-3 bg-[#070B14] border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold mb-1">
                    <span className="px-1.5 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-[10px]">POST</span>
                    <span>/insights</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400">
                    Body: <code className="text-slate-300">&#123; product_name, personas, survey_results, objectives &#125;</code>.
                  </p>
                </div>

                <div className="p-3 bg-[#070B14] border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold mb-1">
                    <span className="px-1.5 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-[10px]">POST</span>
                    <span>/generate-report</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400">
                    Body: <code className="text-slate-300">&#123; product_name, target_audience, objectives, personas, survey_results, insights &#125;</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              {lastApiLog ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-violet-400">{lastApiLog.method}</span>
                      <span className="text-white font-semibold">{lastApiLog.endpoint}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-mono">
                      <span>{lastApiLog.timestamp}</span>
                      <span>·</span>
                      <span className="tabular-nums">{lastApiLog.durationMs}ms</span>
                    </div>
                  </div>

                  {lastApiLog.error && (
                    <div className="p-3 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs">
                      {lastApiLog.error}
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-1">Request Payload</span>
                    <pre className="p-3 rounded-md bg-[#070B14] border border-slate-800 text-[11px] font-mono text-slate-300 max-h-40 overflow-auto">
                      {JSON.stringify(lastApiLog.requestPayload, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-1">Response Data</span>
                    <pre className="p-3 rounded-md bg-[#070B14] border border-slate-800 text-[11px] font-mono text-emerald-300 max-h-48 overflow-auto">
                      {JSON.stringify(lastApiLog.responsePayload, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-500">
                  No API calls logged yet in this session.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800/80 bg-[#070B14] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {isSimulatedMode ? (
              <span className="text-amber-400">Mode: Simulated Demo Data</span>
            ) : (
              <span className="text-emerald-400">Mode: Live FastAPI Backend</span>
            )}
          </div>
          <button
            onClick={() => setApiConfigModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
