"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { usePageRouter } from "./use-router";
import { HomePage } from "./pages/HomePage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { PlacementsPage } from "./pages/PlacementsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ContactPage } from "./pages/ContactPage";
import { WhatsAppButton } from "./ui/WhatsAppButton";

export function PageRouter() {
  const { page, navigate } = usePageRouter();

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar currentPage={page} onNavigate={navigate} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {page === "home" && <HomePage onNavigate={navigate} />}
            {page === "admissions" && <AdmissionsPage onNavigate={navigate} />}
            {page === "placements" && <PlacementsPage onNavigate={navigate} />}
            {page === "register" && <RegisterPage onNavigate={navigate} />}
            {page === "contact" && <ContactPage onNavigate={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigate} />

      {/* Floating WhatsApp button, appears on all pages after scroll */}
      <WhatsAppButton />
    </div>
  );
}
