import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { CreateDebtData } from "@/schemas/debt";
import { UseFormReturn } from "react-hook-form";

type CreateDebtFormProps = {
    onSubmit: (data: CreateDebtData) => void;
    onCancel: () => void;
    form: UseFormReturn<CreateDebtData>;
}

const CreateDebtForm = ({ onSubmit, onCancel, form }: CreateDebtFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

    return (
        <div className="bg-card">
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Create New Debt" />
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <ButtonGroup>
                        <Button name="Create Debt" shortName="Create" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default CreateDebtForm;