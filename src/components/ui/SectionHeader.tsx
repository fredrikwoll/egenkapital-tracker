import Title from "./Title";


type SectionHeaderProps = {
    title: string;
    variant?: 'create' | 'edit' | 'settings' | 'goals';
    size?: 'h3' | 'h4';
}

const SectionHeader = ({ title, variant = 'create', size = 'h3' }: SectionHeaderProps) => {
    const getIconConfig = () => {
        switch (variant) {
            case 'create':
                return {
                    bgColor: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    path: "M12 4v16m8-8H4"
                };
            case 'edit':
                return {
                    bgColor: 'bg-gray-100',
                    iconColor: 'text-gray-600',
                    path: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                };
            case 'settings':
                return {
                    bgColor: 'bg-purple-100',
                    iconColor: 'text-purple-600',
                    path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                };
            case 'goals':
                return {
                    bgColor: 'bg-green-100',
                    iconColor: 'text-green-600',
                    path: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                };
            default:
                return {
                    bgColor: 'bg-gray-100',
                    iconColor: 'text-gray-600',
                    path: "M12 4v16m8-8H4"
                };
        }
    };

    const { bgColor, iconColor, path } = getIconConfig();

    return (<div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
            <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={path} 
                />
            </svg>
        </div>
        <Title text={title} size={size} />
    </div>)
}

export default SectionHeader;


