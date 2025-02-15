import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsCard from "./EventsCard";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://cms-emba-api.vercel.app/all-events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdateEvent = async (_id, updatedData) => {
    try {
      await axios.put(`https://cms-emba-api.vercel.app/update-event/${_id}`, updatedData);
      // Optionally, fetch events again after update
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const currentDate = new Date();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate >= currentDate
    );
  });

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
