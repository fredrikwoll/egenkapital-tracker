"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SettingsSchema = z.object({
    currency: z.string().optional(),
    dateFormat: z.string().optional(),
    numberFormat: z.string().optional(),
    currencyDisplay: z.string().optional(),
    capitalGoal: z.number().optional(),
    
    // SIFO living expenses (in kroner, will be converted to øre)
    sifoSingleAdult: z.number().optional(),
    sifoCouple: z.number().optional(),
    sifoChildUnder6: z.number().optional(),
    sifoChildOver6: z.number().optional(),
    
    // Loan calculation parameters (as percentages/ratios, will be converted to basis points)
    maxDebtRatio: z.number().optional(),
    maxLtvRatio: z.number().optional(),
    stressTestRate: z.number().optional(),
    defaultLoanTerm: z.number().optional(),
    defaultInterestRate: z.number().optional(),
    minDownPayment: z.number().optional(),
});

type SettingsValidate = z.infer<typeof SettingsSchema>;

export async function GET() {
    try {
        // For now, get the first settings record (single user app)
        let settings = await prisma.settings.findFirst();
        
        // If no settings exist, create default settings
        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    currency: "NOK",
                    dateFormat: "DD/MM/YYYY",
                    numberFormat: "1 234,56",
                    currencyDisplay: "symbol",
                    capitalGoal: 100000000
                }
            });
        }
        
        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Could not fetch settings", original: (error as Error).message }, 
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const validation = SettingsSchema.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, { status: 400 });
        }

        const validatedData: SettingsValidate = validation.data;
        
        // Convert display values to storage format
        const storageData: any = {};
        
        // Basic settings
        if (validatedData.currency !== undefined) storageData.currency = validatedData.currency;
        if (validatedData.dateFormat !== undefined) storageData.dateFormat = validatedData.dateFormat;
        if (validatedData.numberFormat !== undefined) storageData.numberFormat = validatedData.numberFormat;
        if (validatedData.currencyDisplay !== undefined) storageData.currencyDisplay = validatedData.currencyDisplay;
        if (validatedData.capitalGoal !== undefined) storageData.capitalGoal = Math.round(validatedData.capitalGoal * 100); // kroner to øre
        
        // SIFO living expenses (kroner to øre)
        if (validatedData.sifoSingleAdult !== undefined) storageData.sifoSingleAdult = Math.round(validatedData.sifoSingleAdult * 100);
        if (validatedData.sifoCouple !== undefined) storageData.sifoCouple = Math.round(validatedData.sifoCouple * 100);
        if (validatedData.sifoChildUnder6 !== undefined) storageData.sifoChildUnder6 = Math.round(validatedData.sifoChildUnder6 * 100);
        if (validatedData.sifoChildOver6 !== undefined) storageData.sifoChildOver6 = Math.round(validatedData.sifoChildOver6 * 100);
        
        // Loan calculation parameters (percentages/ratios to basis points)
        if (validatedData.maxDebtRatio !== undefined) storageData.maxDebtRatioBp = Math.round(validatedData.maxDebtRatio * 100); // 5.0 -> 500 bp
        if (validatedData.maxLtvRatio !== undefined) storageData.maxLtvRatioBp = Math.round(validatedData.maxLtvRatio * 10000); // 0.85 -> 8500 bp
        if (validatedData.stressTestRate !== undefined) storageData.stressTestRateBp = Math.round(validatedData.stressTestRate * 10000); // 0.05 -> 500 bp
        if (validatedData.defaultLoanTerm !== undefined) storageData.defaultLoanTerm = validatedData.defaultLoanTerm;
        if (validatedData.defaultInterestRate !== undefined) storageData.defaultInterestRateBp = Math.round(validatedData.defaultInterestRate * 10000); // 0.04 -> 400 bp
        if (validatedData.minDownPayment !== undefined) storageData.minDownPaymentBp = Math.round(validatedData.minDownPayment * 10000); // 0.10 -> 1000 bp

        // Check if settings exist
        const existingSettings = await prisma.settings.findFirst();
        
        let settings;
        if (existingSettings) {
            // Update existing settings
            settings = await prisma.settings.update({
                where: { id: existingSettings.id },
                data: storageData
            });
        } else {
            // Create new settings with defaults
            settings = await prisma.settings.create({
                data: {
                    currency: validatedData.currency || "NOK",
                    dateFormat: validatedData.dateFormat || "DD/MM/YYYY",
                    numberFormat: validatedData.numberFormat || "1 234,56",
                    currencyDisplay: validatedData.currencyDisplay || "symbol",
                    capitalGoal: validatedData.capitalGoal ? Math.round(validatedData.capitalGoal * 100) : 100000000,
                    
                    // SIFO defaults (in øre)
                    sifoSingleAdult: validatedData.sifoSingleAdult ? Math.round(validatedData.sifoSingleAdult * 100) : 1700000,
                    sifoCouple: validatedData.sifoCouple ? Math.round(validatedData.sifoCouple * 100) : 2800000,
                    sifoChildUnder6: validatedData.sifoChildUnder6 ? Math.round(validatedData.sifoChildUnder6 * 100) : 400000,
                    sifoChildOver6: validatedData.sifoChildOver6 ? Math.round(validatedData.sifoChildOver6 * 100) : 600000,
                    
                    // Loan parameter defaults (in basis points)
                    maxDebtRatioBp: validatedData.maxDebtRatio ? Math.round(validatedData.maxDebtRatio * 100) : 500,
                    maxLtvRatioBp: validatedData.maxLtvRatio ? Math.round(validatedData.maxLtvRatio * 10000) : 8500,
                    stressTestRateBp: validatedData.stressTestRate ? Math.round(validatedData.stressTestRate * 10000) : 500,
                    defaultLoanTerm: validatedData.defaultLoanTerm || 25,
                    defaultInterestRateBp: validatedData.defaultInterestRate ? Math.round(validatedData.defaultInterestRate * 10000) : 400,
                    minDownPaymentBp: validatedData.minDownPayment ? Math.round(validatedData.minDownPayment * 10000) : 1000
                }
            });
        }

        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Could not save settings", original: (error as Error).message }, 
            { status: 500 }
        );
    }
}