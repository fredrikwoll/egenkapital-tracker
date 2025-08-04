// For Client Components - HTTP requests
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

import { Account } from "@prisma/client";

export async function fetchAccountList() {
    const response = await fetch(`${baseUrl}/api/accounts`);

    if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.status}`);
    }

    const accounts: Account[] = await response.json();

    return accounts.map((account: Account) => ({
        id: account.id,
        name: account.name
    }));

}