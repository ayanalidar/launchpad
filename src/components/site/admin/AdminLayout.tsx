"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Mail,
  Settings,
  Briefcase,
  Award,
  HelpCircle,
  TrendingUp,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { BrandLogo } from "../ui/BrandLogo";
import { clearAdminToken } from "@/lib/admin";
import { cn } from "@/lib/utils";

export type AdminView =
  | "dashboard"
  | "registrations"
  | "messages"
  | "subscribers"
  | "settings"
  | "roles"
  | "placements"
  | "faqs"
  | "jobs";

interface AdminLayoutProps {
  current: AdminView;
  onNavigate: (view: AdminView) => void;
  onLogout: () => void;
  onExitToSite: () => void;
  children: React.ReactNode;
}

const NAV: { id: AdminView; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "registrations", label: "Registrations", icon: Users },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "subscribers", label: "Subscribers", icon: Mail },
  { id: "jobs", label: "Job Openings", icon: Briefcase },
  { id: "roles", label: "Roles", icon: TrendingUp },
  { id: "placements", label: "Placements", icon: Award },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "settings", label: "Site Settings", icon: Settings },
];

export function AdminLayout({
  current,
  onNavigate,
  onLogout,
  onExitToSite,
  children,
}: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearAdminToken();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card/30">
        <div className="p-4 border-b border-border">
          <BrandLogo />
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                current === item.id
                  ? "bg-gold/10 text-gold border border-gold/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.75} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <button
            onClick={onExitToSite}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card/60 transition-colors"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            Exit to Site
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[60] w-64 bg-card border-r border-border md:hidden"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <BrandLogo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-3 space-y-1">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      current === item.id
                        ? "bg-gold/10 text-gold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-card/30">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-display text-sm font-semibold text-foreground">
            Admin
          </span>
          <button
            onClick={handleLogout}
            className="text-red-400/80 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
