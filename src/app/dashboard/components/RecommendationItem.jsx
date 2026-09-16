"use client";

import { Button } from "@heroui/react";
import { HiStar } from "react-icons/hi";

export default function RecommendationItem({ item = {} }) {
  const {
    title = "Untitled Prompt",
    price = "$0",
    rating = "5.0",
  } = item;

  return (
    <div className="neu-card p-4 rounded-[16px] flex justify-between items-center gap-4 transition-all mb-3 last:mb-0">
      <div>
        <h4 className="font-semibold text-sm text-[var(--text)] line-clamp-1">
          {title}
        </h4>

        <div className="flex items-center gap-3 mt-1.5">
          <span className="font-bold text-sm text-[var(--primary)]">
            {price}
          </span>

          <span className="flex items-center gap-1 text-amber-500 text-xs font-semibold neu-input px-2 py-0.5 rounded-full">
            <HiStar className="text-amber-400 text-sm" />
            <span>{rating}</span>
          </span>
        </div>
      </div>

      <Button
        size="sm"
        radius="full"
        className="neu-button-primary font-semibold text-xs px-4 py-2 transition-all active:scale-95 flex-shrink-0"
      >
        Explore
      </Button>
    </div>
  );
}