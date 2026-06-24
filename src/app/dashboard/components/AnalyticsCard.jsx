export default function AnalyticsCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5">
      <h2 className="font-bold mb-4">
        Analytics
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-default-500 text-sm">
            Total Sales
          </p>

          <h3 className="text-3xl font-bold">
            $2,480
          </h3>
        </div>

        <div>
          <p className="text-default-500 text-sm">
            This Month
          </p>

          <h3 className="text-2xl font-bold">
            +18%
          </h3>
        </div>
      </div>
    </div>
  );
}