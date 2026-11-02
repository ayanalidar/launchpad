"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Loader2, Eye, EyeOff } from "lucide-react";
import { adminFetch } from "@/lib/admin";
import { Skeleton } from "../../ui/Skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  initials: string;
  role: string;
  location: string;
  companyType: string;
  outcome: string;
  quote: string;
  placedAgo: string;
  isActive: boolean;
  sortOrder: number;
}

const EMPTY: Omit<Story, "id"> = {
  initials: "",
  role: "",
  location: "",
  companyType: "",
  outcome: "",
  quote: "",
  placedAgo: "",
  isActive: true,
  sortOrder: 0,
};

export function AdminPlacementsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Story | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/placements");
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setItems(json.items);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data: Partial<Story>, id?: string) => {
    try {
      if (id) {
        await adminFetch(`/api/admin/placements/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      } else {
        await adminFetch("/api/admin/placements", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }
      toast({ title: id ? "Story updated" : "Story created" });
      setEditing(null);
      setCreating(false);
      load();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this story?")) return;
    try {
      await adminFetch(`/api/admin/placements/${id}`, { method: "DELETE" });
      toast({ title: "Story deleted" });
      load();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const toggleActive = async (s: Story) => {
    await adminFetch(`/api/admin/placements/${s.id}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive: !s.isActive }),
    });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Placements</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} success stories on the Home page carousel.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Add Story
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("p-4 rounded-lg border bg-card/30", !s.isActive && "opacity-60")}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                    <span className="font-display text-xs font-semibold text-gold">{s.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">{s.role}</h3>
                    <p className="text-[10px] text-muted-foreground">{s.location} · {s.companyType}</p>
                  </div>
                </div>
                <button onClick={() => toggleActive(s)} className={cn("p-1", s.isActive ? "text-emerald-400" : "text-muted-foreground")}>
                  {s.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2 italic">&ldquo;{s.quote}&rdquo;</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                  {s.outcome}
                </span>
                <span className="text-[10px] text-muted-foreground">{s.placedAgo}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(s)} className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-xs border border-border text-muted-foreground hover:text-foreground hover:border-gold/30">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button onClick={() => handleDelete(s.id)} className="px-2 py-1.5 rounded-md text-xs border border-border text-red-400/70 hover:text-red-400 hover:border-red-400/30">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {(editing || creating) && (
          <StoryEditor story={editing} onClose={() => { setEditing(null); setCreating(false); }} onSave={handleSave} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StoryEditor({
  story,
  onClose,
  onSave,
}: {
  story: Story | null;
  onClose: () => void;
  onSave: (data: Partial<Story>, id?: string) => void;
}) {
  const [form, setForm] = useState(story || EMPTY);
  const [saving, setSaving] = useState(false);
  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 z-[60] w-full max-w-lg bg-card border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">{story ? "Edit Story" : "New Story"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Initials"><Input value={form.initials} onChange={(e) => update("initials", e.target.value)} maxLength={3} className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Role"><Input value={form.role} onChange={(e) => update("role", e.target.value)} className="bg-background/50 border-border focus:border-gold/60" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location"><Input value={form.location} onChange={(e) => update("location", e.target.value)} className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Company Type"><Input value={form.companyType} onChange={(e) => update("companyType", e.target.value)} className="bg-background/50 border-border focus:border-gold/60" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Outcome (e.g. +38% hike)"><Input value={form.outcome} onChange={(e) => update("outcome", e.target.value)} className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Placed Ago (e.g. 2 weeks ago)"><Input value={form.placedAgo} onChange={(e) => update("placedAgo", e.target.value)} className="bg-background/50 border-border focus:border-gold/60" /></Field>
          </div>
          <Field label="Quote"><Textarea value={form.quote} onChange={(e) => update("quote", e.target.value)} rows={4} className="bg-background/50 border-border focus:border-gold/60 resize-none" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sort Order"><Input type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", Number(e.target.value))} className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Active">
              <select value={form.isActive ? "true" : "false"} onChange={(e) => update("isActive", e.target.value === "true")} className="w-full h-10 rounded-md border border-border bg-background/50 px-3 text-sm text-foreground focus:border-gold/60 focus:outline-none">
                <option value="true">Yes (visible)</option>
                <option value="false">No (hidden)</option>
              </select>
            </Field>
          </div>
        </div>
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm border border-border text-muted-foreground hover:text-foreground">Cancel</button>
          <button onClick={() => { setSaving(true); onSave(form, story?.id).finally(() => setSaving(false)); }} disabled={saving || !form.initials || !form.role} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Story
          </button>
        </div>
      </motion.div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
