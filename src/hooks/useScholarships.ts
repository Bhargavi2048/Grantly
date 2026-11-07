/**
 * Custom Hook: useScholarships
 * Manages scholarship state, persistence, status transitions, and checklist item toggling.
 */

import { useState, useEffect, useCallback } from 'react';
import { Scholarship, ScholarshipStatus } from '../types';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { safeStorage } from '../utils/security';

const STORAGE_KEY = 'grantly_scholarships_v2';

export function useScholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    return safeStorage.getItem<Scholarship[]>(STORAGE_KEY, SCHOLARSHIPS_DATA);
  });

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEY, scholarships);
  }, [scholarships]);

  const updateStatus = useCallback((scholarshipId: string, newStatus: ScholarshipStatus) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        return { ...s, status: newStatus };
      }
      return s;
    }));
  }, []);

  const toggleBookmark = useCallback((scholarshipId: string) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        const nextStatus: ScholarshipStatus = s.status === 'bookmarked' ? 'unapplied' : 'bookmarked';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  }, []);

  const toggleItemCheck = useCallback((scholarshipId: string, itemId: string) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        const updatedItems = s.requiredItems.map(item => {
          if (item.id === itemId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
        return { ...s, requiredItems: updatedItems };
      }
      return s;
    }));
  }, []);

  const resetScholarships = useCallback(() => {
    setScholarships(SCHOLARSHIPS_DATA);
    safeStorage.setItem(STORAGE_KEY, SCHOLARSHIPS_DATA);
  }, []);

  return {
    scholarships,
    setScholarships,
    updateStatus,
    toggleBookmark,
    toggleItemCheck,
    resetScholarships
  };
}
