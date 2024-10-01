import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface AuthInputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, name, type, value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="flex flex-col mb-1">
            <label className="text-white" htmlFor={name}>
                {label}:
            </label>
            <div className="relative w-96">
                <input
                    className="w-full h-9 rounded m-1 p-2 text-gray-700"
                    name={name}
                    type={isPasswordVisible && type === 'password' ? 'text' : type}
                    value={value}
                    onChange={onChange}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                    >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthInput;
