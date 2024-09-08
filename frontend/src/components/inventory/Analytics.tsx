import React from 'react';
import { MdInventory2 } from 'react-icons/md';

const inventoryData = [
    { type: 'Chairs', count: 250, color: 'bg-blue-500' },
    { type: 'Tables', count: 150, color: 'bg-green-500' },
    { type: 'Desks', count: 100, color: 'bg-red-500' },
    { type: 'Instruments', count: 75, color: 'bg-yellow-500' },
    { type: 'Utensils', count: 75, color: 'bg-yellow-500' },
];

const Analytics: React.FC = () => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
                {inventoryData.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-md shadow-lg">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-md ${item.color}`}>
                                <MdInventory2 size={24} className="text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-md font-bold text-blue-900">{item.type}</p>
                                <p className="text-xl text-gray-900">{item.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analytics;
