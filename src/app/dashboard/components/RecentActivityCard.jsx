"use client";

import { FiActivity } from "react-icons/fi";
import ActivityItem from "./ActivityItem";

export default function RecentActivityCard({ activities = [] }) {
  return (
    <div className="neu-card p-6 border border-[var(--border)] rounded-[20px] transition-all">
      {/* Header */}
      <h2 className="font-bold uppercase text-xs tracking-wider text-[var(--text-muted)] mb-5 pb-3 border-b border-black/5 dark:border-white/5">
        Recent Activity
      </h2>

      {/* Activity List or Empty State */}
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="neu-input rounded-[14px] p-8 text-center text-[var(--text-muted)] flex flex-col items-center justify-center gap-2">
            <FiActivity className="text-3xl opacity-40 text-[var(--primary)]" />
            <p className="text-sm font-medium">No recent activity found.</p>
          </div>
        ) : (
          activities.map((item, index) => (
            <ActivityItem
              key={item._id || item.id || `activity-${index}`}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}