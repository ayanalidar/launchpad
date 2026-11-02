"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Mail,
  TrendingUp,
  Award,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  Clock,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";
import { adminFetch } from "@/lib/admin";
import { Skeleton } from "../../ui/Skeleton";
import { cn } from "@/lib/utils";

interface Stats {
  counts: {
    registrations: number;
    paid: number;
    pending: number;
    messages: number;
    unresolvedMessages: number;
    subscribers: number;
    activeRoles: number;
    activeStories: number;
    activeFaqs: number;
    activeJobs: number;
  };
  revenue: number;
  recentRegistrations: number;
  recentItems: Array<{
    id: string;
    fullName: string;
    email: string;
    preferredRoleCategory: string | null;
    paymentStatus: string;
    createdAt: string;
  }>;
}

const STAT_CARDS = [
  { key: "registrations", label: "Total Registrations", icon: Users, color: "text-gold" },
  { key: "paid", label: "Paid (Active)", icon: CheckCircle2, color: "text-emerald-400" },
  { key: "pending", label: "Payment Pending", icon: Clock, color: "text-gold" },
  { key: "revenue", label: "Revenue (₹)", icon: IndianRupee, color: "text-emerald-400" },
  { key: "messages", label: "Contact Messages", icon: MessageSquare, color: "text-gold" },
  { key: "unresolvedMessages", label: "Unresolved", icon: AlertTriangle, color: "text-red-400" },
  { key: "subscribers", label: "Email Subscribers", icon: Mail, color: "text-gold" },
  { key: "activeRoles", label: "Active Roles", icon: Briefcase, color: "text-gold" },
  { key: "activeStories", label: "Placement Stories", icon: Award, color: "text-gold" },
  { key: "activeJobs", label: "Job Openings", icon: TrendingUp, color: "text-gold" },
] as const;

import { AlertTriangle } from "lucide-react";

interface DashboardPageProps {
  onNavigate: (view: string) => void;
}

export function AdminDashboardPage({ onNavigate }: DashboardPageProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await adminFetch("/api/admin/stats");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (!cancelled) setStats(data);
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load stats.</div>;
  }

  const getStatValue = (key: string): number | string => {
    if (key === "revenue") return `₹${stats.revenue.toLocaleString("en-IN")}`;
    return stats.counts[key as keyof typeof stats.counts] ?? 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of GuardianX Launchpad activity. {stats.recentRegistrations} registrations in the last 7 days.
        </p>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative p-4 rounded-lg border border-border bg-card/40 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-2">
              <card.icon className={cn("h-4 w-4", card.color)} strokeWidth={1.75} />
            </div>
            <div className="font-display text-2xl font-semibold text-foreground tabular-nums">
              {getStatValue(card.key)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent registrations */}
      <div className="rounded-lg border border-border bg-card/30 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Recent registrations
          </h2>
          <button
            onClick={() => onNavigate("registrations")}
            className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Registered</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No registrations yet.
                  </td>
                </tr>
              ) : (
                stats.recentItems.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-card/40">
                    <td className="px-4 py-3 font-medium text-foreground">{r.fullName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.preferredRoleCategory || "Not specified"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                          r.paymentStatus === "paid"
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                            : r.paymentStatus === "pending"
                            ? "border-gold/30 bg-gold/10 text-gold"
                            : "border-red-400/30 bg-red-400/10 text-red-400"
                        )}
                      >
                        {r.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
