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

        // Check if settings exist
        const existingSettings = await prisma.settings.findFirst();
        
        let settings;
        if (existingSettings) {
            // Update existing settings
            settings = await prisma.settings.update({
                where: { id: existingSettings.id },
                data: validatedData
            });
        } else {
            // Create new settings
            settings = await prisma.settings.create({
                data: {
                    currency: validatedData.currency || "NOK",
                    dateFormat: validatedData.dateFormat || "DD/MM/YYYY",
                    numberFormat: validatedData.numberFormat || "1 234,56",
                    currencyDisplay: validatedData.currencyDisplay || "symbol",
                    capitalGoal: validatedData.capitalGoal || 100000000
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