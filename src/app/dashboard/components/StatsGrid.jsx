import StatsCard from "./StatsCard";

export default function StatsGrid({
  userStats,
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {userStats.map((item) => (
        <StatsCard
          key={item.label}
          {...item}
        />
      ))}
    </div>
  );
}