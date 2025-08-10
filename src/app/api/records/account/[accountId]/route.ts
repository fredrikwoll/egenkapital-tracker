"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type AccountRecordParams = {
    params: Promise<{ 
        accountId: string
    }>
}

export async function GET(request: NextRequest, { params }: AccountRecordParams){

    const { accountId } = await params;
    console.log('Looking for account with accountId:', accountId); // ← Debug 1
    try {
        const result = await prisma.accountRecord.findMany({
            where: { accountId }
        });
        console.log('Found result:', result); // ← Debug 2

        if (!result) {
            return NextResponse.json({
                error: `Account Record with accountId ${accountId} not found`
            }, { status: 404 }); // ← 404 for "not found"
        }

        return NextResponse.json(result,{status: 200}) ;
    } catch (error) {
        return NextResponse.json({error: `Could not fetch any Account Record with accountId: ${accountId}`, original: (error as Error).message}, {status: 500});
    }

}