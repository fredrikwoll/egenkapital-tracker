"use client";

import Input from "@/components/forms/Input";
import Label from "@/components/forms/Label";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import TableHeader from "@/components/ui/tableHeader";
import TableRow, { Column } from "@/components/ui/tableRow";
import Title from "@/components/ui/Title";
import { Account, AccountType } from "@prisma/client";
import { useState } from "react";

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
    transform: (value: AccountType) => value.toLowerCase()
  },
  {
    key: 'totalAmount',
    className: 'flex-1',
    transform: (value: number) => `${value} kr`
  }
];


const AccountsTable = ({ accounts }: { accounts: AccountWithTotal[] }) => {
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
        console.log('Saving edit:', editFormData)
        setExpandedId(null)
    }

    const handleSaveAdd = () => {
        console.log('Creating new account:', addFormData)
        setShowAddForm(false)
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
                    <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <Title text="Create New Account" size="h3"/>
                    </div>
                    
                    <div className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                        <Label name="Account Name *" />
                        <Input
                            name="account_name"
                            type="text"
                            value={addFormData.name}
                            handleChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                            placeholder="e.g. Emergency Fund"
                        />
                        </div>

                        <div>
                        <Label name="Account Type" />
                        <Select
                                name="account_type"
                                value={addFormData.type}
                                options={[
                                    {name: 'Savings', value: 'SAVINGS'},
                                    {name: 'Checking', value: 'CHECKING'},
                                    {name: 'Investment', value: 'INVESTMENT'}
                                ]}
                                handleChange={(e) => setAddFormData({ ...addFormData, type: e.target.value })}
                            
                        />
                        </div>

                        <div>
                        <Label name="Inital Amount" />
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
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                        <Button name="Create Account" type="primary" handleClick={handleSaveAdd} isDisabled={!addFormData.name.trim()}/>
                        <Button name="Cancel" type="outline" handleClick={handleCancelAdd} />
                    </div>
                    </div>
                </div>
                </div>
            )}


            {/* Desktop Table View */}
            <div className="hidden md:block divide-y divide-gray-50">
                <div className="group hover:bg-gray-25 transition-colors cursor-pointer">
                    <TableHeader 
                        headers={[
                            {label: 'Name', className: 'flex-1'},
                            {label: 'Type', className: 'flex-1'},
                            {label: 'Total Amount', className: 'flex-1'},
                            {label: 'Actions', className: 'flex items-center gap-4'},
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
                            <TableRow columns={columns} data={account} />
                        </div>

                        {/* Edit Form */}
                        {expandedId === account.id && (
                            <div className="bg-card border-t border-gray-100 px-6 py-4 animate-in slide-in-from-top-2 duration-200">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <Title text="Edit Account" size="h4"/>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label name="Account Name" />
                                            <Input
                                                name="account_name"
                                                type="text"
                                                value={editFormData.name}
                                                handleChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                                placeholder="Enter account name"
                                            />
                                        </div>

                                        <div>
                                            <Label name="Account Type" />
                                            <Select
                                                name="account_type"
                                                value={editFormData.type}
                                                options={[
                                                    {name: 'Savings', value: 'SAVINGS'},
                                                    {name: 'Checking', value: 'CHECKING'},
                                                    {name: 'Investment', value: 'INVESTMENT'}
                                                ]}
                                                handleChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                                            />                         
                                        </div>

                                        <div>
                                            <Label name="Total Amount" />
                                            <div className="relative">
                                                <span className="w-full px-3 py-2">{account.totalAmount}kr</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-6">
                                        <Button handleClick={handleSaveEdit} name="Save Changes" />
                                        <Button handleClick={handleCancelEdit} name="Cancel" type="outline"/>
                                    </div>
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
                    <div 
                    className="p-4 hover:bg-gray-25 transition-colors cursor-pointer"
                    onClick={() => handleEdit(account)}
                    >
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                        <Title text={account.name} size="h3" />
                        <div className="mt-1 flex items-center gap-2">
                            <span className="text-lg font-mono text-text-primary">
                            {account.totalAmount} kr
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
                            {account.type.toLowerCase()}
                            </span>
                        </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                        <button
                            onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(account)
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <svg 
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                            expandedId === account.id ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        </div>
                    </div>
                    </div>

                    {/* Mobile Edit Form */}
                    {expandedId === account.id && (
                    <div className="bg-card border-t border-gray-100 px-4 py-4">
                        <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <Title text="Edit Account" size="h4" />
                        </div>
                        
                        <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-text-primary mb-2">
                            Account Name
                            </label>
                            <Input
                            name="account_name"
                            type="text"
                            value={editFormData.name}
                            handleChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            placeholder="Enter account name"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-text-primary mb-2">
                            Account Type
                            </label>
                            <Select
                                name="account_type"
                                value={editFormData.type}
                                options={[
                                    {name: 'Savings', value: 'SAVINGS'},
                                    {name: 'Checking', value: 'CHECKING'},
                                    {name: 'Investment', value: 'INVESTMENT'}
                                ]}
                                handleChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}                            
                            />                         
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-text-primary mb-2">
                            Total Amount
                            </label>
                            <div className="relative">
                            <span className="absolute right-3 top-2 text-sm text-gray-500">{account.totalAmount} kr</span>
                            </div>
                        </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <Button handleClick={handleSaveEdit} name="Save Changes" />
                            <Button handleClick={handleCancelEdit} name="Cancel" type="outline"/>
                        </div>
                    </div>
                    )}
                </div>
                ))}
            </div>

        {/* Empty State */}
        {accounts.length === 0 && (
            <div className="py-12 text-center">
            <div className="text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-sm text-gray-500 mb-2">No accounts yet</p>
                <Button handleClick={handleAddNew} name="Create your first account" />
            </div>
            </div>
        )}
        </div></>);
}

export default AccountsTable;