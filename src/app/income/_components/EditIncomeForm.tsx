import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIncomeData, editIncomeSchema } from "@/schemas/income";
import { Income } from "@prisma/client";



type EditIncomeFormProps = {
    income: Income;
    onSubmit: (data: EditIncomeData & { id: string }) => void;
    onCancel: () => void;
    isMobile?: boolean;
}

const EditIncomeForm = ({ income, onSubmit, onCancel, isMobile = false }: EditIncomeFormProps) => {
    // Create fresh form instance with debt data as defaultValues
    const form = useForm<EditIncomeData>({
        resolver: zodResolver(editIncomeSchema),
        defaultValues: {
            name: income.name,
            frequency: income.frequency,
            amount: income.amount
        }
    });
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;
    
    const onFormSubmit = (data: EditIncomeData) => {
        onSubmit({ ...data, id: income.id });
        onCancel(); // Close the form after successful submit
    };

    return (
        <div className={`bg-card border-t border-gray-100 ${isMobile ? 'px-4 py-4' : 'px-6 py-4'} animate-in slide-in-from-top-2 duration-200`}>
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Create New Income" />
                <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-2xl">
                    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
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
                                    {...register("amount")}
                                    type="number"
                                    step="0.01"
                                    placeholder="0"
                                />
                                <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                            </div>
                            {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
                        </FormField>
                    </div>
                    <ButtonGroup direction={isMobile ? "column" : "row"}>
                        <Button name="Save Income" shortName="Save" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default EditIncomeForm;