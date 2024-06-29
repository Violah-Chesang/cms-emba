import React from 'react';

function TodayDate() {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' }); 
  const date = today.getDate(); // Get day of month
  const month = today.toLocaleDateString('en-US', { month: 'long' });
  const year = today.getFullYear(); // Get year

  return (
    <p className='text-gray-600 front- text-sm pr-3'>
      {day} {date} {month}, {year}
    </p>
  );
}

export default TodayDate;

