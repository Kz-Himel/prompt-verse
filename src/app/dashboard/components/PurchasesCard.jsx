import { Button } from "@heroui/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import PurchaseItem from "./PurchaseItem";

export default function PurchasesCard({
  purchases,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold uppercase text-sm">
          My Purchases
        </h2>

        <Button
          size="sm"
          variant="light"
          endContent={
            <HiOutlineChevronRight />
          }
        >
          View All
        </Button>
      </div>

      <div>
        {purchases.map((item) => (
          <PurchaseItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}