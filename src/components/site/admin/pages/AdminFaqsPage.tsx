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

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
}

const EMPTY: Omit<FAQ, "id"> = {
  question: "",
  answer: "",
  category: "admissions",
  isActive: true,
  sortOrder: 0,
};

export function AdminFaqsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/faqs");
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

  const handleSave = async (data: Partial<FAQ>, id?: string) => {
    try {
      if (id) {
        await adminFetch(`/api/admin/faqs/${id}`, { method: "PATCH", body: JSON.stringify(data) });
      } else {
        await adminFetch("/api/admin/faqs", { method: "POST", body: JSON.stringify(data) });
      }
      toast({ title: id ? "FAQ updated" : "FAQ created" });
      setEditing(null);
      setCreating(false);
      load();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await adminFetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      toast({ title: "FAQ deleted" });
      load();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const toggleActive = async (f: FAQ) => {
    await adminFetch(`/api/admin/faqs/${f.id}`, { method: "PATCH", body: JSON.stringify({ isActive: !f.isActive }) });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">FAQs</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} FAQ items on the Admissions page.</p>
        </div>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110">
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}</div>
      ) : (
        <div className="space-y-2">
          {items.map((f) => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("p-4 rounded-lg border bg-card/30 flex items-start gap-3", !f.isActive && "opacity-60")}>
              <button onClick={() => toggleActive(f)} className={cn("mt-0.5", f.isActive ? "text-emerald-400" : "text-muted-foreground")}>
                {f.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm text-foreground">{f.question}</h3>
                  <span className="inline-flex items-center rounded-full border border-border bg-background/40 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{f.category}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(f)} className="p-1.5 rounded text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(f.id)} className="p-1.5 rounded text-red-400/70 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {(editing || creating) && <FaqEditor faq={editing} onClose={() => { setEditing(null); setCreating(false); }} onSave={handleSave} />}
      </AnimatePresence>
    </div>
  );
}

function FaqEditor({ faq, onClose, onSave }: { faq: FAQ | null; onClose: () => void; onSave: (data: Partial<FAQ>, id?: string) => void; }) {
  const [form, setForm] = useState(faq || EMPTY);
  const [saving, setSaving] = useState(false);
  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 z-[60] w-full max-w-lg bg-card border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">{faq ? "Edit FAQ" : "New FAQ"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <Field label="Question"><Input value={form.question} onChange={(e) => update("question", e.target.value)} className="bg-background/50 border-border focus:border-gold/60" /></Field>
          <Field label="Answer"><Textarea value={form.answer} onChange={(e) => update("answer", e.target.value)} rows={6} className="bg-background/50 border-border focus:border-gold/60 resize-none" /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Category">
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full h-10 rounded-md border border-border bg-background/50 px-3 text-sm text-foreground focus:border-gold/60 focus:outline-none">
                <option value="admissions">admissions</option>
                <option value="payments">payments</option>
                <option value="general">general</option>
              </select>
            </Field>
            <Field label="Sort Order"><Input type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", Number(e.target.value))} className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Active">
              <select value={form.isActive ? "true" : "false"} onChange={(e) => update("isActive", e.target.value === "true")} className="w-full h-10 rounded-md border border-border bg-background/50 px-3 text-sm text-foreground focus:border-gold/60 focus:outline-none">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </Field>
          </div>
        </div>
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm border border-border text-muted-foreground hover:text-foreground">Cancel</button>
          <button onClick={() => { setSaving(true); onSave(form, faq?.id).finally(() => setSaving(false)); }} disabled={saving || !form.question} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save FAQ
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
