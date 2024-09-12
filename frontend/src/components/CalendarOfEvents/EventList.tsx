import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, deleteEvent, editEvent } from '../../store/slices/eventSlice';
import { RootState, AppDispatch } from '../../store/store';
import EventTable from './EventTable';
import AddEventModal from '../CalendarOfEvents/AddEventForm';
import EditEventModal from '../CalendarOfEvents/EditEventForm'; 

const EventList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const events = useSelector((state: RootState) => state.events.events);
    const loading = useSelector((state: RootState) => state.events.loading);
    const error = useSelector((state: RootState) => state.events.error);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(50);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleAdd = useCallback(() => {
        setIsAddModalOpen(true);
    }, []);

    const handleEdit = useCallback((event: any) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    }, []);

    const handleDelete = useCallback((eventId: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            dispatch(deleteEvent(eventId));
        }
    }, [dispatch]);

    const handleSave = useCallback((updatedEvent: any) => {
        dispatch(editEvent(updatedEvent));
        setIsEditModalOpen(false);
    }, [dispatch]);

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
        <div className="px-4 py-3">
            <EventTable
                events={paginatedEvents}
                onDelete={handleDelete}
                onUpdate={handleSave}
                onEdit={handleEdit}
                onAdd={handleAdd}
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
                <AddEventModal onClose={() => setIsAddModalOpen(false)} />
            )}
            {isEditModalOpen && selectedEvent && (
                <EditEventModal
                    event={selectedEvent}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default EventList;
