"use client";

import { useEffect, useState } from "react";
import { Mail, Download, Loader2 } from "lucide-react";
import { adminFetch } from "@/lib/admin";
import { Skeleton } from "../../ui/Skeleton";
import { useToast } from "@/hooks/use-toast";

interface Subscriber {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}

export function AdminSubscribersPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminFetch("/api/admin/subscribers");
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        setItems(json.items);
        setTotal(json.total);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const exportCsv = async () => {
    try {
      const res = await adminFetch("/api/admin/subscribers/export");
      if (!res.ok) throw new Error("Export failed");
      const csv = await res.text();
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `subscribers-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast({
        title: "Exported",
        description: `${total} subscribers downloaded as CSV.`,
      });
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Subscribers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} email subscribers from the homepage capture bar.
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={total === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gold/30 bg-gold/10 text-gold text-sm font-medium hover:bg-gold/20 transition-colors disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3"><Skeleton className="h-4 w-48" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">
                    <Mail className="h-8 w-8 text-gold/30 mx-auto mb-3" />
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                items.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-card/40">
                    <td className="px-4 py-3 font-medium text-foreground">{s.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {s.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(s.createdAt).toLocaleString("en-IN")}
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
