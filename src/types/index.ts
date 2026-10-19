export interface SyntheticPersona {
  id: string;
  name: string;
  avatarUrl: string;
  age: number;
  gender?: string;
  university: string;
  major: string;
  academicYear: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate' | 'Ph.D.';
  gpaRange: string;
  archetype: 'Overachiever' | 'Struggling Balancer' | 'Tech-Savvy Optimizer' | 'Procrastinator' | 'Non-Traditional / Working';
  weeklyStudyHours: number;
  creditHours: number;
  employed: boolean;
  jobHoursPerWeek?: number;
  currentTools: string[];
  techFluency: 'Beginner' | 'Moderate' | 'Advanced' | 'Power User';
  primaryPainPoints: string[];
  coreGoals: string[];
  quote: string;
  willingnessToPayMonthly: number; // in USD
  adoptionLikelihood: number; // 0 to 100
  isSimulated: boolean;
  traits: {
    organization: number; // 0 to 100
    techAdoption: number;
    stressTolerance: number;
    socialCollaboration: number;
  };
}

export interface ProductDetails {
  name: string;
  tagline: string;
  description: string;
  targetAudience: string;
  objectives: string[];
  features: string[];
  personaCount: number;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'likert' | 'multiple_choice' | 'open_ended';
  options?: string[];
  category: 'usability' | 'pricing' | 'workflow' | 'feature_desirability';
}

export interface SurveyResponseItem {
  personaId: string;
  personaName: string;
  archetype: string;
  questionId: string;
  questionText: string;
  score?: number; // 1 to 5 for likert
  selectedOption?: string;
  comment?: string;
  isSimulated: boolean;
}

export interface SurveyAggregation {
  questionId: string;
  questionText: string;
  type: string;
  averageScore?: number;
  distribution?: { label: string; count: number; percentage: number }[];
  quotes?: { personaName: string; archetype: string; quote: string }[];
}

export interface ResearchInsight {
  id: string;
  title: string;
  category: 'core_bottleneck' | 'market_validation' | 'feature_priority' | 'churn_risk';
  severity: 'high' | 'medium' | 'opportunity';
  description: string;
  evidence: string;
  recommendation: string;
  affectedPersonas: string[];
  isSimulated: boolean;
}

export interface FeatureOpportunity {
  name: string;
  desirabilityScore: number; // 1 to 10
  implementationEffort: 'Low' | 'Medium' | 'High';
  quadrant: 'Quick Win' | 'Core Bet' | 'Nice to Have' | 'Reconsider';
  personaSupportPercent: number;
}

export interface InterviewMessage {
  id: string;
  sender: 'user' | 'persona';
  personaId: string;
  text: string;
  timestamp: string;
}

export interface ResearchReport {
  id: string;
  title: string;
  generatedAt: string;
  productName: string;
  targetCohortSummary: string;
  executiveSummary: string;
  methodology: string;
  keyFindings: string[];
  featurePrioritization: {
    mustHave: string[];
    shouldHave: string[];
    couldHave: string[];
    wontHaveNow: string[];
  };
  pricingRecommendation: {
    recommendedPrice: string;
    reasoning: string;
    tierStructure: string;
  };
  risksAndMitigations: { risk: string; mitigation: string }[];
  isSimulated: boolean;
}

export interface ApiHealthStatus {
  online: boolean;
  latencyMs?: number;
  checkedAt?: string;
  baseUrl: string;
  errorMessage?: string;
  backendDetails?: Record<string, unknown>;
}
