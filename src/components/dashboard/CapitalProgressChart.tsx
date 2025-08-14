"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSettings } from "@/contexts/SettingsContext";
import { formatAmountWithSettings } from "@/lib/utils";

interface CapitalDataPoint {
  week: string;
  value: number;
  change: number;
}

interface CapitalProgressChartProps {
  data: CapitalDataPoint[];
}

export default function CapitalProgressChart({ data }: CapitalProgressChartProps) {
  const { settings } = useSettings();

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload: CapitalDataPoint;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-border p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-gray-600">
            {formatAmountWithSettings(data.value * 100, settings || {
              currency: 'NOK',
              numberFormat: '1,234.56',
              currencyDisplay: 'symbol-after'
            })}
          </p>
          <p className="text-sm text-green-600">
            +{data.payload.change}%
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxisTick = (value: number) => {
    return formatAmountWithSettings(value * 100, settings || {
      currency: 'NOK',
      numberFormat: '1,234.56',
      currencyDisplay: 'symbol-after'
    });
  };

  return (
    <div className="bg-border p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Capital Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="week" 
              axisLine={false}
              tickLine={false}
              className="text-xs text-gray-600"
            />
            <YAxis 
              tickFormatter={formatYAxisTick}
              axisLine={false}
              tickLine={false}
              className="text-xs text-gray-600"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}