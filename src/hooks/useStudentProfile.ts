/**
 * Custom Hook: useStudentProfile
 * Manages student persona state and persistence.
 */

import { useState, useEffect, useCallback } from 'react';
import { StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/initialProfile';
import { safeStorage } from '../utils/security';

const STORAGE_KEY = 'grantly_student_profile_v2';

export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    return safeStorage.getItem<StudentProfile>(STORAGE_KEY, INITIAL_STUDENT_PROFILE);
  });

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEY, profile);
  }, [profile]);

  const updateProfile = useCallback((newProfile: StudentProfile) => {
    setProfile(newProfile);
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(INITIAL_STUDENT_PROFILE);
    safeStorage.setItem(STORAGE_KEY, INITIAL_STUDENT_PROFILE);
  }, []);

  return {
    profile,
    updateProfile,
    resetProfile
  };
}
