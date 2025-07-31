import React from "react";
import Label from "./Label";

type DisplayFieldProps = {
    label: string;
    value: string | number;
    suffix?: string;
}

const DisplayField = ({ label, value, suffix }: DisplayFieldProps) => (
    <div>
        <Label name={label} />
        <div className="relative">
            <span className="text-sm text-gray-500">
                {`${value} ${suffix}`}
            </span>
        </div>
    </div>
);

export default DisplayField;