/**
 * Scholarship Service Layer for GRANTLY
 * Encapsulates data fetching, filtering, sorting, and matching calculations.
 */

import { Scholarship, StudentProfile } from '../types';
import { calculateMatchScore } from '../data/scholarships';

export interface FilterOptions {
  searchQuery?: string;
  category?: string;
  effortFilter?: string;
  minMatch?: number;
  sortBy?: 'match' | 'amount_high' | 'deadline_soon';
  renewableOnly?: boolean;
}

export class ScholarshipService {
  /**
   * Retrieves all scholarships with real-time match scores computed against a student profile.
   */
  public static getAnnotatedScholarships(
    scholarships: Scholarship[],
    profile: StudentProfile
  ): Scholarship[] {
    return scholarships.map(sch => {
      const match = calculateMatchScore(sch, profile);
      return {
        ...sch,
        computedMatchScore: match.score,
        matchFit: match.fitLabel
      };
    });
  }

  /**
   * Filter and sort scholarships based on user criteria.
   */
  public static filterScholarships(
    scholarships: Scholarship[],
    options: FilterOptions
  ): Scholarship[] {
    const {
      searchQuery = '',
      category = 'All Opportunities',
      effortFilter = 'all',
      minMatch = 0,
      sortBy = 'match',
      renewableOnly = false
    } = options;

    const q = searchQuery.toLowerCase().trim();

    return scholarships
      .filter(sch => {
        // Keyword search
        const matchesSearch = !q || 
          sch.title.toLowerCase().includes(q) ||
          sch.organization.toLowerCase().includes(q) ||
          sch.description.toLowerCase().includes(q) ||
          sch.tags.some(t => t.toLowerCase().includes(q));

        // Category filter
        const matchesCategory = category === 'All Opportunities' || sch.category === category;

        // Effort level filter
        const matchesEffort = effortFilter === 'all' || 
          (effortFilter === 'quick' && sch.effortLevel.includes('Quick')) ||
          (effortFilter === 'moderate' && sch.effortLevel.includes('Moderate')) ||
          (effortFilter === 'comprehensive' && sch.effortLevel.includes('Comprehensive'));

        // Match threshold
        const matchesScore = (sch.computedMatchScore ?? 0) >= minMatch;

        // Renewable filter
        const matchesRenewable = !renewableOnly || sch.isRenewable;

        return matchesSearch && matchesCategory && matchesEffort && matchesScore && matchesRenewable;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return (b.computedMatchScore ?? 0) - (a.computedMatchScore ?? 0);
        if (sortBy === 'amount_high') return b.amount - a.amount;
        if (sortBy === 'deadline_soon') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        return 0;
      });
  }

  /**
   * Computes statistics across the active pipeline.
   */
  public static calculatePipelineMetrics(scholarships: Scholarship[]) {
    const pipelineItems = scholarships.filter(s => s.status && s.status !== 'unapplied');
    const awarded = pipelineItems.filter(s => s.status === 'awarded');
    
    const totalPipelineValue = pipelineItems
      .filter(s => s.status !== 'declined')
      .reduce((acc, s) => acc + s.amount, 0);

    const totalAwardedValue = awarded.reduce((acc, s) => acc + s.amount, 0);

    return {
      totalPipelineValue,
      totalAwardedValue,
      countInPipeline: pipelineItems.length,
      countAwarded: awarded.length
    };
  }
}
