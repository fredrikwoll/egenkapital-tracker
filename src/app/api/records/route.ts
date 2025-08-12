"use server";
import { prisma } from '@/lib/prisma'
import { RecordType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

export async function GET(){

    try {
        const result = await prisma.accountRecord.findMany({});
        return NextResponse.json(result,{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Records", original: (error as Error).message}, {status: 500});
    }

}

const FormAccountRecordSchema = z.object({
    id: z.string().optional(),
    accountId: z.string(),
    type: z.nativeEnum(RecordType).optional(),
    amount: z.coerce.number(),
    description: z.string().optional(),
    date: z.coerce.date().optional()
});

type AccountRecordFormValidate = z.infer<typeof FormAccountRecordSchema>
export async function POST(request: NextRequest){

    try {
        const data = await request.json();

        // Så prøv med ekte data
        console.log('Testing with real data...');
        const validation = FormAccountRecordSchema.safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: AccountRecordFormValidate = validation.data;
        const { accountId, type, amount, description, date } = validatedData;
        const result = await prisma.accountRecord.create({
            data: {
                accountId,
                type,
                amount,
                description,
                date: date || new Date()
            }
        });

        return NextResponse.json(result, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Could not create or update AccountRecord", original: (error as Error).message}, {status: 500});

    }

}