"use server";
import { prisma } from '@/lib/prisma'
import { IncomeFrequency } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

export async function GET(){

    try {
        const result = await prisma.income.findMany({});
        return NextResponse.json(result,{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Income", original: (error as Error).message}, {status: 500});
    }

}

const FormIncomeSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    frequency: z.nativeEnum(IncomeFrequency),
    amount: z.coerce.number()
});

type FormDebtValidate = z.infer<typeof FormIncomeSchema>
export async function POST(request: NextRequest){

    try {
        const data = await request.json();
        const validation = FormIncomeSchema.safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: FormDebtValidate = validation.data;
        const result = await prisma.income.create({
            data: {
                name: validatedData.name,
                amount: validatedData.amount,
                frequency: validatedData.frequency
            }
        });
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Could not create or update Income", original: (error as Error).message}, {status: 500});

    }

}