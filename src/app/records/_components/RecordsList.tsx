"use client";
import { Account, AccountRecord, RecordType } from "@prisma/client";
import { useRecords, useCreateRecord, useUpdateRecord, useDeleteRecord } from "../_hooks/useRecords";
import RecordsTable from "./RecordsTable";
import Spinner from "@/components/ui/Spinner";
import { useConfirmation } from "@/contexts/ConfirmationContext";
import { CreateAccountData } from "@/schemas/account";


type EditFormData = {
    id: string;
    name: string;
    type: RecordType;
}

const RecordsList = ({ initialData, accountList }: { initialData: AccountRecord[], accountList: Account[] }) => {
    const { data: records, isFetching, error } = useRecords(initialData);
    const createMutation = useCreateRecord();
    const updateMutation = useUpdateRecord();
    const deleteMutation = useDeleteRecord();
    
    const { confirm } = useConfirmation();

    const handleOnSaveAdd = (data: CreateAccountData) => {
        createMutation.mutate({
            accountId: data.accountId,
            type: data.type as RecordType,
            amount: Number(data.amount),
            description: data.description
        });
    }

    const handleOnSaveEdit = (data: EditFormData) => {
        updateMutation.mutate({
            id: data.id,
            accountId: data.accountId,
            type: data.type as RecordType,
            amount: data.amount,
            description: data.description
        });
    }

    const handleOnDelete = async (recordId: string) => {
        const confirmed = await confirm({
              title: "Delete Record",
              message: "Are you sure you want to delete this record? This action cannot be undone.",
              confirmText: "Delete",
              cancelText: "Cancel"
          });
        if (confirmed) {
            deleteMutation.mutate({ id: recordId });
        }
    }


    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="space-y-4">
            <RecordsTable records={records} accountList={accountList} onSaveAdd={handleOnSaveAdd} onSaveEdit={handleOnSaveEdit} onDelete={handleOnDelete} />
            {isFetching && <Spinner />}
        </div>
    );
}

export default RecordsList;