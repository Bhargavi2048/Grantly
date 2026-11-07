/**
 * Security & Sanitization Utilities for GRANTLY
 * Protects against XSS, injection attacks, malformed URIs, and storage overflow.
 */

// Strip HTML tags and dangerous characters to prevent XSS
export function sanitizeText(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove inline event handlers like onclick=
    .trim();
}

// Safely sanitize and validate external URLs
export function safeUrl(url: string | undefined | null): string {
  if (!url) return '#';
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch {
    // Malformed URL
  }
  return '#';
}

// Memory fallback cache if localStorage is unavailable
const memoryFallback = new Map<string, string>();

// Safe localStorage wrapper with quota error handling
export const safeStorage = {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
      }
    } catch (e) {
      console.warn(`[Grantly Security] Failed to read ${key} from localStorage:`, e);
      const fallback = memoryFallback.get(key);
      if (fallback) {
        try {
          return JSON.parse(fallback) as T;
        } catch {
          return defaultValue;
        }
      }
    }
    return defaultValue;
  },

  setItem<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, serialized);
        return true;
      }
      memoryFallback.set(key, serialized);
    } catch (e) {
      console.warn(`[Grantly Security] Failed to persist ${key} to localStorage:`, e);
      try {
        memoryFallback.set(key, JSON.stringify(value));
      } catch {
        // In-memory fallback
      }
      return false;
    }
    return false;
  },

  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      memoryFallback.delete(key);
    } catch (e) {
      console.warn(`[Grantly Security] Failed to remove ${key}:`, e);
    }
  },

  clear(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
      memoryFallback.clear();
    } catch (e) {
      console.warn('[Grantly Security] Failed to clear storage:', e);
    }
  }
};

// Validate GPA within 1.0 - 4.0
export function clampGpa(val: number): number {
  if (isNaN(val)) return 3.0;
  return Math.min(4.0, Math.max(1.0, parseFloat(val.toFixed(2))));
}
