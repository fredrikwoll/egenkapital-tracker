"use client";
import Button from "./Button";

type EmptyStateProps = {
    title: string;
    actionLabel: string;
    onAction: () => void;
}

const EmptyState = ({
    title,
    actionLabel,
    onAction
}: EmptyStateProps) => {
    return (
        <div className="py-12 text-center">
            <div className="text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-sm text-gray-500 mb-2">{title}</p>
                <Button handleClick={onAction} name={actionLabel} />
            </div>
        </div>
    );
};

export default EmptyState;