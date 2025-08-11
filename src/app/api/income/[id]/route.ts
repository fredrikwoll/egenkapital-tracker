"use server";
import { IncomeFrequency } from '@prisma/client';
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type AccountParams = {
    params: Promise<{ 
        id: string
    }>
}
const FormIncomeSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    frequency: z.nativeEnum(IncomeFrequency),
    amount: z.coerce.number()
});

type AccountFormValidate = z.infer<typeof FormIncomeSchema>

export async function DELETE(request: NextRequest, { params }: AccountParams){
    const { id } = await params;
    console.log(id);
    try {
        const result = await prisma.income.delete({
            where: { id }
        });
        return NextResponse.json(result,{status: 200});
        
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Incomes", original: (error as Error).message}, {status: 500});
    }
}




export async function GET(request: NextRequest, { params }: AccountParams){

    const { id } = await params;
    console.log('Looking for income with id:', id); // ← Debug 1
    try {
       const result = await prisma.income.findUnique({
            where: { id }
        });
        console.log('Found result:', result); // ← Debug 2

        if (!result) {
            return NextResponse.json({
                error: `Income with id ${id} not found`
            }, { status: 404 }); // ← 404 for "not found"
        }

        return NextResponse.json(result,{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: `Could not fetch any Income with id: ${id}`, original: (error as Error).message}, {status: 500});
    }

}


export async function PATCH(request: NextRequest, { params }: AccountParams){

    const { id } = await params;
    try {
        const data = await request.json();

        const validation = FormIncomeSchema.safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: AccountFormValidate = validation.data;

        const {name, amount} = validatedData;

        const result = await prisma.income.update({
            where: { id },
            data: {
                name,
                amount
            }
        });

        return NextResponse.json(result, {status: 200});
    } catch (error) {
        return NextResponse.json({error: `Could create or update Income with id: ${id}`, original: (error as Error).message}, {status: 500});

    }

}