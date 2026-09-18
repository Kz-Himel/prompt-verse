"use client";

import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";

export default function AdminDashboardPage() {
  const { stats, loading } = useAdminAnalytics();

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Overview of platform activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="neu-card p-4 rounded-xl border border-black/5 dark:border-white/5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Total Users</p>
          <p className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.totalUsers}</p>
        </div>
        <div className="neu-card p-4 rounded-xl border border-black/5 dark:border-white/5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Total Prompts</p>
          <p className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.totalPrompts}</p>
        </div>
        <div className="neu-card p-4 rounded-xl border border-black/5 dark:border-white/5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Total Reviews</p>
          <p className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.totalReviews}</p>
        </div>
        <div className="neu-card p-4 rounded-xl border border-black/5 dark:border-white/5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Total Copies</p>
          <p className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.totalCopies}</p>
        </div>
      </div>
    </div>
  );
}