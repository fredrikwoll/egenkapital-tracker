import { describe, it, expect, beforeAll } from 'vitest'
import { prisma } from '@/lib/prisma'
import { GET, POST } from '@/app/api/records/route'
import { NextRequest } from 'next/server'
import { PATCH } from '@/app/api/records/[id]/route'
import { Account } from '@prisma/client'




describe('API Request: records', () => {
    let testAccount: Account;

    //Setting up a testAccount to test AccountRecords.
    beforeAll(async () => {
        testAccount = await prisma.account.create({
        data: { name: 'Test Account', type: 'SAVINGS' }});
    });

    it('Should return empty array when no records exist', async () => {
        const response = await GET();
        const data = await response.json();

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(0);
        expect(response.status).toBe(200);
    });

    it('Should return an array with records when records exist', async () => {

        await prisma.accountRecord.create({
            data: { accountId: testAccount.id, type: 'DEPOSIT', amount: 1250 }
        });

        const response = await GET();
        const data = await response.json();

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty('accountId', testAccount.id);
        expect(data[0]).toHaveProperty('type','DEPOSIT');
        expect(data[0]).toHaveProperty('amount', 1250);

    });

    it('Should create new account record with correct data', async () => {

        const postRequest = new NextRequest('http://localhost:3000/api/records', {
            method: 'POST',
            body: JSON.stringify({ accountId: testAccount.id, type: 'DEPOSIT', amount: 1500 }),
            headers: { 'Content-Type': 'application/json' }
        });

        const responseAccountRecord = await POST(postRequest);
        const createdAccountRecord = await responseAccountRecord.json();
        
        expect(responseAccountRecord.status).toBe(200);
        expect(createdAccountRecord).toHaveProperty('id');
        expect(createdAccountRecord).toHaveProperty('accountId', testAccount.id);
        expect(createdAccountRecord).toHaveProperty('type', 'DEPOSIT');
        expect(createdAccountRecord).toHaveProperty('amount', 1500);
        expect(createdAccountRecord).toHaveProperty('createdAt');

    })

    it('Should update existing account when id is provided', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/records', {
            method: 'POST',
            body: JSON.stringify({ accountId: testAccount.id, type: 'DEPOSIT', amount: 500 }),
            headers: { 'Content-Type': 'application/json' }
        });

        const responseCreate = await POST(postRequest);
        const createdAccountRecord = await responseCreate.json();
        const updateData = {
            id: createdAccountRecord.id,
            amount: 900
        };
        
        const postUpdateRequest = new NextRequest(`http://localhost:3000/api/records/test-account-id`, {
            method: 'PATCH',
            body: JSON.stringify(updateData),
            headers: { 'Content-Type': 'application/json' }
        });

        //Mock params for PATCH request.
        const mockParams = {
            params: Promise.resolve({ id: createdAccountRecord.id })
        };

        const responseUpdate = await PATCH(postUpdateRequest, mockParams);

        const updateAccountRecord = await responseUpdate.json();
        
        expect(responseUpdate.status).toBe(200);
        expect(updateAccountRecord).toHaveProperty('id', createdAccountRecord.id)
        expect(updateAccountRecord).toHaveProperty('accountId', testAccount.id);
        expect(updateAccountRecord).toHaveProperty('amount', 900);

    })

    it('Should return 400 when Amount is missing', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/records', {
            method: 'POST',
            body: JSON.stringify({ accountId: testAccount.id }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        expect(response.status).toBe(400);
    })

    it('Should return 400 when AccountId is missing', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/records', {
            method: 'POST',
            body: JSON.stringify({ amount: 1234 }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        expect(response.status).toBe(400);
    })

})