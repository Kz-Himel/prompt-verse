import StatsCard from "./StatsCard";

export default function StatsGrid({
  stats = [],
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => (
        <StatsCard
          key={item.label}
          {...item}
        />
      ))}
    </div>
  );
}