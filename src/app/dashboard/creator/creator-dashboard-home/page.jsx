"use client";
import AnalyticsCards from "../components/AnalyticsCards";
import AnalyticsCharts from "../components/AnalyticsCharts";

// temporary mock data matching requirements
const mockStats = {
  totalPrompts: 18,
  totalCopies: 324,
  totalBookmarks: 86,
};

const mockChartData = [
  { name: "Jan", copies: 40 },
  { name: "Feb", copies: 80 },
  { name: "Mar", copies: 120 },
  { name: "Apr", copies: 190 },
  { name: "May", copies: 240 },
  { name: "Jun", copies: 324 },
];

export default function CreatorDashboardHome() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Creator! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">
          Heres what is happening with your prompts today.
        </p>
      </div>

      {/* Cards Component */}
      <AnalyticsCards data={mockStats} />

      {/* Chart Component */}
      <AnalyticsCharts chartData={mockChartData} />
    </div>
  );
}