
type SelectOptions = {
    name: string;
    value: string;
}



const Select = ({ name, value, options, handleChange }: { name: string, value: string, options: SelectOptions[], handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
    return (<select
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg">
            {value === "" && <option value="" disabled>Select Type</option>}
            {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.name}</option>
        })}
    </select>);
}

export default Select;