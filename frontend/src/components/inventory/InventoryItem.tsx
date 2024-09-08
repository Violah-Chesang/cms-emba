import React from 'react';
import InventoryItemTable from './InventoryItemTable'; // Ensure path is correct for your structure

const InventoryItem: React.FC = () => {
    // Dummy data for inventory items
    const dummyItems = [
        {
            _id: '1',
            type: { _id: '101', name: 'Electronics' },
            subtype: { _id: '201', name: 'Laptop' },
            serialNumber: 'SN123456',
            description: 'Dell XPS 15',
            quantity: 10,
            location: 'Warehouse 1',
            purchaseDate: new Date('2021-08-15'),
            status: 'In Use',
            condition: 'Good',
        },
        {
            _id: '2',
            type: { _id: '102', name: 'Furniture' },
            subtype: { _id: '202', name: 'Chair' },
            serialNumber: 'SN987654',
            description: 'Office Chair',
            quantity: 50,
            location: 'Main Office',
            purchaseDate: new Date('2022-01-10'),
            status: 'In Stock',
            condition: 'New',
        },
        {
            _id: '3',
            type: { _id: '103', name: 'Appliances' },
            subtype: { _id: '203', name: 'Air Conditioner' },
            serialNumber: 'SN654321',
            description: 'LG Split AC',
            quantity: 5,
            location: 'Server Room',
            purchaseDate: new Date('2020-06-25'),
            status: 'Under Maintenance',
            condition: 'Needs Repair',
        },
        {
            _id: '4',
            type: { _id: '104', name: 'IT Equipment' },
            subtype: { _id: '204', name: 'Router' },
            serialNumber: 'SN112233',
            description: 'Cisco Router',
            quantity: 20,
            location: 'Data Center',
            purchaseDate: new Date('2019-11-05'),
            status: 'In Use',
            condition: 'Excellent',
        },
    ];

    // Event handlers
    const handleAdd = () => {
        alert('Add new item');
    };

    const handleEdit = (item: any) => {
        alert(`Edit item: ${item._id}`);
    };

    const handleDelete = (itemId: string) => {
        alert(`Delete item: ${itemId}`);
    };

    return (
        <div className="p-6">
            <InventoryItemTable
                items={dummyItems}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default InventoryItem;
