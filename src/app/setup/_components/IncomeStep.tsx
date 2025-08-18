import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '@/components/forms/FormField';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import { SetupData, IncomeData } from '../page';

interface IncomeStepProps {
  data: SetupData;
  onDataChange: (data: Partial<SetupData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface IncomeFormData {
  incomeName: string;
  incomeAmount: string;
  incomeFrequency: string;
}

const frequencyOptions = [
  { name: 'Weekly', value: 'WEEKLY' },
  { name: 'Monthly', value: 'MONTHLY' },
  { name: 'Yearly', value: 'YEARLY' },
];

export default function IncomeStep({ data, onDataChange, onNext, onBack }: IncomeStepProps) {
  const [incomes, setIncomes] = useState<IncomeData[]>(data.incomes);
  const [showForm, setShowForm] = useState(data.incomes.length === 0);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<IncomeFormData>({
    defaultValues: {
      incomeName: '',
      incomeAmount: '0',
      incomeFrequency: 'MONTHLY',
    }
  });

  const watchedValues = watch();
  const previewAmount = parseFloat(watchedValues.incomeAmount || '0');

  const addIncome = (formData: IncomeFormData) => {
    const amount = parseFloat(formData.incomeAmount);
    const newIncome: IncomeData = {
      name: formData.incomeName.trim(),
      amount: isNaN(amount) ? 0 : amount,
      frequency: formData.incomeFrequency
    };

    const updatedIncomes = [...incomes, newIncome];
    setIncomes(updatedIncomes);
    
    // Reset form for next income
    reset({
      incomeName: '',
      incomeAmount: '0',
      incomeFrequency: 'MONTHLY',
    });
    
    // Hide form after adding
    setShowForm(false);
  };

  const removeIncome = (index: number) => {
    const updatedIncomes = incomes.filter((_, i) => i !== index);
    setIncomes(updatedIncomes);
  };

  const continueSetup = () => {
    // Save incomes to setup data
    onDataChange({ incomes });
    onNext();
  };

  const skip = () => {
    setIncomes([]);
    onDataChange({ incomes: [] });
    onNext();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getAnnualAmount = (amount: number, frequency: string) => {
    switch (frequency) {
      case 'WEEKLY': return amount * 52;
      case 'MONTHLY': return amount * 12;
      case 'YEARLY': return amount;
      default: return amount * 12;
    }
  };

  const getTotalAnnualIncome = () => {
    return incomes.reduce((total, income) => total + getAnnualAmount(income.amount, income.frequency), 0);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Add Your Income Sources
        </h2>
        <p className="text-text-muted">
          Track your income sources to get accurate financial insights. Multiple income sources help with complete planning.
        </p>
      </div>

      {/* Existing Income List */}
      {incomes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3">Your Income Sources</h3>
          <div className="space-y-3">
            {incomes.map((income, index) => (
              <div key={index} className="bg-border rounded-lg p-4 border border-bg-muted">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{income.name}</h4>
                    <p className="text-sm text-text-secondary capitalize">
                      {income.frequency.toLowerCase()}
                    </p>
                    <p className="text-lg font-semibold mt-1 text-positive">
                      {formatNumber(income.amount)} kr
                    </p>
                    <p className="text-sm text-text-muted">
                      Annual: {formatNumber(getAnnualAmount(income.amount, income.frequency))} kr
                    </p>
                  </div>
                  <Button
                    name="Remove"
                    variant="outline"
                    handleClick={() => removeIncome(index)}
                  />
                </div>
              </div>
            ))}
            
            {/* Total Annual Income */}
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-text-primary">Total Annual Income</span>
                <span className="text-xl font-bold text-primary">
                  {formatNumber(getTotalAnnualIncome())} kr
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Income Form */}
      {showForm && (
        <form onSubmit={handleSubmit(addIncome)} className="space-y-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Income Source Name">
              <Input
                {...register("incomeName", { 
                  required: "Please enter an income source name",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                placeholder="e.g., Salary, Freelance, etc."
              />
              {errors.incomeName && (
                <span className="text-red-500 text-sm">{errors.incomeName.message}</span>
              )}
            </FormField>

            <FormField label="Frequency">
              <Select
                {...register("incomeFrequency", { required: "Please select frequency" })}
                options={frequencyOptions}
              />
              {errors.incomeFrequency && (
                <span className="text-red-500 text-sm">{errors.incomeFrequency.message}</span>
              )}
            </FormField>
          </div>

          <FormField label="Amount">
            <div className="relative">
              <Input
                {...register("incomeAmount", { 
                  required: "Please enter an amount",
                  min: { value: 0, message: "Amount must be positive" }
                })}
                type="number"
                placeholder="50000"
                step="100"
                className="pr-10"
              />
              <span className="absolute right-3 top-2 text-sm text-text-muted">kr</span>
            </div>
            {errors.incomeAmount && (
              <span className="text-red-500 text-sm">{errors.incomeAmount.message}</span>
            )}
            <p className="text-sm text-text-muted mt-1">
              Enter your {watchedValues.incomeFrequency.toLowerCase()} income amount
            </p>
          </FormField>

          {/* Form Preview */}
          {watchedValues.incomeName && previewAmount > 0 && (
            <div className="bg-border rounded-lg p-4 border border-bg-muted">
              <h3 className="text-sm font-semibold text-text-primary mb-2">Income Preview</h3>
              <div className="text-text-secondary">
                <p className="font-semibold">{watchedValues.incomeName}</p>
                <p className="text-sm capitalize">{watchedValues.incomeFrequency.toLowerCase()}</p>
                <p className="text-lg font-semibold mt-1 text-positive">
                  {formatNumber(previewAmount)} kr
                </p>
                <p className="text-sm text-text-muted">
                  Annual: {formatNumber(getAnnualAmount(previewAmount, watchedValues.incomeFrequency))} kr
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              name="Cancel"
              variant="outline"
              handleClick={() => setShowForm(false)}
              type="button"
            />
            <Button
              name="Add Income"
              variant="primary"
              type="submit"
            />
          </div>
        </form>
      )}

      {/* Add More Button */}
      {!showForm && (
        <div className="mb-6">
          <Button
            name="+ Add Another Income Source"
            variant="outline"
            handleClick={() => setShowForm(true)}
          />
        </div>
      )}

      {/* Help Text */}
      <div className="bg-border rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-2">💡 Tip</h3>
        <p className="text-sm text-text-muted">
          {incomes.length === 0 
            ? "Having your income tracked helps with budgeting and financial planning. You can add income sources later from the Income page."
            : "Great! Having multiple income sources tracked gives you a complete financial picture. You can add more sources anytime from the Income page."
          }
        </p>
      </div>

      <ButtonGroup direction="row">
        <Button
          name="Back"
          variant="outline"
          handleClick={onBack}
          type="button"
        />
        <div className="flex gap-2">
          <Button
            name="Skip for now"
            variant="outline"
            handleClick={skip}
            type="button"
          />
          <Button
            name="Continue"
            variant="primary"
            handleClick={continueSetup}
          />
        </div>
      </ButtonGroup>
    </div>
  );
}