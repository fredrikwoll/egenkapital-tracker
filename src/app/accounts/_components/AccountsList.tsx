"use client";
import { Account, AccountType } from "@prisma/client";
import { useAccounts, useCreateAccount, useDeleteAccount, useUpdateAccount } from "../_hooks/useAccounts";
import AccountsTable from "./accountsTable";
import Spinner from "@/components/ui/Spinner";

type AddFormData = {
    name: string;
    type: AccountType;
    amount: number;
}

type EditFormData = {
    id: string;
    name: string;
    type: AccountType;
}

const AccountsList = ({ initialData }: { initialData: Account[] }) => {
    const { data: accounts, isFetching, error } = useAccounts(initialData);
    const createMutation = useCreateAccount();
    const updateMutation = useUpdateAccount();
    const deleteMutation = useDeleteAccount();

    const handleOnSaveAdd = (data: AddFormData) => {
        createMutation.mutate({
            name: data.name,
            type: data.type as AccountType,
            initialAmount: Number(data.amount)
        });
    }

    const handleOnSaveEdit = (data: EditFormData) => {
        updateMutation.mutate({
            id: data.id,
            name: data.name,
            type: data.type as AccountType
        });
    }

    const handleOnDelete = (accountId: string) => {
        deleteMutation.mutate({ id: accountId });
    }


    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="space-y-4">
            <AccountsTable accounts={accounts} onSaveAdd={handleOnSaveAdd} onSaveEdit={handleOnSaveEdit} onDelete={handleOnDelete} />
            {isFetching && <Spinner />}
        </div>
    );
}

export default AccountsList;