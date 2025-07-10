import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/prisma'
import { GET, POST } from '@/app/api/income/route'
import { NextRequest } from 'next/server'
import { PATCH } from '@/app/api/income/[id]/route'




describe('API Request: income', () => {
    it('Should return empty array when no income exist', async () => {
        const response = await GET();
        const data = await response.json();

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(0);
        expect(response.status).toBe(200);
    });

    it('Should return an array with accounts when income exist', async () => {

        await prisma.income.create({
            data: { name: 'My income', amount: 25000 }
        });

        const response = await GET();
        const data = await response.json();

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty('name', 'My income');
        expect(data[0]).toHaveProperty('amount', 25000);

    });

    it('Should create new income entry with correct data', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/income', {
            method: 'POST',
            body: JSON.stringify({ name: 'My income', amount: 25000 }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        const createdIncome = await response.json();

        expect(response.status).toBe(200);
        expect(createdIncome).toHaveProperty('id');
        expect(createdIncome).toHaveProperty('name', 'My income');
        expect(createdIncome).toHaveProperty('amount', 25000);
        expect(createdIncome).toHaveProperty('createdAt');
        expect(createdIncome).toHaveProperty('updatedAt');


    })

    it('Should update existing income entry when id is provided', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/income', {
            method: 'POST',
            body: JSON.stringify({ amount: 25000 }),
            headers: { 'Content-Type': 'application/json' }
        });

        const responseCreate = await POST(postRequest);
        const createdIncome = await responseCreate.json();
        const updateData = {
            id: createdIncome.id,
            name: 'My income',
            amount: 22000
        };

        const postUpdateRequest = new NextRequest(`http://localhost:3000/api/income/test-account-id`, {
            method: 'PATCH',
            body: JSON.stringify(updateData),
            headers: { 'Content-Type': 'application/json' }
        });

        //Mock params for PATCH request.
        const mockParams = {
            params: Promise.resolve({ id: createdIncome.id })
        };

        const responseUpdate = await PATCH(postUpdateRequest, mockParams);

        const updateAccount = await responseUpdate.json();

        expect(responseUpdate.status).toBe(200);
        expect(updateAccount).toHaveProperty('name', 'My income');
        expect(updateAccount).toHaveProperty('amount', 22000);
        expect(updateAccount).not.toHaveProperty('updatedAt', createdIncome.updatedAt);

    })

    it('Should return 400 when Amount is missing', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/income', {
            method: 'POST',
            body: JSON.stringify({ }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        expect(response.status).toBe(400);
    })


})