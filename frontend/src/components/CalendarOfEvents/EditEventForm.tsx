import React, { useState, useEffect } from 'react';

interface Event {
    _id?: string;
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    daysTo: number;
}

interface EditEventModalProps {
    event: Event;
    onClose: () => void;
    onSubmit: (updatedEvent: Event) => void;
}

const EditEventForm: React.FC<EditEventModalProps> = ({ event, onClose, onSubmit }) => {
    const [title, setTitle] = useState(event.title);
    const [eventDate, setEventDate] = useState(event.eventDate);
    const [endOfEventDate, setEndOfEventDate] = useState(event.endOfEventDate || '');
    const [leaderInCharge, setLeaderInCharge] = useState(event.leaderInCharge || '');
    const [daysTo, setDaysTo] = useState(event.daysTo);

    useEffect(() => {
        setTitle(event.title);
        setEventDate(event.eventDate);
        setEndOfEventDate(event.endOfEventDate || '');
        setLeaderInCharge(event.leaderInCharge || '');
        setDaysTo(event.daysTo);
    }, [event]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...event, title, eventDate, endOfEventDate, leaderInCharge, daysTo });
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

export default EditEventForm;
