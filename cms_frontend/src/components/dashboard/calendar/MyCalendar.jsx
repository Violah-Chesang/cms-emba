import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className=''>
      <Calendar className="border-transparent"
        onChange={onChange}
        value={date}
      />
    </div>
  );
};

export default MyCalendar;
