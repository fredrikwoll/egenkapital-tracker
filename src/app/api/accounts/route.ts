"use server";
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
import { createAccountSchema, CreateAccountData } from '@/schemas/account';


export async function GET() {

    try {

        const result = await prisma.account.findMany({});

        const count = await prisma.accountRecord.groupBy({
            by: ['accountId'],
            _sum: {
                amount: true
            },
        });

        const lookupMap = new Map();

        //setup lookup map for totalAmounts
        count.forEach(record => lookupMap.set(record.accountId, record._sum.amount));

        //Adding totalAmount to the array of accounts
        const updatedResult = await result.map(account => ({ ...account, totalAmount: lookupMap.get(account.id)?.toNumber() || 0 }));

        return NextResponse.json(updatedResult, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Could not fetch any Accounts", original: (error as Error).message }, { status: 500 });
    }

}

export async function POST(request: NextRequest) {

    try {

        const data = await request.json();

        const validation = createAccountSchema.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: validation.error.issues
            }, { status: 400 });
        }
        const validatedData: CreateAccountData = validation.data;

        const { name, type, initialAmount = 0 } = validatedData;

        const result = await prisma.account.create({
            data: {
                name: name,
                type: type!
            }
        });

        if (initialAmount > 0) {
            await prisma.accountRecord.create({
                data: {
                    accountId: result.id,
                    type: 'DEPOSIT',
                    amount: initialAmount,
                    description: 'Initial amount'
                }
            })
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log('Error caught:', error); // ← Debug 5
        return NextResponse.json({ error: "Could create or update Account", original: (error as Error).message }, { status: 500 });

    }

}