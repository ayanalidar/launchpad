"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * All page IDs the router knows about. `register` is intentionally
 * omitted from PAGES so it doesn't show in the navbar; the prominent
 * "Register Now" CTA button in the header already routes there.
 */
export type PageId =
  | "home"
  | "admissions"
  | "placements"
  | "register"
  | "contact";

/**
 * Pages shown in the navbar / mobile drawer.
 * `register` is excluded because the dedicated CTA button in the
 * header already serves that route.
 */
export const PAGES: { id: PageId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "admissions", label: "Admissions", href: "#admissions" },
  { id: "placements", label: "Placements", href: "#placements" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function parseHash(): PageId {
  if (typeof window === "undefined") return "home";
  const h = window.location.hash.replace(/^#/, "").toLowerCase();
  const valid: PageId[] = [
    "home",
    "admissions",
    "placements",
    "register",
    "contact",
  ];
  return valid.includes(h as PageId) ? (h as PageId) : "home";
}

export function usePageRouter() {
  const [page, setPage] = useState<PageId>("home");

  useEffect(() => {
    const apply = () => {
      setPage(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    apply();
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#home");
    }
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const navigate = useCallback((target: PageId) => {
    if (typeof window === "undefined") return;
    window.location.hash = target;
  }, []);

  return { page, navigate };
}
