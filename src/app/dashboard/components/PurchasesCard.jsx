"use client";

import { Button } from "@heroui/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import PurchaseItem from "./PurchaseItem";

export default function PurchasesCard({ purchases = [] }) {
  return (
    <div className="neu-card rounded-2xl p-6 border border-black/5 dark:border-white/5 transition-all">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-black/5 dark:border-white/5">
        <h2 className="font-bold uppercase text-xs tracking-wider text-[var(--text-muted)]">
          My Purchases
        </h2>

        <Button
          size="sm"
          variant="light"
          className="text-[var(--text)] hover:text-[var(--primary)] font-medium transition-colors"
          endContent={<HiOutlineChevronRight className="text-sm" />}
        >
          View All
        </Button>
      </div>

      {/* Item List or Empty State */}
      <div className="space-y-3">
        {purchases.length === 0 ? (
          <div className="neu-input rounded-xl p-8 text-center text-[var(--text-muted)] flex flex-col items-center justify-center gap-2">
            <FiShoppingBag className="text-3xl opacity-40 text-[var(--primary)]" />
            <p className="text-sm font-medium">No purchases yet.</p>
          </div>
        ) : (
          purchases.map((item, index) => (
            <PurchaseItem
              key={item._id || item.id || `purchase-${index}`}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}