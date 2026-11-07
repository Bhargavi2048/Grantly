import React, { useState } from 'react';
import { 
  Kanban, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  Award, 
  Trash2, 
  ExternalLink,
  Download,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PIPELINE_COLUMNS = [
  { id: 'bookmarked', title: 'Considering', color: 'border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30' },
  { id: 'in_progress', title: 'Drafting & Prep', color: 'border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30' },
  { id: 'ready_to_submit', title: 'Ready to Submit', color: 'border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30' },
  { id: 'submitted', title: 'Submitted (Reviewing)', color: 'border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/30' },
  { id: 'awarded', title: 'Awarded 🎉', color: 'border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30' },
];

export default function PipelineKanban({ 
  scholarships, 
  studentProfile, 
  onUpdateStatus, 
  onToggleItemCheck, 
  onSelectScholarship,
  onOpenInAIWriter 
}) {
  const [celebrationMessage, setCelebrationMessage] = useState(null);

  // Group scholarships by status
  const pipelineItems = scholarships.filter(s => s.status && s.status !== 'unapplied');

  const totalInPipeline = pipelineItems
    .filter(s => s.status !== 'declined')
    .reduce((acc, s) => acc + s.amount, 0);

  const totalWon = pipelineItems
    .filter(s => s.status === 'awarded')
    .reduce((acc, s) => acc + s.amount, 0);

  const handleStageChange = (scholarshipId, newStatus) => {
    onUpdateStatus(scholarshipId, newStatus);

    if (newStatus === 'awarded') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setCelebrationMessage("Congratulations! Your scholarship win has been applied to your TrueCost calculator!");
      setTimeout(() => setCelebrationMessage(null), 5000);
    }
  };

  const handleExportCalendar = () => {
    // Generate basic iCal formatted string
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
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">
              🏆
            </div>
            <div>
              <p className="font-extrabold text-sm">{celebrationMessage}</p>
              <p className="text-xs text-emerald-100">Every dollar won directly reduces educational debt and stress.</p>
            </div>
          </div>
          <button 
            onClick={() => setCelebrationMessage(null)}
            className="text-xs font-semibold px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Pipeline Header Summary */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Kanban className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Application Pipeline & Milestone Hub
            </h2>
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
              onClick={handleExportCalendar}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
              title="Download iCal calendar with upcoming deadlines"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export .ics Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
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
                  <h3 className="font-bold text-xs uppercase tracking-wider">
                    {col.title}
                  </h3>
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
                  const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                  const completedItems = sch.requiredItems.filter(r => r.completed).length;
                  const totalItems = sch.requiredItems.length;
                  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 100;

                  return (
                    <div
                      key={sch.id}
                      className="bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all space-y-2.5"
                    >
                      {/* Top title & amount */}
                      <div className="flex items-start justify-between gap-1.5">
                        <h4 
                          onClick={() => onSelectScholarship(sch)}
                          className="font-bold text-xs text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer line-clamp-2 leading-tight"
                        >
                          {sch.title}
                        </h4>
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          ${sch.amount.toLocaleString()}
                        </span>
                      </div>

                      {/* Deadline Countdown */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
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
                        {/* Progress bar */}
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-2">
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
                                {req.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* AI Essay Shortcut if essay is required */}
                      {sch.essayPrompts && sch.essayPrompts.length > 0 && (
                        <button
                          onClick={() => onOpenInAIWriter(sch)}
                          className="w-full py-1.5 px-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[10px] font-bold flex items-center justify-center space-x-1 transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-purple-500" />
                          <span>AI Essay Studio</span>
                        </button>
                      )}

                      {/* Stage Selector Dropdown */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Stage:</span>
                        <select
                          value={sch.status}
                          onChange={(e) => handleStageChange(sch.id, e.target.value)}
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
                    </div>
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
