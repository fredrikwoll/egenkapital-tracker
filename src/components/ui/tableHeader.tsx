import Title from "./Title";

type HeaderColumn = {
    label: string;
    className: string;
}

const TableHeader = ({ headers }: { headers: HeaderColumn[] }) => {
    return (
    <div className="flex items-center justify-between py-4 px-6">
        {headers.map( (header) => {
            return (<div key={header.label} className={header.className}>
                <div className="flex items-center gap-3">
                    <Title text={header.label} size="h4" />
                </div>
            </div>);
        })}
    </div>
    );
}


export default TableHeader;