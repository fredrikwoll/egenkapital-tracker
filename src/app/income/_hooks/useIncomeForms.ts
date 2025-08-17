"use client";

import { CreateIncomeData, createIncomeSchema } from "@/schemas/income";
import { zodResolver } from "@hookform/resolvers/zod";
import { Income } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";


type UseIncomeFormsProps = {
    onSaveAdd: (data: CreateIncomeData) => void;
    onSaveEdit: (data: CreateIncomeData & { id: string }) => void;
}

export const useIncomeForms = ({ onSaveAdd, onSaveEdit }: UseIncomeFormsProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const createForm = useForm<CreateIncomeData>({
        resolver: zodResolver(createIncomeSchema),
        defaultValues: { name: "", frequency: "MONTHLY", amount: 0 }
    });



    const onSubmit = (data: CreateIncomeData) => {
        // Convert kroner to øre for storage
        const dataWithOre = {
            ...data,
            amount: Math.round(data.amount * 100)
        };
        onSaveAdd(dataWithOre);
        setShowAddForm(false);
        setExpandedId(null);
        createForm.reset();
    }


    const handleEdit = (income: Income) => {
        if (expandedId === income.id) {
            setExpandedId(null);
        } else {
            setShowAddForm(false);
            setExpandedId(income.id);
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