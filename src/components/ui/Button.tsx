"use client";
import React from "react";

type ButtonVariant = 'primary' | 'primary-icon' | 'secondary' | 'outline' | 'danger';
type ButtonProps = {
    name: string;
    variant?: ButtonVariant;
    type?: "button" | "submit" | "reset";
    isDisabled?: boolean;
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    shortName?: string;
}
const Button = ({ name, variant = 'primary', type = "button", isDisabled = false, handleClick, shortName }: ButtonProps) => {

    const ButtonClasses = {
        'primary': 'px-4 py-2 bg-blue-600 text-text-primary text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
        'primary-icon': 'inline-flex items-center gap-2 px-4 py-2 md:px-4 md:py-2 bg-blue-600 text-text-primary text-sm font-medium rounded-2xl hover:bg-blue-700 transition-colors',
        'secondary': 'px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors',
        'outline': 'px-4 py-2 text-text-primary border border-color-text-text-primary text-sm font-medium rounded-md hover:text-text-secondary transition-colors',
        'danger': 'px-4 py-2 bg-negative text-text-primary text-sm font-medium rounded-md hover:bg-negative-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
    }


    return (<button
        onClick={handleClick}
        className={ButtonClasses[variant]}
        type={type}
        disabled={isDisabled}
    >
        {shortName && (<><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
            <span className="sm:hidden">{shortName}</span></>)}
        <span className="hidden sm:inline">{name}</span>
    </button>);
}

export default Button;