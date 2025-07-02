import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type AccountParams = {
    params: { 
        id: string
    }
}
export async function DELETE(request: NextRequest, { params }: AccountParams){
    const { id } = await params;

    try {
        const account = await prisma.account.delete({
            where: { id }
        });
        return NextResponse.json(account,{status: 200});
        
    } catch (error) {
        return NextResponse.json({error: "Could not fetch any Accounts", original: (error as Error).message}, {status: 500});
    }


}