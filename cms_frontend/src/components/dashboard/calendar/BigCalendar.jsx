import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5500/all-events')
      .then(response => response.json())
      .then(data => {
        const formattedEvents = data.map(event => ({
          title: `${event.title} (${event.leaderInCharge})`,
          start: new Date(event.eventDate),
          end: new Date(event.endOfEventDate),
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div style={{ height: 850, padding: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default BigCalendar;
