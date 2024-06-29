import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventsTable from '../../calendarOfEvents/EventsTable';
import { IoIosAdd } from 'react-icons/io';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialFormData = {
    title: "",
    eventDate: "",
    endOfEventDate: "",
    leaderInCharge: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetch('http://localhost:5500/all-events')
      .then(response => response.json())
      .then(data => {
        const formattedEvents = data.map(event => ({
          title: `${event.title} (${event.leaderInCharge})`,
          start: new Date(event.eventDate),
          end: new Date(event.endOfEventDate),
          leaderInCharge: event.leaderInCharge,
          _id: event._id // Assuming the event has an _id property
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    const updatedTitle = prompt('Enter new title', event.title);
    if (updatedTitle) {
      setEvents(events.map(e => e._id === event._id ? { ...e, title: updatedTitle } : e));
    }
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter(e => e._id !== event._id));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/add-event",
        formData
      );
      console.log("Event created successfully:", response.data);
      setIsModalOpen(false);
      setFormData(initialFormData);
      // Refresh events after adding new event
      const updatedEvents = await axios.get('http://localhost:5500/all-events');
      const formattedEvents = updatedEvents.data.map(event => ({
        title: `${event.title} (${event.leaderInCharge})`,
        start: new Date(event.eventDate),
        end: new Date(event.endOfEventDate),
        leaderInCharge: event.leaderInCharge,
        _id: event._id
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error creating event:", error);
    }
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
