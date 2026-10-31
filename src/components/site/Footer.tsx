"use client";

import {
  Linkedin,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { PAGES, type PageId } from "./use-router";
import { BrandLogo } from "./ui/BrandLogo";

interface FooterProps {
  onNavigate: (p: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative mt-auto border-t border-border bg-background">
      <div className="absolute inset-x-0 top-0 h-px gold-line" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <BrandLogo variant="full" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md">
              Premier technology recruitment &amp; career assistance consultancy.
              GuardianX Launchpad connects skilled professionals with leading
              roles across every domain of technology, through our consultancy
              network, based on your skills, qualifications, experience, and
              preferred location.
            </p>
            <a
              href="https://www.linkedin.com/company/guardianx-academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
            >
              <Linkedin className="h-4 w-4" />
              Follow on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
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
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
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
                  <GraduationCap className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-foreground">
                      GuardianX Academy
                    </span>
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
                  <ShieldCheck className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-foreground">
                      GuardianX Security
                    </span>
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
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GuardianX Launchpad. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-gold/60" />
              India
            </span>
            <span>Registration Fee: ₹2,000</span>
            <span>Post-Placement Fee: Discussed after registration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
