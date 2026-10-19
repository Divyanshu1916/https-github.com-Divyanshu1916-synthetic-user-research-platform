import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ProductDetails,
  SyntheticPersona,
  SurveyQuestion,
  SurveyAggregation,
  ResearchInsight,
  FeatureOpportunity,
  ResearchReport,
  ApiHealthStatus,
  InterviewMessage
} from '../types';
import {
  INITIAL_PRODUCT_DETAILS,
  INITIAL_PERSONAS,
  INITIAL_SURVEY_QUESTIONS,
  INITIAL_SURVEY_AGGREGATIONS,
  INITIAL_FEATURE_OPPORTUNITIES,
  INITIAL_RESEARCH_INSIGHTS,
  INITIAL_REPORT
} from '../data/mockData';
import {
  getStoredBaseUrl,
  setStoredBaseUrl,
  checkBackendHealth,
  generatePersonasApi,
  runSurveyApi,
  sendInterviewMessageApi,
  generateInsightsApi,
  generateReportApi,
  simulateInterviewReply
} from '../services/api';

export interface ApiCallLog {
  timestamp: string;
  endpoint: string;
  method: string;
  status: 'success' | 'error' | 'simulated';
  durationMs: number;
  requestPayload?: unknown;
  responsePayload?: unknown;
  error?: string;
}

interface ResearchContextType {
  product: ProductDetails;
  setProduct: React.Dispatch<React.SetStateAction<ProductDetails>>;
  personas: SyntheticPersona[];
  selectedPersona: SyntheticPersona | null;
  setSelectedPersona: (p: SyntheticPersona | null) => void;
  surveyQuestions: SurveyQuestion[];
  setSurveyQuestions: React.Dispatch<React.SetStateAction<SurveyQuestion[]>>;
  surveyResults: SurveyAggregation[];
  featureOpportunities: FeatureOpportunity[];
  insights: ResearchInsight[];
  report: ResearchReport | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // API & Connectivity
  apiBaseUrl: string;
  setApiBaseUrlState: (url: string) => void;
  apiHealth: ApiHealthStatus | null;
  isCheckingHealth: boolean;
  checkHealthNow: (overrideUrl?: string) => Promise<ApiHealthStatus>;
  isSimulatedMode: boolean;
  setIsSimulatedMode: (mode: boolean) => void;
  apiConfigModalOpen: boolean;
  setApiConfigModalOpen: (open: boolean) => void;
  lastApiLog: ApiCallLog | null;
  // State loaders
  isGeneratingPersonas: boolean;
  isRunningSurvey: boolean;
  isGeneratingInsights: boolean;
  isGeneratingReport: boolean;
  isSendingMessage: boolean;
  // Actions
  generatePersonasAction: () => Promise<void>;
  runSurveyAction: () => Promise<void>;
  generateInsightsAction: () => Promise<void>;
  generateReportAction: () => Promise<void>;
  interviewMessages: Record<string, InterviewMessage[]>;
  sendInterviewMessage: (personaId: string, message: string) => Promise<void>;
  clearChatHistory: (personaId: string) => void;
  resetAllToSimulatedDemo: () => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<ProductDetails>(INITIAL_PRODUCT_DETAILS);
  const [personas, setPersonas] = useState<SyntheticPersona[]>(INITIAL_PERSONAS);
  const [selectedPersona, setSelectedPersona] = useState<SyntheticPersona | null>(INITIAL_PERSONAS[0]);
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>(INITIAL_SURVEY_QUESTIONS);
  const [surveyResults, setSurveyResults] = useState<SurveyAggregation[]>(INITIAL_SURVEY_AGGREGATIONS);
  const [featureOpportunities] = useState<FeatureOpportunity[]>(INITIAL_FEATURE_OPPORTUNITIES);
  const [insights, setInsights] = useState<ResearchInsight[]>(INITIAL_RESEARCH_INSIGHTS);
  const [report, setReport] = useState<ResearchReport | null>(INITIAL_REPORT);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // API Config
  const [apiBaseUrl, setApiBaseUrl] = useState<string>(getStoredBaseUrl);
  const [apiHealth, setApiHealth] = useState<ApiHealthStatus | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState<boolean>(false);
  const [isSimulatedMode, setIsSimulatedMode] = useState<boolean>(true);
  const [apiConfigModalOpen, setApiConfigModalOpen] = useState<boolean>(false);
  const [lastApiLog, setLastApiLog] = useState<ApiCallLog | null>(null);

  // Loaders
  const [isGeneratingPersonas, setIsGeneratingPersonas] = useState<boolean>(false);
  const [isRunningSurvey, setIsRunningSurvey] = useState<boolean>(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  // Chat Histories
  const [interviewMessages, setInterviewMessages] = useState<Record<string, InterviewMessage[]>>({
    'persona-1': [
      {
        id: 'init-1',
        sender: 'persona',
        personaId: 'persona-1',
        text: `Hi there! I'm Maya. I'm a junior in Biochemistry & Pre-Med taking 17 credits. Ask me anything about how I plan my study schedule or what usually breaks my system during exams!`,
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  });

  const setApiBaseUrlState = (url: string) => {
    setApiBaseUrl(url);
    setStoredBaseUrl(url);
  };

  const checkHealthNow = useCallback(
    async (overrideUrl?: string): Promise<ApiHealthStatus> => {
      const targetUrl = overrideUrl || apiBaseUrl;
      setIsCheckingHealth(true);
      const status = await checkBackendHealth(targetUrl);
      setApiHealth(status);
      setIsCheckingHealth(false);
      // Auto-switch away from simulated mode if user has a verified live backend
      if (status.online) {
        setIsSimulatedMode(false);
      }
      return status;
    },
    [apiBaseUrl]
  );

  // Check health on initial mount
  useEffect(() => {
    checkHealthNow();
  }, [checkHealthNow]);

  const generatePersonasAction = async () => {
    setIsGeneratingPersonas(true);
    const start = performance.now();

    if (!isSimulatedMode && apiHealth?.online) {
      try {
        const res = await generatePersonasApi(apiBaseUrl, product);
        setPersonas(res.personas);
        if (res.personas.length > 0) {
          setSelectedPersona(res.personas[0]);
        }
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/generate-personas',
          method: 'POST',
          status: 'success',
          durationMs: Math.round(performance.now() - start),
          requestPayload: product,
          responsePayload: res.rawPayload,
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/generate-personas',
          method: 'POST',
          status: 'error',
          durationMs: Math.round(performance.now() - start),
          requestPayload: product,
          error: errorMsg,
        });
        alert(`API Error: ${errorMsg}\n\nFalling back to simulated personas.`);
      }
    } else {
      // High fidelity simulated generation
      await new Promise((r) => setTimeout(r, 1200));
      // Slices or regenerates based on count
      const updated = INITIAL_PERSONAS.slice(0, Math.max(2, product.personaCount)).map((p) => ({
        ...p,
        isSimulated: true,
      }));
      setPersonas(updated);
      setSelectedPersona(updated[0] || null);
      setLastApiLog({
        timestamp: new Date().toLocaleTimeString(),
        endpoint: '/generate-personas',
        method: 'POST (Simulated)',
        status: 'simulated',
        durationMs: Math.round(performance.now() - start),
        requestPayload: product,
        responsePayload: { personas: updated },
      });
    }
    setIsGeneratingPersonas(false);
  };

  const runSurveyAction = async () => {
    setIsRunningSurvey(true);
    const start = performance.now();

    if (!isSimulatedMode && apiHealth?.online) {
      try {
        const res = await runSurveyApi(apiBaseUrl, personas, surveyQuestions);
        setSurveyResults(res.results);
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/survey',
          method: 'POST',
          status: 'success',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { personas, questions: surveyQuestions },
          responsePayload: res.rawPayload,
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/survey',
          method: 'POST',
          status: 'error',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { personas, questions: surveyQuestions },
          error: errorMsg,
        });
        alert(`API Error: ${errorMsg}\n\nReverting to simulated survey synthesis.`);
      }
    } else {
      await new Promise((r) => setTimeout(r, 1400));
      setSurveyResults(INITIAL_SURVEY_AGGREGATIONS);
      setLastApiLog({
        timestamp: new Date().toLocaleTimeString(),
        endpoint: '/survey',
        method: 'POST (Simulated)',
        status: 'simulated',
        durationMs: Math.round(performance.now() - start),
        requestPayload: { personas, questions: surveyQuestions },
        responsePayload: INITIAL_SURVEY_AGGREGATIONS,
      });
    }
    setIsRunningSurvey(false);
  };

  const generateInsightsAction = async () => {
    setIsGeneratingInsights(true);
    const start = performance.now();

    if (!isSimulatedMode && apiHealth?.online) {
      try {
        const res = await generateInsightsApi(apiBaseUrl, product, personas, surveyResults);
        setInsights(res.insights);
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/insights',
          method: 'POST',
          status: 'success',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { product, personas, survey_results: surveyResults },
          responsePayload: res.rawPayload,
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/insights',
          method: 'POST',
          status: 'error',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { product, personas, survey_results: surveyResults },
          error: errorMsg,
        });
        alert(`API Error: ${errorMsg}\n\nFalling back to simulated insights.`);
      }
    } else {
      await new Promise((r) => setTimeout(r, 1500));
      setInsights(INITIAL_RESEARCH_INSIGHTS);
      setLastApiLog({
        timestamp: new Date().toLocaleTimeString(),
        endpoint: '/insights',
        method: 'POST (Simulated)',
        status: 'simulated',
        durationMs: Math.round(performance.now() - start),
        requestPayload: { product, personas, survey_results: surveyResults },
        responsePayload: INITIAL_RESEARCH_INSIGHTS,
      });
    }
    setIsGeneratingInsights(false);
  };

  const generateReportAction = async () => {
    setIsGeneratingReport(true);
    const start = performance.now();

    if (!isSimulatedMode && apiHealth?.online) {
      try {
        const res = await generateReportApi(apiBaseUrl, product, personas, surveyResults, insights);
        setReport(res.report);
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/generate-report',
          method: 'POST',
          status: 'success',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { product, personas, survey_results: surveyResults, insights },
          responsePayload: res.rawPayload,
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/generate-report',
          method: 'POST',
          status: 'error',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { product, personas, survey_results: surveyResults, insights },
          error: errorMsg,
        });
        alert(`API Error: ${errorMsg}\n\nFalling back to simulated report.`);
      }
    } else {
      await new Promise((r) => setTimeout(r, 1600));
      setReport({
        ...INITIAL_REPORT,
        generatedAt: new Date().toISOString(),
      });
      setLastApiLog({
        timestamp: new Date().toLocaleTimeString(),
        endpoint: '/generate-report',
        method: 'POST (Simulated)',
        status: 'simulated',
        durationMs: Math.round(performance.now() - start),
        requestPayload: { product, personas, survey_results: surveyResults, insights },
        responsePayload: INITIAL_REPORT,
      });
    }
    setIsGeneratingReport(false);
  };

  const sendInterviewMessage = async (personaId: string, messageText: string) => {
    if (!messageText.trim()) return;

    const persona = personas.find((p) => p.id === personaId) || selectedPersona;
    if (!persona) return;

    const userMsg: InterviewMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      personaId: persona.id,
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentHistory = interviewMessages[persona.id] || [];
    const updatedHistoryWithUser = [...currentHistory, userMsg];

    setInterviewMessages((prev) => ({
      ...prev,
      [persona.id]: updatedHistoryWithUser,
    }));

    setIsSendingMessage(true);
    const start = performance.now();

    try {
      let reply = '';
      if (!isSimulatedMode && apiHealth?.online) {
        const res = await sendInterviewMessageApi(
          apiBaseUrl,
          persona,
          messageText,
          updatedHistoryWithUser,
          product
        );
        reply = res.reply;
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/interview',
          method: 'POST',
          status: 'success',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { persona_id: persona.id, message: messageText },
          responsePayload: res,
        });
      } else {
        reply = await simulateInterviewReply(persona, messageText, product);
        setLastApiLog({
          timestamp: new Date().toLocaleTimeString(),
          endpoint: '/interview',
          method: 'POST (Simulated)',
          status: 'simulated',
          durationMs: Math.round(performance.now() - start),
          requestPayload: { persona_id: persona.id, message: messageText },
          responsePayload: { reply },
        });
      }

      const personaReplyMsg: InterviewMessage = {
        id: `msg-${Date.now()}-persona`,
        sender: 'persona',
        personaId: persona.id,
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setInterviewMessages((prev) => ({
        ...prev,
        [persona.id]: [...(prev[persona.id] || []), personaReplyMsg],
      }));
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to reach interview endpoint';
      const fallbackReply = await simulateInterviewReply(persona, messageText, product);
      const personaReplyMsg: InterviewMessage = {
        id: `msg-${Date.now()}-persona-err`,
        sender: 'persona',
        personaId: persona.id,
        text: `${fallbackReply}\n\n*(Note: Generated via client-side simulated student agent due to API offline: ${errorMsg})*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setInterviewMessages((prev) => ({
        ...prev,
        [persona.id]: [...(prev[persona.id] || []), personaReplyMsg],
      }));
    } finally {
      setIsSendingMessage(false);
    }
  };

  const clearChatHistory = (personaId: string) => {
    const persona = personas.find((p) => p.id === personaId);
    if (!persona) return;
    setInterviewMessages((prev) => ({
      ...prev,
      [personaId]: [
        {
          id: `init-${Date.now()}`,
          sender: 'persona',
          personaId,
          text: `Conversation restarted. Hello, I'm ${persona.name}, ${persona.academicYear} in ${persona.major} at ${persona.university}. How can I help with your research into "${product.name}"?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }));
  };

  const resetAllToSimulatedDemo = () => {
    setProduct(INITIAL_PRODUCT_DETAILS);
    setPersonas(INITIAL_PERSONAS);
    setSelectedPersona(INITIAL_PERSONAS[0]);
    setSurveyQuestions(INITIAL_SURVEY_QUESTIONS);
    setSurveyResults(INITIAL_SURVEY_AGGREGATIONS);
    setInsights(INITIAL_RESEARCH_INSIGHTS);
    setReport(INITIAL_REPORT);
    setIsSimulatedMode(true);
  };

  return (
    <ResearchContext.Provider
      value={{
        product,
        setProduct,
        personas,
        selectedPersona,
        setSelectedPersona,
        surveyQuestions,
        setSurveyQuestions,
        surveyResults,
        featureOpportunities,
        insights,
        report,
        activeTab,
        setActiveTab,
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
        isGeneratingPersonas,
        isRunningSurvey,
        isGeneratingInsights,
        isGeneratingReport,
        isSendingMessage,
        generatePersonasAction,
        runSurveyAction,
        generateInsightsAction,
        generateReportAction,
        interviewMessages,
        sendInterviewMessage,
        clearChatHistory,
        resetAllToSimulatedDemo,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};
