import React, { useState, useMemo } from 'react';
import { FaPlus, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface Event {
    _id?: string;
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    targetAudience?: string;
    eventLevel?: string;
    location?: string;
}

interface EventTableProps {
    events: Event[];
    onAdd: () => void;
    onDelete: (eventId: string) => void;
}

const EventTable: React.FC<EventTableProps> = ({ events, onAdd, onDelete }) => {
    const [sortColumn, setSortColumn] = useState<'eventDate' | 'daysTo'>('daysTo');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const calculateDaysTo = (eventDate: string): number => {
        const today = new Date();
        const eventDay = new Date(eventDate);
        const diffTime = eventDay.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const sortedEvents = useMemo(() => {
        return [...events].map(event => ({
            ...event,
            daysTo: calculateDaysTo(event.eventDate)
        })).sort((a, b) => {
            const aDaysTo = a.daysTo;
            const bDaysTo = b.daysTo;

            if (aDaysTo === bDaysTo) return 0;

            // Sort future events (daysTo >= 0) first
            if (aDaysTo >= 0 && bDaysTo < 0) return sortDirection === 'asc' ? -1 : 1;
            if (aDaysTo < 0 && bDaysTo >= 0) return sortDirection === 'asc' ? 1 : -1;

            // Sort both future and past events in ascending order of daysTo
            return sortDirection === 'asc' ? aDaysTo - bDaysTo : bDaysTo - aDaysTo;
        });
    }, [events, sortColumn, sortDirection]);

    const handleSort = (column: 'eventDate' | 'daysTo') => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
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
                            {['Title', 'Start Date', 'Location', 'Leader', 'Audience', 'Days To'].map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort(header.toLowerCase().replace(' ', '') as 'eventDate' | 'daysTo')}
                                >
                                    {header}
                                    <SortIcon column={header.toLowerCase().replace(' ', '') as 'eventDate' | 'daysTo'} />
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedEvents.map((event) => (
                            <tr
                                key={event._id}
                                className={event.daysTo < 0 ? 'bg-red-100' : ''}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(event.eventDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.leaderInCharge}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAudienceBadgeColor(event.targetAudience)} text-white`}>
                                        {event.targetAudience || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.daysTo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onDelete(event._id!)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventTable;
