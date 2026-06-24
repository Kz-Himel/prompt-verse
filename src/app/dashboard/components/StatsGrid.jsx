import StatCard from "./StatCard";

export default function StatsGrid({
  stats,
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => (
        <StatCard
          key={item.label}
          {...item}
        />
      ))}
    </div>
  );
}