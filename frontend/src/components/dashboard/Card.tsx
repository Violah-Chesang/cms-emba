import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="rounded-lg shadow p-2 flex flex-row">
            <div className="">
                {children}
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
        </div>
    );
};
