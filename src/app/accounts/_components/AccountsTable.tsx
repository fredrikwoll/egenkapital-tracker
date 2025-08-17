"use client";

import CardRow from "@/components/ui/CardRow";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import TableHeader from "@/components/ui/tableHeader";
import TableRow, { type Column } from "@/components/ui/tableRow";
import { Account, AccountType } from "@prisma/client";
import CreateAccountForm from "./CreateAccountForm";
import { useAccountForms } from "../_hooks/useAccountsForm";
import EditAccountForm from "./EditAccountForm";
import { CreateAccountData, EditAccountData } from "@/schemas/account";
import { useFormatAmount } from "@/contexts/SettingsContext";

type AccountWithTotal = Account & {
    totalAmount: number
}

// Define your columns configuration (will be created dynamically to use formatAmount hook)
const createColumns = (formatAmount: (amount: number) => string): Column<AccountWithTotal>[] => [
    {
        key: 'name',
        className: 'flex-1'
    },
    {
        key: 'type',
        className: 'flex-1',
        transform: (value: unknown) => (value as AccountType).toLowerCase()
    },
    {
        key: 'totalAmount',
        className: 'flex-1',
        transform: (value: unknown) => formatAmount(value as number)
    }
];

type AccountsTableType = {
    accounts: AccountWithTotal[];
    onSaveAdd: (data: CreateAccountData) => void;
    onSaveEdit: (data: EditAccountData & {id: string}) => void;
    onDelete: (id: string) => void;
}

const AccountsTable = ({ accounts, onSaveAdd, onSaveEdit, onDelete }: AccountsTableType) => {
    const formatAmount = useFormatAmount();
    const columns = createColumns(formatAmount);
    
    const {
        showAddForm, createForm, handlers, expandedId
    } = useAccountForms({ onSaveAdd, onSaveEdit });



    return (
        <> {/* Header */}
            <PageHeader
                title="Accounts"
                description="This page is where you define and update all accounts you want to track"
                hasButton={true}
                handleClick={handlers.handleAddNew}
                buttonText="Add Account"
            />
            <div className="bg-border rounded-lg">

                {showAddForm && (
                    <CreateAccountForm
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
                    {accounts.map((account) => (
                        <div key={account.id}>
                            {/* Main Row */}
                            <div className="group hover:bg-gray-25 transition-colors cursor-pointer">
                                <TableRow
                                    columns={columns}
                                    data={account}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(account)
                                    }}
                                    handleDeleteButton={() => onDelete(account.id)}

                                />
                            </div>

                            {/* Edit Form */}
                            {expandedId === account.id && (
                                <EditAccountForm
                                    key={account.id}
                                    account={account}
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {accounts.map((account) => (
                        <div key={account.id}>
                            {/* Mobile Card */}
                            <div className="p-4 hover:bg-gray-25 transition-colors cursor-pointer" onClick={() => handlers.handleEdit(account)}>
                                <CardRow
                                    title={account.name}
                                    description={`${(account.totalAmount / 100).toFixed(2)} kr`}
                                    type={account.type}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(account)
                                    }}
                                    handleDeleteButton={() => onDelete(account.id)}
                                />
                            </div>
                            {/* Mobile Edit Form */}
                            {expandedId === account.id && (
                                <EditAccountForm
                                    key={account.id}
                                    account={account}
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                    isMobile={true}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {accounts.length === 0 && (
                    <EmptyState
                        title="No accounts yet"
                        actionLabel="Create your first account"
                        onAction={handlers.handleAddNew}
                    />
                )}
            </div></>);
}

export default AccountsTable;