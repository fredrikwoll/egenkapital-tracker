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
            capitalGoal: settings.capitalGoal / 100, // Convert øre to kroner for display
            
            // SIFO living expenses (convert øre to kroner for display, with defaults)
            sifoSingleAdult: 'sifoSingleAdult' in settings ? (settings.sifoSingleAdult as number) / 100 : 17000,
            sifoCouple: 'sifoCouple' in settings ? (settings.sifoCouple as number) / 100 : 28000,
            sifoChildUnder6: 'sifoChildUnder6' in settings ? (settings.sifoChildUnder6 as number) / 100 : 4000,
            sifoChildOver6: 'sifoChildOver6' in settings ? (settings.sifoChildOver6 as number) / 100 : 6000,
            
            // Loan calculation parameters (convert basis points to percentages/ratios for display, with defaults)
            maxDebtRatio: 'maxDebtRatioBp' in settings ? (settings.maxDebtRatioBp as number) / 100 : 5.0,
            maxLtvRatio: 'maxLtvRatioBp' in settings ? (settings.maxLtvRatioBp as number) / 10000 : 0.85,
            stressTestRate: 'stressTestRateBp' in settings ? (settings.stressTestRateBp as number) / 10000 : 0.05,
            defaultLoanTerm: 'defaultLoanTerm' in settings ? (settings.defaultLoanTerm as number) : 25,
            defaultInterestRate: 'defaultInterestRateBp' in settings ? (settings.defaultInterestRateBp as number) / 10000 : 0.04,
            minDownPayment: 'minDownPaymentBp' in settings ? (settings.minDownPaymentBp as number) / 10000 : 0.10
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
                    
                    <div className="mt-8">
                        <SectionHeader title="SIFO Living Expenses" variant="settings" size="h4" />
                        <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                            <FormField label='Single Adult (monthly)'>
                                <div className="relative">
                                    <Input
                                        {...register("sifoSingleAdult", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="17000"
                                        step="100"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                                </div>
                                {errors.sifoSingleAdult && <span className="text-red-500 text-sm">{errors.sifoSingleAdult.message}</span>}
                            </FormField>
                            
                            <FormField label='Couple (monthly)'>
                                <div className="relative">
                                    <Input
                                        {...register("sifoCouple", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="28000"
                                        step="100"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                                </div>
                                {errors.sifoCouple && <span className="text-red-500 text-sm">{errors.sifoCouple.message}</span>}
                            </FormField>
                            
                            <FormField label='Child Under 6 (monthly)'>
                                <div className="relative">
                                    <Input
                                        {...register("sifoChildUnder6", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="4000"
                                        step="100"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                                </div>
                                {errors.sifoChildUnder6 && <span className="text-red-500 text-sm">{errors.sifoChildUnder6.message}</span>}
                            </FormField>
                            
                            <FormField label='Child Over 6 (monthly)'>
                                <div className="relative">
                                    <Input
                                        {...register("sifoChildOver6", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="6000"
                                        step="100"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                                </div>
                                {errors.sifoChildOver6 && <span className="text-red-500 text-sm">{errors.sifoChildOver6.message}</span>}
                            </FormField>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <SectionHeader title="Loan Calculation Parameters" variant="settings" size="h4" />
                        <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                            <FormField label='Max Debt Ratio'>
                                <div className="relative">
                                    <Input
                                        {...register("maxDebtRatio", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="5.0"
                                        step="0.1"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">×</span>
                                </div>
                                {errors.maxDebtRatio && <span className="text-red-500 text-sm">{errors.maxDebtRatio.message}</span>}
                            </FormField>
                            
                            <FormField label='Max LTV Ratio'>
                                <div className="relative">
                                    <Input
                                        {...register("maxLtvRatio", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="0.85"
                                        step="0.01"
                                        min="0"
                                        max="1"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                                </div>
                                {errors.maxLtvRatio && <span className="text-red-500 text-sm">{errors.maxLtvRatio.message}</span>}
                            </FormField>
                            
                            <FormField label='Stress Test Rate'>
                                <div className="relative">
                                    <Input
                                        {...register("stressTestRate", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="0.05"
                                        step="0.001"
                                        min="0"
                                        max="0.2"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                                </div>
                                {errors.stressTestRate && <span className="text-red-500 text-sm">{errors.stressTestRate.message}</span>}
                            </FormField>
                            
                            <FormField label='Default Loan Term'>
                                <div className="relative">
                                    <Input
                                        {...register("defaultLoanTerm", {
                                            setValueAs: (value) => parseInt(value) || 0
                                        })}
                                        type="number"
                                        placeholder="25"
                                        step="1"
                                        min="1"
                                        max="50"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">years</span>
                                </div>
                                {errors.defaultLoanTerm && <span className="text-red-500 text-sm">{errors.defaultLoanTerm.message}</span>}
                            </FormField>
                            
                            <FormField label='Default Interest Rate'>
                                <div className="relative">
                                    <Input
                                        {...register("defaultInterestRate", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="0.04"
                                        step="0.001"
                                        min="0"
                                        max="0.5"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                                </div>
                                {errors.defaultInterestRate && <span className="text-red-500 text-sm">{errors.defaultInterestRate.message}</span>}
                            </FormField>
                            
                            <FormField label='Min Down Payment'>
                                <div className="relative">
                                    <Input
                                        {...register("minDownPayment", {
                                            setValueAs: (value) => parseFloat(value) || 0
                                        })}
                                        type="number"
                                        placeholder="0.10"
                                        step="0.01"
                                        min="0.01"
                                        max="1"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                                </div>
                                {errors.minDownPayment && <span className="text-red-500 text-sm">{errors.minDownPayment.message}</span>}
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