"use client";

import { HiClock } from "react-icons/hi";

export default function ActivityItem({ item = {} }) {
  const { message = "No description available", time = "", val, icon: CustomIcon } = item;
  const IconToRender = CustomIcon || HiClock;

  return (
    <div className="flex items-center justify-between p-3.5 my-1.5 rounded-xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5">
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Neumorphic Icon Container */}
        <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
          <IconToRender className="text-lg" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text)] truncate">
            {message}
          </p>

          {time && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {time}
            </p>
          )}
        </div>
      </div>

      {val && (
        <span className="text-[var(--primary)] text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--primary)]/10 shrink-0 ml-3">
          {val}
        </span>
      )}
    </div>
  );
}