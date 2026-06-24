import RecommendationItem from "./RecommendationItem";

export default function RecommendationsCard({
  recommendations,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5">
      <h2 className="font-bold uppercase text-sm mb-5">
        Recommended For You
      </h2>

      <div className="space-y-3">
        {recommendations.map((item) => (
          <RecommendationItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}