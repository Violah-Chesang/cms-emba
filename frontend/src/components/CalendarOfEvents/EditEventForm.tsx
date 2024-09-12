import React, { useState, useEffect } from 'react';

interface Event {
    _id: string;
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    targetAudience?: string;
    eventLevel?: string;
    location?: string;
}

interface EditEventModalProps {
    event: Event | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedEvent: Event) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ event, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<Event>({
        _id: '',
        title: '',
        eventDate: '',
        endOfEventDate: '',
        leaderInCharge: '',
        targetAudience: '',
        eventLevel: '',
        location: '',
    });

    useEffect(() => {
        if (event) {
            setFormData(event);
        }
    }, [event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h2 className="font-bold text-lg">Edit Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Start Date</label>
                        <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">End Date</label>
                        <input
                            type="date"
                            name="endOfEventDate"
                            value={formData.endOfEventDate}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Leader In Charge</label>
                        <input
                            type="text"
                            name="leaderInCharge"
                            value={formData.leaderInCharge}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Audience</label>
                        <select
                            name="targetAudience"
                            value={formData.targetAudience}
                            onChange={handleChange}
                            className="input input-bordered"
                        >
                            <option value="">Select Audience</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Youth">Youth</option>
                            <option value="JSS">JSS</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;
