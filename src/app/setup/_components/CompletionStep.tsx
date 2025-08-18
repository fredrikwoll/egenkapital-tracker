import Button from '@/components/ui/Button';
import { SetupData } from '../page';

interface CompletionStepProps {
  data: SetupData;
  onFinish: () => void;
}

export default function CompletionStep({ data, onFinish }: CompletionStepProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Setup Complete!
        </h1>
        <p className="text-xl text-text-muted mb-8">
          Welcome to your financial journey
        </p>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-6 mb-8 text-left">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Here&apos;s what we&apos;ve set up for you:
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-text-secondary">Currency</span>
            <span className="font-semibold">{data.currency}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-text-secondary">Capital Goal</span>
            <span className="font-semibold text-blue-600">
              {formatNumber(data.capitalGoal)} kr
            </span>
          </div>
          
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="text-sm font-semibold text-text-primary mb-2 block">Accounts ({data.accounts.length})</span>
            {data.accounts.length > 0 ? (
              <div className="space-y-1">
                {data.accounts.map((account, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{account.name}</span>
                    <span className="font-medium text-positive">{formatNumber(account.initialBalance)} kr</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-1 border-t border-gray-100">
                  <span className="font-semibold text-text-primary">Total Balance</span>
                  <span className="font-semibold text-positive">
                    {formatNumber(data.accounts.reduce((sum, acc) => sum + acc.initialBalance, 0))} kr
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-sm text-text-muted">No accounts added</span>
            )}
          </div>
          
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="text-sm font-semibold text-text-primary mb-2 block">
              Income Sources ({data.incomes.length})
            </span>
            {data.incomes.length > 0 ? (
              <div className="space-y-1">
                {data.incomes.map((income, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {income.name} ({income.frequency.toLowerCase()})
                    </span>
                    <span className="font-medium text-positive">
                      {formatNumber(income.amount)} kr
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-1 border-t border-gray-100">
                  <span className="font-semibold text-text-primary">Total Annual Income</span>
                  <span className="font-semibold text-positive">
                    {formatNumber(data.incomes.reduce((sum, income) => {
                      const multiplier = income.frequency === 'WEEKLY' ? 52 : income.frequency === 'MONTHLY' ? 12 : 1;
                      return sum + (income.amount * multiplier);
                    }, 0))} kr
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-sm text-text-muted">No income sources added</span>
            )}
          </div>
          
          <div className="py-2">
            <span className="text-sm font-semibold text-text-primary mb-2 block">
              Debt ({data.hasDebt ? data.debts.length : 0})
            </span>
            {data.hasDebt && data.debts.length > 0 ? (
              <div className="space-y-1">
                {data.debts.map((debt, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{debt.name}</span>
                    <span className="font-medium text-negative">{formatNumber(debt.amount)} kr</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-1 border-t border-gray-100">
                  <span className="font-semibold text-text-primary">Total Debt</span>
                  <span className="font-semibold text-negative">
                    {formatNumber(data.debts.reduce((sum, debt) => sum + debt.amount, 0))} kr
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-sm font-medium text-positive">No debt tracked ✓</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-border rounded-lg p-6 mb-8 text-left border border-blue-200">
        <h3 className="text-lg font-semibold text-text-secondary mb-3">
          🚀 Next Steps
        </h3>
        <ul className="space-y-2 text-text-secondary">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Explore your dashboard to see your financial overview</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Add more accounts if you have them</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Start recording transactions to track your progress</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Add more income sources or debt accounts if needed</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Set up recurring transactions and financial goals</span>
          </li>
        </ul>
      </div>

      <Button
        name="Go to Dashboard"
        variant="primary"
        handleClick={onFinish}
      />
    </div>
  );
}