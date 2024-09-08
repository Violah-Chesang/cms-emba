import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addSubtype, fetchSubtypes } from '../../store/slices/inventorySlice';
 // Import your AppDispatch type

interface AddSubtypeFormModalProps {
    selectedTypeId: string;
    isOpen: boolean;
    onClose: () => void;
}

const AddSubtypeFormModal: React.FC<AddSubtypeFormModalProps> = ({ selectedTypeId, isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null; // Don't render modal if not open

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Subtype name is required.');
            return;
        }

        setError('');

        try {
            await dispatch(addSubtype({ name, type: selectedTypeId })).unwrap();
            await dispatch(fetchSubtypes())
            onClose();
        } catch (err) {
            setError('Failed to add subtype. Please try again.');
            console.error('Error adding subtype:', err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add New Subtype</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Subtype Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter subtype name"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Add Subtype
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubtypeFormModal;
