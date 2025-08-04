import { string } from "zod/v4-mini";

// For Client Components - HTTP requests
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function fetchRecords() {
    const response = await fetch(`${baseUrl}/api/records`);

    if(!response.ok) {
        throw new Error(`Failed to fetch records: ${response.status}`)
    }

    return response.json();
}


export async function createRecord(data: {accountId: string, type: string, amount: number, description: string}){
    const response = await fetch(`${baseUrl}/api/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(!response.ok) {
        throw new Error("Failed to create record");
    }

    return response.json();
}


export async function updateRecord(data: {id: string, accountId: string, type: string, amount: number, description: string}){
    const response = await fetch(`${baseUrl}/api/records`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: data.id,
            accountId: data.accountId,
            type: data.type,
            amount: data.amount,
            description: data.description
        })
    });

    if(!response.ok) {
        throw new Error('Failed to update record')
    }

    return response.json();
}


export async function deleteRecord(data: {id: string}) {
    const response = await fetch(`${baseUrl}/api/records/${data.id}`, {
        method: 'DELETE'
    });

    if(!response.ok) {
        throw new Error('Failed to delete record');
    }

    return response.json();
}