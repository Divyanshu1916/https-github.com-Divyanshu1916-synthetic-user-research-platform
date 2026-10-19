import React, { useState, useRef, useEffect } from 'react';
import { useResearch } from '../context/ResearchContext';
import {
  MessageSquareText,
  Send,
  RotateCcw,
  Download,
  Sparkles,
  Info,
  Clock,
  Briefcase,
  GraduationCap,
  ChevronRight,
  User,
  Bot
} from 'lucide-react';

export const InterviewChatView: React.FC = () => {
  const {
    personas,
    selectedPersona,
    setSelectedPersona,
    interviewMessages,
    sendInterviewMessage,
    clearChatHistory,
    isSendingMessage,
    product,
    isSimulatedMode
  } = useResearch();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePersona = selectedPersona || personas[0];
  const messages = (activePersona && interviewMessages[activePersona.id]) || [];

  const suggestedQuestions = [
    'How do you currently handle syllabus week and exam planning?',
    'What would make you abandon a planner app after 2 weeks?',
    'Would you authorize read-only Canvas or Blackboard access?',
    'What is the maximum you would pay per semester for this?',
    'How do you prioritize when 3 major exams hit the same week?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSendingMessage]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isSendingMessage || !activePersona) return;
    const text = inputMessage;
    setInputMessage('');
    await sendInterviewMessage(activePersona.id, text);
  };

  const handleExportTranscript = () => {
    if (!activePersona) return;
    const header = `SYNTHETIC USER INTERVIEW TRANSCRIPT\nProduct: ${product.name}\nPersona: ${activePersona.name} (${activePersona.academicYear}, ${activePersona.major} at ${activePersona.university})\nArchetype: ${activePersona.archetype}\nExported: ${new Date().toLocaleString()}\nMode: ${isSimulatedMode ? 'Simulated Agent' : 'FastAPI Backend'}\n${'='.repeat(60)}\n\n`;

    const body = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender === 'user' ? 'INTERVIEWER' : activePersona.name.toUpperCase()}:\n${m.text}\n`
      )
      .join('\n');

    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-transcript-${activePersona.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
      {/* Top Bar: Persona Selection Carousel */}
      <div className="p-4 rounded-xl bg-[#090E1B] border border-slate-800/80 space-y-3 shrink-0">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <MessageSquareText className="w-4 h-4 text-violet-400" />
            <span className="font-semibold text-slate-200">Select Synthetic Interviewee</span>
          </div>
          <span className="font-mono text-slate-500">
            {isSimulatedMode ? 'Simulated Agent Model' : 'Live FastAPI /interview'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          {personas.map((persona) => {
            const isSelected = activePersona?.id === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                className={`p-2 rounded-lg border transition-all flex items-center gap-3 shrink-0 text-left ${
                  isSelected
                    ? 'border-violet-500 bg-violet-600/15 text-white'
                    : 'border-slate-800 bg-[#070B14] text-slate-400 hover:border-slate-700'
                }`}
              >
                <img
                  src={persona.avatarUrl}
                  alt={persona.name}
                  className="w-9 h-9 rounded-md object-cover border border-slate-700 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-semibold text-white truncate">{persona.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {persona.major.split('&')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Grid (Split into persona profile drawer and interactive transcript) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Left: Persona Persona Card / Profile context (1 col) */}
        {activePersona && (
          <div className="hidden lg:flex flex-col justify-between p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 overflow-y-auto space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={activePersona.avatarUrl}
                  alt={activePersona.name}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">
                    {activePersona.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">{activePersona.major}</p>
                  <p className="text-[11px] text-slate-400">{activePersona.university}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-slate-300 italic">
                &ldquo;{activePersona.quote}&rdquo;
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Archetype</span>
                  <span className="font-mono text-slate-200">{activePersona.archetype}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Weekly Study Load</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {activePersona.weeklyStudyHours} hrs/wk
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Enrolled Credits</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {activePersona.creditHours} units
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Willingness-to-Pay</span>
                  <span className="font-mono text-emerald-300 font-semibold tabular-nums">
                    {activePersona.willingnessToPayMonthly === 0
                      ? '$0 (Free)'
                      : `$${activePersona.willingnessToPayMonthly.toFixed(2)}/mo`}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Top Frustrations
                </span>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {activePersona.primaryPainPoints.map((p, idx) => (
                    <li key={idx} className="line-clamp-2">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => clearChatHistory(activePersona.id)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>
              <button
                onClick={handleExportTranscript}
                className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                title="Download transcript text"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        )}

        {/* Right: Message Stream & Input Box (3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-xl bg-[#090E1B] border border-slate-800/80 min-h-0">
          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  {isUser ? (
                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                      You
                    </div>
                  ) : (
                    <img
                      src={activePersona?.avatarUrl}
                      alt={activePersona?.name}
                      className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className={`space-y-1 max-w-[80%] ${isUser ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>{isUser ? 'Product Researcher' : activePersona?.name}</span>
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-violet-600 text-white rounded-tr-xs'
                          : 'bg-[#070B14] border border-slate-800 text-slate-200 rounded-tl-xs whitespace-pre-wrap'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {isSendingMessage && (
              <div className="flex items-start gap-3">
                <img
                  src={activePersona?.avatarUrl}
                  alt={activePersona?.name}
                  className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0 opacity-75"
                />
                <div className="p-3.5 rounded-xl bg-[#070B14] border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span>{activePersona?.name} is thinking and replying...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
              <span className="text-slate-500 font-mono shrink-0">Suggested:</span>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(q)}
                  className="px-2.5 py-1 rounded bg-[#070B14] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 whitespace-nowrap transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask ${activePersona?.name || 'persona'} about studying, pricing, LMS permissions, or pain points...`}
                className="flex-1 bg-[#070B14] border border-slate-700/80 rounded-lg px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={handleSend}
                disabled={isSendingMessage || !inputMessage.trim()}
                className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
