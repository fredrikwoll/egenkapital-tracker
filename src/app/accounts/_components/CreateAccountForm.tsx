import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { CreateAccountData } from "@/schemas/account";
import { UseFormReturn } from "react-hook-form";

type CreateAccountFormProps = {
    onSubmit: (data: CreateAccountData) => void;
    onCancel: () => void;
    form: UseFormReturn<CreateAccountData>;
}

const CreateAccountForm = ({ onSubmit, onCancel, form }: CreateAccountFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

    return (
        <div className="bg-card">
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Create New Account" />
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField label="Account Name" required={true}>
                            <Input
                                {...register("name")}
                                type="text"
                                placeholder="e.g. Emergency Fund"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </FormField>

                        <FormField label="Account Type" required={true}>
                            <Select
                                {...register("type")}
                                options={[
                                    { name: 'Savings', value: 'SAVINGS' },
                                    { name: 'Checking', value: 'CHECKING' },
                                    { name: 'Stock Savings', value: 'STOCK_SAVINGS' },
                                    { name: 'Investment', value: 'INVESTMENT' }
                                ]}
                            />
                            {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                        </FormField>

                        <FormField label="Inital Amount">
                            <div className="relative">
                                <Input
                                    {...register("initialAmount", {
                                        setValueAs: (value) => parseFloat(value) || 0
                                    })}
                                    type="text"
                                    placeholder="0.00"
                                />
                                <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                            </div>
                            {errors.initialAmount && <span className="text-red-500 text-sm">{errors.initialAmount.message}</span>}
                        </FormField>
                    </div>
                    <ButtonGroup>
                        <Button name="Create Account" shortName="Create" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default CreateAccountForm;