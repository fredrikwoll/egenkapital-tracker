"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings } from '@prisma/client';

type SettingsContextType = {
    settings: Settings | null;
    updateSettings: (newSettings: Settings) => void;
    isLoading: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

type SettingsProviderProps = {
    children: React.ReactNode;
    initialSettings?: Settings;
};

export function SettingsProvider({ children, initialSettings }: SettingsProviderProps) {
    const [settings, setSettings] = useState<Settings | null>(initialSettings || null);
    const [isLoading, setIsLoading] = useState(false); // Start as not loading since we have initial settings

    useEffect(() => {
        // Only fetch if we don't have initial settings
        if (!initialSettings && !settings) {
            fetchSettings();
        }
    }, [initialSettings, settings]);

    const fetchSettings = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/settings');
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            } else {
                console.warn('Failed to fetch settings, using defaults');
                setDefaultSettings();
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            setDefaultSettings();
        } finally {
            setIsLoading(false);
        }
    };

    const setDefaultSettings = () => {
        setSettings({
            id: 'default',
            currency: 'NOK',
            dateFormat: 'DD/MM/YYYY',
            numberFormat: '1 234,56',
            currencyDisplay: 'symbol-after',
            createdAt: new Date(),
            updatedAt: new Date()
        } as Settings);
    };

    const updateSettings = (newSettings: Settings) => {
        setSettings(newSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

// Custom hook for formatting amounts with current user settings
export function useFormatAmount() {
    const { settings } = useSettings();
    
    return (øreAmount: number): string => {
        try {
            // Always use settings if available, otherwise use default Norwegian formatting that matches our fallback
            const settingsToUse = settings || {
                currency: 'NOK',
                numberFormat: '1 234,56',
                currencyDisplay: 'symbol-after'
            };
            
            const { formatAmountWithSettings } = require('@/lib/utils');
            return formatAmountWithSettings(øreAmount, {
                currency: settingsToUse.currency,
                numberFormat: settingsToUse.numberFormat,
                currencyDisplay: settingsToUse.currencyDisplay
            });
        } catch (error) {
            console.error('Error formatting amount:', error);
            // Ultimate fallback - Norwegian format
            return `${(øreAmount / 100).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} kr`;
        }
    };
}