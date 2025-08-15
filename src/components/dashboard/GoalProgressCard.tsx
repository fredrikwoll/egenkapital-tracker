"use client";

import { useSettings } from "@/contexts/SettingsContext";
import { formatAmountWithSettings } from "@/lib/utils";

interface GoalProgressCardProps {
  goal: number;
  current: number;
  remaining: number;
  progressPercentage: number;
}

export default function GoalProgressCard({ goal, current, remaining, progressPercentage }: GoalProgressCardProps) {
  const { settings } = useSettings();

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Capital Goal</h3>
        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
      </div>
      
      {/* Progress Chart */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full h-32 bg-border rounded-lg overflow-hidden">
          <div className="w-full h-full flex flex-col-reverse">
            <div 
              className="bg-positive/80 transition-all duration-500 ease-out w-full"
              style={{ height: `${progressPercentage}%` }}
            ></div>
            <div 
              className="bg-warning/60 transition-all duration-500 ease-out w-full"
              style={{ height: `${100 - progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-text-muted mt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-positive rounded-sm mr-1"></div>
            <span>Achieved ({progressPercentage}%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning rounded-sm mr-1"></div>
            <span>Remaining ({(100 - progressPercentage).toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* Goal Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Goal</span>
          <span className="font-semibold text-text-primary">
            {formatAmountWithSettings(goal * 100, settings || {
              currency: 'NOK',
              numberFormat: '1,234.56',
              currencyDisplay: 'symbol-after'
            })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Current</span>
          <span className="font-semibold text-positive">
            {formatAmountWithSettings(current * 100, settings || {
              currency: 'NOK',
              numberFormat: '1,234.56',
              currencyDisplay: 'symbol-after'
            })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Remaining</span>
          <span className="font-semibold text-warning">
            {formatAmountWithSettings(remaining * 100, settings || {
              currency: 'NOK',
              numberFormat: '1,234.56',
              currencyDisplay: 'symbol-after'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}