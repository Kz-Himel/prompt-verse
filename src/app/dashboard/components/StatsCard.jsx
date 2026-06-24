export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={22} />
        </div>

        <div>
          <h3 className="text-2xl font-bold">
            {value}
          </h3>

          <p className="text-xs text-default-500">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}