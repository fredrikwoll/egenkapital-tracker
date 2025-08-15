"use client";

import MonthlyGrowthCard from "./MonthlyGrowthCard";
import AssetAllocationChart from "./AssetAllocationChart";
import CapitalProgressChart from "./CapitalProgressChart";
import GoalProgressCard from "./GoalProgressCard";
import { useDashboard } from "../../app/dashboard/_hooks/useDashboard";

export default function DashboardGrid() {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card p-6 rounded-lg shadow-sm border border-border animate-pulse">
            <div className="h-6 bg-border rounded mb-4"></div>
            <div className="h-32 bg-border rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <div className="text-center">
          <div className="text-negative mb-2">⚠️ Error loading dashboard</div>
          <p className="text-text-muted text-sm">{error}</p>
          <p className="text-text-muted text-xs mt-2">
            Make sure you have created some account records to display data.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <div className="text-center text-text-muted">
          No dashboard data available
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Left - Monthly Growth */}
      <MonthlyGrowthCard monthlyGrowth={data.monthlyGrowth} />
      
      {/* Top Right - Asset Allocation Pie Chart */}
      <AssetAllocationChart data={data.assetAllocation} />
      
      {/* Bottom Left - Capital Progress Chart */}
      <CapitalProgressChart data={data.capitalHistory} />
      
      {/* Bottom Right - Goal Progress */}
      <GoalProgressCard 
        goal={data.capitalGoal}
        remaining={data.remaining}
        current={data.totalCapital}
        progressPercentage={data.progressPercentage}
      />
    </div>
  );
}