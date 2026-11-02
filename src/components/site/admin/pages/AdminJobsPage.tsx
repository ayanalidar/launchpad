"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Loader2, Eye, EyeOff, MapPin, Briefcase } from "lucide-react";
import { adminFetch } from "@/lib/admin";
import { Skeleton } from "../../ui/Skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  postedAgo: string;
  status: string;
  roleSlug: string | null;
  isActive: boolean;
}

const EMPTY: Omit<Job, "id"> = {
  title: "",
  company: "",
  location: "",
  salary: "",
  matchScore: 80,
  postedAgo: "1 day ago",
  status: "new",
  roleSlug: "",
  isActive: true,
};

export function AdminJobsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Job | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/jobs");
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

  const handleSave = async (data: Partial<Job>, id?: string) => {
    try {
      if (id) {
        await adminFetch(`/api/admin/jobs/${id}`, { method: "PATCH", body: JSON.stringify(data) });
      } else {
        await adminFetch("/api/admin/jobs", { method: "POST", body: JSON.stringify(data) });
      }
      toast({ title: id ? "Job updated" : "Job created" });
      setEditing(null);
      setCreating(false);
      load();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    try {
      await adminFetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      toast({ title: "Job deleted" });
      load();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const toggleActive = async (j: Job) => {
    await adminFetch(`/api/admin/jobs/${j.id}`, { method: "PATCH", body: JSON.stringify({ isActive: !j.isActive }) });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Job Openings</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} job openings. These appear on the candidate Dashboard as matched roles.</p>
        </div>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110">
          <Plus className="h-4 w-4" /> Add Opening
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-lg border border-border bg-card/30 text-center">
          <Briefcase className="h-8 w-8 text-gold/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No job openings yet. Add one to show matched roles on candidate dashboards.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((j) => (
            <motion.div key={j.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("p-3 rounded-lg border bg-card/30 flex items-center gap-3", !j.isActive && "opacity-60")}>
              <button onClick={() => toggleActive(j)} className={cn("shrink-0", j.isActive ? "text-emerald-400" : "text-muted-foreground")}>
                {j.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm text-foreground">{j.title}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{j.company}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />{j.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-gold">{j.salary}</span>
                  <span className="text-[10px] text-muted-foreground">· {j.matchScore}% match · {j.postedAgo}</span>
                  <span className={cn("inline-flex items-center rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                    j.status === "new" ? "border-gold/30 bg-gold/10 text-gold" :
                    j.status === "shortlisted" ? "border-blue-400/30 bg-blue-400/10 text-blue-400" :
                    j.status === "interviewing" ? "border-purple-400/30 bg-purple-400/10 text-purple-400" :
                    "border-border text-muted-foreground"
                  )}>{j.status}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(j)} className="p-1.5 rounded text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(j.id)} className="p-1.5 rounded text-red-400/70 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {(editing || creating) && <JobEditor job={editing} onClose={() => { setEditing(null); setCreating(false); }} onSave={handleSave} />}
      </AnimatePresence>
    </div>
  );
}

function JobEditor({ job, onClose, onSave }: { job: Job | null; onClose: () => void; onSave: (data: Partial<Job>, id?: string) => void; }) {
  const [form, setForm] = useState(job || EMPTY);
  const [saving, setSaving] = useState(false);
  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 z-[60] w-full max-w-lg bg-card border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">{job ? "Edit Opening" : "New Opening"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <Field label="Title"><Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Senior Software Engineer" className="bg-background/50 border-border focus:border-gold/60" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Company"><Input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="SaaS unicorn" className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Location"><Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Bangalore" className="bg-background/50 border-border focus:border-gold/60" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Salary Range"><Input value={form.salary} onChange={(e) => update("salary", e.target.value)} placeholder="₹18-28 LPA" className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Match Score (0-100)"><Input type="number" min={0} max={100} value={form.matchScore} onChange={(e) => update("matchScore", Number(e.target.value))} className="bg-background/50 border-border focus:border-gold/60" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Posted (e.g. 1 day ago)"><Input value={form.postedAgo} onChange={(e) => update("postedAgo", e.target.value)} className="bg-background/50 border-border focus:border-gold/60" /></Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full h-10 rounded-md border border-border bg-background/50 px-3 text-sm text-foreground focus:border-gold/60 focus:outline-none">
                <option value="new">new</option>
                <option value="shortlisted">shortlisted</option>
                <option value="interviewing">interviewing</option>
                <option value="closed">closed</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Role Slug (optional link)"><Input value={form.roleSlug ?? ""} onChange={(e) => update("roleSlug", e.target.value || null)} placeholder="software-engineer" className="bg-background/50 border-border focus:border-gold/60 font-mono" /></Field>
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
          <button onClick={() => { setSaving(true); onSave(form, job?.id).finally(() => setSaving(false)); }} disabled={saving || !form.title} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Opening
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
