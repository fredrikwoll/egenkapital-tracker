
import { Account, AccountRecord } from '@prisma/client';
import RecordsList from './_components/RecordsList'
import { prisma } from '@/lib/prisma';


async function getData(): Promise<AccountRecord[]> {
    // Fetch data from your API here.
    const result = await prisma.accountRecord.findMany();

    return result as AccountRecord[];
}

async function getDataList(): Promise<AccountRecord[]> {
    // Fetch data from your API here.
    const result = await prisma.accountRecord.findMany();

    return result as AccountRecord[];
}

export default async function RecordsPage() {

    const data = await getData();
    const dataList = await getDataList();

    return (
    <div className="p-6">
        {/* <h1 className="text-2xl font-bold mb-6">Accounts</h1> */}
        <RecordsList initialData={data} accountList={dataList}/>
    </div>
    );
}