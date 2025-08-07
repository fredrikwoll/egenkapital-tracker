"use client";

import { CreateRecordData, createRecordSchema, EditRecordData, editRecordSchema } from "@/schemas/records";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountRecord } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

/* type AccountWithTotal = Account & {
    totalAmount: number
} */

type UseRecordFormsProps = {
    onSaveAdd: (data: CreateRecordData) => void;
    onSaveEdit: (data: EditRecordData & { id: string }) => void;
}

export const useRecordForms = ({ onSaveAdd, onSaveEdit }: UseRecordFormsProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const createForm = useForm<CreateRecordData>({
        resolver: zodResolver(createRecordSchema),
        defaultValues: { accountId: "", type: "DEPOSIT", amount: 0, description: "" }
    });

    const editForm = useForm<EditRecordData>({
        resolver: zodResolver(editRecordSchema)
    });


    const onSubmit = (data: CreateRecordData) => {
        onSaveAdd(data);
        setShowAddForm(false);
        setExpandedId(null);
        editForm.reset();
    }

    const onEditSubmit = (data: EditRecordData) => {
        onSaveEdit({ id: expandedId!, ...data });
        setShowAddForm(false);
        setExpandedId(null);
        editForm.reset();
    }

    const handleEdit = (record: AccountRecord) => {

        if (expandedId === record.id) {
            setExpandedId(null);
            editForm.reset();

        } else {
            setShowAddForm(false);
            setExpandedId(record.id);

            editForm.setValue('accountId', record.accountId);
            editForm.setValue('type', record.type);
            editForm.setValue('amount', record.amount.toNumber());
            editForm.setValue('description', record.description ?? '')
        }
    }

    const handleAddNew = () => {
        setExpandedId(null);
        setShowAddForm(!showAddForm);
    }

    const handleCancelEdit = () => {
        setShowAddForm(false);
        setExpandedId(null);
        editForm.reset();
    };

    const handleCancelAddNew = () => {
        setShowAddForm(false);
        setExpandedId(null);
        createForm.reset();
    }

    return {
        expandedId, setExpandedId,
        showAddForm, setShowAddForm,
        createForm, editForm,
        handlers: { handleEdit, handleAddNew, onSubmit, onEditSubmit, handleCancelEdit, handleCancelAddNew }
    };

}