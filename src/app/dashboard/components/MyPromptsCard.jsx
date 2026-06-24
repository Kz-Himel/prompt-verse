export default function MyPromptsCard({
  prompts,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5">
      <h2 className="font-bold uppercase text-sm mb-5">
        My Prompts
      </h2>

      <div className="space-y-3">
        {prompts.map((item) => (
          <div
            key={item.id}
            className="flex justify-between"
          >
            <p>{item.title}</p>
            <span className="font-bold">
              {item.sales}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}