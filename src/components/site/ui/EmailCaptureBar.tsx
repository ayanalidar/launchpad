"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, Loader2, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

/**
 * Sticky email capture bar.
 * Sits in the Home page just below the hero, gold-bordered.
 * Collapses to a slim "Get weekly tech openings" prompt when the user has
 * already subscribed (or clicks the dismiss arrow).
 */
export function EmailCaptureBar() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home_sticky_bar" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubscribed(true);
      toast({
        title: "Subscribed!",
        description: "You'll receive weekly tech openings in your inbox.",
      });
    } catch {
      toast({
        title: "Subscription failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative border-b border-border bg-card/40">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {subscribed ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 border border-gold/40">
                <CheckCircle2 className="h-4 w-4 text-gold" />
              </div>
              <p className="text-sm text-foreground">
                <span className="font-medium">You&apos;re in.</span>
                <span className="text-muted-foreground">
                  {" "}
                  Weekly tech openings will arrive in your inbox soon.
                </span>
              </p>
            </motion.div>
          ) : collapsed ? (
            <motion.button
              key="collapsed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => setCollapsed(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="font-mono uppercase tracking-[0.2em]">
                Get weekly tech openings in your inbox
              </span>
              <ArrowRight className="h-3 w-3" />
            </motion.button>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="py-4"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Get weekly tech openings in your inbox
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Curated roles across every domain. No spam, unsubscribe
                      anytime.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 shrink-0"
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full sm:w-64 h-10 bg-background/60 border-border focus:border-gold/60 focus-visible:ring-gold/20"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <span className="hidden sm:inline">Subscribe</span>
                        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollapsed(true)}
                    className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Collapse email capture bar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
