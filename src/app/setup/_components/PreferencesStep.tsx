import { useForm } from 'react-hook-form';
import FormField from '@/components/forms/FormField';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import { SetupData } from '../page';

interface PreferencesStepProps {
  data: SetupData;
  onDataChange: (data: Partial<SetupData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface FormData {
  currency: string;
  dateFormat: string;
  numberFormat: string;
  currencyDisplay: string;
}

const currencyOptions = [
  { name: 'NOK (Norwegian Krone)', value: 'NOK' },
  { name: 'USD (US Dollar)', value: 'USD' },
  { name: 'EUR (Euro)', value: 'EUR' },
  { name: 'GBP (British Pound)', value: 'GBP' },
];

const dateFormatOptions = [
  { name: 'DD/MM/YYYY (31/12/2024)', value: 'DD/MM/YYYY' },
  { name: 'MM/DD/YYYY (12/31/2024)', value: 'MM/DD/YYYY' },
  { name: 'YYYY-MM-DD (2024-12-31)', value: 'YYYY-MM-DD' },
  { name: 'DD.MM.YYYY (31.12.2024)', value: 'DD.MM.YYYY' },
];

const numberFormatOptions = [
  { name: '1,234.56 (US/UK format)', value: '1,234.56' },
  { name: '1 234,56 (Norwegian/French format)', value: '1 234,56' },
  { name: '1.234,56 (German/Italian format)', value: '1.234,56' },
  { name: '1\'234.56 (Swiss format)', value: '1\'234.56' },
];

const currencyDisplayOptions = [
  { name: 'Symbol (kr 1,234)', value: 'symbol' },
  { name: 'Code (NOK 1,234)', value: 'code' },
  { name: 'Symbol After (1,234 kr)', value: 'symbol-after' },
  { name: 'Code After (1,234 NOK)', value: 'code-after' },
];

export default function PreferencesStep({ data, onDataChange, onNext, onBack }: PreferencesStepProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      currency: data.currency,
      dateFormat: data.dateFormat,
      numberFormat: data.numberFormat,
      currencyDisplay: data.currencyDisplay,
    }
  });

  const watchedValues = watch();

  // Preview formatting functions
  const formatPreviewAmount = (amount: number) => {
    const { formatAmountWithSettings } = require('@/lib/utils');
    return formatAmountWithSettings(amount, {
      currency: watchedValues.currency || data.currency,
      numberFormat: watchedValues.numberFormat || data.numberFormat,
      currencyDisplay: watchedValues.currencyDisplay || data.currencyDisplay
    });
  };

  const formatPreviewDate = (date: Date) => {
    const { formatDateWithSettings } = require('@/lib/utils');
    return formatDateWithSettings(date, watchedValues.dateFormat || data.dateFormat);
  };

  const previewDate = new Date('2024-12-31');
  const previewAmount = 123456; // 1,234.56 kr in øre

  const onSubmit = (formData: FormData) => {
    onDataChange(formData);
    onNext();
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Set Your Preferences
        </h2>
        <p className="text-text-muted">
          Choose how you&apos;d like numbers, dates, and currency to be displayed throughout the app.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Currency">
            <Select
              {...register("currency", { required: "Please select a currency" })}
              options={currencyOptions}
            />
            {errors.currency && (
              <span className="text-red-500 text-sm">{errors.currency.message}</span>
            )}
          </FormField>

          <FormField label="Currency Display">
            <Select
              {...register("currencyDisplay", { required: "Please select a display format" })}
              options={currencyDisplayOptions}
            />
            {errors.currencyDisplay && (
              <span className="text-red-500 text-sm">{errors.currencyDisplay.message}</span>
            )}
          </FormField>

          <FormField label="Date Format">
            <Select
              {...register("dateFormat", { required: "Please select a date format" })}
              options={dateFormatOptions}
            />
            {errors.dateFormat && (
              <span className="text-red-500 text-sm">{errors.dateFormat.message}</span>
            )}
          </FormField>

          <FormField label="Number Format">
            <Select
              {...register("numberFormat", { required: "Please select a number format" })}
              options={numberFormatOptions}
            />
            {errors.numberFormat && (
              <span className="text-red-500 text-sm">{errors.numberFormat.message}</span>
            )}
          </FormField>
        </div>

        <div className="bg-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-2">Preview</h3>
          <div className="text-sm text-text-muted">
            <p><strong className="text-text-secondary">Amount:</strong> {formatPreviewAmount(previewAmount)}</p>
            <p><strong className="text-text-secondary">Date:</strong> {formatPreviewDate(previewDate)}</p>
          </div>
        </div>

        <ButtonGroup direction="row">
          <Button
            name="Back"
            variant="outline"
            handleClick={onBack}
            type="button"
          />
          <Button
            name="Continue"
            variant="primary"
            type="submit"
          />
        </ButtonGroup>
      </form>
    </div>
  );
}