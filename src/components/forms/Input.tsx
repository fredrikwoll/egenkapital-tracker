"use client";

type InputTypes = 'text' | 'number' | 'email' | 'password';
const Input = ({name, type, value, handleChange, placeholder}: {name: string, type: InputTypes, value: string | number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string}) => {

    return (<input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
        placeholder={placeholder}
        autoFocus
    />);
}

export default Input;