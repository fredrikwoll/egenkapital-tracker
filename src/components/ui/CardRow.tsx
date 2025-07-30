import React from "react";
import Button from "./Button";
import Title from "./Title";

export type Column<T> = {
    key: keyof T | string;
    className: string;
    transform?: (value: unknown, row: T) => string;
};

type CardRowProps = {
    title: string;
    description: string;
    type: string;
    handleEditButton: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleDeleteButton: (e: React.MouseEvent<HTMLButtonElement>) => void
};

const CardRow = ({ title, description, type, handleEditButton, handleDeleteButton }: CardRowProps) => {
    return (
        <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <Title text={title} size="h3" />
                        <div className="mt-1 flex items-center gap-2">
                            <span className="text-lg font-mono text-text-primary">
                                {description}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
                                {type}
                            </span>
                        </div>
                    </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 ml-4">
                    <Button name="Edit" shortName="Edit" handleClick={handleEditButton} />
                </div>
                <div className="flex items-center gap-2 ml-4">
                    <Button name="Delete" shortName="Del" type="danger" handleClick={handleDeleteButton} />
                </div>
            </div>
        </div>
    );
}

export default CardRow;