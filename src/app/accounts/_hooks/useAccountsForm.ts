"use client";

import { CreateAccountData, createAccountSchema } from "@/schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AccountWithTotal = Account & {
    totalAmount: number
}

type UseAccountFormsProps = {
    onSaveAdd: (data: CreateAccountData) => void;
    onSaveEdit: (data: CreateAccountData & { id: string }) => void;
}

export const useAccountForms = ({ onSaveAdd, onSaveEdit }: UseAccountFormsProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const createForm = useForm<CreateAccountData>({
        resolver: zodResolver(createAccountSchema),
        defaultValues: { name: "", type: "SAVINGS", initialAmount: 0 }
    });



    const onSubmit = (data: CreateAccountData) => {
        onSaveAdd(data);
        setShowAddForm(false);
        setExpandedId(null);
        createForm.reset();
    }


    const handleEdit = (account: AccountWithTotal) => {
        if (expandedId === account.id) {
            setExpandedId(null);
        } else {
            setShowAddForm(false);
            setExpandedId(account.id);
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