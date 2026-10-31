"use client";

import { useSyncExternalStore } from "react";

/**
 * Detects prefers-reduced-motion user setting.
 * Returns true if the user has requested reduced motion.
 * Used to disable heavy animations site-wide.
 *
 * Uses useSyncExternalStore to comply with React 19's
 * effect rules and avoid cascading renders.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false // SSR snapshot
  );
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
