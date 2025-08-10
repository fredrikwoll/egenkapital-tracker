"use client";

import { CreateRecordData, createRecordSchema } from "@/schemas/records";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountRecord } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

/* type AccountWithTotal = Account & {
    totalAmount: number
} */

type UseRecordFormsProps = {
    onSaveAdd: (data: CreateRecordData) => void;
    onSaveEdit: (data: CreateRecordData & { id: string }) => void;
}

export const useRecordForms = ({ onSaveAdd, onSaveEdit }: UseRecordFormsProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const createForm = useForm<CreateRecordData>({
        resolver: zodResolver(createRecordSchema),
        defaultValues: { accountId: "", type: "DEPOSIT", amount: 0, description: "" }
    });



    const onSubmit = (data: CreateRecordData) => {
        onSaveAdd(data);
        setShowAddForm(false);
        setExpandedId(null);
    }


    const handleEdit = (record: AccountRecord) => {
        if (expandedId === record.id) {
            setExpandedId(null);
        } else {
            setShowAddForm(false);
            setExpandedId(record.id);
        }
    }

    const handleAddNew = () => {
        setExpandedId(null);
        setShowAddForm(!showAddForm);
    }

    const handleCancelEdit = () => {
        setShowAddForm(false);
        setExpandedId(null);
    };

    const handleCancelAddNew = () => {
        setShowAddForm(false);
        setExpandedId(null);
        createForm.reset();
    }

    return {
        expandedId, setExpandedId,
        showAddForm, setShowAddForm,
        createForm,
        handlers: { handleEdit, handleAddNew, onSubmit, handleCancelEdit, handleCancelAddNew }
    };

}