import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "@prisma/client";
import { EditSettingData, editSettingSchema } from "@/schemas/settings";



type EditSettingsFormProps = {
    settings: Settings;
    onSubmit: (data: EditSettingData & { id: string }) => void;
    onCancel: () => void;
    isMobile?: boolean;
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


const EditSettingsForm = ({ settings, onSubmit, onCancel, isMobile = false }: EditSettingsFormProps) => {
    // Create fresh form instance with debt data as defaultValues
    const form = useForm<EditSettingData>({
        resolver: zodResolver(editSettingSchema),
        defaultValues: {
            currency: settings.currency,
            dateFormat: settings.dateFormat,
            numberFormat: settings.numberFormat,
            currencyDisplay: settings.currencyDisplay,
            capitalGoal: settings.capitalGoal / 100 // Convert øre to kroner for display
        }
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

    const onFormSubmit = (data: EditSettingData) => {
        onSubmit({ ...data, id: settings.id });
        onCancel(); // Close the form after successful submit
    };

    return (
        <div className={`bg-card border-t border-gray-100 ${isMobile ? 'px-4 py-4' : 'px-6 py-4'} animate-in slide-in-from-top-2 duration-200`}>
            <div className="px-4 md:px-6 py-4">
                <SectionHeader title="Formatting and Currency" variant="settings" size="h4" />
                <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-2xl">
                    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                        <FormField label='Currency'>
                            <Select
                                {...register("currency")}
                                options={currencyOptions}
                            />
                            {errors.currency && <span className="text-red-500 text-sm">{errors.currency.message}</span>}
                        </FormField>

                        <FormField label='Date Format'>
                            <Select
                                {...register("dateFormat")}
                                options={dateFormatOptions}
                            />
                            {errors.dateFormat && <span className="text-red-500 text-sm">{errors.dateFormat.message}</span>}
                        </FormField>

                        <FormField label='Number Format'>
                            <Select
                                {...register("numberFormat")}
                                options={numberFormatOptions}
                            />
                            {errors.numberFormat && <span className="text-red-500 text-sm">{errors.numberFormat.message}</span>}
                        </FormField>

                        <FormField label='Currency Display'>
                            <Select
                                {...register("currencyDisplay")}
                                options={currencyDisplayOptions}
                            />
                            {errors.currencyDisplay && <span className="text-red-500 text-sm">{errors.currencyDisplay.message}</span>}
                        </FormField>
                    </div>
                    
                    <div className="mt-8">
                        <SectionHeader title="Financial Goals" variant="goals" size="h4" />
                        <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                            <FormField label='Capital Goal'>
                                <div className="relative">
                                    <Input
                                        {...register("capitalGoal", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="1000000"
                                        step="0.01"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                                </div>
                                {errors.capitalGoal && <span className="text-red-500 text-sm">{errors.capitalGoal.message}</span>}
                            </FormField>
                        </div>
                    </div>
                    <ButtonGroup direction={isMobile ? "column" : "row"}>
                        <Button name="Save Settings" shortName="Save" variant="primary" type="submit" isDisabled={isSubmitting} />
                        <Button name="Cancel" shortName="Cancel" variant="outline" handleClick={onCancel} />
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
};


export default EditSettingsForm;