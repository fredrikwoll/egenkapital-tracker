import { describe, it, expect } from 'vitest'
import { GET, POST } from '@/app/api/accounts/route'
import { NextRequest } from 'next/server'
import { PATCH } from '@/app/api/accounts/[id]/route'
import { prisma } from '../../test-setup'




describe('API Request: Accounts', () => {

    it('Should return an array with accounts when accounts exist', async () => {

        await prisma.account.create({
            data: { name: 'Test Account', type: 'SAVINGS' }
        });

        const response = await GET();
        const data = await response.json();

        expect(data).toBeInstanceOf(Array);
        expect(data.length).toBeGreaterThanOrEqual(1);
        expect(data.some((account: {name: string}) => account.name === 'Test Account')).toBe(true);

        expect(data[0]).toHaveProperty('name', 'Test Account');

    });

    it('Should create new account with correct data', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/accounts', {
            method: 'POST',
            body: JSON.stringify({ name: 'Test Account', type: 'SAVINGS' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        const createdAccount = await response.json();

        expect(response.status).toBe(200);
        expect(createdAccount).toHaveProperty('id');
        expect(createdAccount).toHaveProperty('name', 'Test Account');
        expect(createdAccount).toHaveProperty('type', 'SAVINGS');
        expect(createdAccount).toHaveProperty('createdAt');
        expect(createdAccount).toHaveProperty('updatedAt');


    })

    it('Should update existing account when id is provided', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/accounts', {
            method: 'POST',
            body: JSON.stringify({ name: 'Test Account', type: 'SAVINGS' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const responseCreate = await POST(postRequest);
        const createdAccount = await responseCreate.json();
        const updateData = {
            id: createdAccount.id,
            name: 'New Test Account'
        };

        const postUpdateRequest = new NextRequest(`http://localhost:3000/api/accounts/test-account-id`, {
            method: 'PATCH',
            body: JSON.stringify(updateData),
            headers: { 'Content-Type': 'application/json' }
        });

        //Mock params for PATCH request.
        const mockParams = {
            params: Promise.resolve({ id: createdAccount.id })
        };

        const responseUpdate = await PATCH(postUpdateRequest, mockParams);

        const updateAccount = await responseUpdate.json();
        
        // Verifiser at account faktisk eksisterer i database
        const checkAccount = await prisma.account.findUnique({
            where: { id: createdAccount.id }
        });
        console.log('Account exists in DB:', checkAccount); // ← Debug


        expect(responseUpdate.status).toBe(200);
        expect(updateAccount).toHaveProperty('name', 'New Test Account');
        expect(updateAccount).not.toHaveProperty('updatedAt', createdAccount.updatedAt);

    })

    it('Should return 400 when Name is missing', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/accounts', {
            method: 'POST',
            body: JSON.stringify({ type: 'SAVINGS' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        expect(response.status).toBe(400);
    })

    it('Should return 400 when Type is invalid', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/accounts', {
            method: 'POST',
            body: JSON.stringify({ name: 'Test Account' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        expect(response.status).toBe(400);
    })

})