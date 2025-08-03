import React from "react";

type SelectOptions = {
    name: string;
    value: string;
}

type SelectProps = {
    options: SelectOptions[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, ...props }, ref) => {
        return (<select
            ref={ref}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
            {...props}
        >
            {(props.value === "" || props.value === undefined) && <option value="" disabled>Select Type</option>}
            {options.map((option) => {
                return <option key={option.value} value={option.value}>{option.name}</option>
            })}
        </select>);
    });

Select.displayName = "Select";

export default Select;