"use client";

import React from "react";

type InputProps = {
    name: string;
    placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, placeholder, ...props }, ref) => {
        return (<input
            ref={ref}
            type={type}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
            placeholder={placeholder}
            {...props}
        />
        );
    }
);

Input.displayName = "Input";

export default Input;