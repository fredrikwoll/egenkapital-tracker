"use client";

import { useSettings } from "@/contexts/SettingsContext";
import { formatAmountWithSettings } from "@/lib/utils";

interface MonthlyGrowthCardProps {
  monthlyGrowth: number;
}

export default function MonthlyGrowthCard({ monthlyGrowth }: MonthlyGrowthCardProps) {
  const { settings } = useSettings();

  const isPositive = monthlyGrowth > 0;
  const isNegative = monthlyGrowth < 0;
  const isNeutral = monthlyGrowth === 0;

  return (
    <div className="bg-card p-8 rounded-lg shadow-sm border border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${isPositive ? 'bg-positive/10' : isNeutral ? 'bg-border/20' : 'bg-negative/10'} rounded-full -translate-y-16 translate-x-16`}></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`h-16 w-16 ${isPositive ? 'bg-positive/20' : isNeutral ? 'bg-border/20' : 'bg-negative/20'} rounded-xl flex items-center justify-center`}>
              {isPositive ? (
                <svg className="h-8 w-8 text-positive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : isNeutral ? (
                <svg className="h-8 w-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              ) : (
                <svg className="h-8 w-8 text-negative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary">Monthly Growth</h3>
              <p className="text-sm text-text-muted">This month&apos;s performance</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${isPositive ? 'bg-positive/20 text-positive' : isNeutral ? 'bg-border/20 text-text-muted' : 'bg-negative/20 text-negative'}`}>
            {isPositive ? 'POSITIVE' : isNeutral ? 'NEUTRAL' : 'NEGATIVE'}
          </div>
        </div>
        
        <div className="text-center py-6">
          <p className={`text-6xl font-bold ${isPositive ? 'text-positive' : isNeutral ? 'text-text-muted' : 'text-negative'} mb-2 tracking-tight`}>
            {isPositive ? '+' : ''}{formatAmountWithSettings(monthlyGrowth * 100, settings || {
              currency: 'NOK',
              numberFormat: '1,234.56',
              currencyDisplay: 'symbol-after'
            })}
          </p>
          <div className="flex items-center justify-center space-x-2 text-text-muted">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Current month</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs text-text-muted font-medium">WEEKLY AVG</span>
            </div>
            <p className={`text-lg font-bold ${isPositive ? 'text-positive' : isNeutral ? 'text-text-muted' : 'text-negative'}`}>
              {formatAmountWithSettings((monthlyGrowth / 4) * 100, settings || {
                currency: 'NOK',
                numberFormat: '1,234.56',
                currencyDisplay: 'symbol-after'
              })}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="h-5 w-5 text-warning mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs text-text-muted font-medium">DAILY AVG</span>
            </div>
            <p className={`text-lg font-bold ${isPositive ? 'text-positive' : isNeutral ? 'text-text-muted' : 'text-negative'}`}>
              {formatAmountWithSettings((monthlyGrowth / 30) * 100, settings || {
                currency: 'NOK',
                numberFormat: '1,234.56',
                currencyDisplay: 'symbol-after'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}