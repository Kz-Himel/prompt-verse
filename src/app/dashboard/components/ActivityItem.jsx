import { HiClock } from "react-icons/hi";

export default function ActivityItem({
  item,
}) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-default-100 last:border-none">
      <div className="flex gap-3">
        <div className="p-2 rounded-lg bg-default-100">
          <HiClock size={18} />
        </div>

        <div>
          <p className="text-sm font-medium">
            {item.message}
          </p>

          <p className="text-xs text-default-500">
            {item.time}
          </p>
        </div>
      </div>

      {item.val && (
        <span className="text-danger text-sm font-semibold">
          {item.val}
        </span>
      )}
    </div>
  );
}