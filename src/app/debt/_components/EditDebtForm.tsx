import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Debt } from "@prisma/client";
import { EditDebtData, editDebtSchema } from "@/schemas/debt";


type EditDebtFormProps = {
    debt: Debt;
    onSubmit: (data: EditDebtData & { id: string }) => void;
    onCancel: () => void;
    isMobile?: boolean;
}

const EditDebtForm = ({ debt, onSubmit, onCancel, isMobile = false }: EditDebtFormProps) => {
    // Create fresh form instance with debt data as defaultValues
    const form = useForm<EditDebtData>({
        resolver: zodResolver(editDebtSchema),
        defaultValues: {
            name: debt.name,
            type: debt.type,
            amount: debt.amount
        }
    });
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;
    
    const onFormSubmit = (data: EditDebtData) => {
        onSubmit({ ...data, id: debt.id });
        onCancel(); // Close the form after successful submit
    };

    return (
        <div className={`bg-card border-t border-gray-100 ${isMobile ? 'px-4 py-4' : 'px-6 py-4'} animate-in slide-in-from-top-2 duration-200`}>
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Create New Debt" />
                <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-2xl">
                    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
                        <FormField label="Debt Name" required={true}>
                            <Input
                                {...register("name")}
                                type="text"
                                placeholder="e.g. Emergency Fund"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </FormField>

                        <FormField label="Debt Type" required={true}>
                            <Select
                                {...register("type")}
                                options={[
                                    { name: 'Student Loan', value: 'STUDENT_LOAN' },
                                    { name: 'Consumer Loan', value: 'CONSUMER_LOAN' },
                                    { name: 'Mortgage', value: 'MORTGAGE' },
                                    { name: 'Credit Card', value: 'CREDIT_CARD' }
                                ]}
                            />
                            {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
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
                        <Button name="Save Debt" shortName="Save" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default EditDebtForm;