"use client";
import { Account } from "@prisma/client";
import { useAccounts } from "../_hooks/useAccounts";
import AccountsTable from "./accountsTable";
import Spinner from "@/components/ui/Spinner";

const AccountsList = ({ initialData }: { initialData: Account[] }) => {
  const { data: accounts, isFetching, error } = useAccounts(initialData);

    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="space-y-4">
            <AccountsTable accounts={accounts}/>
            {isFetching && <Spinner />}
        </div>
    );
}

export default AccountsList;