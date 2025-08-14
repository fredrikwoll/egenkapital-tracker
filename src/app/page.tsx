
import DashboardGrid from "@/components/dashboard/DashboardGrid";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your financial progress</p>
      </div>
      
      <DashboardGrid />
    </div>
  );
}
