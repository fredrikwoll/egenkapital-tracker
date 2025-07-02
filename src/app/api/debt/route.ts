"use server";
import { prisma } from '@/lib/prisma'
import { DebtType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

export async function GET(){

    try {
        const result = await prisma.debt.findMany({});
        return NextResponse.json(result,{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Debt", original: (error as Error).message}, {status: 500});
    }

}

const FormDebtScema = z.object({
    id: z.string().optional(),
    name: z.string(),
    type: z.nativeEnum(DebtType),
    amount: z.number()
});

type FormDebtValidate = z.infer<typeof FormDebtScema>
export async function POST(request: NextRequest){

    try {
        const data = await request.json();
        const validation = FormDebtScema.safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: FormDebtValidate = validation.data;
        const DebtUpsert = await prisma.debt.upsert({
            where: {id: validatedData.id || ''},
            update: {
                name: validatedData.name,
                type: validatedData.type,
                amount: validatedData.amount
            },
            create: {
                name: validatedData.name,
                type: validatedData.type,
                amount: validatedData.amount
            }
        });
        return NextResponse.json(DebtUpsert, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Could not create or update Debt", original: (error as Error).message}, {status: 500});

    }

}