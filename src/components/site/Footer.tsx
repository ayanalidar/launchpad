"use client";

import {
  ShieldCheck,
  Linkedin,
  Globe,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { PAGES, type PageId } from "./use-router";

interface FooterProps {
  onNavigate: (p: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative mt-auto border-t border-border bg-background">
      <div className="absolute inset-x-0 top-0 h-px gold-divider" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent">
                <ShieldCheck className="h-5 w-5 text-gold" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-display text-lg font-semibold text-foreground">
                  Guardian<span className="text-gold">X</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                  Academy
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md">
              Premier cybersecurity recruitment &amp; career assistance
              consultancy. We connect skilled professionals with leading
              cybersecurity roles through our consultancy network — based on
              your skills, qualifications, experience, and preferred location.
            </p>
            <a
              href="https://www.linkedin.com/company/guardianx-academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
            >
              <Linkedin className="h-4 w-4" />
              Follow on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {PAGES.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onNavigate(p.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold mb-5">
              Connect
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.linkedin.com/company/guardianx-academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm"
                >
                  <Linkedin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-foreground">LinkedIn</span>
                    <span className="block text-muted-foreground group-hover:text-gold transition-colors">
                      /company/guardianx-academy
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.academy.guardianx.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm"
                >
                  <Globe className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-foreground">GuardianX Academy</span>
                    <span className="block text-muted-foreground group-hover:text-gold transition-colors">
                      academy.guardianx.cloud
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.guardianx.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm"
                >
                  <Globe className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-foreground">GuardianX Security</span>
                    <span className="block text-muted-foreground group-hover:text-gold transition-colors">
                      guardianx.in
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="group flex items-start gap-3 text-sm"
                >
                  <Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-foreground">Get in touch</span>
                    <span className="block text-muted-foreground group-hover:text-gold transition-colors">
                      Contact our team
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GuardianX Academy. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>Registration Fee: ₹2,000</span>
            <span className="hidden md:inline">•</span>
            <span>Post-Placement Fee: 2 Months&apos; Salary (2 installments)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
