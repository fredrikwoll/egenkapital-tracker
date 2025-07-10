"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { RecordType } from '@prisma/client';
import { z } from "zod";
import { transformAmount } from "@/lib/utils";

type AccountRecordParams = {
    params: Promise<{ 
        id: string
    }>
}
const FormAccountRecordSchema = z.object({
    id: z.string().optional(),
    accountId: z.string(),
    type: z.nativeEnum(RecordType).optional(),
    amount: z.coerce.number(),
    description: z.string().optional()
});

type CreateAccountRecordFormValidate = z.infer<typeof FormAccountRecordSchema>;
type UpdateAccountFormValidate = Partial<CreateAccountRecordFormValidate>;

export async function DELETE(request: NextRequest, { params }: AccountRecordParams){
    const { id } = await params;
    console.log(id);
    try {
        const result = await prisma.accountRecord.delete({
            where: { id }
        });
        return NextResponse.json(transformAmount(result),{status: 200});
        
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Account Records", original: (error as Error).message}, {status: 500});
    }
}




export async function GET(request: NextRequest, { params }: AccountRecordParams){

    const { id } = await params;
    console.log('Looking for account with id:', id); // ← Debug 1
    try {
        const result = await prisma.accountRecord.findUnique({
            where: { id }
        });
        console.log('Found result:', result); // ← Debug 2

        if (!result) {
            return NextResponse.json({
                error: `Account Record with id ${id} not found`
            }, { status: 404 }); // ← 404 for "not found"
        }

        return NextResponse.json(transformAmount(result),{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: `Could not fetch any Account Record with id: ${id}`, original: (error as Error).message}, {status: 500});
    }

}


export async function PATCH(request: NextRequest, { params }: AccountRecordParams){

    const { id } = await params;
    try {
        const data = await request.json();

        const validation = FormAccountRecordSchema.partial().safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: UpdateAccountFormValidate = validation.data;

        const {accountId, type, amount, description} = validatedData;

        const result = await prisma.accountRecord.update({
            where: { id },
            data: {
                accountId,
                type,
                amount,
                ...(description !== undefined && { description: description })
            }
        });

        return NextResponse.json(transformAmount(result), {status: 200});
    } catch (error) {
        return NextResponse.json({error: `Could create or update Account Record with id: ${id}`, original: (error as Error).message}, {status: 500});

    }

}