
function TodayDate() {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' }); 
  const date = today.getDate(); 
  const month = today.toLocaleDateString('en-US', { month: 'long' });
  const year = today.getFullYear(); 

  return (
    <p className='text-gray-600 text-sm ml-1'>
      {day} {date} {month}, {year}
    </p>
  );
}

export default TodayDate;

