import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsCard from "./EventsCard";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5500/all-events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdateEvent = async (eventId, updatedData) => {
    try {
      await axios.put(`http://localhost:5500/update-event/${eventId}`, updatedData);
      // Optionally, fetch events again after update
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Get current date
  const currentDate = new Date();

  // Filter events for current month and future dates
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate >= currentDate
    );
  });

  // Sorting filtered events by eventDate (closest to farthest)
  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.eventDate);
    const dateB = new Date(b.eventDate);
    return dateA - dateB;
  });

  return (
    <div className="flex flex-col mt-4 w-80">
      {filteredEvents.map((event) => (
        <EventsCard
          key={event._id}
          eventDate={new Date(event.eventDate).toLocaleDateString()}
          title={event.title}
          leaderInCharge={event.leaderInCharge}
          daysTo={event.daysTo}
          onEdit={(updatedData) => handleUpdateEvent(event._id, updatedData)}
        />
      ))}
    </div>
  );
};

export default EventsList;
