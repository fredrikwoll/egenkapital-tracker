import { prisma } from '@/lib/prisma'
import SettingsOverview from './_components/SettingsOverview'

async function getData() {
    // Get first settings record, create default if none exists
    let settings = await prisma.settings.findFirst();
    
    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                currency: "NOK",
                dateFormat: "DD/MM/YYYY",
                numberFormat: "1 234,56",
                currencyDisplay: "symbol"
            }
        });
    }

    return settings;
}

export default async function SettingsPage() {
    const data = await getData();

    return(
    <div className="p-6">
        {/* <h1 className="text-2xl font-bold mb-6">Accounts</h1> */}
        <SettingsOverview initialData={data} />
    </div>)
}