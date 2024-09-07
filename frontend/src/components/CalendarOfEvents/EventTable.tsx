// src/components/EventTable.tsx
import React, { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface Event {
    _id?: string; // Optional if it can be undefined
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    daysTo: number;
    targetAudience?: string; // Add any additional properties
}
interface EventTableProps {
    events: Event[];
    onAdd: () => void;
    onUpdate: (event: Event) => void;
    onDelete: (eventId: string) => void;
    onView: (eventId: string) => void;
}

const EventTable: React.FC<EventTableProps> = ({ events, onAdd, onUpdate, onDelete }) => {
    const [sortColumn, setSortColumn] = useState<keyof Event>('eventDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (aValue === undefined && bValue === undefined) return 0;
            if (aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
            if (bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [events, sortColumn, sortDirection]);

    const handleSort = (column: keyof Event) => {
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

    const SortIcon = ({ column }: { column: keyof Event }) => {
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
                            {['Title', 'Start Date', 'End Date', 'Leader', 'Audience', 'Days To'].map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Event)}
                                >
                                    {header}
                                    <SortIcon column={header.toLowerCase().replace(' ', '') as keyof Event} />
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedEvents.map((event) => (
                            <tr key={event._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(event.eventDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.endOfEventDate ? new Date(event.endOfEventDate).toLocaleDateString() : '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.leaderInCharge}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAudienceBadgeColor(event.targetAudience)} text-white`}>
                                        {event.targetAudience || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{event.daysTo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onUpdate(event)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <FaEdit />
                                    </button>
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
