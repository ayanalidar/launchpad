"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { adminFetch } from "@/lib/admin";
import { Skeleton } from "../../ui/Skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: string;
  resolved: boolean;
  notes: string | null;
}

export function AdminMessagesPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unresolved" | "resolved">("all");
  const [active, setActive] = useState<Message | null>(null);
  const [notes, setNotes] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === "unresolved") params.set("resolved", "false");
      if (filter === "resolved") params.set("resolved", "true");
      const res = await adminFetch(`/api/admin/messages?${params}`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setItems(json.items);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const updateMessage = async (id: string, resolved: boolean, newNotes?: string) => {
    try {
      const res = await adminFetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          resolved,
          notes: newNotes !== undefined ? newNotes : notes,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: resolved ? "Marked resolved" : "Marked unresolved",
      });
      load();
      if (active && active.id === id) {
        setActive({ ...active, resolved, notes: newNotes !== undefined ? newNotes : notes });
      }
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions from the website.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-md border border-border bg-card/30 w-fit">
        {(["all", "unresolved", "resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded text-xs font-medium transition-colors capitalize",
              filter === f
                ? "bg-gold/10 text-gold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No messages.
            </p>
          ) : (
            items.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActive(m);
                  setNotes(m.notes || "");
                }}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-colors",
                  active?.id === m.id
                    ? "border-gold/40 bg-gold/5"
                    : "border-border bg-card/30 hover:border-gold/30"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-sm text-foreground truncate">
                    {m.name}
                  </span>
                  {m.resolved ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
                  {m.message}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {new Date(m.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg border border-border bg-card/30"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {active.name}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    {active.email}
                    {active.phone && (
                      <>
                        <span className="mx-1">·</span>
                        <Phone className="h-3 w-3" />
                        {active.phone}
                      </>
                    )}
                  </p>
                </div>
                <span className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                  active.resolved
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                    : "border-gold/30 bg-gold/10 text-gold"
                )}>
                  {active.subject}
                </span>
              </div>

              <div className="p-4 rounded-md bg-background/40 border border-border mb-4">
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                  {active.message}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-foreground">Internal notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this conversation..."
                  rows={3}
                  className="bg-background/50 border-border focus:border-gold/60 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => updateMessage(active.id, !active.resolved, notes)}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      active.resolved
                        ? "border border-border text-muted-foreground hover:text-foreground"
                        : "bg-emerald-500/90 text-white hover:bg-emerald-500"
                    )}
                  >
                    {active.resolved ? "Mark unresolved" : "Mark resolved"}
                  </button>
                  <button
                    onClick={() => updateMessage(active.id, active.resolved, notes)}
                    className="px-4 py-2 rounded-md text-sm font-medium border border-gold/30 bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                  >
                    Save notes
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-12 rounded-lg border border-border bg-card/30 text-center">
              <Mail className="h-8 w-8 text-gold/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Select a message to view details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
