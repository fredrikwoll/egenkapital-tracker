"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
        <div className="bg-card p-3 border border-border rounded-lg shadow-sm">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            {formatAmountWithSettings(data.value * 100, settings || {
              currency: 'NOK',
              numberFormat: '1,234.56',
              currencyDisplay: 'symbol-after'
            })}
          </p>
          <p className="text-sm text-positive">
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
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Capital Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="week" 
              axisLine={false}
              tickLine={false}
              className="text-xs text-text-muted"
            />
            <YAxis 
              tickFormatter={formatYAxisTick}
              axisLine={false}
              tickLine={false}
              className="text-xs text-text-muted"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-positive)" 
              strokeWidth={3}
              fill="var(--color-positive)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}