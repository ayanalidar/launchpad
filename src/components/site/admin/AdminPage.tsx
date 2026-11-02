"use client";

import { useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout, type AdminView } from "./AdminLayout";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminRegistrationsPage } from "./pages/AdminRegistrationsPage";
import { AdminMessagesPage } from "./pages/AdminMessagesPage";
import { AdminSubscribersPage } from "./pages/AdminSubscribersPage";
import { AdminSettingsPage } from "./pages/AdminSettingsPage";
import { AdminRolesPage } from "./pages/AdminRolesPage";
import { AdminPlacementsPage } from "./pages/AdminPlacementsPage";
import { AdminFaqsPage } from "./pages/AdminFaqsPage";
import { AdminJobsPage } from "./pages/AdminJobsPage";
import { getAdminToken } from "@/lib/admin";

interface AdminPageProps {
  onExit: () => void;
}

export function AdminPage({ onExit }: AdminPageProps) {
  // Lazy init: read token synchronously during first render
  const [authed, setAuthed] = useState(() => !!getAdminToken());
  const [view, setView] = useState<AdminView>("dashboard");

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminLayout
      current={view}
      onNavigate={setView}
      onLogout={() => setAuthed(false)}
      onExitToSite={onExit}
    >
      {view === "dashboard" && <AdminDashboardPage onNavigate={(v) => setView(v as AdminView)} />}
      {view === "registrations" && <AdminRegistrationsPage />}
      {view === "messages" && <AdminMessagesPage />}
      {view === "subscribers" && <AdminSubscribersPage />}
      {view === "settings" && <AdminSettingsPage />}
      {view === "roles" && <AdminRolesPage />}
      {view === "placements" && <AdminPlacementsPage />}
      {view === "faqs" && <AdminFaqsPage />}
      {view === "jobs" && <AdminJobsPage />}
    </AdminLayout>
  );
}
