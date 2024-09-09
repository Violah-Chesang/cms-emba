import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';

const localizer = momentLocalizer(moment); 

const BigCalendar = () => {

  return (
    <div className="h-1/2 bg-white p-4">
      <Calendar
        localizer={localizer}
        //events={myEventsList} // Use the event list from props
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default React.memo(BigCalendar);
