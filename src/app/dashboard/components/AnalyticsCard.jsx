"use client";

import { FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi";

export default function AnalyticsCard({
  title = "Total Revenue",
  amount = "$2,480",
  growth = "+18%",
  isPositive = true,
  timeframe = "vs last month",
}) {
  return (
    <div className="neu-card p-5 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {title}
        </span>
        <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
          <FiDollarSign className="text-base" />
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
            {amount}
          </h3>
        </div>

        {/* Growth & Trend Badge */}
        <div className="flex items-center gap-2 pt-1">
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            }`}
          >
            {isPositive ? (
              <FiTrendingUp className="text-xs" />
            ) : (
              <FiTrendingDown className="text-xs" />
            )}
            {growth}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {timeframe}
          </span>
        </div>
      </div>
    </div>
  );
}