"use server";
import { prisma } from '@/lib/prisma'
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

const FormIncomeScema = z.object({
    id: z.string().optional(),
    amount: z.number()
});

type FormDebtValidate = z.infer<typeof FormIncomeScema>
export async function POST(request: NextRequest){

    try {
        const data = await request.json();
        const validation = FormIncomeScema.safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: FormDebtValidate = validation.data;
        const DebtUpsert = await prisma.income.upsert({
            where: {id: validatedData.id || ''},
            update: {
                amount: validatedData.amount
            },
            create: {
                amount: validatedData.amount
            }
        });
        return NextResponse.json(DebtUpsert, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Could not create or update Debt", original: (error as Error).message}, {status: 500});

    }

}