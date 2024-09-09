
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store'; // Adjust the path to your actual store file
import { fetchTypes, fetchSubtypes, addItem } from '../../store/slices/inventorySlice';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { types, subtypes, loadingItems } = useSelector((state: RootState) => state.inventory);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [subtype, setSubtype] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [location, setLocation] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [status, setStatus] = useState('In Stock');
    const [condition, setCondition] = useState('New');

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchTypes());
            dispatch(fetchSubtypes());
        }
    }, [isOpen, dispatch]);

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();

        const newItem = {
            name,
            type,
            subtype,
            serialNumber,
            description,
            quantity,
            location,
            purchaseDate: new Date(purchaseDate),
            status,
            condition,
        };
        dispatch(addItem(newItem));
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Add New Inventory Item</h2>
                        {loadingItems ? (
                            <p>Loading data...</p>
                        ) : (
                            <form onSubmit={handleAddItem}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Item Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Type</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        {Object.values(types).map((type: any) => (
                                            <option key={type._id} value={type._id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Subtype</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={subtype}
                                        onChange={(e) => setSubtype(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Subtype</option>
                                        {Object.values(subtypes)
                                            .filter((sub: any) => sub.type._id === type)
                                            .map((subtype: any) => (
                                                <option key={subtype._id} value={subtype._id}>
                                                    {subtype.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Serial Number</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={serialNumber}
                                        onChange={(e) => setSerialNumber(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        className="w-full p-2 border rounded"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        min={1}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Location</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Purchase Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border rounded"
                                        value={purchaseDate}
                                        onChange={(e) => setPurchaseDate(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Status</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                        <option value="Reserved">Reserved</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Condition</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
                                        required
                                    >
                                        <option value="New">New</option>
                                        <option value="Used">Used</option>
                                        <option value="Damaged">Damaged</option>
                                    </select>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Add Item
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AddItemModal;
