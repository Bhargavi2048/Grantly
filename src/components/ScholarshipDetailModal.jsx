import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  ExternalLink, 
  Award, 
  Layers, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { calculateMatchScore } from '../data/scholarships';

export default function ScholarshipDetailModal({ 
  scholarship, 
  isOpen, 
  onClose, 
  studentProfile, 
  onUpdateStatus, 
  onOpenInAIWriter 
}) {
  if (!isOpen || !scholarship) return null;

  const matchData = calculateMatchScore(scholarship, studentProfile);

  // Calculate days left
  const today = new Date('2026-11-07');
  const deadlineDate = new Date(scholarship.deadline);
  const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  const stages = [
    { id: 'bookmarked', label: 'Bookmarked' },
    { id: 'in_progress', label: 'In Progress / Drafting' },
    { id: 'ready_to_submit', label: 'Ready to Submit' },
    { id: 'submitted', label: 'Submitted' },
    { id: 'awarded', label: 'Awarded 🎉' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header section */}
        <div className="pr-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              {scholarship.category}
            </span>
            {scholarship.isRenewable && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                🔄 Renewable: {scholarship.renewableDuration}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300">
              {scholarship.historicalAwardRate}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {scholarship.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Sponsored by {scholarship.organization}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Award Value
            </span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ${scholarship.amount.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Application Deadline
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {scholarship.deadline}
            </span>
            <span className={`text-[10px] font-semibold ${diffDays <= 14 ? 'text-rose-500 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
              {diffDays > 0 ? `⏱️ ${diffDays} days remaining` : 'Deadline Passed'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Effort & Format
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {scholarship.effortLevel}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              ~{scholarship.estimatedHours} hours total
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Match Compass
            </span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center font-extrabold text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {matchData.score}%
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">
                {matchData.fitLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Match Breakdown & Transparency */}
        <div className="mb-6 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Transparent Match Analysis for {studentProfile.fullName}
            </h3>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {matchData.score}% Compatibility
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Why You Match:
              </p>
              <ul className="space-y-1 pl-4 text-slate-600 dark:text-slate-400 list-disc">
                {matchData.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            {matchData.missing.length > 0 && (
              <div>
                <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Criteria to Note:
                </p>
                <ul className="space-y-1 pl-4 text-slate-600 dark:text-slate-400 list-disc">
                  {matchData.missing.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Overview & Mission */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Opportunity Overview
            </h3>
            {scholarship.applicationUrl && (
              <a
                href={scholarship.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {scholarship.description}
          </p>
        </div>

        {/* Essay Prompts */}
        {scholarship.essayPrompts.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-500" />
                Required Essay Prompt ({scholarship.essayPrompts.length})
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onOpenInAIWriter(scholarship);
                }}
                className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Draft in GrantWriter AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {scholarship.essayPrompts.map((ep) => (
              <div 
                key={ep.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  <span>{ep.title}</span>
                  <span className="text-purple-600 dark:text-purple-400">{ep.wordLimit} Words Limit</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-2.5">
                  "{ep.prompt}"
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-400">Target Themes:</span>
                  {ep.keyThemes.map((th) => (
                    <span 
                      key={th} 
                      className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 font-medium"
                    >
                      {th}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Required Application Documents */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
            Application Checklist Items
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scholarship.requiredItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-xs"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{item.name}</span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.completed 
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {item.completed ? '✓ Ready' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Stage Management */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Move Pipeline Stage:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stages.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      onUpdateStatus(scholarship.id, st.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      scholarship.status === st.id
                        ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors self-end sm:self-auto"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
