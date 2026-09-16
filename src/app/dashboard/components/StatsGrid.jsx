"use client";

import StatCard from "./StatCard";

export default function StatsGrid({ stats = [] }) {
  if (!stats.length) {
    return (
      <div className="neu-input rounded-[20px] p-6 text-center text-[var(--text-muted)] text-sm font-medium">
        No stats available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((item, index) => (
        <StatCard
          key={item.label || item.id || `stat-${index}`}
          {...item}
        />
      ))}
    </div>
  );
}