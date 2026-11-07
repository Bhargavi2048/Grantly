import React, { useState } from 'react';
import { 
  Kanban, 
  Calendar, 
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Scholarship, StudentProfile, ScholarshipStatus } from '../types';
import { sanitizeText } from '../utils/security';

interface PipelineKanbanProps {
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  onUpdateStatus: (scholarshipId: string, status: ScholarshipStatus) => void;
  onToggleItemCheck: (scholarshipId: string, itemId: string) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onOpenInAIWriter: (scholarship: Scholarship) => void;
}

const PIPELINE_COLUMNS: { id: ScholarshipStatus; title: string; color: string }[] = [
  { id: 'bookmarked', title: 'Considering', color: 'border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30' },
  { id: 'in_progress', title: 'Drafting & Prep', color: 'border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30' },
  { id: 'ready_to_submit', title: 'Ready to Submit', color: 'border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30' },
  { id: 'submitted', title: 'Submitted (Reviewing)', color: 'border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/30' },
  { id: 'awarded', title: 'Awarded 🎉', color: 'border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30' },
];

export default function PipelineKanban({ 
  scholarships, 
  onUpdateStatus, 
  onToggleItemCheck, 
  onSelectScholarship,
  onOpenInAIWriter 
}: PipelineKanbanProps): JSX.Element {
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  // Group scholarships by status
  const pipelineItems = scholarships.filter(s => s.status && s.status !== 'unapplied');

  const totalInPipeline = pipelineItems
    .filter(s => s.status !== 'declined')
    .reduce((acc, s) => acc + s.amount, 0);

  const handleStageChange = (scholarshipId: string, newStatus: ScholarshipStatus) => {
    onUpdateStatus(scholarshipId, newStatus);

    if (newStatus === 'awarded') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully if canvas context is unavailable
      }
      setCelebrationMessage("Congratulations! Your scholarship win has been automatically applied to your TrueCost calculator!");
      setTimeout(() => setCelebrationMessage(null), 5000);
    }
  };

  const handleExportCalendar = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Grantly Education//Scholarship Deadlines//EN\n";
    pipelineItems.forEach(s => {
      const cleanDate = s.deadline.replace(/-/g, '');
      icsContent += `BEGIN:VEVENT\nSUMMARY:Scholarship Deadline: ${s.title}\nDESCRIPTION:Award: $${s.amount} - ${s.organization}\nDTSTART:${cleanDate}T170000Z\nDTEND:${cleanDate}T180000Z\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "grantly_scholarship_deadlines.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Celebration Alert banner if recently awarded */}
      {celebrationMessage && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl" aria-hidden="true">
              🏆
            </div>
            <div>
              <p className="font-extrabold text-sm">{celebrationMessage}</p>
              <p className="text-xs text-emerald-100">Every dollar won directly reduces educational debt and stress.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setCelebrationMessage(null)}
            className="text-xs font-semibold px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            aria-label="Dismiss celebration message"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Pipeline Header Summary */}
      <section 
        aria-labelledby="pipeline-heading"
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 id="pipeline-heading" className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Kanban className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              Application Pipeline & Milestone Hub
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Track deadlines, manage application checklists, and celebrate scholarship victories.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Total in Pipeline: </span>
              <strong className="text-emerald-700 dark:text-emerald-300 font-extrabold text-sm ml-1">
                ${totalInPipeline.toLocaleString()}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleExportCalendar}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              title="Download iCal calendar with upcoming deadlines"
              aria-label="Download scholarship deadlines as iCal .ics calendar file"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Export .ics Calendar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4" role="region" aria-label="Kanban application stages">
        {PIPELINE_COLUMNS.map(col => {
          const colItems = pipelineItems.filter(s => s.status === col.id);
          const colAmount = colItems.reduce((acc, s) => acc + s.amount, 0);

          return (
            <div 
              key={col.id}
              className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col min-w-[260px]"
            >
              {/* Column Header */}
              <div className={`p-2.5 rounded-xl border mb-3 flex items-center justify-between ${col.color}`}>
                <div>
                  <h2 className="font-bold text-xs uppercase tracking-wider">
                    {col.title}
                  </h2>
                  <span className="text-[11px] font-semibold opacity-85">
                    ${colAmount.toLocaleString()} ({colItems.length})
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 flex-1">
                {colItems.map(sch => {
                  const today = new Date('2026-11-07');
                  const deadlineDate = new Date(sch.deadline);
                  const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  const completedItems = sch.requiredItems.filter(r => r.completed).length;
                  const totalItems = sch.requiredItems.length;
                  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 100;

                  return (
                    <article
                      key={sch.id}
                      aria-labelledby={`kanban-item-title-${sch.id}`}
                      className="bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all space-y-2.5"
                    >
                      {/* Top title & amount */}
                      <div className="flex items-start justify-between gap-1.5">
                        <button
                          type="button"
                          id={`kanban-item-title-${sch.id}`}
                          onClick={() => onSelectScholarship(sch)}
                          className="font-bold text-xs text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer line-clamp-2 leading-tight text-left focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none rounded"
                        >
                          {sanitizeText(sch.title)}
                        </button>
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          ${sch.amount.toLocaleString()}
                        </span>
                      </div>

                      {/* Deadline Countdown */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" aria-hidden="true" />
                          {sch.deadline}
                        </span>
                        <span className={`font-bold ${diffDays <= 7 ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300'}`}>
                          {diffDays > 0 ? `${diffDays}d left` : 'Passed'}
                        </span>
                      </div>

                      {/* Milestone checklist preview */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1.5">
                          <span>Checklist ({completedItems}/{totalItems})</span>
                          <span>{progressPct}%</span>
                        </div>
                        {/* Accessible Progress bar */}
                        <div 
                          className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-2"
                          role="progressbar"
                          aria-valuenow={progressPct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Requirements completion: ${progressPct}%`}
                        >
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-300" 
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>

                        {/* Interactive items */}
                        <div className="space-y-1">
                          {sch.requiredItems.slice(0, 3).map(req => (
                            <label
                              key={req.id}
                              className="flex items-center space-x-1.5 text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer hover:text-emerald-600"
                            >
                              <input
                                type="checkbox"
                                checked={req.completed}
                                onChange={() => onToggleItemCheck(sch.id, req.id)}
                                className="rounded text-emerald-600 focus:ring-emerald-500 w-3 h-3"
                              />
                              <span className={`line-clamp-1 ${req.completed ? 'line-through text-slate-400' : ''}`}>
                                {sanitizeText(req.name)}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* AI Essay Shortcut if essay is required */}
                      {sch.essayPrompts && sch.essayPrompts.length > 0 && (
                        <button
                          type="button"
                          onClick={() => onOpenInAIWriter(sch)}
                          className="w-full py-1.5 px-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[10px] font-bold flex items-center justify-center space-x-1 transition-colors focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
                        >
                          <span>Open in GrantWriter AI Studio</span>
                        </button>
                      )}

                      {/* Stage Selector Dropdown */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                        <label htmlFor={`stage-select-${sch.id}`} className="text-[10px] text-slate-400 uppercase font-semibold">
                          Stage:
                        </label>
                        <select
                          id={`stage-select-${sch.id}`}
                          value={sch.status}
                          onChange={(e) => handleStageChange(sch.id, e.target.value as ScholarshipStatus)}
                          className="text-[11px] font-bold py-1 px-2 rounded-md border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="bookmarked">Bookmarked</option>
                          <option value="in_progress">Drafting</option>
                          <option value="ready_to_submit">Ready</option>
                          <option value="submitted">Submitted</option>
                          <option value="awarded">Awarded 🏆</option>
                          <option value="unapplied">Remove</option>
                        </select>
                      </div>
                    </article>
                  );
                })}

                {colItems.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                    No items in {col.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
