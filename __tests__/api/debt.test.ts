import { describe, it, expect } from 'vitest'
import { prisma } from '../../test-setup'
import { GET, POST } from '@/app/api/debt/route'
import { NextRequest } from 'next/server'
import { PATCH } from '@/app/api/debt/[id]/route'

describe('API Request: Debt', () => {

    it('Should return an array with accounts when debt exist', async () => {

        await prisma.debt.create({
            data: { name: 'Test Debt', type: 'STUDENT_LOAN', amount: 50000 }
        });

        const response = await GET();
        const data = await response.json();

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty('name', 'Test Debt');

    });

    it('Should create new debt entry with correct data', async () => {



        const postRequest = new NextRequest('http://localhost:3000/api/debt', {
            method: 'POST',
            body: JSON.stringify({ name: 'Student Loan', type: 'STUDENT_LOAN', amount: 100000 }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        const createdAccount = await response.json();

        expect(response.status).toBe(200);
        expect(createdAccount).toHaveProperty('id');
        expect(createdAccount).toHaveProperty('name', 'Student Loan');
        expect(createdAccount).toHaveProperty('type', 'STUDENT_LOAN');
        expect(createdAccount).toHaveProperty('amount', 100000);
        expect(createdAccount).toHaveProperty('createdAt');
        expect(createdAccount).toHaveProperty('updatedAt');


    })

    it('Should update existing debt entry when id is provided', async () => {
    
        const createdDebt = await prisma.debt.create({
          data: { name: 'Test Debt', type: 'STUDENT_LOAN', amount: 50000 }
        });


        const UpdateRequest = new NextRequest(`http://localhost:3000/api/debt/test-account-id`, {
            method: 'PATCH',
            body: JSON.stringify({amount: 60000}),
            headers: { 'Content-Type': 'application/json' }
        });

        //Mock params for PATCH request.
        const mockParams = {
            params: Promise.resolve({ id: createdDebt.id })
        };

        const responseUpdate = await PATCH(UpdateRequest, mockParams);

        const updateAccount = await responseUpdate.json();

        expect(responseUpdate.status).toBe(200);
        expect(updateAccount).toHaveProperty('amount', 60000);
        expect(updateAccount).not.toHaveProperty('updatedAt', createdDebt.updatedAt);

    })

    it('Should return 400 when Name is missing', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/debt', {
            method: 'POST',
            body: JSON.stringify({ type: 'STUDENT_LOAN' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        expect(response.status).toBe(400);
    })

    it('Should return 400 when Type is invalid', async () => {
        const postRequest = new NextRequest('http://localhost:3000/api/debt', {
            method: 'POST',
            body: JSON.stringify({ name: 'Student Loan' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST(postRequest);
        expect(response.status).toBe(400);
    })

})