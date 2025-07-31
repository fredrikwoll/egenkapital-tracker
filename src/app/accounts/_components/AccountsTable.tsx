"use client";

import Input from "@/components/forms/Input";
import Label from "@/components/forms/Label";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import CardRow from "@/components/ui/CardRow";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import TableHeader from "@/components/ui/tableHeader";
import TableRow, { type Column } from "@/components/ui/tableRow";
import { Account, AccountType } from "@prisma/client";
import { useState } from "react";
import FormField from "@/components/forms/FormField";
import DisplayField from "@/components/forms/DisplayField";

type AccountWithTotal = Account & {
    totalAmount: number
}

// Define your columns configuration
const columns: Column<AccountWithTotal>[] = [
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
        transform: (value: unknown) => `${value} kr`
    }
];

type AccountsTableType = {
    accounts: AccountWithTotal[];
    onSaveAdd: (data: unknown) => void;
    onSaveEdit: (data: unknown) => void;
    onDelete: (id: string) => void;
}

const AccountsTable = ({ accounts, onSaveAdd, onSaveEdit, onDelete }: AccountsTableType) => {
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [editFormData, setEditFormData] = useState({ name: '', type: 'SAVINGS' })
    const [addFormData, setAddFormData] = useState({ name: '', type: '', amount: 0 })

    const handleEdit = (account: AccountWithTotal) => {
        if (expandedId === account.id) {
            setExpandedId(null)
        } else {
            setShowAddForm(false)
            setExpandedId(account.id)
            setEditFormData({
                name: account.name,
                type: account.type
            })
        }
    }

    const handleAddNew = () => {
        setExpandedId(null)
        setShowAddForm(!showAddForm)
        if (!showAddForm) {
            setAddFormData({ name: '', type: '', amount: 0 })
        }
    }

    const handleSaveEdit = () => {
        console.log('Saving edit:', { id: expandedId, ...editFormData })
        onSaveEdit({ id: expandedId, ...editFormData });
        setExpandedId(null)
    }

    const handleSaveAdd = () => {
        console.log('Creating new account:', addFormData)
        setShowAddForm(false)
        onSaveAdd(addFormData);
        setAddFormData({ name: '', type: '', amount: 0 })
    }

    const handleCancelEdit = () => {
        setExpandedId(null)
    }

    const handleCancelAdd = () => {
        setShowAddForm(false)
        setAddFormData({ name: '', type: '', amount: 0 })
    }

    if (!accounts?.length) {
        return <div>No accounts to display</div>;
    }

    return (
        <> {/* Header */}
            <PageHeader
                title="Accounts"
                description="This page is where you define and update all accounts you want to track"
                hasButton={true}
                handleClick={handleAddNew}
                buttonText="Add Account"
            />
            <div className="bg-border rounded-lg">
                {/* Add New Form */}
                {showAddForm && (
                    <div className="bg-card">
                        <div className="px-4 md:px-6 py-4">
                            <SectionHeader title="Create New Account" />
                            <div className="max-w-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField label="Account Name" required={true}>
                                        <Input
                                            name="account_name"
                                            type="text"
                                            value={addFormData.name}
                                            handleChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                                            placeholder="e.g. Emergency Fund"
                                        />
                                    </FormField>

                                    <FormField label="Account Type" required={true}>
                                        <Select
                                            name="account_type"
                                            value={addFormData.type}
                                            options={[
                                                { name: 'Savings', value: 'SAVINGS' },
                                                { name: 'Checking', value: 'CHECKING' },
                                                { name: 'Investment', value: 'INVESTMENT' }
                                            ]}
                                            handleChange={(e) => setAddFormData({ ...addFormData, type: e.target.value })}
                                        />
                                    </FormField>

                                    <FormField label="Inital Amount">
                                        <div className="relative">
                                            <Input
                                                name="account_inital"
                                                type="number"
                                                value={addFormData.amount}
                                                handleChange={(e) => setAddFormData({ ...addFormData, amount: e.target.value })}
                                                placeholder="0"
                                            />
                                            <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                                        </div>
                                    </FormField>
                                </div>

                                <ButtonGroup>
                                    <Button name="Create Account" type="primary" handleClick={handleSaveAdd} isDisabled={!addFormData.name.trim()} />
                                    <Button name="Cancel" type="outline" handleClick={handleCancelAdd} />
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
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

                            <div
                                className="group hover:bg-gray-25 transition-colors cursor-pointer"
                                onClick={() => handleEdit(account)}
                            >
                                <TableRow
                                    columns={columns}
                                    data={account}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handleEdit(account)
                                    }}
                                    handleDeleteButton={(e) => {
                                        e.stopPropagation()
                                        onDelete(account.id);
                                    }}
                                />
                            </div>

                            {/* Edit Form */}
                            {expandedId === account.id && (
                                <div className="bg-card border-t border-gray-100 px-6 py-4 animate-in slide-in-from-top-2 duration-200">
                                    <div className="max-w-2xl">
                                        <SectionHeader title="Edit Account" size="h4" variant="edit" />
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <FormField label="Account Name">
                                                <Input
                                                    name="account_name"
                                                    type="text"
                                                    value={editFormData.name}
                                                    handleChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                                    placeholder="Enter account name"
                                                />
                                            </FormField>
                                            <FormField label="Account Type">
                                                <Select
                                                    name="account_type"
                                                    value={editFormData.type}
                                                    options={[
                                                        { name: 'Savings', value: 'SAVINGS' },
                                                        { name: 'Checking', value: 'CHECKING' },
                                                        { name: 'Investment', value: 'INVESTMENT' }
                                                    ]}
                                                    handleChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                                                />
                                            </FormField>
                                            <DisplayField
                                                label="Total Amount"
                                                value={account.totalAmount}
                                                suffix="kr"
                                            />
                                        </div>
                                        <ButtonGroup>
                                            <Button handleClick={handleSaveEdit} name="Save Changes" />
                                            <Button handleClick={handleCancelEdit} name="Cancel" type="outline" />
                                        </ButtonGroup>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {accounts.map((account) => (
                        <div key={account.id}>
                            {/* Mobile Card */}
                            <div className="p-4 hover:bg-gray-25 transition-colors cursor-pointer" onClick={() => handleEdit(account)}>
                                <CardRow
                                    title={account.name}
                                    description={`${account.totalAmount} kr`}
                                    type={account.type}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handleEdit(account)
                                    }}
                                    handleDeleteButton={(e) => {
                                        e.stopPropagation()
                                        onDelete(account.id);
                                    }}
                                />
                            </div>

                            {/* Mobile Edit Form */}
                            {expandedId === account.id && (
                                <div className="bg-card border-t border-gray-100 px-4 py-4">
                                    <SectionHeader title="Edit Account" size="h4" variant="edit" />
                                    <div className="space-y-4">
                                        <FormField label="Account Name">
                                            {/* <label className="block text-xs font-medium text-text-primary mb-2">Account Name</label> */}
                                            <Input
                                                name="account_name"
                                                type="text"
                                                value={editFormData.name}
                                                handleChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                                placeholder="Enter account name"
                                            />
                                        </FormField>
                                        <FormField label="Account Type">
                                            <Select
                                                name="account_type"
                                                value={editFormData.type}
                                                options={[
                                                    { name: 'Savings', value: 'SAVINGS' },
                                                    { name: 'Checking', value: 'CHECKING' },
                                                    { name: 'Investment', value: 'INVESTMENT' }
                                                ]}
                                                handleChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                                            />
                                        </FormField>
                                        <DisplayField
                                            label="Total Amount"
                                            value={account.totalAmount}
                                            suffix="kr"
                                        />
                                    </div>
                                    <ButtonGroup direction="column">
                                        <Button handleClick={handleSaveEdit} name="Save Changes" />
                                        <Button handleClick={handleCancelEdit} name="Cancel" type="outline" />
                                    </ButtonGroup>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {accounts.length === 0 && (
                    <EmptyState
                        title="No accounts yet"
                        actionLabel="Create your first account"
                        onAction={handleAddNew}
                    />
                )}
            </div></>);
}

export default AccountsTable;