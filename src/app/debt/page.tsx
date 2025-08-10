
import { Debt } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import DebtList from './_components/DebtList';


async function getData(): Promise<Debt[]> {
    // Fetch data from your API here.
    const result = await prisma.debt.findMany();

    return result as Debt[];
}

export default async function DebtPage() {

    const data = await getData();

    return (
    <div className="p-6">
        {/* <h1 className="text-2xl font-bold mb-6">Accounts</h1> */}
        <DebtList initialData={data} />
    </div>
    );
}