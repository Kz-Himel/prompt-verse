"use client";

import { FiTrendingUp, FiDollarSign } from "react-icons/fi";

export default function SalesHistoryCard({ sales = [] }) {
  return (
    <div className="neu-card p-6 border border-[var(--border)] rounded-[20px] transition-all">
      {/* Header */}
      <h2 className="font-bold uppercase text-xs tracking-wider text-[var(--text-muted)] mb-5 pb-3 border-b border-black/5 dark:border-white/5">
        Sales History
      </h2>

      {/* Sales History List or Empty State */}
      <div className="space-y-3">
        {sales.length === 0 ? (
          <div className="neu-input rounded-[14px] p-8 text-center text-[var(--text-muted)] flex flex-col items-center justify-center gap-2">
            <FiTrendingUp className="text-3xl opacity-40 text-[var(--primary)]" />
            <p className="text-sm font-medium">No sales history yet.</p>
          </div>
        ) : (
          sales.map((item, index) => {
            const itemKey = item._id || item.id || `sale-${index}`;

            return (
              <div
                key={itemKey}
                className="neu-card p-4 rounded-[16px] flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl neu-input text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <FiDollarSign className="text-lg" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[var(--text)] truncate">
                      {item.title || "Untitled Prompt"}
                    </p>
                    {item.date && (
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>

                <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 neu-input px-3 py-1 rounded-full flex-shrink-0">
                  +{item.amount}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}