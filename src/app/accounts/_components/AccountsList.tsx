"use client";
import { Account, AccountType } from "@prisma/client";
import { useAccounts, useCreateAccount, useDeleteAccount, useUpdateAccount } from "../_hooks/useAccounts";
import AccountsTable from "./accountsTable";
import Spinner from "@/components/ui/Spinner";
import { useConfirmation } from "@/contexts/ConfirmationContext";
import { CreateAccountData } from "@/schemas/account";


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
    
    const { confirm } = useConfirmation();

    const handleOnSaveAdd = (data: CreateAccountData) => {
        createMutation.mutate({
            name: data.name,
            type: data.type as AccountType,
            initialAmount: Number(data.initialAmount)
        });
    }

    const handleOnSaveEdit = (data: EditFormData) => {
        updateMutation.mutate({
            id: data.id,
            name: data.name,
            type: data.type as AccountType
        });
    }

    const handleOnDelete = async (accountId: string) => {
        const confirmed = await confirm({
              title: "Delete Account",
              message: "Are you sure you want to delete this account? This action cannot be undone.",
              confirmText: "Delete",
              cancelText: "Cancel"
          });
        if (confirmed) {
            deleteMutation.mutate({ id: accountId });
        }
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