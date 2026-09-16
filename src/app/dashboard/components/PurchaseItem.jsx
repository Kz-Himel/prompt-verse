"use client";

import { Button } from "@heroui/react";

export default function PurchaseItem({ item = {} }) {
  const {
    title = "Untitled Prompt",
    category = item.cat || "General",
    price = "$0",
    image,
  } = item;

  return (
    <div className="neu-card flex items-center justify-between p-4 rounded-2xl border border-black/5 dark:border-white/5 transition-all mb-3 last:mb-0">
      <div className="flex items-center gap-3.5">
        {/* Soft Neumorphic Image Wrapper */}
        <div className="w-12 h-12 rounded-xl neu-card p-1 flex-shrink-0">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200"
            }
            className="w-full h-full rounded-lg object-cover"
            alt={title}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200";
            }}
          />
        </div>

        <div>
          <h4 className="font-semibold text-sm text-[var(--text)] line-clamp-1">
            {title}
          </h4>

          {/* Neumorphic Soft Badge */}
          <span className="inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 shadow-xs">
            {category}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-bold text-sm text-[var(--text)]">
          {price}
        </span>

        {/* Soft UI Action Button */}
        <Button
          size="sm"
          radius="full"
          className="bg-[var(--primary)] text-white font-semibold shadow-md shadow-[var(--primary)]/20 hover:opacity-90 active:scale-95 transition-all"
        >
          View
        </Button>
      </div>
    </div>
  );
}