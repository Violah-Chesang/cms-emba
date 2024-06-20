import React, { useState } from "react";
import { FaPenFancy } from "react-icons/fa";

const EventsCard = ({ eventDate, endOfEventDate, title, daysTo, leaderInCharge, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: title,
    eventDate: eventDate,
    endOfEventDate: endOfEventDate,
    leaderInCharge: leaderInCharge,
    daysTo: daysTo,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset formData to current values if needed
    setFormData({
      title: title,
      eventDate: eventDate,
      endOfEventDate: endOfEventDate,
      leaderInCharge: leaderInCharge,
      daysTo: daysTo,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    // Make update request here with formData
    // Example: onEdit(formData);
    setIsEditing(false); // Close edit form after update
  };

  return (
    <div className="bg-gradient-to-b from-sky-600 to-blue-950 rounded-xl p-5 mb-4">
      <div className="flex justify-between items-center mb-2 gap-10">
        <p className="text-white text-sm">{eventDate}</p>
        <button
          onClick={handleEditClick}
          className="bg-white text-black flex items-center px-2 py-1 rounded text-sm"
        >
          Edit <FaPenFancy className="ml-1" />
        </button>
      </div>
      {!isEditing ? (
        <div>
          <p className="text-white font-semibold text-lg">{title}</p>
          <p className="text-white font-light text-md mb-2">{leaderInCharge}</p>
          <p className="text-gray-400 text-sm">{daysTo} days away</p>
        </div>
      ) : (
        <div>
          <label className="text-white font-semibold">Title: </label><br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="bg-white text-black mb-2 px-2 py-1 rounded"
          /><br />
          <label className="text-white font-semibold">Start: </label><br />
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="bg-white text-black mb-2 px-2 py-1 rounded"
          /><br />
          <label className="text-white font-semibold">End: </label><br />
          <input
            type="date"
            name="endOfEventDate"
            value={formData.endOfEventDate}
            onChange={handleInputChange}
            className="bg-white text-black mb-2 px-2 py-1 rounded"
          /><br />
          <label className="text-white font-semibold">In-Charge: </label><br />
          <input
            type="text"
            name="leaderInCharge"
            value={formData.leaderInCharge}
            onChange={handleInputChange}
            className="bg-white text-black mb-2 px-2 py-1 rounded"
          /><br />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-1 rounded">
            Update
          </button>
          <button onClick={handleCancelEdit} className="bg-gray-400 text-white px-4 py-1 rounded ml-2">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsCard;
