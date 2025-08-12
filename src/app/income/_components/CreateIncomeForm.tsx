import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { CreateIncomeData } from "@/schemas/income";
import { UseFormReturn } from "react-hook-form";

type CreateIncomeFormProps = {
    onSubmit: (data: CreateIncomeData) => void;
    onCancel: () => void;
    form: UseFormReturn<CreateIncomeData>;
}

const CreateIncomeForm = ({ onSubmit, onCancel, form }: CreateIncomeFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

    return (
        <div className="bg-card">
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Create New Income" />
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField label="Income Name" required={true}>
                            <Input
                                {...register("name")}
                                type="text"
                                placeholder="e.g. Emergency Fund"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </FormField>

                        <FormField label="Income Frequency" required={true}>
                            <Select
                                {...register("frequency")}
                                options={[
                                    { name: 'Weekly', value: 'WEEKLY' },
                                    { name: 'Monthly', value: 'MONTHLY' },
                                    { name: 'Yearly', value: 'YEARLY' }
                                ]}
                            />
                            {errors.frequency && <span className="text-red-500 text-sm">{errors.frequency.message}</span>}
                        </FormField>

                        <FormField label="Amount">
                            <div className="relative">
                                <Input
                                    {...register("amount", {
                                        setValueAs: (value) => parseFloat(value) || 0
                                    })}
                                    type="text"
                                    placeholder="0.00"
                                />
                                <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                            </div>
                            {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
                        </FormField>
                    </div>
                    <ButtonGroup>
                        <Button name="Create Income" shortName="Create" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default CreateIncomeForm;