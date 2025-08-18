"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/contexts/SettingsContext';
import WelcomeStep from './_components/WelcomeStep';
import PreferencesStep from './_components/PreferencesStep';
import GoalsStep from './_components/GoalsStep';
import AccountStep from './_components/AccountStep';
import IncomeStep from './_components/IncomeStep';
import DebtStep from './_components/DebtStep';
import CompletionStep from './_components/CompletionStep';

export type SetupStep = 'welcome' | 'preferences' | 'goals' | 'account' | 'income' | 'debt' | 'completion';

export interface AccountData {
  name: string;
  type: string;
  initialBalance: number;
}

export interface DebtData {
  name: string;
  type: string;
  amount: number;
}

export interface IncomeData {
  name: string;
  amount: number;
  frequency: string;
}

export interface SetupData {
  currency: string;
  dateFormat: string;
  numberFormat: string;
  currencyDisplay: string;
  capitalGoal: number;
  accounts: AccountData[];
  incomes: IncomeData[];
  debts: DebtData[];
  hasDebt: boolean;
}

const initialSetupData: SetupData = {
  currency: 'NOK',
  dateFormat: 'DD/MM/YYYY',
  numberFormat: '1 234,56',
  currencyDisplay: 'symbol-after',
  capitalGoal: 1000000,
  accounts: [],
  incomes: [],
  debts: [],
  hasDebt: false,
};

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<SetupStep>('welcome');
  const [setupData, setSetupData] = useState<SetupData>(initialSetupData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateSettings } = useSettings();

  const steps: SetupStep[] = ['welcome', 'preferences', 'goals', 'account', 'income', 'debt', 'completion'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const updateSetupData = (data: Partial<SetupData>) => {
    setSetupData(prev => ({ ...prev, ...data }));
  };

  const completeSetup = async () => {
    setIsLoading(true);
    try {
      // Create settings
      const settingsResponse = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency: setupData.currency,
          dateFormat: setupData.dateFormat,
          numberFormat: setupData.numberFormat,
          currencyDisplay: setupData.currencyDisplay,
          capitalGoal: setupData.capitalGoal * 100, // Convert to øre
        }),
      });

      if (!settingsResponse.ok) {
        throw new Error('Failed to create settings');
      }

      const settings = await settingsResponse.json();
      updateSettings(settings);

      // Create accounts
      for (const account of setupData.accounts) {
        const accountData = {
          name: account.name,
          type: account.type,
          initialAmount: account.initialBalance,
        };
        
        console.log('Sending account data to API:', accountData);
        
        const accountResponse = await fetch('/api/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(accountData),
        });

        if (!accountResponse.ok) {
          const errorData = await accountResponse.json();
          console.error('Account creation failed:', errorData);
          console.warn(`Failed to create account ${account.name}, continuing with setup`);
        }
      }

      // Create incomes if provided
      if (setupData.incomes.length > 0) {
        for (const income of setupData.incomes) {
          const incomeResponse = await fetch('/api/income', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: income.name,
              amount: income.amount * 100, // Convert to øre
              frequency: income.frequency,
            }),
          });

          if (!incomeResponse.ok) {
            console.warn(`Failed to create income ${income.name}, but continuing setup`);
          }
        }
      }

      // Create debts if provided
      if (setupData.hasDebt && setupData.debts.length > 0) {
        console.log('Creating debts:', setupData.debts);
        for (const debt of setupData.debts) {
          const debtData = {
            name: debt.name,
            type: debt.type,
            amount: debt.amount * 100, // Convert to øre
          };
          
          console.log('Sending debt data to API:', debtData);
          
          const debtResponse = await fetch('/api/debt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(debtData),
          });

          if (!debtResponse.ok) {
            const errorData = await debtResponse.json();
            console.error('Debt creation failed:', errorData);
            console.warn(`Failed to create debt ${debt.name}, but continuing setup`);
          } else {
            console.log(`Successfully created debt: ${debt.name}`);
          }
        }
      } else {
        console.log('No debts to create:', { hasDebt: setupData.hasDebt, debts: setupData.debts });
      }

      setCurrentStep('completion');
    } catch (error) {
      console.error('Setup failed:', error);
      alert('Setup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const finishSetup = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress bar */}
        {currentStep !== 'welcome' && currentStep !== 'completion' && (
          <div className="mb-8">
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const stepNames = {
                  welcome: 'Welcome',
                  preferences: 'Preferences', 
                  goals: 'Goals',
                  account: 'Account',
                  income: 'Income',
                  debt: 'Debt',
                  completion: 'Complete'
                };
                
                return (
                  <div key={step} className="flex flex-col items-center relative flex-1">
                    {/* Step circle */}
                    <div className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10
                      ${isCompleted 
                        ? 'bg-positive border-positive text-white' 
                        : isCurrent 
                        ? 'bg-primary border-primary text-white animate-pulse' 
                        : 'bg-card border-border text-text-muted'
                      }
                    `}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    
                    {/* Step label */}
                    <span className={`
                      text-xs mt-2 font-medium transition-colors duration-300
                      ${isCompleted ? 'text-text-muted' : isCurrent ? 'text-text-primary' : 'text-text-muted opacity-50'}
                    `}>
                      {stepNames[step as keyof typeof stepNames]}
                    </span>
                    
                    {/* Connecting line */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-5 left-1/2 w-full h-0.5 -translate-y-0.5">
                        <div className="bg-border h-full">
                          <div 
                            className={`
                              h-full transition-all duration-500 ease-out
                              ${isCompleted ? 'bg-positive w-full' : 'bg-border w-0'}
                            `}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Overall progress bar */}
            <div className="relative">
              <div className="bg-border rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-positive h-full rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-text-secondary mt-2">
                <span className="font-medium">Step {currentStepIndex + 1} of {steps.length}</span>
                <span className="font-medium">{Math.round(progress)}% complete</span>
              </div>
            </div>
          </div>
        )}

        {/* Step content */}
        {currentStep === 'welcome' && (
          <WelcomeStep onNext={goToNextStep} />
        )}
        
        {currentStep === 'preferences' && (
          <PreferencesStep
            data={setupData}
            onDataChange={updateSetupData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'goals' && (
          <GoalsStep
            data={setupData}
            onDataChange={updateSetupData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'account' && (
          <AccountStep
            data={setupData}
            onDataChange={updateSetupData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 'income' && (
          <IncomeStep
            data={setupData}
            onDataChange={updateSetupData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'debt' && (
          <DebtStep
            data={setupData}
            onDataChange={updateSetupData}
            onNext={completeSetup}
            onBack={goToPreviousStep}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 'completion' && (
          <CompletionStep
            data={setupData}
            onFinish={finishSetup}
          />
        )}
      </div>
    </div>
  );
}