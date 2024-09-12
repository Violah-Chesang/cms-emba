import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/slices/eventSlice';
import { RootState, AppDispatch } from '../../store/store';

const localizer = momentLocalizer(moment);

const BigCalendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { events, loading, error } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const formattedEvents = events.map(event => ({
    title: event.title,
    start: new Date(event.eventDate),
    end: new Date(event.endOfEventDate || event.eventDate),
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-4 mt-5">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default React.memo(BigCalendar);
