"use server";
import { prisma } from "@/lib/prisma";
import { transformAmount } from "@/lib/utils";
import { DebtType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type AccountParams = {
    params: Promise<{ 
        id: string
    }>
}
const FormDebtSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    type: z.nativeEnum(DebtType),
    amount: z.coerce.number()
});


type DebtFormValidate = z.infer<typeof FormDebtSchema>;
type UpdateDebtFormValidate = Partial<DebtFormValidate>;
export async function DELETE(request: NextRequest, { params }: AccountParams){
    const { id } = await params;
    console.log(id);
    try {
        const result = await prisma.debt.delete({
            where: { id }
        });
        return NextResponse.json(result,{status: 200});
        
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Debt", original: (error as Error).message}, {status: 500});
    }
}




export async function GET(request: NextRequest, { params }: AccountParams){

    const { id } = await params;
    console.log('Looking for debt with id:', id); // ← Debug 1
    try {
       const result = await prisma.debt.findUnique({
            where: { id }
        });
        console.log('Found result:', result); // ← Debug 2

        if (!result) {
            return NextResponse.json({
                error: `Debt with id ${id} not found`
            }, { status: 404 }); // ← 404 for "not found"
        }

        return NextResponse.json(transformAmount(result),{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: `Could not fetch any Debt with id: ${id}`, original: (error as Error).message}, {status: 500});
    }

}


export async function PATCH(request: NextRequest, { params }: AccountParams){

    const { id } = await params;
    try {
        const data = await request.json();

        const validation = FormDebtSchema.partial().safeParse(data);

        if(!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, {status: 400});
        }
        const validatedData: UpdateDebtFormValidate = validation.data;

        const {name, type, amount} = validatedData;

        const result = await prisma.debt.update({
            where: { id },
            data: {
                name,
                type,
                amount
            }
        });

        return NextResponse.json(transformAmount(result), {status: 200});
    } catch (error) {
        return NextResponse.json({error: `Could create or update Debt with id: ${id}`, original: (error as Error).message}, {status: 500});

    }

}