"use client";
import { Account, AccountRecord, RecordType } from "@prisma/client";
import { useRecords, useCreateRecord, useUpdateRecord, useDeleteRecord } from "../_hooks/useRecords";
import RecordsTable from "./RecordsTable";
import Spinner from "@/components/ui/Spinner";
import { useConfirmation } from "@/contexts/ConfirmationContext";
import { CreateRecordData } from "@/schemas/records";


type EditFormData = {
    id: string;
    accountId: string;
    type: RecordType;
    amount: number;
    description?: string;
    date: Date;
}

const RecordsList = ({ initialData, accountList }: { initialData: AccountRecord[], accountList: Account[] }) => {
    const { data: records, isFetching, error } = useRecords(initialData);
    const createMutation = useCreateRecord();
    const updateMutation = useUpdateRecord();
    const deleteMutation = useDeleteRecord();

    const { confirm } = useConfirmation();

    const handleOnSaveAdd = (data: CreateRecordData) => {
        createMutation.mutate({
            accountId: data.accountId,
            type: data.type as RecordType,
            amount: Number(data.amount) * 100,
            description: data.description
        });
    }

    const handleOnSaveEdit = (data: EditFormData) => {
        updateMutation.mutate({
            id: data.id,
            accountId: data.accountId,
            type: data.type as RecordType,
            amount: data.amount, // Already converted to øre in the form
            description: data.description || '',
            date: data.date
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