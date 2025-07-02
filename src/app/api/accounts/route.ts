"use server";
import { prisma } from '@/lib/prisma'
import { AccountType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

export async function GET(){

    try {
        const result = await prisma.account.findMany({});
        return NextResponse.json(result,{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Accounts", original: (error as Error).message}, {status: 500});
    }

}

const FormAccountScema = z.object({
    id: z.string().optional(),
    name: z.string(),
    type: z.nativeEnum(AccountType)
});

type AccountFormValidate = z.infer<typeof FormAccountScema>
export async function POST(request: NextRequest){

    try {
        const data = await request.json();
        const ValidatedData = FormAccountScema.parse(data);
        const AccountUpsert = await prisma.account.upsert({
            where: {id: ValidatedData.id || ''},
            update: {
                name: ValidatedData.name,
                type: ValidatedData.type
            },
            create: {
                name: ValidatedData.name,
                type: ValidatedData.type
            }
        });
        return NextResponse.json(AccountUpsert, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Could create or update Account", original: (error as Error).message}, {status: 500});

    }

}