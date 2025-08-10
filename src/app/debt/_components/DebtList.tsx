"use client";
import { Debt, DebtType } from "@prisma/client";
import Spinner from "@/components/ui/Spinner";
import { useConfirmation } from "@/contexts/ConfirmationContext";
import { useCreateDebt, useDebts, useDeleteDebt, useUpdateDebt } from "../_hooks/useDebts";
import { CreateDebtData, EditDebtData } from "@/schemas/debt";
import DebtTable from "./DebtTable";


type EditFormData = EditDebtData & {
    id: string;
}

const DebtList = ({ initialData }: { initialData: Debt[] }) => {
    const { data: debts, isFetching, error } = useDebts(initialData);
    const createMutation = useCreateDebt();
    const updateMutation = useUpdateDebt();
    const deleteMutation = useDeleteDebt();
    
    const { confirm } = useConfirmation();

    const handleOnSaveAdd = (data: CreateDebtData) => {
        createMutation.mutate({
            name: data.name,
            type: data.type as DebtType,
            amount: Number(data.amount)
        });
    }

    const handleOnSaveEdit = (data: EditFormData) => {
        updateMutation.mutate({
            id: data.id,
            name: data.name,
            type: data.type as DebtType,
            amount: data.amount as number
        });
    }

    const handleOnDelete = async (debtId: string) => {
        const confirmed = await confirm({
              title: "Delete Debt",
              message: "Are you sure you want to delete this debt? This action cannot be undone.",
              confirmText: "Delete",
              cancelText: "Cancel"
          });
        if (confirmed) {
            deleteMutation.mutate({ id: debtId });
        }
    }


    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="space-y-4">
            <DebtTable debts={debts} onSaveAdd={handleOnSaveAdd} onSaveEdit={handleOnSaveEdit} onDelete={handleOnDelete} />
            {isFetching && <Spinner />}
        </div>
    );
}

export default DebtList;