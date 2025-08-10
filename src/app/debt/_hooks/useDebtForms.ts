"use client";

import { CreateDebtData, createDebtSchema } from "@/schemas/debt";
import { zodResolver } from "@hookform/resolvers/zod";
import { Debt } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";


type UseDebtFormsProps = {
    onSaveAdd: (data: CreateDebtData) => void;
    onSaveEdit: (data: CreateDebtData & { id: string }) => void;
}

export const useDebtForms = ({ onSaveAdd, onSaveEdit }: UseDebtFormsProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const createForm = useForm<CreateDebtData>({
        resolver: zodResolver(createDebtSchema),
        defaultValues: { name: "", type: "STUDENT_LOAN", amount: 0 }
    });



    const onSubmit = (data: CreateDebtData) => {
        onSaveAdd(data);
        setShowAddForm(false);
        setExpandedId(null);
    }


    const handleEdit = (debt: Debt) => {
        if (expandedId === debt.id) {
            setExpandedId(null);
        } else {
            setShowAddForm(false);
            setExpandedId(debt.id);
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