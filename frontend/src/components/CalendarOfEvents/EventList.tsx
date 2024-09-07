import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent, editEvent, deleteEvent } from '../../store/slices/eventSlice';
import { RootState, AppDispatch } from '../../store/store';
import EventTable from './EventTable';
import AddEventModal from '../CalendarOfEvents/AddEventForm'; // Ensure correct import
import EditEventModal from '../CalendarOfEvents/EditEventForm'; // Ensure correct import

interface Event {
    _id?: string; // Optional if it can be undefined
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    daysTo: number;
    targetAudience?: string; // Add any additional properties
}

const EventList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const events = useSelector((state: RootState) => state.events.events);
    const loading = useSelector((state: RootState) => state.events.loading);
    const error = useSelector((state: RootState) => state.events.error);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleAdd = useCallback(() => {
        setIsAddModalOpen(true);
    }, []);

    const handleUpdate = useCallback((event: Event) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    }, []);

    const handleDelete = useCallback((eventId: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            dispatch(deleteEvent(eventId));
        }
    }, [dispatch]);

    const handleAddSubmit = useCallback((newEvent: Omit<Event, '_id'>) => {
        dispatch(addEvent(newEvent));
        setIsAddModalOpen(false);
    }, [dispatch]);

    const handleEditSubmit = useCallback((updatedEvent: Event) => {
        dispatch(editEvent(updatedEvent));
        setIsEditModalOpen(false);
        setSelectedEvent(null);
    }, [dispatch]);

    // Calculate paginated events
    const paginatedEvents = events.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(events.length / pageSize);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading events...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <EventTable
                events={paginatedEvents}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onAdd={handleAdd} // Pass the handleAdd function to the EventTable component
                onView={() => { }} // Pass an empty function or implement as needed
            />
            {events.length === 0 ? (
                <div className="text-center py-4">No events found.</div>
            ) : (
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mx-1 disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mx-1 disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
            {isAddModalOpen && (
                <AddEventModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddSubmit}
                />
            )}
            {isEditModalOpen && selectedEvent && (
                <EditEventModal
                    event={selectedEvent}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedEvent(null);
                    }}
                    onSubmit={handleEditSubmit}
                />
            )}
        </div>
    );
};

export default EventList;
