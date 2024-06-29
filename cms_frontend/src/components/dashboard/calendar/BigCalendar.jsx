import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventsTable from '../../calendarOfEvents/EventsTable';
import { IoIosAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, addEvent, editEvent, deleteEvent } from '../../../store/slice/eventSlice';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialFormData = {
    title: "",
    eventDate: "",
    endOfEventDate: "",
    leaderInCharge: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    const updatedTitle = prompt('Enter new title', event.title);
    if (updatedTitle) {
      dispatch(editEvent({ ...event, title: updatedTitle }));
    }
  };

  const handleDeleteEvent = (event) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(event._id));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    dispatch(addNewEvent(formData))
      .then(() => {
        setIsModalOpen(false);
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div style={{ height: 520 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
        />
      </div>
      <EventsTable events={events} onAdd={handleAddEvent} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4 text-blue-950">
              Create New Event
            </h2>
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-blue-950"
                  htmlFor="title"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-blue-950"
                  htmlFor="eventDate"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-blue-950"
                  htmlFor="endOfEventDate"
                >
                  End of Event Date
                </label>
                <input
                  type="date"
                  id="endOfEventDate"
                  name="endOfEventDate"
                  value={formData.endOfEventDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-blue-950"
                  htmlFor="leaderInCharge"
                >
                  Leader in Charge
                </label>
                <input
                  type="text"
                  id="leaderInCharge"
                  name="leaderInCharge"
                  value={formData.leaderInCharge}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 px-3"
                />
              </div>
              <div className="flex justify-between items-center mt-5">
                <button
                  type="submit"
                  className="bg-blue-950 text-white px-3 py-2 rounded-lg flex items-center text-sm hover:bg-amber-500"
                >
                  Create Event <IoIosAdd color="white" size={25} />
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-3 py-2 rounded-lg flex items-center text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
