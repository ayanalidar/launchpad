"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  MapPin,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  Lock,
  Receipt,
  Info,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface RegisterPageProps {
  onNavigate: (p: PageId) => void;
}

const STEPS = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Professional", icon: Briefcase },
  { id: 3, label: "Preferences", icon: MapPin },
  { id: 4, label: "Payment", icon: CreditCard },
];

const LOCATIONS = [
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Remote",
  "Other / Open to relocation",
];

const ROLE_CATEGORIES = [
  "Software Engineering",
  "Cybersecurity",
  "Cloud / DevOps",
  "AI / Machine Learning",
  "Data Engineering",
  "Data Analytics",
  "Product Design (UX/UI)",
  "Mobile Engineering",
  "QA / Test Engineering",
  "Site Reliability Engineering",
  "Product Management",
  "Engineering Management",
  "Other / Not sure yet",
];

const WORK_MODES = ["On-site", "Hybrid", "Remote", "Open to all"];

interface FormData {
  // Personal
  fullName: string;
  email: string;
  phone: string;
  // Professional
  currentRole: string;
  experienceYears: string;
  highestQualification: string;
  keySkills: string;
  certifications: string;
  // Preferences
  preferredLocation: string;
  preferredRoleCategory: string;
  workMode: string;
  noticePeriod: string;
  currentCtc: string;
  expectedCtc: string;
  // Terms
  termsAccepted: boolean;
}

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  currentRole: "",
  experienceYears: "",
  highestQualification: "",
  keySkills: "",
  certifications: "",
  preferredLocation: "",
  preferredRoleCategory: "",
  workMode: "",
  noticePeriod: "",
  currentCtc: "",
  expectedCtc: "",
  termsAccepted: false,
};

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [paid, setPaid] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [paidOrderId, setPaidOrderId] = useState<string | null>(null);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
        toast({
          title: "Please complete the form",
          description: "Full name, email, and phone are required.",
          variant: "destructive",
        });
        return false;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      if (!emailOk) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return false;
      }
    }
    if (s === 2) {
      if (form.experienceYears === "" || form.experienceYears === null) {
        toast({
          title: "Experience required",
          description: "Please enter your years of experience.",
          variant: "destructive",
        });
        return false;
      }
    }
    if (s === 3) {
      if (!form.preferredLocation || !form.preferredRoleCategory || !form.workMode) {
        toast({
          title: "Please complete preferences",
          description: "Location, role category, and work mode are required.",
          variant: "destructive",
        });
        return false;
      }
    }
    if (s === 4) {
      if (!form.termsAccepted) {
        toast({
          title: "Terms acceptance required",
          description: "Please review and accept the terms before proceeding.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startPayment = async () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          experienceYears: Number(form.experienceYears) || 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      const { registrationId: regId, order } = data;
      setRegistrationId(regId);

      // If Razorpay keys aren't configured, mock-success the payment
      if (order.mock) {
        // Simulate payment success
        await mockPaymentSuccess(regId, order.id);
        return;
      }

      // Open Razorpay checkout
      // Razorpay checkout.js script must be loaded
      await openRazorpayCheckout({
        keyId: order.key_id,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        onSuccess: async (rzpPaymentId, rzpSignature) => {
          await verifyPayment(
            regId,
            order.id,
            rzpPaymentId,
            rzpSignature,
            false
          );
        },
        onFailure: (err) => {
          setSubmitting(false);
          toast({
            title: "Payment failed",
            description:
              err?.description || "Payment was not completed. Please try again.",
            variant: "destructive",
          });
        },
      });
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      toast({
        title: "Registration failed",
        description:
          (err as Error)?.message ||
          "Something went wrong. Please try again or contact our team.",
        variant: "destructive",
      });
    }
  };

  const mockPaymentSuccess = async (regId: string, orderId: string) => {
    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: regId,
          razorpayOrderId: orderId,
          razorpayPaymentId: `mock_pay_${Date.now()}`,
          razorpaySignature: "mock_signature",
          mock: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPaid(true);
        setPaidOrderId(orderId);
        setSubmitting(false);
        toast({
          title: "Registration complete (demo mode)",
          description:
            "Payment simulated, configure Razorpay keys in production to enable real payments.",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
      toast({
        title: "Payment verification failed",
        description: "Please contact our team.",
        variant: "destructive",
      });
    }
  };

  const verifyPayment = async (
    regId: string,
    orderId: string,
    paymentId: string,
    signature: string,
    mock: boolean
  ) => {
    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: regId,
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          razorpaySignature: signature,
          mock,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPaid(true);
        setPaidOrderId(orderId);
        setSubmitting(false);
        toast({
          title: "Registration complete",
          description: "Payment verified. Welcome to GuardianX Academy.",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
      toast({
        title: "Payment verification failed",
        description: "Please contact our team with your payment reference.",
        variant: "destructive",
      });
    }
  };

  // ---------- Razorpay checkout loader ----------
  const openRazorpayCheckout = (opts: {
    keyId: string;
    orderId: string;
    amount: number;
    currency: string;
    prefill: { name: string; email: string; contact: string };
    onSuccess: (paymentId: string, signature: string) => void;
    onFailure: (err: unknown) => void;
  }) =>
    new Promise<void>((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Razorpay can only run in the browser."));
        return;
      }
      const existing = document.getElementById("razorpay-checkout-script");
      const onLoad = () => {
        // @ts-expect-error - Razorpay injects its own global
        const Razorpay = window.Razorpay;
        if (!Razorpay) {
          reject(new Error("Razorpay SDK failed to load"));
          return;
        }
        const rzp = new Razorpay({
          key: opts.keyId,
          amount: opts.amount,
          currency: opts.currency,
          order_id: opts.orderId,
          name: "GuardianX Academy",
          description: "Cybersecurity Recruitment, Registration Fee",
          image: "/logo.svg",
          prefill: opts.prefill,
          notes: {
            purpose: "GuardianX Academy registration",
          },
          theme: {
            color: "#F59E0B",
          },
          handler: (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            opts.onSuccess(
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            resolve();
          },
          modal: {
            ondismiss: () => {
              opts.onFailure({ description: "Payment cancelled by user." });
              resolve();
            },
          },
        });
        rzp.open();
      };
      if (existing) {
        onLoad();
      } else {
        const script = document.createElement("script");
        script.id = "razorpay-checkout-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = onLoad;
        script.onerror = () =>
          reject(new Error("Failed to load Razorpay checkout script."));
        document.body.appendChild(script);
      }
    });

  // ---------- Success screen ----------
  if (paid) {
    return (
      <>
        <Background variant="hero" />
        <section className="relative pt-28 pb-24 min-h-[80vh] flex items-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 sm:p-12 rounded-2xl border border-gold/30 bg-card/40 backdrop-blur-sm text-center overflow-hidden"
            >
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-gold/[0.12] blur-[100px]" />
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 border border-gold/40"
              >
                <CheckCircle2 className="h-10 w-10 text-gold" />
              </motion.div>

              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
                Registration complete.
              </h1>
              <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Welcome to GuardianX. Your profile is now active in our
                consultancy network. Our team will review your details and
                reach out within five business days to discuss matching
                opportunities and walk you through the post-placement
                consultancy fee structure.
              </p>

              <div className="mt-8 p-4 rounded-lg border border-border bg-background/50 inline-block">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Registration Reference
                </div>
                <div className="font-mono text-sm text-gold">
                  {registrationId?.slice(-12).toUpperCase()}
                </div>
                {paidOrderId && (
                  <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                    Order: {paidOrderId}
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <CTAButton onClick={() => onNavigate("placements")}>
                  Explore Placement Categories
                </CTAButton>
                <CTAButton variant="ghost" onClick={() => onNavigate("home")}>
                  Return Home
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Background variant="hero" />

      {/* Hero */}
      <section className="relative pt-28 pb-8 sm:pt-32 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5"
          >
            <Receipt className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Register · ₹2,000 Fee
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Begin your
            <br />
            <span className="text-gradient-gold italic">registration.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Complete the four-step registration form, accept the terms, and pay
            the ₹2,000 registration fee securely via Razorpay. Your profile
            will be activated in our consultancy network immediately.
          </motion.p>
        </div>
      </section>

      {/* Form card */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            {/* Stepper */}
            <div className="px-6 sm:px-10 pt-8">
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {STEPS.map((s) => {
                  const isActive = step === s.id;
                  const isDone = step > s.id;
                  return (
                    <div key={s.id} className="flex flex-col items-center">
                      <div className="flex items-center w-full">
                        {s.id > 1 && (
                          <div
                            className={cn(
                              "flex-1 h-px transition-colors duration-300",
                              isDone || isActive ? "bg-gold/60" : "bg-border"
                            )}
                          />
                        )}
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isActive && "border-gold bg-gold/10 text-gold",
                            isDone && "border-gold bg-gold text-gold-foreground",
                            !isActive && !isDone && "border-border text-muted-foreground"
                          )}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <s.icon className="h-4 w-4" />
                          )}
                        </div>
                        {s.id < STEPS.length && (
                          <div
                            className={cn(
                              "flex-1 h-px transition-colors duration-300",
                              isDone ? "bg-gold/60" : "bg-border"
                            )}
                          />
                        )}
                      </div>
                      <span
                        className={cn(
                          "mt-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                          isActive || isDone ? "text-gold" : "text-muted-foreground"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step content */}
            <div className="px-6 sm:px-10 py-10">
              <AnimatePresence mode="wait">
                {/* STEP 1: PERSONAL */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                        Personal information
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        We use these details to contact you about matching
                        opportunities. Your information stays confidential.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="fullName" className="text-sm">
                          Full Name <span className="text-gold">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          value={form.fullName}
                          onChange={(e) => update("fullName", e.target.value)}
                          placeholder="Your full name"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm">
                          Email <span className="text-gold">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm">
                          Phone <span className="text-gold">*</span>
                        </Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+91 ..."
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PROFESSIONAL */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                        Professional background
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Tell us about your skills and experience so we can match
                        you against the right openings.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="currentRole" className="text-sm">
                          Current / Most Recent Role
                        </Label>
                        <Input
                          id="currentRole"
                          value={form.currentRole}
                          onChange={(e) => update("currentRole", e.target.value)}
                          placeholder="e.g. SOC Analyst L2"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experienceYears" className="text-sm">
                          Years of Experience <span className="text-gold">*</span>
                        </Label>
                        <Input
                          id="experienceYears"
                          type="number"
                          min={0}
                          max={40}
                          value={form.experienceYears}
                          onChange={(e) =>
                            update("experienceYears", e.target.value)
                          }
                          placeholder="0"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="highestQualification" className="text-sm">
                          Highest Qualification
                        </Label>
                        <Input
                          id="highestQualification"
                          value={form.highestQualification}
                          onChange={(e) =>
                            update("highestQualification", e.target.value)
                          }
                          placeholder="e.g. B.Tech (CSE)"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="keySkills" className="text-sm">
                          Key Skills (comma-separated)
                        </Label>
                        <Input
                          id="keySkills"
                          value={form.keySkills}
                          onChange={(e) => update("keySkills", e.target.value)}
                          placeholder="e.g. Splunk, SIEM, Incident Response, Python"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="certifications" className="text-sm">
                          Certifications (comma-separated)
                        </Label>
                        <Input
                          id="certifications"
                          value={form.certifications}
                          onChange={(e) =>
                            update("certifications", e.target.value)
                          }
                          placeholder="e.g. CompTIA Security+, CEH, OSCP"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PREFERENCES */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                        Your preferences
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        We prioritise matching you against openings that fit
                        your geography, role, and work-mode preferences.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="preferredLocation" className="text-sm">
                          Preferred Location <span className="text-gold">*</span>
                        </Label>
                        <select
                          id="preferredLocation"
                          value={form.preferredLocation}
                          onChange={(e) =>
                            update("preferredLocation", e.target.value)
                          }
                          className="w-full h-10 rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
                        >
                          <option value="">Select location...</option>
                          {LOCATIONS.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="preferredRoleCategory"
                          className="text-sm"
                        >
                          Preferred Role Category <span className="text-gold">*</span>
                        </Label>
                        <select
                          id="preferredRoleCategory"
                          value={form.preferredRoleCategory}
                          onChange={(e) =>
                            update("preferredRoleCategory", e.target.value)
                          }
                          className="w-full h-10 rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
                        >
                          <option value="">Select category...</option>
                          {ROLE_CATEGORIES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workMode" className="text-sm">
                          Work Mode <span className="text-gold">*</span>
                        </Label>
                        <select
                          id="workMode"
                          value={form.workMode}
                          onChange={(e) => update("workMode", e.target.value)}
                          className="w-full h-10 rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
                        >
                          <option value="">Select mode...</option>
                          {WORK_MODES.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noticePeriod" className="text-sm">
                          Notice Period
                        </Label>
                        <Input
                          id="noticePeriod"
                          value={form.noticePeriod}
                          onChange={(e) =>
                            update("noticePeriod", e.target.value)
                          }
                          placeholder="e.g. 30 days, immediate"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentCtc" className="text-sm">
                          Current CTC (optional)
                        </Label>
                        <Input
                          id="currentCtc"
                          value={form.currentCtc}
                          onChange={(e) => update("currentCtc", e.target.value)}
                          placeholder="e.g. ₹8,00,000"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expectedCtc" className="text-sm">
                          Expected CTC (optional)
                        </Label>
                        <Input
                          id="expectedCtc"
                          value={form.expectedCtc}
                          onChange={(e) => update("expectedCtc", e.target.value)}
                          placeholder="e.g. ₹12,00,000"
                          className="bg-background/50 border-border focus:border-gold/60"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: PAYMENT */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                        Review &amp; pay
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Confirm your details, accept the terms, and pay the
                        ₹2,000 registration fee securely via Razorpay.
                      </p>
                    </div>

                    {/* Summary */}
                    <div className="rounded-lg border border-border bg-background/40 p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <SummaryRow label="Name" value={form.fullName} />
                        <SummaryRow label="Email" value={form.email} />
                        <SummaryRow label="Phone" value={form.phone} />
                        <SummaryRow
                          label="Experience"
                          value={`${form.experienceYears || "0"} yrs`}
                        />
                        <SummaryRow
                          label="Location"
                          value={form.preferredLocation}
                        />
                        <SummaryRow
                          label="Role"
                          value={form.preferredRoleCategory}
                        />
                        <SummaryRow label="Work Mode" value={form.workMode} />
                        <SummaryRow
                          label="Skills"
                          value={form.keySkills || "Not specified"}
                        />
                      </div>
                    </div>

                    {/* Fee */}
                    <div className="rounded-lg border border-gold/30 bg-gold/[0.04] p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-1">
                            Registration Fee
                          </div>
                          <div className="font-display text-3xl font-semibold text-gradient-gold">
                            ₹2,000
                          </div>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                          <Lock className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                        Secured via Razorpay. Post-placement consultancy fee
                        applies upon successful placement, full terms
                        (structure, payment timelines, refund conditions,
                        service terms) will be discussed with you after
                        registration, before any employer engagement.
                      </p>
                    </div>

                    {/* Terms */}
                    <label
                      htmlFor="terms"
                      className="flex items-start gap-3 p-4 rounded-md border border-border bg-background/40 cursor-pointer hover:border-gold/30 transition-colors"
                    >
                      <Checkbox
                        id="terms"
                        checked={form.termsAccepted}
                        onCheckedChange={(c) =>
                          update("termsAccepted", c === true)
                        }
                        className="mt-0.5 data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-gold-foreground"
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        I confirm that the information provided is accurate to
                        the best of my knowledge. I understand the registration
                        fee of ₹2,000 is non-refundable, that a post-placement
                        consultancy fee applies upon successful placement
                        (full terms to be discussed after registration), and
                        that final selection is subject to the employer&apos;s
                        hiring process. All applicable fees, payment
                        timelines, refund conditions, and service terms will
                        be explained before any employer engagement.
                      </span>
                    </label>

                    <div className="flex items-start gap-3 p-4 rounded-md border border-gold/20 bg-gold/[0.03]">
                      <Info className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="text-foreground font-medium">
                          Demo mode:
                        </span>{" "}
                        Razorpay API keys are not configured in this
                        environment. The payment will be simulated end-to-end.
                        Configure{" "}
                        <code className="font-mono text-gold">RAZORPAY_KEY_ID</code>{" "}
                        and{" "}
                        <code className="font-mono text-gold">
                          RAZORPAY_KEY_SECRET
                        </code>{" "}
                        environment variables to enable real payments.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between gap-4 pt-6 border-t border-border">
                <button
                  onClick={back}
                  disabled={step === 1 || submitting}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                    step === 1
                      ? "text-muted-foreground/50 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {step < 4 ? (
                  <CTAButton onClick={next}>
                    Continue
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </CTAButton>
                ) : (
                  <CTAButton onClick={startPayment}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        Pay ₹2,000 &amp; Register
                      </>
                    )}
                  </CTAButton>
                )}
              </div>
            </div>
          </div>

          {/* Help footer */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
            <p className="text-muted-foreground">
              Questions before registering?{" "}
              <button
                onClick={() => onNavigate("contact")}
                className="text-gold hover:underline"
              >
                Talk to our team
              </button>
            </p>
            <p className="text-muted-foreground">
              Already reviewed?{" "}
              <button
                onClick={() => onNavigate("admissions")}
                className="text-gold hover:underline"
              >
                See admissions details
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <span className="text-foreground truncate">{value || "Not specified"}</span>
    </div>
  );
}
