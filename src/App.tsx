import React from 'react';
import { ResearchProvider, useResearch } from './context/ResearchContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { SimulatedBanner } from './components/common/SimulatedBanner';
import { ApiConfigModal } from './components/common/ApiConfigModal';
import { DashboardView } from './views/DashboardView';
import { ResearchSetupView } from './views/ResearchSetupView';
import { PersonasView } from './views/PersonasView';
import { SurveyResultsView } from './views/SurveyResultsView';
import { InsightsView } from './views/InsightsView';
import { InterviewChatView } from './views/InterviewChatView';
import { ReportsView } from './views/ReportsView';

const MainContent: React.FC = () => {
  const { activeTab } = useResearch();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'setup':
        return <ResearchSetupView />;
      case 'personas':
        return <PersonasView />;
      case 'surveys':
        return <SurveyResultsView />;
      case 'insights':
        return <InsightsView />;
      case 'interviews':
        return <InterviewChatView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans">
      <Header />
      <SimulatedBanner />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-[1440px] mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>
      <ApiConfigModal />
    </div>
  );
};

export default function App() {
  return (
    <ResearchProvider>
      <MainContent />
    </ResearchProvider>
  );
}
