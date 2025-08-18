import { useForm } from 'react-hook-form';
import FormField from '@/components/forms/FormField';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import { SetupData } from '../page';

interface GoalsStepProps {
  data: SetupData;
  onDataChange: (data: Partial<SetupData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface GoalsFormData {
  capitalGoal: string;
}

export default function GoalsStep({ data, onDataChange, onNext, onBack }: GoalsStepProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<GoalsFormData>({
    defaultValues: {
      capitalGoal: data.capitalGoal.toString(),
    }
  });

  const capitalGoal = parseFloat(watch('capitalGoal') || '0');

  const onSubmit = (formData: GoalsFormData) => {
    onDataChange({
      capitalGoal: parseFloat(formData.capitalGoal) || 0
    });
    onNext();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('nb-NO');
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Set Your Financial Goals
        </h2>
        <p className="text-text-muted">
          Setting goals helps you stay motivated and track your progress over time.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="Capital Goal">
          <div className="relative">
            <Input
              {...register("capitalGoal", { 
                required: "Please enter a capital goal",
                min: { value: 0, message: "Capital goal must be positive" }
              })}
              type="number"
              placeholder="1000000"
              step="1000"
              className="pr-10"
            />
            <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
          </div>
          {errors.capitalGoal && (
            <span className="text-red-500 text-sm">{errors.capitalGoal.message}</span>
          )}
          <p className="text-sm text-gray-500 mt-1">
            This is your long-term financial target. You can change this anytime in settings.
          </p>
        </FormField>

        {capitalGoal && (
          <div className="bg-border rounded-lg p-4 border border-bg-muted">
            <h3 className="text-sm font-semibold text-text-muted mb-2">Goal Preview</h3>
            <div className="text-text-muted">
              <p className="text-lg font-semibold text-text-primary">
                {formatNumber(capitalGoal)} kr
              </p>
              <p className="text-sm">
                Your capital goal will be displayed on your dashboard to help track your progress.
              </p>
            </div>
          </div>
        )}

        <div className="bg-gray-500 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-200 mb-2">💡 Tip</h3>
          <p className="text-sm text-gray-100">
            A common approach is to set a goal that would provide financial independence through 
            investments (like 25x your annual expenses for a 4% withdrawal rate).
          </p>
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