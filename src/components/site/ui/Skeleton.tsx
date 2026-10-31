"use client";

import { cn } from "@/lib/utils";

/**
 * Shimmer skeleton placeholder matching component shapes.
 * Use during loading state to prevent layout shift.
 *
 * The shimmer animation is defined in globals.css as `animate-shimmer-slide`.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-card/40",
        "animate-shimmer-slide",
        className
      )}
    />
  );
}

/** Skeleton for a stat card */
export function StatCardSkeleton() {
  return (
    <div className="p-6 sm:p-8 rounded-lg border border-border bg-card/40">
      <Skeleton className="h-10 w-24 mb-3" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-40 mt-2" />
    </div>
  );
}

/** Skeleton for a role card */
export function RoleCardSkeleton() {
  return (
    <div className="p-6 rounded-lg border border-border bg-card/40">
      <Skeleton className="h-3 w-20 mb-2" />
      <Skeleton className="h-5 w-32 mb-3" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-3/4 mb-5" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}

/** Skeleton for the placements carousel */
export function PlacementsCarouselSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 rounded-xl border border-border bg-card/30 p-8 min-h-[16rem]">
        <Skeleton className="h-6 w-6 mb-4 rounded-full" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card/30 p-6 min-h-[16rem]">
        <Skeleton className="h-3 w-24 mb-3" />
        <Skeleton className="h-10 w-16 mb-2" />
        <Skeleton className="h-3 w-full mb-6" />
        <div className="flex gap-1.5 mt-8">
          <Skeleton className="h-1.5 w-6 rounded-full" />
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
