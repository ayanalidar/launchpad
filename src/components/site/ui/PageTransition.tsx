"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface PageTransitionProps {
  /** Key of the current page (changes trigger the transition) */
  pageKey: string;
}

/**
 * Full-screen morphing logo overlay that plays on page change.
 * - Logo scales from small (top-left navbar position) to large center, then back
 * - Gold sweep crosses the screen
 * - Skipped entirely if prefers-reduced-motion is set
 *
 * Uses key-based remount (AnimatePresence) to trigger the transition
 * without calling setState inside an effect.
 */
export function PageTransition({ pageKey }: PageTransitionProps) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, times: [0, 0.7, 1] }}
        className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center"
        onAnimationComplete={() => {}}
      >
        {/* Black overlay with fade */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 0.7, times: [0, 0.5, 1] }}
          className="absolute inset-0 bg-background"
        />

        {/* Gold sweep from left to right */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        />

        {/* Morphing logo */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, y: -200 }}
          animate={{
            scale: [0.3, 1.2, 1.2, 0.3],
            opacity: [0, 1, 1, 0],
            y: [-200, 0, 0, 200],
          }}
          transition={{ duration: 0.7, times: [0, 0.4, 0.7, 1] }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/60 bg-black overflow-hidden"
        >
          <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl" />
          <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
