const Label = ({ name }: { name: string}) => {
    return (<label className="block text-xs font-medium text-text-primary mb-2">
        {name}
    </label>);
}

export default Label;