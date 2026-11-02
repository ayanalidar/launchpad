"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

/**
 * WhatsApp floating button.
 * - Number fetched from /api/settings (SiteSettings table) at runtime
 * - Falls back to NEXT_PUBLIC_WHATSAPP_NUMBER env var
 * - Falls back to a placeholder if neither is set
 * - Appears bottom-right on all pages after the user scrolls past the hero
 * - Expands into a small "chat with us" prompt on first view, collapses to icon
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

  // Fetch the WhatsApp number from the public settings endpoint at runtime
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.whatsappNumber) {
          setWhatsappNumber(data.whatsappNumber);
        }
      })
      .catch(() => {
        // ignore, will use fallback
      });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-expand the prompt after 4 seconds of visibility (once)
  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setExpanded(true), 4000);
    return () => clearTimeout(t);
  }, [visible, dismissed]);

  // Resolve the actual number: API > hardcoded default > env > placeholder
  // Hardcoded default ensures the correct number shows even if the database
  // is unreachable on production. Override via admin panel or env var.
  const resolvedNumber =
    whatsappNumber ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "917006712347"; // GuardianX support number, hardcoded fallback

  const whatsappUrl =
    "https://wa.me/" +
    resolvedNumber +
    "?text=" +
    encodeURIComponent(
      "Hi GuardianX team, I have a question about your recruitment consultancy."
    );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
        >
          {/* Expandable prompt card */}
          <AnimatePresence>
            {expanded && !dismissed && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative w-72 rounded-xl border border-gold/30 bg-card/90 backdrop-blur-xl p-5 shadow-2xl"
              >
                <button
                  onClick={() => {
                    setDismissed(true);
                    setExpanded(false);
                  }}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Dismiss prompt"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <div className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                    Online now
                  </span>
                </div>

                <h4 className="font-display text-base font-semibold text-foreground mb-1.5">
                  Questions before registering?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Chat with our team on WhatsApp. Avg. response time under 10
                  minutes during business hours.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-md bg-emerald-500/90 hover:bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  Chat on WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main floating button */}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_-5px] shadow-emerald-500/40 hover:scale-105 transition-transform"
            aria-label="Chat with us on WhatsApp"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping opacity-75" />
            {/* WhatsApp glyph */}
            <svg
              viewBox="0 0 24 24"
              className="relative h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
