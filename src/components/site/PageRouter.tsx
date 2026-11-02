"use client";

import { Suspense, lazy } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { usePageRouter } from "./use-router";
import { HomePage } from "./pages/HomePage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { PlacementsPage } from "./pages/PlacementsPage";
import { ContactPage } from "./pages/ContactPage";
import { EmployersPage } from "./pages/EmployersPage";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { CustomCursor } from "./ui/CustomCursor";
import { Skeleton } from "./ui/Skeleton";
import { AdminPage } from "./admin/AdminPage";

// Lazy-load the heavier pages for route-level code splitting
const LazyRegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((m) => ({ default: m.RegisterPage }))
);
const LazyDashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage }))
);
const LazyResumeReviewPage = lazy(() =>
  import("./pages/ResumeReviewPage").then((m) => ({ default: m.ResumeReviewPage }))
);
const LazyRoleDeepDivePage = lazy(() =>
  import("./pages/RoleDeepDivePage").then((m) => ({ default: m.RoleDeepDivePage }))
);

function PageLoader() {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="mx-auto max-w-5xl space-y-4">
        <Skeleton className="h-8 w-32 rounded-full" />
        <Skeleton className="h-16 w-full max-w-2xl" />
        <Skeleton className="h-6 w-full max-w-xl" />
        <Skeleton className="h-64 w-full mt-8" />
      </div>
    </div>
  );
}

export function PageRouter() {
  const { page, navigate, roleSlug, navigateToRole } = usePageRouter();

  // If we have a role slug, render the deep-dive page
  const isRoleDeepDive = roleSlug !== null;
  const pageKey = isRoleDeepDive ? `role-${roleSlug}` : page;

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <CustomCursor />

      <Navbar currentPage={page} onNavigate={navigate} />

      <main className="flex-1">
        {/* CSS-only opacity fade on route change, no y-axis bounce, no morphing overlay */}
        <div key={pageKey} className="page-fade">
          {isRoleDeepDive && roleSlug ? (
            <Suspense fallback={<PageLoader />}>
              <LazyRoleDeepDivePage onNavigate={navigate} roleSlug={roleSlug} />
            </Suspense>
          ) : (
            <>
              {page === "home" && <HomePage onNavigate={navigate} />}
              {page === "admissions" && <AdmissionsPage onNavigate={navigate} />}
              {page === "placements" && (
                <PlacementsPage onNavigate={navigate} navigateToRole={navigateToRole} />
              )}
              {page === "register" && (
                <Suspense fallback={<PageLoader />}>
                  <LazyRegisterPage onNavigate={navigate} />
                </Suspense>
              )}
              {page === "contact" && <ContactPage onNavigate={navigate} />}
              {page === "dashboard" && (
                <Suspense fallback={<PageLoader />}>
                  <LazyDashboardPage onNavigate={navigate} />
                </Suspense>
              )}
              {page === "employers" && <EmployersPage onNavigate={navigate} />}
              {page === "resume-review" && (
                <Suspense fallback={<PageLoader />}>
                  <LazyResumeReviewPage onNavigate={navigate} />
                </Suspense>
              )}
              {page === "admin" && (
                <AdminPage onExit={() => navigate("home")} />
              )}
            </>
          )}
        </div>
      </main>

      <Footer onNavigate={navigate} />

      <WhatsAppButton />
    </div>
  );
}
