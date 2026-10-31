"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * All page IDs the router knows about.
 * `register`, `dashboard`, `employers`, `resume-review`, and `role` (dynamic)
 * are intentionally omitted from PAGES so they don't clutter the navbar;
 * the dedicated CTA buttons and in-page links route there.
 * `admin` is also omitted; it's accessed via direct URL #admin.
 */
export type PageId =
  | "home"
  | "admissions"
  | "placements"
  | "register"
  | "contact"
  | "dashboard"
  | "employers"
  | "resume-review"
  | "admin";

export const PAGES: { id: PageId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "admissions", label: "Admissions", href: "#admissions" },
  { id: "placements", label: "Placements", href: "#placements" },
  { id: "resume-review", label: "AI Resume Review", href: "#resume-review" },
  { id: "employers", label: "For Employers", href: "#employers" },
  { id: "dashboard", label: "Dashboard", href: "#dashboard" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function parseHash(): PageId {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace(/^#/, "").toLowerCase();

  // Handle role deep-dive: #role/software-engineer
  if (raw.startsWith("role/")) return "placements"; // handled separately

  const valid: PageId[] = [
    "home",
    "admissions",
    "placements",
    "register",
    "contact",
    "dashboard",
    "employers",
    "resume-review",
    "admin",
  ];
  return valid.includes(raw as PageId) ? (raw as PageId) : "home";
}

export function getRoleSlugFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "").toLowerCase();
  if (raw.startsWith("role/")) {
    return raw.slice("role/".length);
  }
  return null;
}

export function usePageRouter() {
  const [page, setPage] = useState<PageId>("home");
  const [roleSlug, setRoleSlug] = useState<string | null>(null);

  useEffect(() => {
    const apply = () => {
      setPage(parseHash());
      setRoleSlug(getRoleSlugFromHash());
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

  const navigateToRole = useCallback((slug: string) => {
    if (typeof window === "undefined") return;
    window.location.hash = `role/${slug}`;
  }, []);

  return { page, navigate, roleSlug, navigateToRole };
}
