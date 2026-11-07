import React from 'react';
import { 
  Calendar, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight
} from 'lucide-react';
import { Scholarship, StudentProfile, ScholarshipStatus } from '../types';
import { calculateMatchScore } from '../data/scholarships';
import { sanitizeText } from '../utils/security';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  studentProfile: StudentProfile;
  onSelect: (scholarship: Scholarship) => void;
  onToggleBookmark: (scholarshipId: string) => void;
  onQuickMove: (scholarshipId: string, stage: ScholarshipStatus) => void;
}

export default function ScholarshipCard({ 
  scholarship, 
  studentProfile, 
  onSelect, 
  onToggleBookmark, 
  onQuickMove 
}: ScholarshipCardProps): JSX.Element {
  const matchData = calculateMatchScore(scholarship, studentProfile);

  // Calculate days left relative to Nov 7, 2026
  const today = new Date('2026-11-07');
  const deadlineDate = new Date(scholarship.deadline);
  const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const isBookmarked = scholarship.status === 'bookmarked';
  const isInPipeline = ['in_progress', 'ready_to_submit', 'submitted', 'awarded'].includes(scholarship.status);

  const getStatusBadge = () => {
    switch (scholarship.status) {
      case 'awarded':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">🎉 Awarded</span>;
      case 'submitted':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Submitted</span>;
      case 'ready_to_submit':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">Ready to Submit</span>;
      case 'in_progress':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">In Pipeline</span>;
      case 'bookmarked':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">Bookmarked</span>;
      default:
        return null;
    }
  };

  return (
    <article 
      aria-labelledby={`scholarship-title-${scholarship.id}`}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Match badge + Bookmark button */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <div 
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 ${
                matchData.score >= 80 
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : matchData.score >= 60
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
              aria-label={`Match score: ${matchData.score} percent. ${matchData.fitLabel}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              <span>{matchData.score}% Match</span>
            </div>

            {getStatusBadge()}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(scholarship.id);
            }}
            className={`p-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
              isBookmarked 
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label={isBookmarked ? `Remove bookmark for ${scholarship.title}` : `Bookmark ${scholarship.title}`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-current" aria-hidden="true" /> : <Bookmark className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>

        {/* Sponsor & Title */}
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 line-clamp-1">
          {sanitizeText(scholarship.organization)}
        </p>

        <h3 
          id={`scholarship-title-${scholarship.id}`}
          onClick={() => onSelect(scholarship)}
          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {sanitizeText(scholarship.title)}
        </h3>

        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-1.5 my-3">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {scholarship.category}
          </span>
          {scholarship.isRenewable && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
              🔄 Renewable
            </span>
          )}
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400">
            {scholarship.effortLevel.split(' ')[0]}
          </span>
        </div>

        {/* Quick transparent match indicator */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
          {sanitizeText(scholarship.description)}
        </p>
      </div>

      <div>
        {/* Key metadata banner */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Award Amount
            </span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              ${scholarship.amount.toLocaleString()}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block flex items-center justify-end gap-1">
              <Calendar className="w-3 h-3" aria-hidden="true" /> Deadline
            </span>
            <span className={`text-xs font-bold ${diffDays <= 14 ? 'text-rose-500 font-extrabold' : 'text-slate-700 dark:text-slate-300'}`}>
              {diffDays > 0 ? `${diffDays} days left` : 'Closed'}
            </span>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="mt-4 pt-3 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onSelect(scholarship)}
            className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center space-x-1 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            aria-label={`View rubric and details for ${scholarship.title}`}
          >
            <span>Details & Rubric</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          </button>

          {!isInPipeline ? (
            <button
              type="button"
              onClick={() => onQuickMove(scholarship.id, 'in_progress')}
              className="py-2 px-3 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              aria-label={`Add ${scholarship.title} to pipeline`}
            >
              + Pipeline
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSelect(scholarship)}
              className="py-2 px-2.5 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              aria-label={`Manage pipeline status for ${scholarship.title}`}
            >
              Manage
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
