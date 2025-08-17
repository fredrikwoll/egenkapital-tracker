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
            capitalGoal: Math.round(data.capitalGoal * 100) // Convert to øre
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
                </div>
            )}
            
            {updateMutation.isPending && <Spinner />}
        </div>
    );

}

export default SettingsOverview;