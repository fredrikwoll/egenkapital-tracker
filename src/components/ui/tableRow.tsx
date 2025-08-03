import React from "react";
import Button from "./Button";
import Title from "./Title";

export type Column<T> = {
    key: keyof T | string;
    className: string;
    transform?: (value: unknown, row: T) => string;
};

type TableRowProps<T> = {
    data: T;
    columns: Column<T>[];
    handleEditButton: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleDeleteButton: (e: React.MouseEvent<HTMLButtonElement>) => void
};

const TableRow = <T,>({ data, columns, handleEditButton, handleDeleteButton }: TableRowProps<T>) => {
    return (
        <div className="flex items-center justify-between py-4 px-6">
            {columns.map((column, index) => {
                const value = data[column.key as keyof T];
                const displayValue = column.transform ? column.transform(value, data) : String(value);

                return (<div key={index} className={column.className}>
                    <div className="flex items-center gap-3">
                        <Title text={displayValue} size="h4" />
                    </div>
                </div>);

            })}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button name="Edit" handleClick={handleEditButton} />
                    <Button name="Delete" variant="danger" handleClick={handleDeleteButton} />
                </div>
            </div>
        </div>
    );
}

export default TableRow;