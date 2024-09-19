//import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../store/store';
// import { fetchItems, addItem } from '../../store/slices/inventorySlice';
// import InventoryItemTable from './InventoryItemTable';
// import AddItemModal from './AddItemModal';

interface InventoryItem {
    _id: string;
    name: string;
    type: string;
    subtype: string;
    status: string;
    condition: string;
    quantity: number; // Ensure quantity is included
}

const InventoryItem: React.FC = () => {
    // const dispatch: AppDispatch = useDispatch();

    // // Access state from Redux
    // const items = useSelector((state: RootState) => state.inventory.items);
    // const loadingItems = useSelector((state: RootState) => state.inventory.loadingItems);
    // const error = useSelector((state: RootState) => state.inventory.error);
    // const [showAddModal, setShowAddModal] = useState(false);

    // // Fetch items on component mount
    // useEffect(() => {
    //     dispatch(fetchItems());
    // }, [dispatch]);

    // // Event handlers
    // const handleAdd = () => {
    //     setShowAddModal(true);
    // };

    // const handleAddItem = (itemData: Omit<InventoryItem, '_id'>) => {
    //     dispatch(addItem(itemData))
    //         .unwrap()
    //         .then(() => {
    //             setShowAddModal(false);
    //         })
    //         .catch((err) => {
    //             console.error('Failed to add item:', err);
    //         });
    // };

    // const handleEdit = (item: InventoryItem) => {
    //     alert(`Edit item: ${item._id}`);
    // };

    // const handleDelete = (itemId: string) => {
    //     alert(`Delete item: ${itemId}`);
    // };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Inventory Items</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    
                >
                    Add Item
                </button>
            </div>

            {/* Display loading indicator
            {loadingItems ? (
                <p>Loading items...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <InventoryItemTable
                    items={Object.values(items)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd} // Pass onAdd prop for 'Add' button in the table
                />
            )}

            {showAddModal && (
                <AddItemModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddItem}
                />
            )} */}
        </div>
    );
};

export default InventoryItem;
