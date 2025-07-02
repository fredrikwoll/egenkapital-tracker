"use server";
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

type AccountRecordParams = {
    params: { 
        accountId: string
    }
}
export async function GET(request: NextRequest, { params }: AccountRecordParams){
    const { accountId } = await params;

    try {

        //Checking first if account exist
        const account = await prisma.account.findUnique({
            where: { id: accountId }
        });

        if(!account) {
            return NextResponse.json({error: "Account not found"}, {status: 404});
        }
        
        //Looking up records for accountId
        const records = await prisma.accountRecord.findMany({
            where: { accountId }
        });
        
        return NextResponse.json(records,{status: 200}) ;

    } catch (error) {
        return NextResponse.json({error: "Could not fetch Record", original: (error as Error).message}, {status: 500});
    }

}
