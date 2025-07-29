import { T } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";
import Title from "./Title";

export type Column<T> = {
  key: keyof T | string;
  className: string;
  transform?: (value: any, row: T) => string;
};

type TableRowProps<T> = {
  data: T;
  columns: Column<T>[];
};

const TableRow = <T,>({ data, columns }: TableRowProps<T>) => {
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
    </div>
    );
}


/*                         <div
                            className="group hover:bg-gray-25 transition-colors cursor-pointer"
                            onClick={() => handleEdit(account)}
                        >
                            <div className="flex items-center justify-between py-4 px-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <Title text={account.name} size="h3" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <Title text={account.type.toLowerCase()} size="h4" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <Title text={`${account.totalAmount} kr`} size="h3" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Button name="Edit" handleClick={(e) => {
                                                e.stopPropagation()
                                                handleEdit(account)
                                            }}/>
                                        <Button name="Delete" type="danger" handleClick={(e) => {
                                            e.stopPropagation()
                                            handleEdit(account)
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        </div> */


export default TableRow;