import React from "react";
import Label from "./Label";

type FormFieldProps = {
    label: string;
    children: React.ReactNode;
    required?: boolean;
}

const FormField = ({ label, children, required = false }: FormFieldProps) => (
    <div>
        <Label name={`${label}${required ? '*' : ''}`} />
        {children}
    </div>
);

export default FormField;