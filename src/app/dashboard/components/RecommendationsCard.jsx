"use client";

import { FiSparkles } from "react-icons/fi";
import RecommendationItem from "./RecommendationItem";

export default function RecommendationsCard({ recommendations = [] }) {
  return (
    <div className="neu-card p-6 border border-[var(--border)] rounded-[20px] transition-all">
      {/* Header */}
      <h2 className="font-bold uppercase text-xs tracking-wider text-[var(--text-muted)] mb-5 pb-3 border-b border-black/5 dark:border-white/5">
        Recommended For You
      </h2>

      {/* Recommendations List or Empty State */}
      <div className="space-y-3">
        {recommendations.length === 0 ? (
          <div className="neu-input rounded-[14px] p-8 text-center text-[var(--text-muted)] flex flex-col items-center justify-center gap-2">
            <FiSparkles className="text-3xl opacity-40 text-[var(--primary)]" />
            <p className="text-sm font-medium">No recommendations available right now.</p>
          </div>
        ) : (
          recommendations.map((item, index) => (
            <RecommendationItem
              key={item._id || item.id || `rec-${index}`}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}