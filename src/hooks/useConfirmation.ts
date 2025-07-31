"use client";
import { useState } from "react";

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

const useConfirmation = () => {

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
    }



    return { confirm, confirmation }

}

export default useConfirmation;