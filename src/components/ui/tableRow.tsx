import Title from "./Title";

type BodyColumn = {
    label: string;
    className: string;
}

const TableRow = ({ rows }: { rows: BodyColumn[] }) => {
    return (
    <div className="flex items-center justify-between py-4 px-6">
        {rows.map( (rows) => {
            return (<div key={rows.label} className={rows.className}>
                <div className="flex items-center gap-3">
                    <Title text={rows.label} size="h4" />
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