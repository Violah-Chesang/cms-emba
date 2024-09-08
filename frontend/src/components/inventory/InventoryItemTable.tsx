import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface InventoryItem {
    _id: string;
    type: { _id: string; name: string };
    subtype?: { _id: string; name: string };
    serialNumber?: string;
    description?: string;
    quantity: number;
    location?: string;
    purchaseDate?: Date;
    status?: string;
    condition?: string;
}

interface InventoryItemTableProps {
    items: InventoryItem[];
    onAdd: () => void;
    onEdit: (item: InventoryItem) => void;
    onDelete: (itemId: string) => void;
}

const InventoryItemTable: React.FC<InventoryItemTableProps> = ({ items, onAdd, onEdit, onDelete }) => {
    const [sortColumn, setSortColumn] = useState<keyof InventoryItem>('type');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Sorting logic
    const sortedItems = [...items].sort((a, b) => {
        let aValue: any = a[sortColumn];
        let bValue: any = b[sortColumn];

        if (sortColumn === 'type' || sortColumn === 'subtype') {
            aValue = a[sortColumn]?.name || '';
            bValue = b[sortColumn]?.name || '';
        }

        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (column: keyof InventoryItem) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ column }: { column: keyof InventoryItem }) => {
        if (column !== sortColumn) return <FaSort className="ml-1" />;
        return sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Inventory Items</h2>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={onAdd}
                >
                    <FaPlus className="mr-2" /> Add Item
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            {[
                                { label: 'Type', column: 'type' },
                                { label: 'Subtype', column: 'subtype' },
                                { label: 'Serial Number', column: 'serialNumber' },
                                { label: 'Description', column: 'description' },
                                { label: 'Quantity', column: 'quantity' },
                                { label: 'Location', column: 'location' },
                                { label: 'Purchase Date', column: 'purchaseDate' },
                                { label: 'Status', column: 'status' },
                                { label: 'Condition', column: 'condition' },
                            ].map(({ label, column }) => (
                                <th
                                    key={column}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort(column as keyof InventoryItem)}
                                >
                                    {label}
                                    <SortIcon column={column as keyof InventoryItem} />
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedItems.map((item) => (
                            <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.type.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.subtype?.name || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.serialNumber || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.location || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.status || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.condition || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryItemTable;
