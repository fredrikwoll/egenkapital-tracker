'use client'
import { useState } from "react";
import { EditSettingData } from "@/schemas/settings";
import { Settings } from "@prisma/client"
import { useSettings, useUpdateSettings } from "../_hooks/useSettings";
import EditSettingsForm from "./EditSettingsForm";
import Spinner from "@/components/ui/Spinner";
import PageHeader from "@/components/ui/PageHeader";

type EditFormData = EditSettingData & {
    id: string;
}

const SettingsOverview = ({ initialData }: { initialData: Settings }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentSettings, setCurrentSettings] = useState(initialData);
    
    const updateMutation = useUpdateSettings();

    const handleOnSaveEdit = (data: EditFormData) => {
        updateMutation.mutate({
            id: data.id,
            currency: data.currency,
            dateFormat: data.dateFormat,
            numberFormat: data.numberFormat,
            currencyDisplay: data.currencyDisplay,
            capitalGoal: Math.round(data.capitalGoal * 100), // Convert to øre
            
            // SIFO living expenses (convert kroner to øre)
            sifoSingleAdult: Math.round(data.sifoSingleAdult * 100),
            sifoCouple: Math.round(data.sifoCouple * 100),
            sifoChildUnder6: Math.round(data.sifoChildUnder6 * 100),
            sifoChildOver6: Math.round(data.sifoChildOver6 * 100),
            
            // Loan calculation parameters (convert to basis points)
            maxDebtRatio: Math.round(data.maxDebtRatio * 100),
            maxLtvRatio: Math.round(data.maxLtvRatio * 10000),
            stressTestRate: Math.round(data.stressTestRate * 10000),
            defaultLoanTerm: data.defaultLoanTerm,
            defaultInterestRate: Math.round(data.defaultInterestRate * 10000),
            minDownPayment: Math.round(data.minDownPayment * 10000)
        }, {
            onSuccess: (updatedSettings) => {
                setCurrentSettings(updatedSettings);
                setIsEditing(false);
            }
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    if (!currentSettings) {
        return <div>No settings found</div>
    }

    return (
        <div className="space-y-4">
            <PageHeader 
                title="Settings"
                description="Manage your application preferences"
                hasButton={!isEditing}
                buttonText="Edit Settings"
                handleClick={handleEditClick}
            />
            
            {isEditing ? (
                <EditSettingsForm
                    settings={currentSettings}
                    onSubmit={handleOnSaveEdit}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <div className="space-y-6">
                    <div className="bg-card rounded-lg shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Formatting and Currency</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-md font-medium text-text-primary">Currency</label>
                                <p className="text-text-muted text-xl">{currentSettings.currency}</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Date Format</label>
                                <p className="text-text-muted text-xl">{currentSettings.dateFormat}</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Number Format</label>
                                <p className="text-text-muted text-xl">{currentSettings.numberFormat}</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Currency Display</label>
                                <p className="text-text-muted text-xl">{currentSettings.currencyDisplay}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-card rounded-lg shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Financial Goals</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-md font-medium text-text-primary">Capital Goal</label>
                                <p className="text-text-muted text-xl">{(currentSettings.capitalGoal / 100).toLocaleString()} kr</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-card rounded-lg shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">SIFO Living Expenses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-md font-medium text-text-primary">Single Adult (monthly)</label>
                                <p className="text-text-muted text-xl">{'sifoSingleAdult' in currentSettings ? ((currentSettings.sifoSingleAdult as number) / 100).toLocaleString() : '17,000'} kr</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Couple (monthly)</label>
                                <p className="text-text-muted text-xl">{'sifoCouple' in currentSettings ? ((currentSettings.sifoCouple as number) / 100).toLocaleString() : '28,000'} kr</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Child Under 6 (monthly)</label>
                                <p className="text-text-muted text-xl">{'sifoChildUnder6' in currentSettings ? ((currentSettings.sifoChildUnder6 as number) / 100).toLocaleString() : '4,000'} kr</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Child Over 6 (monthly)</label>
                                <p className="text-text-muted text-xl">{'sifoChildOver6' in currentSettings ? ((currentSettings.sifoChildOver6 as number) / 100).toLocaleString() : '6,000'} kr</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-card rounded-lg shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Loan Calculation Parameters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-md font-medium text-text-primary">Max Debt Ratio</label>
                                <p className="text-text-muted text-xl">{'maxDebtRatioBp' in currentSettings ? ((currentSettings.maxDebtRatioBp as number) / 100).toFixed(1) : '5.0'}×</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Max LTV Ratio</label>
                                <p className="text-text-muted text-xl">{'maxLtvRatioBp' in currentSettings ? ((currentSettings.maxLtvRatioBp as number) / 100).toFixed(0) : '85'}%</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Stress Test Rate</label>
                                <p className="text-text-muted text-xl">+{'stressTestRateBp' in currentSettings ? ((currentSettings.stressTestRateBp as number) / 100).toFixed(1) : '5.0'}%</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Default Loan Term</label>
                                <p className="text-text-muted text-xl">{'defaultLoanTerm' in currentSettings ? (currentSettings.defaultLoanTerm as number) : 25} years</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Default Interest Rate</label>
                                <p className="text-text-muted text-xl">{'defaultInterestRateBp' in currentSettings ? ((currentSettings.defaultInterestRateBp as number) / 100).toFixed(1) : '4.0'}%</p>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-text-primary">Min Down Payment</label>
                                <p className="text-text-muted text-xl">{'minDownPaymentBp' in currentSettings ? ((currentSettings.minDownPaymentBp as number) / 100).toFixed(0) : '10'}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {updateMutation.isPending && <Spinner />}
        </div>
    );

}

export default SettingsOverview;