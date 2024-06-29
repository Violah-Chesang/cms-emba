import React from 'react';
import { useSelector } from 'react-redux';

const EventsTable = ({ events, onAdd, onEdit, onDelete }) => {
  const userRole = useSelector((state) => state.auth.user?.role);

  const canEditDelete = ['Minister', 'Executive Leader', 'Fellowship Leader'].includes(userRole);
  const canAdd = ['Minister', 'Executive Leader'].includes(userRole);

  return (
    <div className="overflow-x-auto mt-8">
      <div className="flex justify-end mb-4">
        {canAdd && (
          <button
            className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={onAdd}
          >
            Add Event
          </button>
        )}
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300">Title</th>
            <th className="py-2 px-4 border border-gray-300">Start Date</th>
            <th className="py-2 px-4 border border-gray-300">End Date</th>
            <th className="py-2 px-4 border border-gray-300">Leader In Charge</th>
            <th className="py-2 px-4 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-gray-300">{event.title}</td>
              <td className="py-2 px-4 border border-gray-300">{new Date(event.start).toLocaleString()}</td>
              <td className="py-2 px-4 border border-gray-300">{new Date(event.end).toLocaleString()}</td>
              <td className="py-2 px-4 border border-gray-300">{event.leaderInCharge}</td>
              <td className="py-2 px-4 border border-gray-300">
                {canEditDelete && (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 mr-2 rounded text-sm"
                    onClick={() => onEdit(event)}
                  >
                    Edit
                  </button>
                )}
                {canEditDelete && (
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded text-sm"
                    onClick={() => onDelete(event)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
