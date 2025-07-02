"use server";
import { prisma } from '@/lib/prisma'
import { AccountRecord } from '@prisma/client';
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

const FormAccountRecordScema = z.object({
    id: z.string().optional(),
    accountId: z.string(),
    amount: z.number()
});

type AccountRecordFormValidate = z.infer<typeof FormAccountRecordScema>
export async function POST(request: NextRequest){

    try {
        const data = await request.json();
        const validation = FormAccountRecordScema.safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: AccountRecordFormValidate = validation.data;
        const AccountRecord = await prisma.accountRecord.upsert({
            where: {id: validatedData.id || ''},
            update: {
                accountId: validatedData.accountId,
                amount: validatedData.amount
            },
            create: {
                accountId: validatedData.accountId,
                amount: validatedData.amount
            }
        });
        return NextResponse.json(AccountRecord, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Could not create or update Account", original: (error as Error).message}, {status: 500});

    }

}