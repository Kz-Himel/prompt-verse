export default function DashboardHeader({
  title,
  subtitle,
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="text-default-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}