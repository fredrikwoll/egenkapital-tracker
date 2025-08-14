"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AssetData {
  name: string;
  value: number;
  color: string;
}

interface AssetAllocationChartProps {
  data: AssetData[];
}

export default function AssetAllocationChart({ data }: AssetAllocationChartProps) {
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-border p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-border p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Asset Allocation</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}