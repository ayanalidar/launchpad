"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Settings as SettingsIcon, Link, MessageSquare, IndianRupee } from "lucide-react";
import { adminFetch } from "@/lib/admin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Settings {
  id: string;
  registrationFee: number;
  whatsappNumber: string;
  linkedinUrl: string;
  academyUrl: string;
  securityUrl: string;
  heroHeadline: string;
  heroBody: string;
  postPlacementFeeDescription: string;
  responseTimeHours: number;
}

const EMPTY: Settings = {
  id: "default",
  registrationFee: 2000,
  whatsappNumber: "917006712347",
  linkedinUrl: "https://www.linkedin.com/company/guardianx-academy/",
  academyUrl: "https://www.academy.guardianx.cloud",
  securityUrl: "https://www.guardianx.in",
  heroHeadline: "Launch your technology career with us.",
  heroBody: "GuardianX Launchpad connects skilled professionals with leading tech employers across every domain.",
  postPlacementFeeDescription: "A consultancy fee applies upon successful placement. The complete fee structure is explained after registration.",
  responseTimeHours: 48,
};

export function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminFetch("/api/admin/settings");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setSettings(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await adminFetch("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Settings saved",
        description: "Changes are now live on the site.",
      });
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const update = <K extends keyof Settings>(k: K, v: Settings[K]) =>
    setSettings((s) => ({ ...s, [k]: v }));

  if (loading) {
    return <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-20 rounded-lg border border-border bg-card/30 animate-pulse" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Site Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Editable site-wide configuration. Changes take effect immediately on save.
        </p>
      </div>

      {/* Money section */}
      <Section title="Fees & Money" icon={IndianRupee}>
        <Field label="Registration Fee (₹)">
          <Input
            type="number"
            value={settings.registrationFee}
            onChange={(e) => update("registrationFee", Number(e.target.value))}
            className="bg-background/50 border-border focus:border-gold/60"
          />
        </Field>
        <Field label="Post-Placement Fee Description">
          <Textarea
            value={settings.postPlacementFeeDescription}
            onChange={(e) => update("postPlacementFeeDescription", e.target.value)}
            rows={4}
            className="bg-background/50 border-border focus:border-gold/60 resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This description is shown on Admissions, Register, and Dashboard pages.
          </p>
        </Field>
      </Section>

      {/* Contact section */}
      <Section title="Contact & Social" icon={Link}>
        <Field label="WhatsApp Number (with country code, no +)">
          <Input
            value={settings.whatsappNumber}
            onChange={(e) => update("whatsappNumber", e.target.value)}
            placeholder="917006712347"
            className="bg-background/50 border-border focus:border-gold/60 font-mono"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Powers the floating WhatsApp button. Current: +{settings.whatsappNumber}
          </p>
        </Field>
        <Field label="LinkedIn Company URL">
          <Input
            value={settings.linkedinUrl}
            onChange={(e) => update("linkedinUrl", e.target.value)}
            className="bg-background/50 border-border focus:border-gold/60"
          />
        </Field>
        <Field label="GuardianX Academy URL">
          <Input
            value={settings.academyUrl}
            onChange={(e) => update("academyUrl", e.target.value)}
            className="bg-background/50 border-border focus:border-gold/60"
          />
        </Field>
        <Field label="GuardianX Security URL">
          <Input
            value={settings.securityUrl}
            onChange={(e) => update("securityUrl", e.target.value)}
            className="bg-background/50 border-border focus:border-gold/60"
          />
        </Field>
        <Field label="Response Time (hours)">
          <Input
            type="number"
            value={settings.responseTimeHours}
            onChange={(e) => update("responseTimeHours", Number(e.target.value))}
            className="bg-background/50 border-border focus:border-gold/60"
          />
        </Field>
      </Section>

      {/* Hero section */}
      <Section title="Home Hero Content" icon={MessageSquare}>
        <Field label="Hero Headline">
          <Input
            value={settings.heroHeadline}
            onChange={(e) => update("heroHeadline", e.target.value)}
            className="bg-background/50 border-border focus:border-gold/60"
          />
        </Field>
        <Field label="Hero Body Text">
          <Textarea
            value={settings.heroBody}
            onChange={(e) => update("heroBody", e.target.value)}
            rows={4}
            className="bg-background/50 border-border focus:border-gold/60 resize-none"
          />
        </Field>
      </Section>

      {/* Save button */}
      <div className="sticky bottom-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-60 shadow-lg"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card/30 p-6 space-y-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-gold" />
        <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
