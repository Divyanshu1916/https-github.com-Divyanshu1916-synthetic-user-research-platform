import React, { useState } from 'react';
import { useResearch } from '../context/ResearchContext';
import {
  FileText,
  Download,
  Printer,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Target,
  DollarSign,
  ShieldAlert,
  Info
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const {
    report,
    isGeneratingReport,
    generateReportAction,
    product,
    personas,
    surveyResults,
    insights,
    isSimulatedMode
  } = useResearch();

  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!report) {
    return (
      <div className="p-12 text-center rounded-xl border border-slate-800 bg-[#090E1B] space-y-4 max-w-lg mx-auto">
        <FileText className="w-10 h-10 text-slate-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">No Research Report Generated Yet</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Compile the personas, survey distributions, and AI insights into an executive-ready research dossier.
        </p>
        <button
          onClick={generateReportAction}
          disabled={isGeneratingReport}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          {isGeneratingReport ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>Generate Research Report</span>
        </button>
      </div>
    );
  }

  const handleDownloadMarkdown = () => {
    const md = `# ${report.title}
**Product:** ${report.productName}
**Generated:** ${report.generatedAt}
**Cohort:** ${report.targetCohortSummary}
**Execution Mode:** ${isSimulatedMode ? 'Simulated Synthetic Cohort' : 'Live FastAPI Backend'}

---

## Executive Summary
${report.executiveSummary}

---

## Methodology
${report.methodology}

---

## Key Findings
${report.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

---

## Feature Prioritization (MoSCoW Matrix)
### Must Have (P0)
${report.featurePrioritization.mustHave.map((item) => `- ${item}`).join('\n')}

### Should Have (P1)
${report.featurePrioritization.shouldHave.map((item) => `- ${item}`).join('\n')}

### Could Have (P2)
${report.featurePrioritization.couldHave.map((item) => `- ${item}`).join('\n')}

### Won't Have Right Now (Deprioritized)
${report.featurePrioritization.wontHaveNow.map((item) => `- ${item}`).join('\n')}

---

## Pricing & Packaging Strategy
- **Recommended Price:** ${report.pricingRecommendation.recommendedPrice}
- **Tier Structure:** ${report.pricingRecommendation.tierStructure}
- **Strategic Rationale:** ${report.pricingRecommendation.reasoning}

---

## Risks & Mitigations
${report.risksAndMitigations.map((r, i) => `### Risk ${i + 1}: ${r.risk}\n**Mitigation:** ${r.mitigation}\n`).join('\n')}
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-report-${product.name.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadNotice('Downloaded Markdown report');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const handleDownloadJson = () => {
    const fullExport = {
      product,
      report,
      personas,
      surveyResults,
      insights,
      exportedAt: new Date().toISOString(),
      isSimulated: isSimulatedMode,
    };

    const blob = new Blob([JSON.stringify(fullExport, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-dataset-${product.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadNotice('Downloaded complete JSON research dataset');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Executive Deliverable</span>
            <span aria-hidden="true">·</span>
            <span>Research Dossier</span>
            <span aria-hidden="true">·</span>
            <span className="text-violet-400">Ready for Download</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Comprehensive Research Report
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Export the synthesized findings, feature prioritization matrix, and monetization roadmap.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={generateReportAction}
            disabled={isGeneratingReport}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            title="Re-run POST /generate-report"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingReport ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-violet-400" />
            <span>Markdown (.md)</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dataset (.json)</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-lg flex items-center gap-2 print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Printable Report Document */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#090E1B] border border-slate-800/80 space-y-8 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Document Header */}
        <div className="space-y-3 pb-6 border-b border-slate-800 print:border-neutral-300">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 print:text-neutral-600">
            <span>SYNTHETIC USER RESEARCH DOSSIER</span>
            <span className="tabular-nums">Generated: {new Date(report.generatedAt).toLocaleDateString()}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight">
            {report.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 print:text-neutral-600">
            <span>Product: <strong className="text-slate-200 print:text-black">{report.productName}</strong></span>
            <span>·</span>
            <span>Cohort: <strong>{personas.length} Synthetic Student Personas</strong></span>
            <span>·</span>
            <span className="text-amber-400 print:text-neutral-700">
              {isSimulatedMode ? 'Data: Simulated Research Cohort' : 'Data: Live FastAPI Synthesis'}
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-violet-400 print:text-neutral-900 uppercase tracking-wider">
            01. Executive Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 print:text-neutral-800 leading-relaxed">
            {report.executiveSummary}
          </p>
        </div>

        {/* Methodology */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-violet-400 print:text-neutral-900 uppercase tracking-wider">
            02. Research Methodology &amp; Cohort Modeling
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 print:text-neutral-800 leading-relaxed">
            {report.methodology}
          </p>
          <div className="p-4 rounded-lg bg-[#070B14] border border-slate-800 print:bg-neutral-100 print:border-neutral-300 text-xs text-slate-300 print:text-neutral-800">
            <strong>Target Cohort Profile:</strong> {report.targetCohortSummary}
          </div>
        </div>

        {/* Key Findings Checklist */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-violet-400 print:text-neutral-900 uppercase tracking-wider">
            03. Core Validated Findings
          </h3>
          <div className="space-y-2">
            {report.keyFindings.map((finding, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#070B14] border border-slate-800/80 print:bg-neutral-50 print:border-neutral-200 text-xs text-slate-200 print:text-neutral-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 print:text-emerald-700" />
                <span className="leading-relaxed">{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MoSCoW Feature Matrix */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-violet-400 print:text-neutral-900 uppercase tracking-wider">
            04. MoSCoW Feature Prioritization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#070B14] border border-emerald-500/20 print:border-neutral-300 space-y-2">
              <span className="text-xs font-bold text-emerald-400 print:text-neutral-900 block">
                Must Have (P0)
              </span>
              <ul className="text-xs text-slate-300 print:text-neutral-800 space-y-1.5 list-disc list-inside">
                {report.featurePrioritization.mustHave.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-[#070B14] border border-violet-500/20 print:border-neutral-300 space-y-2">
              <span className="text-xs font-bold text-violet-400 print:text-neutral-900 block">
                Should Have (P1)
              </span>
              <ul className="text-xs text-slate-300 print:text-neutral-800 space-y-1.5 list-disc list-inside">
                {report.featurePrioritization.shouldHave.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-[#070B14] border border-slate-800 print:border-neutral-300 space-y-2">
              <span className="text-xs font-bold text-slate-300 print:text-neutral-900 block">
                Could Have (P2)
              </span>
              <ul className="text-xs text-slate-400 print:text-neutral-700 space-y-1.5 list-disc list-inside">
                {report.featurePrioritization.couldHave.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-[#070B14] border border-rose-500/20 print:border-neutral-300 space-y-2">
              <span className="text-xs font-bold text-rose-400 print:text-neutral-900 block">
                Won&apos;t Have Right Now
              </span>
              <ul className="text-xs text-slate-400 print:text-neutral-700 space-y-1.5 list-disc list-inside">
                {report.featurePrioritization.wontHaveNow.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing & Packaging Strategy */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-violet-400 print:text-neutral-900 uppercase tracking-wider">
            05. Recommended Pricing &amp; Packaging Architecture
          </h3>
          <div className="p-5 rounded-xl bg-[#070B14] border border-violet-500/30 print:bg-neutral-100 print:border-neutral-300 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs text-slate-400 print:text-neutral-600">Optimal Pricing Recommendation:</span>
              <span className="text-base font-bold text-emerald-400 print:text-neutral-900 font-mono">
                {report.pricingRecommendation.recommendedPrice}
              </span>
            </div>
            <div className="text-xs text-slate-300 print:text-neutral-800 leading-relaxed">
              <strong>Tier Breakdown:</strong> {report.pricingRecommendation.tierStructure}
            </div>
            <p className="text-xs text-slate-400 print:text-neutral-700 leading-relaxed pt-2 border-t border-slate-800 print:border-neutral-300">
              <strong>Strategic Rationale:</strong> {report.pricingRecommendation.reasoning}
            </p>
          </div>
        </div>

        {/* Risks & Mitigations */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-violet-400 print:text-neutral-900 uppercase tracking-wider">
            06. Key Risks &amp; Mitigations
          </h3>
          <div className="space-y-3">
            {report.risksAndMitigations.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#070B14] border border-slate-800 print:bg-neutral-50 print:border-neutral-200 space-y-1.5 text-xs"
              >
                <div className="text-rose-300 print:text-rose-700 font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Risk #{idx + 1}: {item.risk}</span>
                </div>
                <div className="text-slate-300 print:text-neutral-800 pl-5 leading-relaxed">
                  <strong>Mitigation Strategy:</strong> {item.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signoff */}
        <div className="pt-6 border-t border-slate-800 print:border-neutral-300 flex items-center justify-between text-xs text-slate-500 print:text-neutral-500 font-mono">
          <span>Synthetic User Research Platform · AI Studio</span>
          <span>Status: Verified &amp; Synthesized</span>
        </div>
      </div>
    </div>
  );
};
