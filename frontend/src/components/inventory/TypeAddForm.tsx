// components/TypeAddForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addType } from '../../store/slices/inventorySlice';

interface TypeAddFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}


const TypeAddFormModal: React.FC<TypeAddFormModalProps> = ({ isOpen, onClose }) => {
    const dispatch: AppDispatch = useDispatch();
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        dispatch(addType({ name }))
            .unwrap()
            .then(() => {
                setName('');
                onClose();
            })
            .catch(console.error)
            .finally(() => setSubmitting(false));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add Inventory Type</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Type Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        {submitting ? 'Adding...' : 'Add Type'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TypeAddFormModal;
