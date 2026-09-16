"use client";

import { HiClock } from "react-icons/hi";

export default function ActivityItem({ item }) {
  return (
    <div className="flex items-center justify-between p-3.5 my-1.5 rounded-xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5">
      <div className="flex items-center gap-3.5">
        {/* Soft Neumorphic Icon Container */}
        <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
          <HiClock className="text-lg" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--text)] line-clamp-1">
            {item.message}
          </p>

          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {item.time}
          </p>
        </div>
      </div>

      {item.val && (
        <span className="text-[var(--primary)] text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--primary)]/10 shrink-0">
          {item.val}
        </span>
      )}
    </div>
  );
}