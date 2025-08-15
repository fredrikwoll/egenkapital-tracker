// For Client Components - HTTP requests
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface DashboardData {
  monthlyGrowth: number;
  totalCapital: number;
  totalDebt: number;
  netWorth: number;
  capitalGoal: number;
  remaining: number;
  progressPercentage: number;
  assetAllocation: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  capitalHistory: Array<{
    week: string;
    value: number;
    change: number;
  }>;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${baseUrl}/api/dashboard`);

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.status}`);
  }

  return response.json();
}