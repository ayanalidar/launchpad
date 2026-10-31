"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PAGES, type PageId } from "./use-router";
import { BrandLogo } from "./ui/BrandLogo";
import { cn } from "@/lib/utils";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (p: PageId) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = (p: PageId) => {
    onNavigate(p);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tighter header height: h-16 instead of h-20 */}
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="group"
              aria-label="GuardianX Launchpad, Home"
            >
              <BrandLogo />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {PAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleNav(p.id)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    currentPage === p.id
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {p.label}
                  {currentPage === p.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-8 bg-gold"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav("register")}
                className="hidden md:inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-gold-foreground hover:border-gold hover:shadow-[0_0_30px_-5px] hover:shadow-gold/40"
              >
                Register Now
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-border text-foreground hover:text-gold hover:border-gold/40 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 sm:h-20 items-center justify-between px-4">
              <BrandLogo />
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border text-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-col px-6 py-6 gap-1"
            >
              {PAGES.map((p) => (
                <motion.button
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  onClick={() => handleNav(p.id)}
                  className={cn(
                    "flex items-center justify-between py-4 border-b border-border text-left",
                    currentPage === p.id
                      ? "text-gold"
                      : "text-foreground"
                  )}
                >
                  <span className="font-display text-2xl font-medium">
                    {p.label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{PAGES.indexOf(p) + 1}
                  </span>
                </motion.button>
              ))}

              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                onClick={() => handleNav("register")}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 text-sm font-semibold text-gold-foreground hover:shadow-[0_0_30px_-5px] hover:shadow-gold/40 transition-all"
              >
                Register Now, ₹2,000
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
