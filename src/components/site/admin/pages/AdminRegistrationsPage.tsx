"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  X,
  CheckCircle2,
  Clock,
  IndianRupee,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
} from "lucide-react";
import { adminFetch } from "@/lib/admin";
import { Skeleton } from "../../ui/Skeleton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  currentRole: string | null;
  experienceYears: number;
  highestQualification: string | null;
  keySkills: string | null;
  certifications: string | null;
  preferredLocation: string | null;
  preferredRoleCategory: string | null;
  workMode: string | null;
  noticePeriod: string | null;
  currentCtc: string | null;
  expectedCtc: string | null;
  registrationFee: number;
  paymentStatus: string;
  razorpayPaymentId: string | null;
  termsAccepted: boolean;
  createdAt: string;
}

interface ApiResponse {
  items: Registration[];
  total: number;
  page: number;
  pages: number;
}

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
];

export function AdminRegistrationsPage() {
  const { toast } = useToast();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Registration | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status,
        search,
        page: String(page),
        limit: "20",
      });
      const res = await adminFetch(`/api/admin/registrations?${params}`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setData(json);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [status, search, page]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await adminFetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ paymentStatus: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Status updated",
        description: `Marked as ${newStatus}.`,
      });
      load();
      if (selected && selected.id === id) {
        setSelected({ ...selected, paymentStatus: newStatus });
      }
    } catch {
      toast({
        title: "Update failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Registrations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {data ? `${data.total} total` : "Loading..."} candidate registrations.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, phone, role..."
            className="pl-10 bg-background/50 border-border focus:border-gold/60"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-md border border-border bg-card/30">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setStatus(f.value);
                setPage(1);
              }}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                status === f.value
                  ? "bg-gold/10 text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Exp</th>
                <th className="px-4 py-3 font-medium">Fee</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-8" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-12" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-5 w-14 rounded-full" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-6 w-16" /></td>
                  </tr>
                ))
              ) : !data || data.items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                data.items.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border last:border-0 hover:bg-card/40 cursor-pointer"
                    onClick={() => setSelected(r)}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{r.fullName}</td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[12rem]">{r.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.preferredRoleCategory || "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.preferredLocation || "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{r.experienceYears}y</td>
                    <td className="px-4 py-3 text-muted-foreground">₹{r.registrationFee}</td>
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
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(r);
                        }}
                        className="text-xs text-gold hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Page {data.page} of {data.pages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 rounded text-xs border border-border disabled:opacity-40 hover:border-gold/40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                disabled={page >= data.pages}
                className="px-3 py-1.5 rounded text-xs border border-border disabled:opacity-40 hover:border-gold/40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <RegistrationDetail
            reg={selected}
            onClose={() => setSelected(null)}
            onUpdateStatus={updateStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RegistrationDetail({
  reg,
  onClose,
  onUpdateStatus,
}: {
  reg: Registration;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
}) {
  const skills = reg.keySkills?.split(",").map((s) => s.trim()).filter(Boolean) || [];
  const certs = reg.certifications?.split(",").map((s) => s.trim()).filter(Boolean) || [];

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
        className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-card border-l border-border overflow-y-auto"
      >
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Registration Detail
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {reg.fullName}
              </h3>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                  reg.paymentStatus === "paid"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                    : "border-gold/30 bg-gold/10 text-gold"
                )}
              >
                {reg.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              ID: {reg.id}
            </p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(reg.createdAt).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Status actions */}
          <div className="p-4 rounded-lg border border-border bg-background/40">
            <p className="text-xs font-medium text-foreground mb-2">Update status</p>
            <div className="flex gap-2">
              {["pending", "paid", "failed"].map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(reg.id, s)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                    reg.paymentStatus === s
                      ? "border-gold/40 bg-gold/10 text-gold"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Section title="Contact">
            <DetailRow icon={Mail} label="Email" value={reg.email} />
            <DetailRow icon={Phone} label="Phone" value={reg.phone} />
          </Section>

          {/* Professional */}
          <Section title="Professional">
            <DetailRow icon={Briefcase} label="Current Role" value={reg.currentRole || "Not specified"} />
            <DetailRow icon={Clock} label="Experience" value={`${reg.experienceYears} years`} />
            <DetailRow icon={GraduationCap} label="Qualification" value={reg.highestQualification || "Not specified"} />
            <DetailRow icon={IndianRupee} label="Current CTC" value={reg.currentCtc || "Not specified"} />
            <DetailRow icon={IndianRupee} label="Expected CTC" value={reg.expectedCtc || "Not specified"} />
            <DetailRow icon={Clock} label="Notice Period" value={reg.noticePeriod || "Not specified"} />
          </Section>

          {/* Preferences */}
          <Section title="Preferences">
            <DetailRow icon={Briefcase} label="Preferred Role" value={reg.preferredRoleCategory || "Not specified"} />
            <DetailRow icon={MapPin} label="Location" value={reg.preferredLocation || "Not specified"} />
            <DetailRow icon={CheckCircle2} label="Work Mode" value={reg.workMode || "Not specified"} />
          </Section>

          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Key Skills">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[10px] text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Certifications */}
          {certs.length > 0 && (
            <Section title="Certifications">
              <div className="flex flex-wrap gap-1.5">
                {certs.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 font-mono text-[10px] text-gold"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Payment */}
          <Section title="Payment">
            <DetailRow icon={IndianRupee} label="Registration Fee" value={`₹${reg.registrationFee}`} />
            {reg.razorpayPaymentId && (
              <DetailRow icon={Award} label="Razorpay Payment ID" value={reg.razorpayPaymentId} mono />
            )}
            <DetailRow icon={CheckCircle2} label="Terms Accepted" value={reg.termsAccepted ? "Yes" : "No"} />
          </Section>
        </div>
      </motion.div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
        {title}
      </h4>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-muted-foreground">{label}: </span>
        <span className={cn("text-foreground break-words", mono && "font-mono text-xs")}>
          {value}
        </span>
      </div>
    </div>
  );
}
