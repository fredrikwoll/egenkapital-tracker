"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AccountType } from '@prisma/client';
import { z } from "zod";

type AccountParams = {
    params: Promise<{ 
        id: string
    }>
}
const FormAccountSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    type: z.nativeEnum(AccountType).optional()
});

type AccountFormValidate = z.infer<typeof FormAccountSchema>

export async function DELETE(request: NextRequest, { params }: AccountParams){
    const { id } = await params;
    console.log(id);
    try {
        const account = await prisma.account.delete({
            where: { id }
        });
        return NextResponse.json(account,{status: 200});
        
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Accounts", original: (error as Error).message}, {status: 500});
    }
}




export async function GET(request: NextRequest, { params }: AccountParams){

    const { id } = await params;
    console.log('Looking for account with id:', id); // ← Debug 1
    try {
       const result = await prisma.account.findUnique({
            where: { id }
        });
        console.log('Found result:', result); // ← Debug 2

        if (!result) {
            return NextResponse.json({
                error: `Account with id ${id} not found`
            }, { status: 404 }); // ← 404 for "not found"
        }

        const count = await prisma.accountRecord.aggregate({
            _sum: {
                amount: true
            },
            where: {
                accountId: id
            }
        });
        
        const updatedResult = {...result, totaltAmount: count._sum.amount}


        return NextResponse.json(updatedResult,{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: `Could not fetch any Account with id: ${id}`, original: (error as Error).message}, {status: 500});
    }

}


export async function PATCH(request: NextRequest, { params }: AccountParams){

    const { id } = await params;
    try {
        const data = await request.json();

        const validation = FormAccountSchema.safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: AccountFormValidate = validation.data;

        const accountUpdate = await prisma.account.update({
            where: { id },
            data: {
                ...(validatedData.name !== undefined && { name: validatedData.name }),
                ...(validatedData.type !== undefined && { type: validatedData.type })
            }
        });

        return NextResponse.json(accountUpdate, {status: 200});
    } catch (error) {
        return NextResponse.json({error: `Could create or update Account with id: ${id}`, original: (error as Error).message}, {status: 500});

    }

}