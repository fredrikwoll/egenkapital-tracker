import DisplayField from "@/components/forms/DisplayField";
import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { EditAccountData, editAccountSchema } from "@/schemas/account";
import { Account } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormatAmount } from "@/contexts/SettingsContext";

type AccountWithTotal = Account & {
    totalAmount: number
}

type EditAccountFormProps = {
    account: AccountWithTotal;
    onSubmit: (data: EditAccountData & { id: string }) => void;
    onCancel: () => void;
    isMobile?: boolean;
}

const EditAccountForm = ({ account, onSubmit, onCancel, isMobile = false }: EditAccountFormProps) => {
    const formatAmount = useFormatAmount();
    
    // Create fresh form instance with account data as defaultValues
    const form = useForm<EditAccountData>({
        resolver: zodResolver(editAccountSchema),
        defaultValues: {
            name: account.name,
            type: account.type
        }
    });
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;
    
    const onFormSubmit = (data: EditAccountData) => {
        onSubmit({ ...data, id: account.id });
        onCancel(); // Close the form after successful submit
    };

    return (
        <div className={`bg-card border-t border-gray-100 ${isMobile ? 'px-4 py-4' : 'px-6 py-4'} animate-in slide-in-from-top-2 duration-200`}>
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Create New Account" />
                <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-2xl">
                    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
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
                        <DisplayField
                            label="Total Amount"
                            value={formatAmount(account.totalAmount)}
                            suffix=""
                        />
                    </div>
                    <ButtonGroup direction={isMobile ? "column" : "row"}>
                        <Button name="Save Account" shortName="Save" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default EditAccountForm;