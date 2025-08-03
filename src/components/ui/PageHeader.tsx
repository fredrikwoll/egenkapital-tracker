"use client";

import React from "react";
import Button from "./Button";

const PageHeader = ({ title, description, hasButton = true, buttonText = "", handleClick }: { title: string, description: string, hasButton: boolean, buttonText: string, handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
    return (
        <div className="flex items-center justify-between p-2 md:p-4">
            <div className="flex items-center justify-between gap-2">
                <h1 className="title text-text-primary text-2xl">{title}</h1>
                <span className="text-sm text-text-secondary">{description}</span>
            </div>
            {hasButton && <Button name={buttonText} variant="primary-icon" shortName="Add" handleClick={handleClick} />}
        </div>);
}

export default PageHeader;