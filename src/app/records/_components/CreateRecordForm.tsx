import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { CreateRecordData } from "@/schemas/records";
import { UseFormReturn } from "react-hook-form";
import { AccountRecord } from "@prisma/client";

type CreateRecordFormProps = {
    onSubmit: (data: CreateRecordData) => void;
    onCancel: () => void;
    form: UseFormReturn<CreateRecordData>;
    accountList: AccountRecord[];
}

const CreateRecordForm = ({ onSubmit, onCancel, form, accountList }: CreateRecordFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

    return (
        <div className="bg-card">
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Create New Record" />
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField label="Account" required={true}>
                            <Select
                                {...register("accountId")}
                                options={accountList.map(account => ({ name: account.name, value: account.id }))}
                            />
                            {errors.accountId && <span className="text-red-500 text-sm">{errors.accountId.message}</span>}
                        </FormField>

                        <FormField label="Record Type" required={true}>
                            <Select
                                {...register("type")}
                                options={[
                                    { name: 'Deposit', value: 'DEPOSIT' },
                                    { name: 'Withdrawal', value: 'WITHDRAWAL' },
                                    { name: 'Interest', value: 'INTEREST' },
                                    { name: 'Transfer', value: 'TRANSFER' }
                                ]}
                            />
                            {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
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
                    
                    <div className="mt-4">
                        <FormField label="Description">
                            <Input
                                {...register("description")}
                                type="text"
                                placeholder="Optional description"
                            />
                            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                        </FormField>
                    </div>
                    <ButtonGroup>
                        <Button name="Create Record" shortName="Create" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default CreateRecordForm;