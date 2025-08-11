"use client";
import { Income, IncomeFrequency } from "@prisma/client";
import Spinner from "@/components/ui/Spinner";
import { useConfirmation } from "@/contexts/ConfirmationContext";
import { CreateIncomeData, EditIncomeData } from "@/schemas/income";
import { useCreateIncome, useDeleteIncome, useIncome, useUpdateIncome } from "../_hooks/useIncome";
import IncomeTable from "./IncomeTable";


type EditFormData = EditIncomeData & {
    id: string;
}

const IncomeList = ({ initialData }: { initialData: Income[] }) => {
    const { data: income, isFetching, error } = useIncome(initialData);
    const createMutation = useCreateIncome();
    const updateMutation = useUpdateIncome();
    const deleteMutation = useDeleteIncome();
    
    const { confirm } = useConfirmation();

    const handleOnSaveAdd = (data: CreateIncomeData) => {
        createMutation.mutate({
            name: data.name,
            frequency: data.frequency as IncomeFrequency,
            amount: Number(data.amount)
        });
    }

    const handleOnSaveEdit = (data: EditFormData) => {
        updateMutation.mutate({
            id: data.id,
            name: data.name,
            frequency: data.frequency as IncomeFrequency,
            amount: data.amount as number
        });
    }

    const handleOnDelete = async (incomeId: string) => {
        const confirmed = await confirm({
              title: "Delete Income",
              message: "Are you sure you want to delete this income? This action cannot be undone.",
              confirmText: "Delete",
              cancelText: "Cancel"
          });
        if (confirmed) {
            deleteMutation.mutate({ id: incomeId });
        }
    }


    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="space-y-4">
            <IncomeTable income={income} onSaveAdd={handleOnSaveAdd} onSaveEdit={handleOnSaveEdit} onDelete={handleOnDelete} />
            {isFetching && <Spinner />}
        </div>
    );
}

export default IncomeList;