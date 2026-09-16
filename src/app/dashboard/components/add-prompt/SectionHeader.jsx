export default function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
      <span className="text-violet-600 text-base">{icon}</span>
      <h3 className="text-slate-700 text-sm font-semibold tracking-wide">
        {title}
      </h3>
    </div>
  );
}