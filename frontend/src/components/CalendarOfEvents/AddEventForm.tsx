import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addEvent } from '../../store/slices/eventSlice';

interface Event {
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    targetAudience?: string;
    eventLevel?: string;
    location?: string;
    daysTo: number;
}

interface AddEventModalProps {
    onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [endOfEventDate, setEndOfEventDate] = useState('');
    const [leaderInCharge, setLeaderInCharge] = useState('');
    const [location, setLocation] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [eventLevel, setEventLevel] = useState('');

    const calculateDaysToEvent = (dateString: string) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newEvent: Omit<Event, 'daysTo'> = {
            title,
            eventDate,
            endOfEventDate,
            leaderInCharge,
            location,
            targetAudience,
            eventLevel,
        };

        // Automatically calculate daysTo
        const daysTo = calculateDaysToEvent(eventDate);

        dispatch(addEvent({ ...newEvent, daysTo }))
            .unwrap()
            .then(() => onClose())
            .catch((error:any) => console.error('Failed to add event:', error));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Add New Event</h2>
                    <button
                        className="text-red-500 hover:text-red-700 font-bold text-xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Event Date</label>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">End of Event Date (Optional)</label>
                        <input
                            type="date"
                            value={endOfEventDate}
                            onChange={(e) => setEndOfEventDate(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Leader In Charge</label>
                        <input
                            type="text"
                            value={leaderInCharge}
                            onChange={(e) => setLeaderInCharge(e.target.value)}
                            placeholder="Leader In Charge"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Target Audience</label>
                        <select
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select Audience</option>
                            <option value="Youth">Youth</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="JSS">JSS</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Event Level</label>
                        <select
                            value={eventLevel}
                            onChange={(e) => setEventLevel(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select Event Level</option>
                            <option value="Church">Church</option>
                            <option value="Interchurch">Interchurch</option>
                            <option value="Circuit">Circuit</option>
                            <option value="Synod">Synod</option>
                            <option value="Conference">Conference</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;
