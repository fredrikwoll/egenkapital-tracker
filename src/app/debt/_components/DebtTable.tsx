"use client";

import CardRow from "@/components/ui/CardRow";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import TableHeader from "@/components/ui/tableHeader";
import TableRow, { type Column } from "@/components/ui/tableRow";
import { CreateDebtData, EditDebtData } from "@/schemas/debt";
import { Debt, DebtType } from "@prisma/client";
import CreateDebtForm from "./CreateDebtForm";
import EditDebtForm from "./EditDebtForm";
import { useDebtForms } from "../_hooks/useDebtForms";


// Define your columns configuration
const columns: Column<Debt>[] = [
    {
        key: 'name',
        className: 'flex-1'
    },
    {
        key: 'type',
        className: 'flex-1',
        transform: (value: unknown) => (value as DebtType).toLowerCase()
    },
    {
        key: 'amount',
        className: 'flex-1',
        transform: (value: unknown) => `${(value as number / 100).toFixed(2)} kr`
    }
];

type DebtTableType = {
    debts: Debt[];
    onSaveAdd: (data: CreateDebtData) => void;
    onSaveEdit: (data: EditDebtData & {id: string}) => void;
    onDelete: (id: string) => void;
}

const DebtTable = ({ debts, onSaveAdd, onSaveEdit, onDelete }: DebtTableType) => {
    
    const {
        showAddForm, createForm, handlers, expandedId
    } = useDebtForms({ onSaveAdd, onSaveEdit });


    if (!debts?.length) {
        return <div>No debts to display</div>;
    }

    return (
        <> {/* Header */}
            <PageHeader
                title="Debts"
                description="This page is where you define and update all debts you want to track"
                hasButton={true}
                handleClick={handlers.handleAddNew}
                buttonText="Add Debt"
            />
            <div className="bg-border rounded-lg">

                {showAddForm && (
                    <CreateDebtForm
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
                                { label: 'Type', className: 'flex-1' },
                                { label: 'Total Amount', className: 'flex-1' },
                                { label: 'Actions', className: 'flex items-center gap-4' },
                            ]}
                        />
                    </div>
                    {debts.map((debt) => (
                        <div key={debt.id}>
                            {/* Main Row */}
                            <div className="group hover:bg-gray-25 transition-colors cursor-pointer">
                                <TableRow
                                    columns={columns}
                                    data={debt}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(debt)
                                    }}
                                    handleDeleteButton={() => onDelete(debt.id)}

                                />
                            </div>

                            {/* Edit Form */}
                            {expandedId === debt.id && (
                                <EditDebtForm
                                    key={debt.id}
                                    debt={debt}
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {debts.map((debt) => (
                        <div key={debt.id}>
                            {/* Mobile Card */}
                            <div className="p-4 hover:bg-gray-25 transition-colors cursor-pointer" onClick={() => handlers.handleEdit(account)}>
                                <CardRow
                                    title={debt.name}
                                    description={`${(debt.amount / 100).toFixed(2)} kr`}
                                    type={debt.type}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(debt)
                                    }}
                                    handleDeleteButton={() => onDelete(debt.id)}
                                />
                            </div>
                            {/* Mobile Edit Form */}
                            {expandedId === debt.id && (
                                <EditDebtForm
                                    key={debt.id}
                                    debt={debt}
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                    isMobile={true}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {debts.length === 0 && (
                    <EmptyState
                        title="No debts yet"
                        actionLabel="Create your first debt"
                        onAction={handlers.handleAddNew}
                    />
                )}
            </div></>);
}

export default DebtTable;