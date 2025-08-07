import DisplayField from "@/components/forms/DisplayField";
import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { EditRecordData } from "@/schemas/records";
import { AccountRecord } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

/* type AccountWithTotal = Account & {
    totalAmount: number
} */

type EditRecordFormProps = {
    record: AccountRecord;
    onSubmit: (data: EditRecordData) => void;
    onCancel: () => void;
    form: UseFormReturn<EditRecordData>;
    accountList: AccountRecord[];
    isMobile?: boolean;
}

const EditRecordForm = ({ record, onSubmit, onCancel, form, accountList, isMobile = false }: EditRecordFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

    return (
        <div className={`bg-card border-t border-gray-100 ${isMobile ? 'px-4 py-4' : 'px-6 py-4'} animate-in slide-in-from-top-2 duration-200`}>
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Edit Record" />
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
                    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
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
                                    {...register("amount")}
                                    type="number"
                                    placeholder="0"
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
                    <ButtonGroup direction={isMobile ? "column" : "row"}>
                        <Button name="Save Record" shortName="Save" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default EditRecordForm;