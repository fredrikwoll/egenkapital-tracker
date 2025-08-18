import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '@/components/forms/FormField';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import { SetupData, DebtData } from '../page';

interface DebtStepProps {
  data: SetupData;
  onDataChange: (data: Partial<SetupData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

interface DebtFormData {
  debtName: string;
  debtType: string;
  debtAmount: string;
}

const debtTypeOptions = [
  { name: 'Consumer Loan', value: 'CONSUMER_LOAN' },
  { name: 'Student Loan', value: 'STUDENT_LOAN' },
  { name: 'Mortgage', value: 'MORTGAGE' },
  { name: 'Credit Card', value: 'CREDIT_CARD' },
];

export default function DebtStep({ data, onDataChange, onNext, onBack, isLoading }: DebtStepProps) {
  const [hasDebt, setHasDebt] = useState(data.hasDebt || data.debts.length > 0);
  const [debts, setDebts] = useState<DebtData[]>(data.debts);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<DebtFormData>({
    defaultValues: {
      debtName: '',
      debtType: 'CONSUMER_LOAN',
      debtAmount: '0',
    }
  });

  const watchedValues = watch();
  const previewAmount = parseFloat(watchedValues.debtAmount || '0');

  const addDebt = (formData: DebtFormData) => {
    const amount = parseFloat(formData.debtAmount);
    const newDebt: DebtData = {
      name: formData.debtName.trim(),
      type: formData.debtType,
      amount: isNaN(amount) ? 0 : amount
    };

    const updatedDebts = [...debts, newDebt];
    setDebts(updatedDebts);
    
    // Reset form for next debt
    reset({
      debtName: '',
      debtType: 'CONSUMER_LOAN',
      debtAmount: '0',
    });
    
    // Hide form after adding
    setShowForm(false);
  };

  const removeDebt = (index: number) => {
    const updatedDebts = debts.filter((_, i) => i !== index);
    setDebts(updatedDebts);
  };

  const continueSetup = () => {
    // Save debts to setup data
    onDataChange({ 
      hasDebt,
      debts: hasDebt ? debts : []
    });
    onNext();
  };

  const skipDebt = () => {
    setHasDebt(false);
    setDebts([]);
    onDataChange({ hasDebt: false, debts: [] });
    onNext();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getTotalDebt = () => {
    return debts.reduce((total, debt) => total + debt.amount, 0);
  };

  const getDebtTypeName = (type: string) => {
    return debtTypeOptions.find(option => option.value === type)?.name || type;
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Track Your Debt
        </h2>
        <p className="text-text-muted">
          Optional: Add any debt you&apos;d like to track for complete financial planning.
        </p>
      </div>

      {/* Has Debt Question */}
      <div className="mb-6">
        <FormField label="Do you have any debt you'd like to track?">
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                checked={!hasDebt}
                onChange={() => {
                  setHasDebt(false);
                  setDebts([]);
                  setShowForm(false);
                }}
                className="mr-2"
              />
              <span className="text-text-secondary">No, I don&apos;t have debt to track</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={hasDebt}
                onChange={() => setHasDebt(true)}
                className="mr-2"
              />
              <span className="text-text-secondary">Yes, I&apos;d like to add debt</span>
            </label>
          </div>
        </FormField>
      </div>

      {hasDebt && (
        <>
          {/* Existing Debts List */}
          {debts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Your Debts</h3>
              <div className="space-y-3">
                {debts.map((debt, index) => (
                  <div key={index} className="bg-border rounded-lg p-4 border border-bg-muted">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary">{debt.name}</h4>
                        <p className="text-sm text-text-secondary">
                          {getDebtTypeName(debt.type)}
                        </p>
                        <p className="text-lg font-semibold mt-1 text-negative">
                          {formatNumber(debt.amount)} kr
                        </p>
                      </div>
                      <Button
                        name="Remove"
                        variant="outline"
                        handleClick={() => removeDebt(index)}
                      />
                    </div>
                  </div>
                ))}
                
                {/* Total Debt */}
                <div className="bg-negative/10 rounded-lg p-4 border border-negative/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-text-primary">Total Debt</span>
                    <span className="text-xl font-bold text-negative">
                      {formatNumber(getTotalDebt())} kr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Debt Form */}
          {showForm && (
            <form onSubmit={handleSubmit(addDebt)} className="space-y-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Debt Name">
                  <Input
                    {...register("debtName", { 
                      required: "Please enter a debt name",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                    placeholder="e.g., Student Loan, Credit Card, etc."
                  />
                  {errors.debtName && (
                    <span className="text-red-500 text-sm">{errors.debtName.message}</span>
                  )}
                </FormField>

                <FormField label="Debt Type">
                  <Select
                    {...register("debtType", { required: "Please select debt type" })}
                    options={debtTypeOptions}
                  />
                  {errors.debtType && (
                    <span className="text-red-500 text-sm">{errors.debtType.message}</span>
                  )}
                </FormField>
              </div>

              <FormField label="Outstanding Amount">
                <div className="relative">
                  <Input
                    {...register("debtAmount", { 
                      required: "Please enter the debt amount (use 0 if unknown)",
                      min: { value: 0, message: "Amount cannot be negative" }
                    })}
                    type="number"
                    placeholder="250000"
                    step="100"
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-2 text-sm text-text-muted">kr</span>
                </div>
                {errors.debtAmount && (
                  <span className="text-red-500 text-sm">{errors.debtAmount.message}</span>
                )}
                <p className="text-sm text-text-muted mt-1">
                  Enter the current outstanding balance
                </p>
              </FormField>

              {/* Form Preview */}
              {watchedValues.debtName && previewAmount >= 0 && (
                <div className="bg-border rounded-lg p-4 border border-bg-muted">
                  <h3 className="text-sm font-semibold text-text-primary mb-2">Debt Preview</h3>
                  <div className="text-text-secondary">
                    <p className="font-semibold">{watchedValues.debtName}</p>
                    <p className="text-sm">{getDebtTypeName(watchedValues.debtType)}</p>
                    <p className="text-lg font-semibold mt-1 text-negative">
                      {formatNumber(previewAmount)} kr
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
                  name="Add Debt"
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
                name="+ Add Another Debt"
                variant="outline"
                handleClick={() => setShowForm(true)}
              />
            </div>
          )}
        </>
      )}

      {/* Status Messages */}
      {!hasDebt && (
        <div className="bg-border rounded-lg p-4 border border-positive mb-6">
          <h3 className="text-sm font-semibold text-positive mb-2">✓ Great!</h3>
          <p className="text-sm text-text-muted">
            Having no tracked debt puts you in a strong financial position. 
            You can always add debt tracking later if needed.
          </p>
        </div>
      )}

      <div className="bg-border rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-2">🔒 Privacy Note</h3>
        <p className="text-sm text-text-muted">
          Your debt information is stored securely and only used for your personal financial tracking. 
          You can add, edit, or remove debt entries anytime.
        </p>
      </div>

      <ButtonGroup direction="row">
        <Button
          name="Back"
          variant="outline"
          handleClick={onBack}
          type="button"
          isDisabled={isLoading}
        />
        <div className="flex gap-2">
          <Button
            name="Skip for now"
            variant="outline"
            handleClick={skipDebt}
            type="button"
            isDisabled={isLoading}
          />
          <Button
            name={isLoading ? "Completing Setup..." : "Complete Setup"}
            variant="primary"
            handleClick={continueSetup}
            isDisabled={isLoading}
          />
        </div>
      </ButtonGroup>
    </div>
  );
}