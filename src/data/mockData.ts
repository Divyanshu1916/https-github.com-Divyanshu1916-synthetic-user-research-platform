import {
  ProductDetails,
  SyntheticPersona,
  SurveyQuestion,
  SurveyAggregation,
  ResearchInsight,
  FeatureOpportunity,
  ResearchReport
} from '../types';

export const INITIAL_PRODUCT_DETAILS: ProductDetails = {
  name: 'Smart Student Planner',
  tagline: 'AI-driven syllabus parsing, backwards study scheduling, and Canvas/Blackboard sync',
  description:
    'An intelligent academic operating system that parses course syllabi into actionable deadlines, generates personalized study schedules based on exam difficulty, and continuously syncs with university learning management systems.',
  targetAudience:
    'Undergraduate and graduate university students juggling heavy course loads, part-time jobs, and extracurriculars.',
  objectives: [
    'Validate if automated PDF syllabus parsing solves the #1 semester startup bottleneck',
    'Evaluate willingness-to-pay for $4.99/month vs freemium expectation',
    'Assess willingness to grant Canvas / Google Calendar write access',
    'Identify student retention churn risks after midterms',
  ],
  features: [
    'AI PDF Syllabus Auto-Extraction',
    'Backwards Exam Prep Scheduler',
    'Real-time Canvas / Blackboard LMS Sync',
    'Adaptive Procrastination Alerts',
    'Focus Mode & Pomodoro Task Sprints',
    'Peer Study Group Accountability Rooms',
  ],
  personaCount: 4,
};

export const INITIAL_PERSONAS: SyntheticPersona[] = [
  {
    id: 'persona-1',
    name: 'Maya Chen',
    avatarUrl: '/src/assets/images/avatar_student_maya_1792419349530.jpg',
    age: 20,
    gender: 'Female',
    university: 'University of Michigan',
    major: 'Biochemistry & Pre-Med',
    academicYear: 'Junior',
    gpaRange: '3.8 - 4.0',
    archetype: 'Overachiever',
    weeklyStudyHours: 32,
    creditHours: 17,
    employed: true,
    jobHoursPerWeek: 10,
    currentTools: ['Notion', 'Google Calendar', 'Anki', 'Physical Muji Notebook'],
    techFluency: 'Advanced',
    primaryPainPoints: [
      'Spends 6+ hours during syllabus week manually retyping exam weights into Notion tables',
      'Over-schedules herself into burnout when 3 exams cluster in the same 48-hour window',
      'Canvas deadline changes frequently get lost in inbox clutter',
    ],
    coreGoals: [
      'Maintain 3.9+ GPA for medical school admissions',
      'Automate calendar scheduling so study blocks are locked in weeks ahead',
      'Visual breakdown of daily priority topics without micromanaging every minute',
    ],
    quote:
      'I spend more time building my Notion study trackers than actually studying. If an app could reliably ingest my 40-page biochemistry syllabus and calculate prep blocks, it would save my sanity.',
    willingnessToPayMonthly: 7.99,
    adoptionLikelihood: 92,
    isSimulated: true,
    traits: {
      organization: 94,
      techAdoption: 85,
      stressTolerance: 62,
      socialCollaboration: 48,
    },
  },
  {
    id: 'persona-2',
    name: 'Jordan Miller',
    avatarUrl: '/src/assets/images/avatar_student_jordan_1792419349477.jpg',
    age: 22,
    gender: 'Male',
    university: 'Georgia Tech',
    major: 'Industrial Design & Architecture',
    academicYear: 'Senior',
    gpaRange: '3.2 - 3.5',
    archetype: 'Struggling Balancer',
    weeklyStudyHours: 24,
    creditHours: 15,
    employed: true,
    jobHoursPerWeek: 18,
    currentTools: ['Apple Reminders', 'Google Keep', 'Sticky Notes'],
    techFluency: 'Moderate',
    primaryPainPoints: [
      'Studio project deadlines are ambiguous and take 3x longer than anticipated',
      'Working an off-campus job leaves irregular 45-minute pockets that get wasted on social media',
      'Frequent late submissions because Canvas notifications arrive too close to deadline',
    ],
    coreGoals: [
      'Complete senior capstone portfolio without pulling all-nighters before critique days',
      'Turn scattered 30-minute free windows into high-yield micro study sessions',
      'Frictionless mobile UI that doesn’t require tedious manual data entry',
    ],
    quote:
      'Every semester I download three different planner apps, spend an afternoon setting them up, and delete them by week three because updating them feels like an unpaid job.',
    willingnessToPayMonthly: 3.99,
    adoptionLikelihood: 76,
    isSimulated: true,
    traits: {
      organization: 52,
      techAdoption: 68,
      stressTolerance: 74,
      socialCollaboration: 82,
    },
  },
  {
    id: 'persona-3',
    name: 'Priya Sharma',
    avatarUrl: '/src/assets/images/avatar_student_priya_1792419350157.jpg',
    age: 19,
    gender: 'Female',
    university: 'University of Texas at Austin',
    major: 'Computer Science & Mathematics',
    academicYear: 'Sophomore',
    gpaRange: '3.6 - 3.8',
    archetype: 'Tech-Savvy Optimizer',
    weeklyStudyHours: 28,
    creditHours: 16,
    employed: false,
    currentTools: ['Obsidian', 'Cron / Notion Calendar', 'Todoist', 'GitHub Projects'],
    techFluency: 'Power User',
    primaryPainPoints: [
      'Dislikes proprietary closed ecosystems where data cannot be synced or exported',
      'Current tools fail to account for cognitive fatigue (heavy algorithm problem sets vs easy readings)',
      'Hates manual reminder setting when professors update assignment dates on Canvas API',
    ],
    coreGoals: [
      'Algorithmic load balancing across heavy coding project weeks and exam weeks',
      'Two-way sync with Google Calendar & local markdown notes',
      'Strict focus enforcement during deep coding sprints',
    ],
    quote:
      'I want a system that understands cognitive weight, not just a dumb to-do list. A 500-line OS kernel lab requires 4 days of mental ramp-up, not a 30-minute calendar block.',
    willingnessToPayMonthly: 6.0,
    adoptionLikelihood: 88,
    isSimulated: true,
    traits: {
      organization: 88,
      techAdoption: 96,
      stressTolerance: 70,
      socialCollaboration: 60,
    },
  },
  {
    id: 'persona-4',
    name: 'Alex Rivera',
    avatarUrl: '/src/assets/images/avatar_student_alex_1792419350113.jpg',
    age: 24,
    gender: 'Male',
    university: 'Arizona State University (Online & Commuter)',
    major: 'Business Administration & Finance',
    academicYear: 'Senior',
    gpaRange: '3.1 - 3.4',
    archetype: 'Non-Traditional / Working',
    weeklyStudyHours: 18,
    creditHours: 12,
    employed: true,
    jobHoursPerWeek: 30,
    currentTools: ['Outlook Calendar', 'Phone Notes app', 'Paper wall calendar'],
    techFluency: 'Moderate',
    primaryPainPoints: [
      'Severe time scarcity balancing 30 hours of retail banking shifts with online coursework',
      'Forgets asynchronous quiz windows because there are no set lecture times',
      'Struggles with financial budget; very reluctant to add another recurring monthly subscription',
    ],
    coreGoals: [
      'Graduate this academic year without retaking any finance or accounting prerequisite',
      'Clear alerts for strict Sunday midnight assignment lockouts',
      'Clean audio or mobile summary of upcoming week so he can plan work shifts',
    ],
    quote:
      'Between clocking 30 hours at the branch and night classes, my brain is fried. If a tool doesn’t alert me 48 hours before an online quiz closes, I might fail by accident.',
    willingnessToPayMonthly: 0.0,
    adoptionLikelihood: 64,
    isSimulated: true,
    traits: {
      organization: 58,
      techAdoption: 50,
      stressTolerance: 80,
      socialCollaboration: 40,
    },
  },
];

export const INITIAL_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'q1',
    text: 'How painful is extracting assignments & exam dates from course syllabi each semester?',
    type: 'likert',
    category: 'workflow',
  },
  {
    id: 'q2',
    text: 'Which feature would deliver the most immediate daily value to your academic workflow?',
    type: 'multiple_choice',
    options: [
      'AI PDF Syllabus Auto-Extraction',
      'Backwards Exam Prep Scheduler',
      'Real-time Canvas / Blackboard LMS Sync',
      'Adaptive Procrastination Alerts',
      'Peer Study Group Accountability',
    ],
    category: 'feature_desirability',
  },
  {
    id: 'q3',
    text: 'What is your maximum acceptable monthly price for a fully automated academic planner?',
    type: 'multiple_choice',
    options: ['$0 (Must be 100% free with ads)', '$2.99 / month', '$4.99 / month', '$9.99 / month'],
    category: 'pricing',
  },
  {
    id: 'q4',
    text: 'Would you authorize an AI tool to connect directly to your university LMS (Canvas/Blackboard)?',
    type: 'multiple_choice',
    options: [
      'Yes, full two-way read/write access',
      'Yes, read-only access (no grade writes)',
      'Only with manual approval per sync',
      'No, strictly manual file upload',
    ],
    category: 'usability',
  },
];

export const INITIAL_SURVEY_AGGREGATIONS: SurveyAggregation[] = [
  {
    questionId: 'q1',
    questionText: 'How painful is extracting assignments & exam dates from course syllabi each semester? (1: Easy, 5: Severe bottleneck)',
    type: 'likert',
    averageScore: 4.45,
    distribution: [
      { label: '5 - Severe bottleneck', count: 18, percentage: 56 },
      { label: '4 - Quite tedious', count: 10, percentage: 31 },
      { label: '3 - Manageable', count: 3, percentage: 9 },
      { label: '2 - Minimal hassle', count: 1, percentage: 3 },
      { label: '1 - Not a problem', count: 0, percentage: 0 },
    ],
    quotes: [
      {
        personaName: 'Maya Chen',
        archetype: 'Overachiever',
        quote: 'Week 1 is completely lost to copy-pasting tables from 5 separate 30-page PDF syllabi into Notion.',
      },
      {
        personaName: 'Alex Rivera',
        archetype: 'Working Student',
        quote: 'If a syllabus isn’t on my phone calendar by Day 3, I end up missing the first quiz without realizing it.',
      },
    ],
  },
  {
    questionId: 'q2',
    questionText: 'Most desired primary feature for daily academic workflow',
    type: 'multiple_choice',
    distribution: [
      { label: 'AI Syllabus Auto-Extraction', count: 14, percentage: 44 },
      { label: 'Canvas / Blackboard LMS Sync', count: 11, percentage: 34 },
      { label: 'Backwards Exam Prep Scheduler', count: 5, percentage: 16 },
      { label: 'Adaptive Procrastination Alerts', count: 2, percentage: 6 },
    ],
    quotes: [
      {
        personaName: 'Priya Sharma',
        archetype: 'Tech-Savvy Optimizer',
        quote: 'If you have Canvas sync and syllabus parsing, the rest is effortless. Those two eliminate 90% of my manual work.',
      },
    ],
  },
  {
    questionId: 'q3',
    questionText: 'Price sensitivity: Maximum monthly subscription tolerance',
    type: 'pricing',
    distribution: [
      { label: 'Free (Ad-supported or university funded)', count: 12, percentage: 38 },
      { label: '$2.99 / month', count: 11, percentage: 34 },
      { label: '$4.99 / month', count: 8, percentage: 25 },
      { label: '$9.99 / month', count: 1, percentage: 3 },
    ],
    quotes: [
      {
        personaName: 'Alex Rivera',
        archetype: 'Non-Traditional / Working',
        quote: 'At $4.99/mo, I have to weigh it against my Spotify student deal. If it was $2.99 or free with .edu referral, I’d take it immediately.',
      },
      {
        personaName: 'Maya Chen',
        archetype: 'Overachiever',
        quote: '$4.99 to save 8 hours a month is an absolute no-brainer. That’s less than one cold brew.',
      },
    ],
  },
  {
    questionId: 'q4',
    questionText: 'Willingness to grant University LMS API credentials',
    type: 'multiple_choice',
    distribution: [
      { label: 'Read-only access (assignments & dates only)', count: 19, percentage: 59 },
      { label: 'Manual approval per batch sync', count: 8, percentage: 25 },
      { label: 'Full two-way read/write access', count: 4, percentage: 13 },
      { label: 'Never, strictly PDF upload', count: 1, percentage: 3 },
    ],
    quotes: [
      {
        personaName: 'Priya Sharma',
        archetype: 'Tech-Savvy Optimizer',
        quote: 'Under no circumstances will students give write access to an unverified third party. Read-only token OAuth is standard and accepted.',
      },
    ],
  },
];

export const INITIAL_FEATURE_OPPORTUNITIES: FeatureOpportunity[] = [
  {
    name: 'AI Syllabus PDF Parsing',
    desirabilityScore: 9.4,
    implementationEffort: 'Medium',
    quadrant: 'Core Bet',
    personaSupportPercent: 94,
  },
  {
    name: 'Read-Only Canvas / LMS Sync',
    desirabilityScore: 8.9,
    implementationEffort: 'Medium',
    quadrant: 'Core Bet',
    personaSupportPercent: 88,
  },
  {
    name: 'Backwards Exam Countdown Scheduler',
    desirabilityScore: 8.2,
    implementationEffort: 'Low',
    quadrant: 'Quick Win',
    personaSupportPercent: 82,
  },
  {
    name: 'Pomodoro Task Sprints & Music Integration',
    desirabilityScore: 6.5,
    implementationEffort: 'Low',
    quadrant: 'Nice to Have',
    personaSupportPercent: 54,
  },
  {
    name: 'Peer Group Accountability Rooms',
    desirabilityScore: 5.1,
    implementationEffort: 'High',
    quadrant: 'Reconsider',
    personaSupportPercent: 38,
  },
];

export const INITIAL_RESEARCH_INSIGHTS: ResearchInsight[] = [
  {
    id: 'insight-1',
    title: 'The Syllabus Week Ingestion Cliff',
    category: 'core_bottleneck',
    severity: 'high',
    description:
      'Students experience peak cognitive load during the first 10 days of classes. Manual calendar entry is identified as their single most frustrating administrative task.',
    evidence:
      '87% of surveyed synthetic student personas rated syllabus extraction a 4 or 5 on the friction scale. Overachievers lose 5–8 hours in week 1.',
    recommendation:
      'Position "1-Click PDF Syllabus to Google Calendar" as the primary viral acquisition hook during August/September and January enrollment windows.',
    affectedPersonas: ['Maya Chen', 'Alex Rivera', 'Jordan Miller'],
    isSimulated: true,
  },
  {
    id: 'insight-2',
    title: 'Subscription Fatigue Demands Freemium or $2.99 / Semester Pricing',
    category: 'market_validation',
    severity: 'high',
    description:
      '38% of students refuse recurring monthly charges, preferring ad-supported or university-subsidized tools. Willingness-to-pay drops sharply above $3.99/month.',
    evidence:
      'Only 28% of the cohort accepted $4.99/mo or above. Working students and commuters showed the highest price friction due to tight student budgets.',
    recommendation:
      'Introduce a freemium model (1 syllabus upload free per semester) with a $14.99/semester pass or $2.99/mo annual plan to maximize conversion.',
    affectedPersonas: ['Alex Rivera', 'Jordan Miller'],
    isSimulated: true,
  },
  {
    id: 'insight-3',
    title: 'LMS Trust Boundary: Read-Only is Non-Negotiable',
    category: 'churn_risk',
    severity: 'medium',
    description:
      'Over 84% of students express privacy hesitations regarding two-way LMS integration due to fears of academic integrity flags or accidental submission triggers.',
    evidence:
      '59% require explicit read-only token permissions; 25% demand manual preview before any external sync writes to their personal calendars.',
    recommendation:
      'Architect the LMS connector with explicit "Read-Only Schedule Importer" branding and display a transparent preview modal before adding events.',
    affectedPersonas: ['Priya Sharma', 'Maya Chen'],
    isSimulated: true,
  },
  {
    id: 'insight-4',
    title: 'Backwards Exam Scheduling Solves Procrastination Better Than Timers',
    category: 'feature_priority',
    severity: 'opportunity',
    description:
      'Students report that traditional reminders fail because they notify too late. Backwards scheduling breaks a 15-credit midterm into small milestones 10 days early.',
    evidence:
      '82% of synthetic personas expressed excitement for an algorithm that reverse-plans prep milestones based on exam percentage weight.',
    recommendation:
      'Prioritize the Backwards Exam Prep Scheduler in Sprint 1 as the primary retention mechanic following syllabus ingestion.',
    affectedPersonas: ['Maya Chen', 'Jordan Miller', 'Priya Sharma'],
    isSimulated: true,
  },
];

export const INITIAL_REPORT: ResearchReport = {
  id: 'rep-smart-student-planner-01',
  title: 'Synthetic User Research Validation: Smart Student Planner',
  generatedAt: '2026-10-19T07:15:00Z',
  productName: 'Smart Student Planner',
  targetCohortSummary:
    'Cohort of 32 simulated collegiate personas across STEM, humanities, business, and non-traditional working student profiles.',
  executiveSummary:
    'The synthetic research strongly validates product-market demand for "Smart Student Planner." Automated syllabus ingestion and read-only Canvas/LMS synchronization emerge as table-stakes adoption drivers. While academic willingness-to-pay is positive, a pricing threshold of $2.99–$3.99/month or a $14.99/semester pass will deliver significantly higher lifetime value than the initially proposed $4.99/month tier.',
  methodology:
    'Synthetic persona generation leveraging stratified sampling across student academic years, majors, working hours, and GPA tiers. High-fidelity Likert surveys and automated 1-on-1 interview simulations probing onboarding friction, security boundaries, and willingness to pay.',
  keyFindings: [
    'Syllabus setup friction causes 68% of planner abandonment within the first 14 days of classes.',
    'AI PDF Syllabus parsing is ranked the #1 highest-desirability feature across all four student archetypes.',
    'Students categorically reject two-way LMS write access but enthusiastically support transparent read-only token ingestion.',
    'A semester pass model ($14.99/semester) captures 2.4x more intent than a recurring $4.99 monthly plan.',
  ],
  featurePrioritization: {
    mustHave: [
      'Multi-page PDF syllabus auto-extraction with date recognition',
      'Read-only Canvas & Blackboard assignment synchronization',
      'One-tap Google Calendar and Apple Calendar export',
      'Mobile-optimized assignment countdown timeline',
    ],
    shouldHave: [
      'Backwards exam prep milestone generator',
      'Cognitive workload balancing indicator',
      'Asynchronous assignment deadline shift alerts',
    ],
    couldHave: [
      'Focus sprint timer with ambient white noise',
      'GPA target scenario calculator',
    ],
    wontHaveNow: [
      'Public peer social network / study rooms (low desirability, high moderation overhead)',
      'Direct gradebook write-back into university LMS',
    ],
  },
  pricingRecommendation: {
    recommendedPrice: '$14.99 per semester or $2.99/month (Annual)',
    reasoning:
      'Collegiate budgeting is cyclical around semester financial aid disbursements. A $14.99 semester pass aligns with student purchasing habits better than an ongoing monthly fee.',
    tierStructure:
      'Free Tier: 1 Syllabus Upload + Basic Calendar Export. Pro Tier ($14.99/semester): Unlimited Syllabi + Live Canvas Sync + Backwards Prep Milestones.',
  },
  risksAndMitigations: [
    {
      risk: 'Variability in non-standard syllabus formats (scanned images, unstructured text tables).',
      mitigation: 'Implement a human-in-the-loop confirmation preview drawer allowing students to edit extracted dates before saving.',
    },
    {
      risk: 'Mid-semester retention drop after midterm season concludes.',
      mitigation: 'Trigger proactive "Finals Countdown" prep notifications 3 weeks before final exam week to re-engage dormant users.',
    },
    {
      risk: 'University LMS API access token expiration or institutional permission restrictions.',
      mitigation: 'Provide fallback .ics / iCal calendar subscription URL sync alongside native Canvas OAuth.',
    },
  ],
  isSimulated: true,
};
