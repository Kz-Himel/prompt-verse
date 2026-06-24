import { Button } from "@heroui/react";
import { HiStar } from "react-icons/hi";

export default function RecommendationItem({
  item,
}) {
  return (
    <div className="border border-default-200 rounded-xl p-3 flex justify-between items-center gap-3">
      <div>
        <h4 className="font-semibold text-sm">
          {item.title}
        </h4>

        <div className="flex items-center gap-3 mt-1">
          <span className="font-bold text-primary text-sm">
            {item.price}
          </span>

          <span className="flex items-center gap-1 text-amber-500 text-sm">
            <HiStar />
            {item.rating}
          </span>
        </div>
      </div>

      <Button
        size="sm"
        color="primary"
        radius="full"
      >
        Explore
      </Button>
    </div>
  );
}