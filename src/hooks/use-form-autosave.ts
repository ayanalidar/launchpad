"use client";

import { useState, useCallback, useRef, useMemo } from "react";

/**
 * Auto-save hook for forms.
 * Persists form state to localStorage on every change (debounced).
 * On mount, restores saved state if present.
 *
 * Uses lazy useState initialization (not an effect) so reads from
 * localStorage happen synchronously during first render, avoiding
 * the cascading render problem.
 *
 * @param key localStorage key
 * @param initial initial form state
 * @param debounceMs debounce interval, default 500ms
 *
 * @returns { state, setState, hasRestored, savedAt, clearSaved }
 */
export function useFormAutoSave<T>(
  key: string,
  initial: T,
  debounceMs = 500
) {
  // Lazy init: read localStorage synchronously during first render
  const initialRestored = useMemo(() => {
    if (typeof window === "undefined") return { state: initial, savedAt: null as Date | null };
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && parsed.state) {
          return {
            state: { ...initial, ...parsed.state } as T,
            savedAt: new Date(parsed.savedAt) as Date | null,
          };
        }
      }
    } catch {
      // ignore malformed state
    }
    return { state: initial, savedAt: null as Date | null };
  }, [key]);

  const [state, setState] = useState<T>(initialRestored.state);
  const [savedAt, setSavedAt] = useState<Date | null>(initialRestored.savedAt);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save on change
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          try {
            localStorage.setItem(
              key,
              JSON.stringify({ state: value, savedAt: Date.now() })
            );
            setSavedAt(new Date());
          } catch {
            // quota exceeded or storage disabled, silently ignore
          }
        }, debounceMs);
        return value;
      });
    },
    [key, debounceMs]
  );

  const clearSaved = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setSavedAt(null);
  }, [key]);

  return { state, setState: update, hasRestored: true, savedAt, clearSaved };
}
