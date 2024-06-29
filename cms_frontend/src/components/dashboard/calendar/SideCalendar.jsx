import React, { useState } from "react";
import MyCalendar from "./MyCalendar";
import EventsList from "../../calendarOfEvents/EventsList";
import { IoIosAdd } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";

const SideCalendar = () => {
  const initialFormData = {
    title: "",
    eventDate: "",
    endOfEventDate: "",
    leaderInCharge: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = useSelector((state) => state.auth.user?.role);

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
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const openModal = () => {
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Determine if user can add event based on role
  const canAddEvent = ['Minister', 'Executive Leader'].includes(userRole);

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <p className="text-2xl font-semibold text-center">Calendar of events</p>
        <MyCalendar />
        <div className="flex items-center gap-36 mt-5 justify-evenly">
          {canAddEvent && (
            <button
              className="bg-blue-950 text-white px-2 py-2 rounded-md flex items-center text-sm hover:bg-amber-500"
              onClick={openModal}
            >
              Create Event <IoIosAdd color="white" size={20} />
            </button>
          )}
          <a
            href="/calendar"
            className="font-medium text-sm flex items-center hover:text-amber-600 "
          >
            View all <IoIosArrowForward size={20} />
          </a>
        </div>
        <EventsList className="w-full" />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
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

export default SideCalendar;
