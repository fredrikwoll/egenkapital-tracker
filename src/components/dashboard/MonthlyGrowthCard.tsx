"use client";

import { useSettings } from "@/contexts/SettingsContext";
import { formatAmountWithSettings } from "@/lib/utils";

interface MonthlyGrowthCardProps {
  monthlyGrowth: number;
}

export default function MonthlyGrowthCard({ monthlyGrowth }: MonthlyGrowthCardProps) {
  const { settings } = useSettings();

  return (
    <div className="bg-border p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Monthly Growth</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            +{formatAmountWithSettings(monthlyGrowth * 100, settings || {
              currency: 'NOK',
              numberFormat: '1,234.56',
              currencyDisplay: 'symbol-after'
            })}
          </p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}