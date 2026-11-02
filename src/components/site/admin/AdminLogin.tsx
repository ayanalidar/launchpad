"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { BrandLogo } from "../ui/BrandLogo";
import { setAdminToken } from "@/lib/admin";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setAdminToken(data.token);
      toast({
        title: "Welcome back",
        description: "Admin access granted.",
      });
      onSuccess();
    } catch (err) {
      toast({
        title: "Login failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="relative p-8 sm:p-10 rounded-2xl border border-gold/30 bg-card/40 backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-gold/[0.08] blur-[80px]" />

          <div className="relative">
            <div className="flex justify-center mb-6">
              <BrandLogo />
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 mb-4">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  Admin Panel
                </span>
              </div>
              <h1 className="font-display text-2xl font-semibold text-foreground">
                Sign in to manage GuardianX
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your admin password to access the control panel.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">
                  Admin Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    autoFocus
                    className="pl-10 bg-background/50 border-border focus:border-gold/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Password is set via the{" "}
              <code className="text-gold">ADMIN_PASSWORD</code> environment variable.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
