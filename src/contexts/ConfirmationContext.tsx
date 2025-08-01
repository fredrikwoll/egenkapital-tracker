"use client";

import React, { createContext, useContext, useState } from "react";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";


type UseConfirmationProps = {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

type ConfirmationState = UseConfirmationProps & {
    onConfirm: () => void;
    onCancel: () => void;
}

type ConfirmationContextType = {
    confirm: (props: UseConfirmationProps) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextType | null>(null);

export const ConfirmationProvider = ({ children }: {children: React.ReactNode}) => {
    const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);

    const confirm = (props: UseConfirmationProps): Promise<boolean> => {
        return new Promise((resolve) => {
            setConfirmation({
                ...props,
                onConfirm: () => {
                    setConfirmation(null);
                    resolve(true);
                },
                onCancel: () => {
                    setConfirmation(null);
                    resolve(false);
                }
            });
        });
    };

    return (
        <ConfirmationContext.Provider value={{ confirm }}>
            {children}
            {confirmation && (
                <ConfirmationDialog {...confirmation} isOpen={true} />
            )}
        </ConfirmationContext.Provider>
    )
}

export const useConfirmation = () => {
    const context = useContext(ConfirmationContext);
    if(!context) {
        throw new Error("useConfirmation must be within ConfirmationProvider");
    }

    return context;
}