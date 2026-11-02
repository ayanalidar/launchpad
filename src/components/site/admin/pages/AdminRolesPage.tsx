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

interface Role {
  id: string;
  title: string;
  slug: string;
  level: string;
  description: string;
  skills: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  tagline: string | null;
  overview: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryMedian: number | null;
  createdAt: string;
}

const EMPTY: Omit<Role, "id" | "createdAt"> = {
  title: "",
  slug: "",
  level: "Entry to Senior",
  description: "",
  skills: "",
  category: "Engineering",
  isActive: true,
  sortOrder: 0,
  tagline: "",
  overview: "",
  salaryMin: null,
  salaryMax: null,
  salaryMedian: null,
};

export function AdminRolesPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Role | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/roles");
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setItems(json.items);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (data: Partial<Role>, id?: string) => {
    try {
      if (id) {
        const res = await adminFetch(`/api/admin/roles/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed");
      } else {
        const res = await adminFetch("/api/admin/roles", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed");
      }
      toast({ title: id ? "Role updated" : "Role created" });
      setEditing(null);
      setCreating(false);
      load();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this role? This cannot be undone.")) return;
    try {
      const res = await adminFetch(`/api/admin/roles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Role deleted" });
      load();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const toggleActive = async (role: Role) => {
    try {
      const res = await adminFetch(`/api/admin/roles/${role.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !role.isActive }),
      });
      if (!res.ok) throw new Error("Failed");
      load();
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Roles</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} role categories. Powers Placements page + Register dropdown + role deep-dive pages.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Role
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-4 rounded-lg border bg-card/30",
                r.isActive ? "border-border" : "border-border opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {r.title}
                  </h3>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    /{r.slug}
                  </p>
                </div>
                <button
                  onClick={() => toggleActive(r)}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    r.isActive
                      ? "text-emerald-400 hover:bg-emerald-400/10"
                      : "text-muted-foreground hover:bg-card/60"
                  )}
                  title={r.isActive ? "Active (click to deactivate)" : "Inactive (click to activate)"}
                >
                  {r.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {r.description}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/5 px-2 py-0.5 font-mono text-[10px] text-gold">
                  {r.category}
                </span>
                <span className="text-[10px] text-muted-foreground">{r.level}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(r)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-xs border border-border text-muted-foreground hover:text-foreground hover:border-gold/30 transition-colors"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="px-2 py-1.5 rounded-md text-xs border border-border text-red-400/70 hover:text-red-400 hover:border-red-400/30 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {(editing || creating) && (
          <RoleEditor
            role={editing}
            onClose={() => {
              setEditing(null);
              setCreating(false);
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RoleEditor({
  role,
  onClose,
  onSave,
}: {
  role: Role | null;
  onClose: () => void;
  onSave: (data: Partial<Role>, id?: string) => void;
}) {
  const [form, setForm] = useState(role || EMPTY);
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(form, role?.id);
    setSaving(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-[60] w-full max-w-lg bg-card border-l border-border overflow-y-auto"
      >
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {role ? "Edit Role" : "New Role"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <Field label="Title">
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Software Engineer"
              className="bg-background/50 border-border focus:border-gold/60"
            />
          </Field>
          <Field label="Slug (URL, leave empty to auto-generate)">
            <Input
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="software-engineer"
              className="bg-background/50 border-border focus:border-gold/60 font-mono"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Level">
              <Input
                value={form.level}
                onChange={(e) => update("level", e.target.value)}
                placeholder="Entry to Senior"
                className="bg-background/50 border-border focus:border-gold/60"
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-background/50 px-3 text-sm text-foreground focus:border-gold/60 focus:outline-none"
              >
                <option>Engineering</option>
                <option>AI/Data</option>
                <option>Security</option>
                <option>Design</option>
                <option>Leadership</option>
              </select>
            </Field>
          </div>
          <Field label="Description (shown on card)">
            <Textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="bg-background/50 border-border focus:border-gold/60 resize-none"
            />
          </Field>
          <Field label="Skills (comma-separated)">
            <Input
              value={form.skills}
              onChange={(e) => update("skills", e.target.value)}
              placeholder="Java,Python,Go,React"
              className="bg-background/50 border-border focus:border-gold/60"
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Salary Min (LPA)">
              <Input
                type="number"
                value={form.salaryMin ?? ""}
                onChange={(e) => update("salaryMin", e.target.value ? Number(e.target.value) : null)}
                className="bg-background/50 border-border focus:border-gold/60"
              />
            </Field>
            <Field label="Salary Median">
              <Input
                type="number"
                value={form.salaryMedian ?? ""}
                onChange={(e) => update("salaryMedian", e.target.value ? Number(e.target.value) : null)}
                className="bg-background/50 border-border focus:border-gold/60"
              />
            </Field>
            <Field label="Salary Max (LPA)">
              <Input
                type="number"
                value={form.salaryMax ?? ""}
                onChange={(e) => update("salaryMax", e.target.value ? Number(e.target.value) : null)}
                className="bg-background/50 border-border focus:border-gold/60"
              />
            </Field>
          </div>
          <Field label="Tagline (deep-dive page)">
            <Input
              value={form.tagline ?? ""}
              onChange={(e) => update("tagline", e.target.value)}
              className="bg-background/50 border-border focus:border-gold/60"
            />
          </Field>
          <Field label="Overview (deep-dive page)">
            <Textarea
              value={form.overview ?? ""}
              onChange={(e) => update("overview", e.target.value)}
              rows={4}
              className="bg-background/50 border-border focus:border-gold/60 resize-none"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sort Order">
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) => update("sortOrder", Number(e.target.value))}
                className="bg-background/50 border-border focus:border-gold/60"
              />
            </Field>
            <Field label="Active">
              <select
                value={form.isActive ? "true" : "false"}
                onChange={(e) => update("isActive", e.target.value === "true")}
                className="w-full h-10 rounded-md border border-border bg-background/50 px-3 text-sm text-foreground focus:border-gold/60 focus:outline-none"
              >
                <option value="true">Yes (visible)</option>
                <option value="false">No (hidden)</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm border border-border text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-medium hover:brightness-110 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Role
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
