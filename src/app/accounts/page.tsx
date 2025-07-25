
import { Account } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import AccountsList from './_components/AccountsList';


async function getData(): Promise<Account[]> {
    // Fetch data from your API here.
    const result = await prisma.account.findMany();

    return result as Account[];
}

export default async function AccountsPage() {

    const data = await getData();

    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Accounts</h1>
        <AccountsList initialData={data} />
    </div>
    );
}