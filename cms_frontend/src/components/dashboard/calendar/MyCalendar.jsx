import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className='' style={{ width: '230px' }}>
      <Calendar
        className="border-transparent"
        onChange={onChange}
        value={date}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default MyCalendar;
