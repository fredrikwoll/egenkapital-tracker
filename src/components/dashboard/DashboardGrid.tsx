"use client";

import MonthlyGrowthCard from "./MonthlyGrowthCard";
import AssetAllocationChart from "./AssetAllocationChart";
import CapitalProgressChart from "./CapitalProgressChart";
import GoalProgressCard from "./GoalProgressCard";

export default function DashboardGrid() {
  // Mock data for now - we'll replace with real data later
  const mockData = {
    monthlyGrowth: 10000, // 10,000 kr
    totalCapital: 650000, // 650,000 kr
    capitalGoal: 1000000, // 1,000,000 kr
    remaining: 350000, // 350,000 kr
    assetAllocation: [
      { name: 'Egenkapital', value: 50, color: '#10B981' }, // Green
      { name: 'Aksjefond', value: 15, color: '#3B82F6' }, // Blue
      { name: 'Gjeld', value: 35, color: '#EF4444' } // Red
    ],
    capitalHistory: [
      { week: 'Uke 23', value: 500000, change: 0 },
      { week: 'Uke 24', value: 520000, change: 4 },
      { week: 'Uke 25', value: 540000, change: 8 },
      { week: 'Uke 26', value: 580000, change: 16 },
      { week: 'Uke 27', value: 600000, change: 20 },
      { week: 'Uke 28', value: 650000, change: 30 },
      { week: 'Uke 29', value: 620000, change: 24 },
      { week: 'Uke 30', value: 590000, change: 18 },
      { week: 'Uke 31', value: 610000, change: 22 },
      { week: 'Uke 32', value: 650000, change: 30 }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Left - Monthly Growth */}
      <MonthlyGrowthCard monthlyGrowth={mockData.monthlyGrowth} />
      
      {/* Top Right - Asset Allocation Pie Chart */}
      <AssetAllocationChart data={mockData.assetAllocation} />
      
      {/* Bottom Left - Capital Progress Line Chart */}
      <CapitalProgressChart data={mockData.capitalHistory} />
      
      {/* Bottom Right - Goal Progress */}
      <GoalProgressCard 
        goal={mockData.capitalGoal}
        remaining={mockData.remaining}
        current={mockData.totalCapital}
        progressPercentage={73}
      />
    </div>
  );
}