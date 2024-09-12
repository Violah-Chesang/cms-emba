import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import EditEventModal from './EditEventForm';

interface Event {
    _id: string;
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    targetAudience?: string;
    location?: string;
}

interface EventTableProps {
    events: Event[];
    onAdd: () => void;
    onDelete: (eventId: string) => void;
    onEdit: (event: Event) => void;
    onUpdate: (updatedEvent: Event) => void;
}

const EventTable: React.FC<EventTableProps> = ({ events, onAdd, onDelete, onUpdate }) => {
    const [sortColumn, setSortColumn] = useState<'eventDate' | 'daysTo'>('daysTo');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const calculateDaysTo = (eventDate: string): number => {
        const today = new Date();
        const eventDay = new Date(eventDate);
        const diffTime = eventDay.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const sortedEvents = [...events]
        .map(event => ({ ...event, daysTo: calculateDaysTo(event.eventDate) }))
        .sort((a, b) => {
            const aValue = sortColumn === 'eventDate' ? new Date(a.eventDate).getTime() : a.daysTo;
            const bValue = sortColumn === 'eventDate' ? new Date(b.eventDate).getTime() : b.daysTo;

            return sortDirection === 'desc' ? aValue - bValue : bValue - aValue;
        });

    const handleSort = (column: 'eventDate' | 'daysTo') => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const openEditModal = (event: Event) => {
        setSelectedEvent(event);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedEvent(null);
    };

    const getAudienceBadgeColor = (audience?: string) => {
        switch (audience?.toLowerCase()) {
            case 'men': return 'bg-blue-500';
            case 'women': return 'bg-pink-500';
            case 'youth': return 'bg-green-500';
            case 'jss': return 'bg-orange-500';
            default: return 'bg-cyan-500';
        }
    };

    const SortIcon = ({ column }: { column: 'eventDate' | 'daysTo' }) => {
        if (column !== sortColumn) return <FaSort className="ml-1" />;
        return sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Events</h2>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={onAdd}
                >
                    <FaPlus className="mr-2" /> Add Event
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('eventDate')}
                            >
                                Start Date
                                <SortIcon column="eventDate" />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leader</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('daysTo')}
                            >
                                Days To
                                <SortIcon column="daysTo" />
                            </th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedEvents.map((event) => (
                            <tr key={event._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.eventDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.leaderInCharge}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-bold ${getAudienceBadgeColor(event.targetAudience)} text-white rounded`}>
                                        {event.targetAudience || 'All'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{calculateDaysTo(event.eventDate)} days</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-blue-600 hover:text-blue-900" onClick={() => openEditModal(event)}>
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 ml-2" onClick={() => onDelete(event._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditModalOpen && selectedEvent && (
                <EditEventModal
                    event={selectedEvent}
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    onSave={onUpdate}
                />
            )}
        </div>
    );
};

export default EventTable;
