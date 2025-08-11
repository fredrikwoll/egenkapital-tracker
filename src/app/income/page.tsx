
import { Debt, Income } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import IncomeList from './_components/IncomeList';


async function getData(): Promise<Income[]> {
    // Fetch data from your API here.
    const result = await prisma.income.findMany();

    return result as Income[];
}

export default async function IncomePage() {

    const data = await getData();

    return (
    <div className="p-6">
        {/* <h1 className="text-2xl font-bold mb-6">Accounts</h1> */}
        <IncomeList initialData={data} />
    </div>
    );
}