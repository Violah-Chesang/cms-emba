import React from 'react';

interface AuthInputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, name, type, value, onChange }) => {
    return (
        <div className="flex flex-col mb-1">
            <label className="text-white te" htmlFor={name}>
                {label}:
            </label>
            <input
                className="w-96 h-9 rounded m-1 p-2 text-gray-700"
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default AuthInput;
