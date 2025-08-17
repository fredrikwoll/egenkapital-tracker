"use client";

import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
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
          <p className={`text-sm ${
            data.payload.change > 0 ? 'text-positive' : 
            data.payload.change < 0 ? 'text-negative' : 
            'text-text-muted'
          }`}>
            {data.payload.change > 0 ? '+' : ''}{data.payload.change.toFixed(1)}%
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

  // Check if we have any negative values to adjust chart styling
  const hasNegativeValues = data.some(item => item.value < 0);
  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Capital Changes</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
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
              domain={hasNegativeValues ? [minValue * 1.1, maxValue * 1.1] : [0, 'dataMax']}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Zero reference line - more prominent */}
            {hasNegativeValues && (
              <ReferenceLine 
                y={0} 
                stroke="var(--color-text-primary)" 
                strokeWidth={2} 
                opacity={0.8}
              />
            )}
            {/* Positive area */}
            <Area 
              type="monotone" 
              dataKey={(entry) => entry.value >= 0 ? entry.value : 0}
              stroke="var(--color-positive)" 
              strokeWidth={3}
              fill="var(--color-positive)"
              fillOpacity={0.4}
              connectNulls={false}
            />
            {/* Negative area */}
            <Area 
              type="monotone" 
              dataKey={(entry) => entry.value < 0 ? entry.value : 0}
              stroke="var(--color-negative)" 
              strokeWidth={3}
              fill="var(--color-negative)"
              fillOpacity={0.4}
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-text-muted mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-positive/80 rounded-sm mr-1"></div>
          <span>Positive weeks</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-negative/80 rounded-sm mr-1"></div>
          <span>Negative weeks</span>
        </div>
      </div>
    </div>
  );
}