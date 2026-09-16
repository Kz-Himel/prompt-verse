"use client";

export default function StatCard({
  label = "",
  value = "0",
  icon: Icon,
  color = "text-[var(--primary)] bg-[var(--primary)]/10",
}) {
  return (
    <div className="neu-card p-5 border border-[var(--border)] rounded-[20px] transition-all hover:-translate-y-0.5">
      <div className="flex items-center gap-4">
        {/* Neumorphic Icon Box */}
        {Icon && (
          <div className={`p-3.5 rounded-2xl neu-card flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon size={22} />
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-2xl font-bold text-[var(--text)] tracking-tight">
            {value}
          </h3>

          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mt-0.5 truncate">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}