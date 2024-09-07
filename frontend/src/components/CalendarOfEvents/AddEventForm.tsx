import React, { useState } from 'react';

interface Event {
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    daysTo: number;
}

interface AddEventModalProps {
    onClose: () => void;
    onSubmit: (newEvent: Omit<Event, "_id">) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [endOfEventDate, setEndOfEventDate] = useState('');
    const [leaderInCharge, setLeaderInCharge] = useState('');
    const [daysTo, setDaysTo] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, eventDate, endOfEventDate, leaderInCharge, daysTo });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={endOfEventDate}
                        onChange={(e) => setEndOfEventDate(e.target.value)}
                    />
                    <input
                        type="text"
                        value={leaderInCharge}
                        onChange={(e) => setLeaderInCharge(e.target.value)}
                        placeholder="Leader In Charge"
                    />
                    <input
                        type="number"
                        value={daysTo}
                        onChange={(e) => setDaysTo(Number(e.target.value))}
                        placeholder="Days To"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;
