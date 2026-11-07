/**
 * Custom Hook: useDarkMode
 * Manages dark/light theme state, document classList toggling, and persistence.
 */

import { useState, useEffect, useCallback } from 'react';
import { safeStorage } from '../utils/security';

const STORAGE_KEY = 'grantly_dark_mode';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return safeStorage.getItem<boolean>(STORAGE_KEY, false);
  });

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEY, isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return {
    isDarkMode,
    toggleDarkMode
  };
}
