import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/StatsGrid";
import MyPromptsCard from "../components/MyPromptsCard";
import SalesHistoryCard from "../components/SalesHistoryCard";
import AnalyticsCard from "../components/AnalyticsCard";

import {
  stats,
  prompts,
  sales,
  analytics,
} from "../data/creatorDashboardData";

export default function CreatorDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <StatsGrid stats={stats} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MyPromptsCard prompts={prompts} />
          <SalesHistoryCard sales={sales} />
        </div>

        <AnalyticsCard analytics={analytics} />
      </div>
    </div>
  );
}