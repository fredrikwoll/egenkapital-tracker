"use client";

import React, { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";

type DateInputProps = {
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'>;

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
    ({ defaultValue, onChange, ...props }, ref) => {
        const { settings } = useSettings();
        const dateFormat = settings?.dateFormat || 'YYYY-MM-DD';
        
        // Convert ISO date (YYYY-MM-DD) to user's preferred format for display
        const formatDateForDisplay = (isoDate: string) => {
            if (!isoDate) return '';
            const [year, month, day] = isoDate.split('-');
            
            switch (dateFormat) {
                case 'DD/MM/YYYY':
                    return `${day}/${month}/${year}`;
                case 'MM/DD/YYYY':
                    return `${month}/${day}/${year}`;
                case 'YYYY-MM-DD':
                    return `${year}-${month}-${day}`;
                case 'DD.MM.YYYY':
                    return `${day}.${month}.${year}`;
                default:
                    return `${year}-${month}-${day}`;
            }
        };
        
        // Convert user's format back to ISO date (YYYY-MM-DD) for form submission
        const parseUserDate = (userDate: string): string => {
            if (!userDate) return '';
            
            let day, month, year;
            
            switch (dateFormat) {
                case 'DD/MM/YYYY':
                    [day, month, year] = userDate.split('/');
                    break;
                case 'MM/DD/YYYY':
                    [month, day, year] = userDate.split('/');
                    break;
                case 'YYYY-MM-DD':
                    [year, month, day] = userDate.split('-');
                    break;
                case 'DD.MM.YYYY':
                    [day, month, year] = userDate.split('.');
                    break;
                default:
                    [year, month, day] = userDate.split('-');
            }
            
            // Ensure we have valid parts and pad them
            if (!day || !month || !year) return '';
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        };
        
        const [displayValue, setDisplayValue] = useState(() => {
            return defaultValue ? formatDateForDisplay(defaultValue) : '';
        });
        
        const getPlaceholder = () => {
            switch (dateFormat) {
                case 'DD/MM/YYYY':
                    return 'DD/MM/YYYY';
                case 'MM/DD/YYYY':
                    return 'MM/DD/YYYY';
                case 'YYYY-MM-DD':
                    return 'YYYY-MM-DD';
                case 'DD.MM.YYYY':
                    return 'DD.MM.YYYY';
                default:
                    return 'YYYY-MM-DD';
            }
        };
        
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const userInput = event.target.value;
            setDisplayValue(userInput);
            
            // Convert to ISO format for form submission
            const isoDate = parseUserDate(userInput);
            
            // Create a new event with the ISO date value
            const syntheticEvent = {
                ...event,
                target: {
                    ...event.target,
                    value: isoDate
                }
            };
            
            if (onChange) {
                onChange(syntheticEvent);
            }
        };
        
        return (
            <input
                ref={ref}
                type="text"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                placeholder={getPlaceholder()}
                value={displayValue}
                onChange={handleChange}
                {...props}
            />
        );
    }
);

DateInput.displayName = "DateInput";

export default DateInput;