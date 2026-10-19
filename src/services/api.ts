import {
  SyntheticPersona,
  ProductDetails,
  SurveyQuestion,
  SurveyAggregation,
  ResearchInsight,
  ResearchReport,
  ApiHealthStatus,
  InterviewMessage
} from '../types';
import {
  INITIAL_PERSONAS,
  INITIAL_SURVEY_AGGREGATIONS,
  INITIAL_RESEARCH_INSIGHTS,
  INITIAL_REPORT
} from '../data/mockData';

const DEFAULT_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  'http://localhost:8000';

export const getStoredBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('syn_research_api_url');
    if (saved) return saved.trim();
  }
  return DEFAULT_BASE_URL;
};

export const setStoredBaseUrl = (url: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('syn_research_api_url', url.trim());
  }
};

/**
 * Health check on the FastAPI backend
 * GET /health
 */
export async function checkBackendHealth(baseUrl: string): Promise<ApiHealthStatus> {
  const cleanUrl = baseUrl.replace(/\/+$/, '');
  const startTime = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${cleanUrl}/health`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const latencyMs = Math.round(performance.now() - startTime);

    if (!res.ok) {
      return {
        online: false,
        baseUrl: cleanUrl,
        latencyMs,
        errorMessage: `HTTP ${res.status}: ${res.statusText}`,
        checkedAt: new Date().toISOString(),
      };
    }

    const data = await res.json().catch(() => ({}));
    return {
      online: true,
      baseUrl: cleanUrl,
      latencyMs,
      backendDetails: data,
      checkedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed';
    return {
      online: false,
      baseUrl: cleanUrl,
      latencyMs: Math.round(performance.now() - startTime),
      errorMessage: message.includes('abort') ? 'Connection timed out (4s)' : message,
      checkedAt: new Date().toISOString(),
    };
  }
}

/**
 * Generate synthetic personas
 * POST /generate-personas
 */
export async function generatePersonasApi(
  baseUrl: string,
  productDetails: ProductDetails
): Promise<{ personas: SyntheticPersona[]; isSimulated: boolean; rawPayload?: unknown }> {
  const cleanUrl = baseUrl.replace(/\/+$/, '');
  const payload = {
    product_name: productDetails.name,
    product_description: productDetails.description,
    target_audience: productDetails.targetAudience,
    objectives: productDetails.objectives,
    features: productDetails.features,
    persona_count: productDetails.personaCount,
  };

  const res = await fetch(`${cleanUrl}/generate-personas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to generate personas (HTTP ${res.status}): ${errText}`);
  }

  const data = await res.json();
  const rawList: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data.personas)
    ? data.personas
    : Array.isArray(data.data)
    ? data.data
    : [];

  const personas: SyntheticPersona[] = rawList.map((item, idx) => ({
    id: item.id || `persona-${Date.now()}-${idx}`,
    name: item.name || `Synthetic Persona ${idx + 1}`,
    avatarUrl:
      item.avatarUrl ||
      INITIAL_PERSONAS[idx % INITIAL_PERSONAS.length]?.avatarUrl ||
      '',
    age: Number(item.age) || 20,
    gender: item.gender || 'Not specified',
    university: item.university || item.school || 'University',
    major: item.major || 'Undergraduate Studies',
    academicYear: item.academicYear || item.year || 'Junior',
    gpaRange: item.gpaRange || item.gpa || '3.5',
    archetype: item.archetype || 'Struggling Balancer',
    weeklyStudyHours: Number(item.weeklyStudyHours || item.study_hours) || 20,
    creditHours: Number(item.creditHours || item.credits) || 15,
    employed: Boolean(item.employed),
    jobHoursPerWeek: Number(item.jobHoursPerWeek || item.work_hours) || 0,
    currentTools: Array.isArray(item.currentTools)
      ? item.currentTools
      : Array.isArray(item.tools)
      ? item.tools
      : ['Google Calendar', 'Notes'],
    techFluency: item.techFluency || 'Moderate',
    primaryPainPoints: Array.isArray(item.primaryPainPoints)
      ? item.primaryPainPoints
      : Array.isArray(item.pain_points)
      ? item.pain_points
      : [],
    coreGoals: Array.isArray(item.coreGoals)
      ? item.coreGoals
      : Array.isArray(item.goals)
      ? item.goals
      : [],
    quote: item.quote || 'Looking for a reliable study planner to organize my coursework.',
    willingnessToPayMonthly: Number(item.willingnessToPayMonthly || item.wtp) || 2.99,
    adoptionLikelihood: Number(item.adoptionLikelihood || item.adoption_score) || 75,
    isSimulated: false,
    traits: {
      organization: Number(item.traits?.organization) || 70,
      techAdoption: Number(item.traits?.techAdoption) || 75,
      stressTolerance: Number(item.traits?.stressTolerance) || 60,
      socialCollaboration: Number(item.traits?.socialCollaboration) || 50,
    },
  }));

  return { personas, isSimulated: false, rawPayload: data };
}

/**
 * Conduct survey across synthetic personas
 * POST /survey
 */
export async function runSurveyApi(
  baseUrl: string,
  personas: SyntheticPersona[],
  questions: SurveyQuestion[]
): Promise<{ results: SurveyAggregation[]; isSimulated: boolean; rawPayload?: unknown }> {
  const cleanUrl = baseUrl.replace(/\/+$/, '');
  const payload = {
    personas,
    questions,
  };

  const res = await fetch(`${cleanUrl}/survey`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to run survey (HTTP ${res.status}): ${errText}`);
  }

  const data = await res.json();
  const rawResults: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data.survey_results)
    ? data.survey_results
    : Array.isArray(data.results)
    ? data.results
    : [];

  const results: SurveyAggregation[] = rawResults.map((agg, idx) => ({
    questionId: agg.questionId || agg.question_id || `q${idx + 1}`,
    questionText: agg.questionText || agg.question_text || `Question ${idx + 1}`,
    type: agg.type || 'multiple_choice',
    averageScore: agg.averageScore || agg.average_score,
    distribution: Array.isArray(agg.distribution) ? agg.distribution : [],
    quotes: Array.isArray(agg.quotes) ? agg.quotes : [],
  }));

  return { results, isSimulated: false, rawPayload: data };
}

/**
 * 1-on-1 interview with synthetic persona
 * POST /interview
 */
export async function sendInterviewMessageApi(
  baseUrl: string,
  persona: SyntheticPersona,
  message: string,
  history: InterviewMessage[],
  productContext: ProductDetails
): Promise<{ reply: string; isSimulated: boolean }> {
  const cleanUrl = baseUrl.replace(/\/+$/, '');
  const payload = {
    persona_id: persona.id,
    persona: persona,
    message: message,
    history: history.map((h) => ({
      sender: h.sender,
      text: h.text,
      timestamp: h.timestamp,
    })),
    product_context: {
      name: productContext.name,
      description: productContext.description,
      features: productContext.features,
    },
  };

  const res = await fetch(`${cleanUrl}/interview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Interview API call failed (HTTP ${res.status}): ${errText}`);
  }

  const data = await res.json();
  const reply = data.reply || data.response || data.message || 'No response returned';
  return { reply, isSimulated: false };
}

/**
 * Synthesize AI Research Insights
 * POST /insights
 */
export async function generateInsightsApi(
  baseUrl: string,
  productDetails: ProductDetails,
  personas: SyntheticPersona[],
  surveyAggregations: SurveyAggregation[]
): Promise<{ insights: ResearchInsight[]; isSimulated: boolean; rawPayload?: unknown }> {
  const cleanUrl = baseUrl.replace(/\/+$/, '');
  const payload = {
    product_name: productDetails.name,
    product_description: productDetails.description,
    objectives: productDetails.objectives,
    personas,
    survey_results: surveyAggregations,
  };

  const res = await fetch(`${cleanUrl}/insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to generate insights (HTTP ${res.status}): ${errText}`);
  }

  const data = await res.json();
  const rawInsights: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data.insights)
    ? data.insights
    : Array.isArray(data.data)
    ? data.data
    : [];

  const insights: ResearchInsight[] = rawInsights.map((item, idx) => ({
    id: item.id || `insight-${Date.now()}-${idx}`,
    title: item.title || `Finding ${idx + 1}`,
    category: item.category || 'core_bottleneck',
    severity: item.severity || 'medium',
    description: item.description || '',
    evidence: item.evidence || '',
    recommendation: item.recommendation || '',
    affectedPersonas: Array.isArray(item.affectedPersonas)
      ? item.affectedPersonas
      : Array.isArray(item.affected_personas)
      ? item.affected_personas
      : [],
    isSimulated: false,
  }));

  return { insights, isSimulated: false, rawPayload: data };
}

/**
 * Generate Research Report
 * POST /generate-report
 */
export async function generateReportApi(
  baseUrl: string,
  productDetails: ProductDetails,
  personas: SyntheticPersona[],
  surveyAggregations: SurveyAggregation[],
  insights: ResearchInsight[]
): Promise<{ report: ResearchReport; isSimulated: boolean; rawPayload?: unknown }> {
  const cleanUrl = baseUrl.replace(/\/+$/, '');
  const payload = {
    product_name: productDetails.name,
    target_audience: productDetails.targetAudience,
    objectives: productDetails.objectives,
    personas,
    survey_results: surveyAggregations,
    insights,
  };

  const res = await fetch(`${cleanUrl}/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to generate report (HTTP ${res.status}): ${errText}`);
  }

  const data = await res.json();
  const rep = data.report || data;

  const report: ResearchReport = {
    id: rep.id || `rep-${Date.now()}`,
    title: rep.title || `Synthetic User Research: ${productDetails.name}`,
    generatedAt: rep.generatedAt || rep.generated_at || new Date().toISOString(),
    productName: rep.productName || rep.product_name || productDetails.name,
    targetCohortSummary: rep.targetCohortSummary || rep.cohort_summary || 'Synthetic student cohort',
    executiveSummary: rep.executiveSummary || rep.executive_summary || 'Synthesis summary',
    methodology: rep.methodology || 'Synthetic LLM agent survey and interview methodology',
    keyFindings: Array.isArray(rep.keyFindings)
      ? rep.keyFindings
      : Array.isArray(rep.key_findings)
      ? rep.key_findings
      : [],
    featurePrioritization: rep.featurePrioritization || rep.feature_prioritization || {
      mustHave: [],
      shouldHave: [],
      couldHave: [],
      wontHaveNow: [],
    },
    pricingRecommendation: rep.pricingRecommendation || rep.pricing_recommendation || {
      recommendedPrice: '$2.99/mo or $14.99/semester',
      reasoning: 'Derived from price sensitivity analysis',
      tierStructure: 'Freemium with semester upgrade',
    },
    risksAndMitigations: Array.isArray(rep.risksAndMitigations)
      ? rep.risksAndMitigations
      : Array.isArray(rep.risks_and_mitigations)
      ? rep.risks_and_mitigations
      : [],
    isSimulated: false,
  };

  return { report, isSimulated: false, rawPayload: data };
}

/**
 * Intelligent simulation fallback agent for Persona Interview
 * Emulates the persona's authentic perspective if the FastAPI backend is offline or in simulated demo mode.
 */
export async function simulateInterviewReply(
  persona: SyntheticPersona,
  message: string,
  productContext: ProductDetails
): Promise<string> {
  // Simulate natural latency
  await new Promise((r) => setTimeout(r, 650));

  const lower = message.toLowerCase();

  if (lower.includes('price') || lower.includes('pay') || lower.includes('cost') || lower.includes('dollar') || lower.includes('subscription')) {
    if (persona.willingnessToPayMonthly === 0) {
      return `Honestly, as a ${persona.major} student working ${persona.jobHoursPerWeek || 'long'} hours a week, I'm already on a tight budget. I wouldn't pay a monthly subscription. If it's free with minimal ads or sponsored by my university, I'd use it daily. At most, maybe a $5 one-time semester fee if it genuinely saves me from missing quizzes.`;
    } else {
      return `For my workload (${persona.weeklyStudyHours} study hours a week), paying around $${persona.willingnessToPayMonthly.toFixed(2)} a month is reasonable IF it actually works seamlessly. If it takes more than 5 minutes to set up or misses a major assignment deadline, I'd cancel within the trial period.`;
    }
  }

  if (lower.includes('syllabus') || lower.includes('upload') || lower.includes('pdf')) {
    return `Syllabus week is brutal. I have ${persona.creditHours} credits this term, and my professors publish syllabi in totally inconsistent formats—some are 35-page PDFs with tables, some are messy Word docs. If "${productContext.name}" can parse deadlines accurately without hallucinating dates, that alone would get me to recommend it to my entire study group.`;
  }

  if (lower.includes('canvas') || lower.includes('blackboard') || lower.includes('lms') || lower.includes('security') || lower.includes('permission')) {
    return `I would connect Canvas only if it's strictly read-only. I don't want any third-party app touching my grades or submission portal. But being able to auto-pull assignments as professors post them would be a lifesaver, especially for last-minute date changes.`;
  }

  if (lower.includes('exam') || lower.includes('study') || lower.includes('scheduler') || lower.includes('backwards')) {
    return `Backwards scheduling is something I try to do manually in ${persona.currentTools.join(' and ')}, but I always underestimate the ramp-up. If the planner tells me: 'Your ${persona.major} exam is 35% of your grade, start milestone 1 on Thursday,' that directly reduces my anxiety.`;
  }

  // Default thoughtful student response
  return `Speaking from my perspective as a ${persona.academicYear} studying ${persona.major} at ${persona.university}: my main frustration with existing apps like ${persona.currentTools.join(', ')} is that they require constant manual upkeep. For "${productContext.name}" to keep me as an active user, it has to minimize setup friction and give me clear daily priorities when I sit down to work.`;
}
