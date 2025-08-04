"use client";

import { CreateAccountData, createAccountSchema, EditAccountData, editAccountSchema } from "@/schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AccountWithTotal = Account & {
    totalAmount: number
}

type UseAccountFormsProps = {
    onSaveAdd: (data: CreateAccountData) => void;
    onSaveEdit: (data: EditAccountData & { id: string }) => void;
}

export const useAccountForms = ({ onSaveAdd, onSaveEdit }: UseAccountFormsProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const createForm = useForm<CreateAccountData>({
        resolver: zodResolver(createAccountSchema),
        defaultValues: { name: "", type: "SAVINGS", initialAmount: 0 }
    });

    const editForm = useForm<EditAccountData>({
        resolver: zodResolver(editAccountSchema)
    });


    const onSubmit = (data: CreateAccountData) => {
        onSaveAdd(data);
        setShowAddForm(false);
        setExpandedId(null);
        editForm.reset();
    }

    const onEditSubmit = (data: EditAccountData) => {
        onSaveEdit({ id: expandedId!, ...data });
        setShowAddForm(false);
        setExpandedId(null);
        editForm.reset();
    }

    const handleEdit = (account: AccountWithTotal) => {

        if (expandedId === account.id) {
            setExpandedId(null);
            editForm.reset();

        } else {
            setShowAddForm(false);
            setExpandedId(account.id);

            editForm.setValue('name', account.name);
            editForm.setValue('type', account.type);
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