"use client";

import { useCallback, useEffect, useState } from "react";

export type PageId =
  | "home"
  | "admissions"
  | "placements"
  | "register"
  | "contact";

export const PAGES: { id: PageId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "admissions", label: "Admissions", href: "#admissions" },
  { id: "placements", label: "Placements", href: "#placements" },
  { id: "register", label: "Register", href: "#register" },
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
