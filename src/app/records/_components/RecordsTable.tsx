"use client";

import CardRow from "@/components/ui/CardRow";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import TableHeader from "@/components/ui/tableHeader";
import TableRow, { type Column } from "@/components/ui/tableRow";
import { Account, AccountRecord, RecordType } from "@prisma/client";

import CreateRecordForm from "./CreateRecordForm";
import EditRecordForm from "./EditRecordForm";
import { CreateRecordData, EditRecordData } from "@/schemas/records";
import { useRecordForms } from "../_hooks/useRecordsForm";
import { formatAmount } from "@/lib/utils";

/* type AccountWithTotal = Account & {
    totalAmount: number
} */



type RecordsTableType = {
    records: AccountRecord[];
    accountList: Account[];
    onSaveAdd: (data: CreateRecordData) => void;
    onSaveEdit: (data: EditRecordData & {id: string}) => void;
    onDelete: (id: string) => void;
}

const RecordsTable = ({ records, accountList, onSaveAdd, onSaveEdit, onDelete }: RecordsTableType) => {
    const {
        showAddForm, createForm, handlers, expandedId
    } = useRecordForms({ onSaveAdd, onSaveEdit });


    // Define your columns configuration
    const columns: Column<AccountRecord>[] = [
        {
            key: 'accountId',
            className: 'flex-1',
            transform: (value: unknown) => {
                const accountId = value as string;
                const account = accountList?.find(acc => acc.id === accountId);

                return account ? account.name : 'Unkown Account';
            }
        },
        {
            key: 'type',
            className: 'flex-1',
            transform: (value: unknown) => (value as RecordType).toLowerCase()
        },
        {
            key: 'amount',
            className: 'flex-1',
            transform: (value: unknown) => `${formatAmount(value as number)}`
        }
    ];


    if (!records?.length) {
        return <div>No records to display</div>;
    }



    return (
        <> {/* Header */}
            <PageHeader
                title="Records"
                description="This page is where you define and update all account records you want to track"
                hasButton={true}
                handleClick={handlers.handleAddNew}
                buttonText="Add Record"
            />
            <div className="bg-border rounded-lg">

                {showAddForm && (
                    <CreateRecordForm
                        onSubmit={handlers.onSubmit}
                        onCancel={handlers.handleCancelAddNew}
                        form={createForm}
                        accountList={accountList}
                    />
                )}

                {/* Desktop Table View */}
                <div className="hidden md:block divide-y divide-gray-50">
                    <div className="group hover:bg-gray-25 transition-colors cursor-pointer">
                        <TableHeader
                            headers={[
                                { label: 'Name', className: 'flex-1' },
                                { label: 'Type', className: 'flex-1' },
                                { label: 'Amount', className: 'flex-1' },
                                { label: 'Actions', className: 'flex items-center gap-4' },
                            ]}
                        />
                    </div>
                    {records.map((record) => (
                        <div key={record.id}>
                            {/* Main Row */}
                            <div className="group hover:bg-gray-25 transition-colors cursor-pointer">
                                <TableRow
                                    columns={columns}
                                    data={record}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(record)
                                    }}
                                    handleDeleteButton={() => onDelete(record.id)}

                                />
                            </div>

                            {/* Edit Form */}
                            {expandedId === record.id && (
                                <EditRecordForm
                                    key={record.id}          // ← Force re-render per record
                                    record={record}           // ← Pass the account
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                    accountList={accountList}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {records.map((record) => (
                        <div key={record.id}>
                            {/* Mobile Card */}
                            <div className="p-4 hover:bg-gray-25 transition-colors cursor-pointer" onClick={() => handlers.handleEdit(record)}>
                                <CardRow
                                    title={record.name}
                                    description={formatAmount(record.amount)}
                                    type={record.type}
                                    handleEditButton={(e) => {
                                        e.stopPropagation()
                                        handlers.handleEdit(record)
                                    }}
                                    handleDeleteButton={() => onDelete(record.id)}
                                />
                            </div>
                            {/* Mobile Edit Form */}
                            {expandedId === record.id && (
                                <EditRecordForm
                                    key={record.id}          // ← Force re-render per record
                                    record={record}           // ← Pass the account
                                    onSubmit={onSaveEdit}
                                    onCancel={handlers.handleCancelEdit}
                                    accountList={accountList}
                                    isMobile={true}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {records.length === 0 && (
                    <EmptyState
                        title="No records yet"
                        actionLabel="Create your first record"
                        onAction={handlers.handleAddNew}
                    />
                )}
            </div></>);
}

export default RecordsTable;