import { Button, Chip } from "@heroui/react";

export default function PurchaseItem({
  item,
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border-b border-default-100 last:border-none">
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200"
          className="w-12 h-12 rounded-xl object-cover"
          alt={item.title}
        />

        <div>
          <h4 className="font-semibold text-sm">
            {item.title}
          </h4>

          <Chip
            size="sm"
            variant="flat"
            color="primary"
            className="mt-1"
          >
            {item.cat}
          </Chip>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-bold">
          {item.price}
        </span>

        <Button
          size="sm"
          color="primary"
          radius="full"
        >
          View
        </Button>
      </div>
    </div>
  );
}