import Title from "./Title";


type SectionHeaderProps = {
    title: string;
    variant?: 'create' | 'edit';
    size?: 'h3' | 'h4';
}

const SectionHeader = ({ title, variant = 'create', size = 'h3' }: SectionHeaderProps) => {
    const isCreate = variant === 'create';

    return (<div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 ${isCreate ? 'bg-blue-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
            <svg className={`w-4 h-4 ${isCreate ? 'text-blue-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={isCreate ? "M12 4v16m8-8H4" : "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"} 
                />
            </svg>
        </div>
        <Title text={title} size={size} />
    </div>)
}

export default SectionHeader;


