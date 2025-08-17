"use client";

import CardRow from "@/components/ui/CardRow";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import TableHeader from "@/components/ui/tableHeader";
import TableRow, { type Column } from "@/components/ui/tableRow";
import { CreateIncomeData, EditIncomeData } from "@/schemas/income";
import { Income, IncomeFrequency } from "@prisma/client";
import { useIncomeForms } from "../_hooks/useIncomeForms";
import CreateIncomeForm from "./CreateIncomeForm";
import EditIncomeForm from "./EditIncomeForm";
import { useFormatAmount } from "@/contexts/SettingsContext";




// Define your columns configuration (will be created dynamically to use formatAmount hook)
const createColumns = (formatAmount: (amount: number) => string): Column<Income>[] => [
    {
        key: 'name',
        className: 'flex-1'
    },
    {
        key: 'frequency',
        className: 'flex-1',
        transform: (value: unknown) => (value as IncomeFrequency).toLowerCase()
    },
    {
        key: 'amount',
        className: 'flex-1',
        transform: (value: unknown) => formatAmount(value as number)
    }
];

type IncomeTableType = {
    income: Income[];
    onSaveAdd: (data: CreateIncomeData) => void;
    onSaveEdit: (data: EditIncomeData & {id: string}) => void;
    onDelete: (id: string) => void;
}

const IncomeTable = ({ income, onSaveAdd, onSaveEdit, onDelete }: IncomeTableType) => {
    const formatAmount = useFormatAmount();
    const columns = createColumns(formatAmount);
    
    const {
        showAddForm, createForm, handlers, expandedId
    } = useIncomeForms({ onSaveAdd, onSaveEdit });



    return (
        <> {/* Header */}
            <PageHeader
                title="Income"
                description="This page is where you define and update all income you want to track"
                hasButton={true}
                handleClick={handlers.handleAddNew}
                buttonText="Add Income"
            />
            <div className="bg-border rounded-lg">

                {showAddForm && (
                    <CreateIncomeForm
                        onSubmit={handlers.onSubmit}
                        onCancel={handlers.handleCancelAddNew}
                        form={createForm}
                    />
                )}

                {/* Desktop Table View */}
                <div className="hidden md:block divide-y divide-gray-50">
                    <div className="group hover:bg-gray-25 transition-colors cursor-pointer">
                        <TableHeader
                            headers={[
                                { label: 'Name', className: 'flex-1' },
                                { label: 'Frequency', className: 'flex-1' },
                                { label: 'Amount', className: 'flex-1' },
                                { label: 'Actions', className: 'flex items-center gap-4' },
                            ]}
                        />
                    </div>
                    {income.map((incomeSource) => (
                        <div key={incomeSource.id}>
                            {/* Main Row */}
                            <div className="group hover:bg-gray-25 transition-colors cursor-pointer">
                                <TableRow
                                    columns={columns}
                                    data={incomeSource}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(incomeSource)
                                    }}
                                    handleDeleteButton={() => onDelete(incomeSource.id)}

                                />
                            </div>

                            {/* Edit Form */}
                            {expandedId === incomeSource.id && (
                                <EditIncomeForm
                                    key={incomeSource.id}
                                    income={incomeSource}
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {income.map((incomeSource) => (
                        <div key={incomeSource.id}>
                            {/* Mobile Card */}
                            <div className="p-4 hover:bg-gray-25 transition-colors cursor-pointer" onClick={() => handlers.handleEdit(incomeSource)}>
                                <CardRow
                                    title={incomeSource.name}
                                    description={`${(incomeSource.amount / 100).toFixed(2)} kr`}
                                    type={incomeSource.frequency}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(incomeSource)
                                    }}
                                    handleDeleteButton={() => onDelete(incomeSource.id)}
                                />
                            </div>
                            {/* Mobile Edit Form */}
                            {expandedId === incomeSource.id && (
                                <EditIncomeForm
                                    key={incomeSource.id}
                                    income={incomeSource}
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                    isMobile={true}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {income.length === 0 && (
                    <EmptyState
                        title="No income yet"
                        actionLabel="Create your first income"
                        onAction={handlers.handleAddNew}
                    />
                )}
            </div></>);
}

export default IncomeTable;