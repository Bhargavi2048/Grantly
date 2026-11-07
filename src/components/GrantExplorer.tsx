import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight,
  RotateCcw,
  Compass
} from 'lucide-react';
import ScholarshipCard from './ScholarshipCard';
import { Scholarship, StudentProfile, TabType, ScholarshipStatus } from '../types';
import { calculateMatchScore } from '../data/scholarships';
import { sanitizeText } from '../utils/security';

const CATEGORIES: string[] = [
  'All Opportunities',
  'STEM & Technology',
  'First-Gen & Need-Based',
  'Healthcare & Nursing',
  'Arts & Humanities',
  'General Merit',
  'Diversity & Inclusion'
];

interface GrantExplorerProps {
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onToggleBookmark: (scholarshipId: string) => void;
  onQuickMove: (scholarshipId: string, stage: ScholarshipStatus) => void;
  onOpenProfile: () => void;
  onNavigateToTab: (tab: TabType) => void;
}

export default function GrantExplorer({ 
  scholarships, 
  studentProfile, 
  onSelectScholarship, 
  onToggleBookmark, 
  onQuickMove,
  onOpenProfile
}: GrantExplorerProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Opportunities');
  const [effortFilter, setEffortFilter] = useState<string>('all');
  const [minMatch, setMinMatch] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'match' | 'amount_high' | 'deadline_soon'>('match');
  const [renewableOnly, setRenewableOnly] = useState<boolean>(false);

  // Compute matched scholarships with score
  const processedScholarships = useMemo(() => {
    return scholarships.map(sch => {
      const match = calculateMatchScore(sch, studentProfile);
      return {
        ...sch,
        computedMatchScore: match.score,
        matchFit: match.fitLabel
      };
    });
  }, [scholarships, studentProfile]);

  // Filter & Sort
  const filteredScholarships = useMemo(() => {
    return processedScholarships.filter(sch => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        sch.title.toLowerCase().includes(q) ||
        sch.organization.toLowerCase().includes(q) ||
        sch.description.toLowerCase().includes(q) ||
        sch.tags.some(t => t.toLowerCase().includes(q));

      // Category
      const matchesCategory = selectedCategory === 'All Opportunities' || sch.category === selectedCategory;

      // Effort
      const matchesEffort = effortFilter === 'all' || 
        (effortFilter === 'quick' && sch.effortLevel.includes('Quick')) ||
        (effortFilter === 'moderate' && sch.effortLevel.includes('Moderate')) ||
        (effortFilter === 'comprehensive' && sch.effortLevel.includes('Comprehensive'));

      // Min match
      const matchesScore = (sch.computedMatchScore ?? 0) >= minMatch;

      // Renewable
      const matchesRenewable = !renewableOnly || sch.isRenewable;

      return matchesSearch && matchesCategory && matchesEffort && matchesScore && matchesRenewable;
    }).sort((a, b) => {
      if (sortBy === 'match') return (b.computedMatchScore ?? 0) - (a.computedMatchScore ?? 0);
      if (sortBy === 'amount_high') return b.amount - a.amount;
      if (sortBy === 'deadline_soon') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      return 0;
    });
  }, [processedScholarships, searchQuery, selectedCategory, effortFilter, minMatch, sortBy, renewableOnly]);

  const topMatchCount = useMemo(() => {
    return processedScholarships.filter(s => (s.computedMatchScore ?? 0) >= 80).length;
  }, [processedScholarships]);

  return (
    <div className="space-y-6">
      {/* Hero Compass Card */}
      <section 
        aria-labelledby="hero-heading"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/40"
      >
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>AI Match Compass Active</span>
          </div>

          <h1 id="hero-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Personalized Financial Assistance for {sanitizeText(studentProfile.fullName.split(' ')[0])}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 mt-2 leading-relaxed">
            We analyzed your profile ({sanitizeText(studentProfile.major)}, {studentProfile.gpa} GPA, {studentProfile.isFirstGen ? 'First-Gen' : 'Student'}) against verified grants. You have <strong className="text-emerald-300 font-bold">{topMatchCount} exceptional matches</strong> with high historical award probability.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              type="button"
              onClick={() => {
                setMinMatch(80);
                setSortBy('match');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span>View 80%+ Match Opportunities</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onOpenProfile}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all backdrop-blur-md focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Customize Matching Criteria
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-16 right-32 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      </section>

      {/* Discovery Control Center */}
      <section 
        aria-label="Filter and Search Controls"
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4"
      >
        {/* Top search & sorting row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <label htmlFor="grant-search-input" className="sr-only">
              Search scholarships by keyword, major, sponsor, or tag
            </label>
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="grant-search-input"
              type="search"
              placeholder="Search by keyword, major, sponsor, or tag (e.g. Amazon, Google, First-Gen)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                aria-label="Clear search input"
              >
                Clear
              </button>
            )}
          </div>

          {/* Effort Filter */}
          <div className="md:col-span-3">
            <label htmlFor="effort-filter-select" className="sr-only">
              Filter by application effort level
            </label>
            <select
              id="effort-filter-select"
              value={effortFilter}
              onChange={(e) => setEffortFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Effort: All Levels</option>
              <option value="quick">⚡ Quick Apply (No Essay / &lt;1 hr)</option>
              <option value="moderate">📝 Moderate (1 Essay)</option>
              <option value="comprehensive">📚 Comprehensive (2 Essays + LOR)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <label htmlFor="sort-by-select" className="sr-only">
              Sort scholarship opportunities
            </label>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'match' | 'amount_high' | 'deadline_soon')}
              className="w-full px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="match">Sort: Match Score (Highest)</option>
              <option value="amount_high">Sort: Award Value (Highest)</option>
              <option value="deadline_soon">Sort: Deadline (Closing Soon)</option>
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Category Filters">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                aria-pressed={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Extra toggle filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={renewableOnly}
                onChange={(e) => setRenewableOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span>Renewable Grants Only (Multi-year)</span>
            </label>

            <button
              type="button"
              onClick={() => setMinMatch(minMatch === 80 ? 0 : 80)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                minMatch === 80 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              aria-pressed={minMatch === 80}
            >
              🎯 80%+ High Matches Only
            </button>
          </div>

          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400" aria-live="polite">
            <span>Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredScholarships.length}</strong> of {scholarships.length} verified opportunities</span>
            {(searchQuery || selectedCategory !== 'All Opportunities' || effortFilter !== 'all' || minMatch > 0 || renewableOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Opportunities');
                  setEffortFilter('all');
                  setMinMatch(0);
                  setRenewableOnly(false);
                }}
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none rounded"
                aria-label="Reset all search filters"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" /> Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Scholarships Grid */}
      {filteredScholarships.length > 0 ? (
        <section aria-label="Available Scholarships List" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScholarships.map(scholarship => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              studentProfile={studentProfile}
              onSelect={onSelectScholarship}
              onToggleBookmark={onToggleBookmark}
              onQuickMove={onQuickMove}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8" role="status">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3" aria-hidden="true">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No matching opportunities found
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
            Try adjusting your search terms, clearing category filters, or relaxing the minimum match requirement.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Opportunities');
              setEffortFilter('all');
              setMinMatch(0);
              setRenewableOnly(false);
            }}
            className="mt-4 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg hover:bg-emerald-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
