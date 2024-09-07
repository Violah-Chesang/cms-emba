import { Calendar, HStack, Divider } from 'rsuite';
import "rsuite/dist/rsuite-no-reset.min.css";

const MyCalendar = () => {
  return (
      <div style={{ width: '100%', height: '100%' }}>
      <HStack divider={<Divider vertical />} spacing={40} style={{ height: 360,  justifyContent: 'center', marginTop: '20px' }}>
          <HStack style={{ width: '94%'}}>
            <Calendar 
            bordered={false}             
              compact
              weekStart={0}
              showWeekNumbers={true}
              isoWeek={true}
            className='text-blue-900 font-bold bg-white shadow-sm shadow-gray-500'
            />
          </HStack>
        </HStack>
      </div>
  );
};

export default MyCalendar;
