import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '@/components/forms/FormField';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import { SetupData, AccountData } from '../page';

interface AccountStepProps {
  data: SetupData;
  onDataChange: (data: Partial<SetupData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

interface AccountFormData {
  accountName: string;
  accountType: string;
  initialBalance: string;
}

const accountTypeOptions = [
  { name: 'Checking Account', value: 'CHECKING' },
  { name: 'Savings Account', value: 'SAVINGS' },
  { name: 'Investment Account', value: 'INVESTMENT' },
  { name: 'Other', value: 'OTHER' },
];

export default function AccountStep({ data, onDataChange, onNext, onBack, isLoading }: AccountStepProps) {
  const [accounts, setAccounts] = useState<AccountData[]>(data.accounts.length > 0 ? data.accounts : []);
  const [showForm, setShowForm] = useState(data.accounts.length === 0);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AccountFormData>({
    defaultValues: {
      accountName: '',
      accountType: 'CHECKING',
      initialBalance: '0',
    }
  });

  const watchedValues = watch();
  const previewAmount = parseFloat(watchedValues.initialBalance || '0');

  const addAccount = (formData: AccountFormData) => {
    const initialBalance = parseFloat(formData.initialBalance);
    const newAccount: AccountData = {
      name: formData.accountName.trim(),
      type: formData.accountType,
      initialBalance: isNaN(initialBalance) ? 0 : initialBalance
    };

    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    
    // Reset form for next account
    reset({
      accountName: '',
      accountType: 'CHECKING',
      initialBalance: '0',
    });
    
    // Hide form after adding
    setShowForm(false);
  };

  const removeAccount = (index: number) => {
    const updatedAccounts = accounts.filter((_, i) => i !== index);
    setAccounts(updatedAccounts);
  };

  const continueSetup = () => {
    // Save accounts to setup data
    onDataChange({ accounts });
    onNext();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.initialBalance, 0);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Add Your Accounts
        </h2>
        <p className="text-text-muted">
          Add your financial accounts to track your money across different places.
        </p>
      </div>

      {/* Existing Accounts List */}
      {accounts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3">Your Accounts</h3>
          <div className="space-y-3">
            {accounts.map((account, index) => (
              <div key={index} className="bg-border rounded-lg p-4 border border-bg-muted">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{account.name}</h4>
                    <p className="text-sm text-text-secondary capitalize">
                      {account.type.toLowerCase().replace('_', ' ')}
                    </p>
                    <p className="text-lg font-semibold mt-1 text-positive">
                      {formatNumber(account.initialBalance)} kr
                    </p>
                  </div>
                  <Button
                    name="Remove"
                    variant="outline"
                    handleClick={() => removeAccount(index)}
                  />
                </div>
              </div>
            ))}
            
            {/* Total Balance */}
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-text-primary">Total Balance</span>
                <span className="text-xl font-bold text-primary">
                  {formatNumber(getTotalBalance())} kr
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Form */}
      {showForm && (
        <form onSubmit={handleSubmit(addAccount)} className="space-y-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Account Name">
              <Input
                {...register("accountName", { 
                  required: "Please enter an account name",
                  minLength: { value: 2, message: "Account name must be at least 2 characters" }
                })}
                placeholder="e.g., Main Checking, Savings, etc."
              />
              {errors.accountName && (
                <span className="text-red-500 text-sm">{errors.accountName.message}</span>
              )}
            </FormField>

            <FormField label="Account Type">
              <Select
                {...register("accountType", { required: "Please select an account type" })}
                options={accountTypeOptions}
              />
              {errors.accountType && (
                <span className="text-red-500 text-sm">{errors.accountType.message}</span>
              )}
            </FormField>
          </div>

          <FormField label="Current Balance">
            <div className="relative">
              <Input
                {...register("initialBalance", { 
                  min: { value: 0, message: "Balance cannot be negative" }
                })}
                type="number"
                placeholder="0.00"
                step="0.01"
                className="pr-10"
              />
              <span className="absolute right-3 top-2 text-sm text-text-muted">kr</span>
            </div>
            {errors.initialBalance && (
              <span className="text-red-500 text-sm">{errors.initialBalance.message}</span>
            )}
          </FormField>

          {/* Form Preview */}
          {watchedValues.accountName && (
            <div className="bg-border rounded-lg p-4 border border-bg-muted">
              <h3 className="text-sm font-semibold text-text-primary mb-2">Account Preview</h3>
              <div className="text-text-secondary">
                <p className="font-semibold">{watchedValues.accountName}</p>
                <p className="text-sm capitalize">{watchedValues.accountType.toLowerCase().replace('_', ' ')}</p>
                <p className="text-lg font-semibold mt-1 text-positive">
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
              name="Add Account"
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
            name="+ Add Another Account"
            variant="outline"
            handleClick={() => setShowForm(true)}
          />
        </div>
      )}

      {/* Help Text */}
      <div className="bg-border rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-2">📝 Note</h3>
        <p className="text-sm text-text-muted">
          {accounts.length === 0 
            ? "You need at least one account to continue. You can add more accounts later from the Accounts page."
            : "Great! You can add more accounts anytime from the Accounts page."
          }
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
        <Button
          name="Continue"
          variant="primary"
          handleClick={continueSetup}
          isDisabled={accounts.length === 0 || isLoading}
        />
      </ButtonGroup>
    </div>
  );
}