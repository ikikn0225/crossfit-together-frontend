import React, { forwardRef } from "react";

interface InputProps {
    className: string;
    value: string;
    onChange: (value: string) => void;
    onClick: () => void;
}
const Input: React.FC<InputProps> = (
    { className, value, onClick, onChange },
    ref
    ) => {
    return (
        <input
        className={className}
        type="text"
        value={value}
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
        />
    );
};

export default Input;
