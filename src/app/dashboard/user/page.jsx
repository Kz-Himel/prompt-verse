import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/StatsGrid";
import PurchasesCard from "../components/PurchasesCard";
import RecentActivityCard from "../components/RecentActivityCard";
import RecommendationsCard from "../components/RecommendationsCard";

import {
  stats,
  purchases,
  recommendations,
  recentActivities,
} from "../data/userDashboardData"

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        subtitle="Discover and manage your favorite prompts."
      />

      <StatsGrid stats={stats} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PurchasesCard purchases={purchases} />
          <RecentActivityCard
            activities={recentActivities}
          />
        </div>

        <RecommendationsCard
          recommendations={recommendations}
        />
      </div>
    </div>
  );
}