import { prisma } from "@/lib/prisma";
import { Settings } from "@prisma/client";

export async function getSettings(): Promise<Settings> {
    try {
        // Try to get existing settings
        let settings = await prisma.settings.findFirst();
        
        // If no settings exist, create default settings
        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    currency: "NOK",
                    dateFormat: "DD/MM/YYYY", 
                    numberFormat: "1 234,56",
                    currencyDisplay: "symbol-after"
                }
            });
        }
        
        return settings;
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        
        // Return default settings as fallback
        return {
            id: 'fallback',
            currency: "NOK",
            dateFormat: "DD/MM/YYYY",
            numberFormat: "1 234,56", 
            currencyDisplay: "symbol-after",
            createdAt: new Date(),
            updatedAt: new Date()
        } as Settings;
    }
}