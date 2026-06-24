export default function SalesHistoryCard({
  sales,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5">
      <h2 className="font-bold uppercase text-sm mb-5">
        Sales History
      </h2>

      <div className="space-y-3">
        {sales.map((item) => (
          <div
            key={item.id}
            className="flex justify-between"
          >
            <p>{item.title}</p>

            <span className="font-bold text-success">
              +{item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}