import React, { useState } from 'react';
import SideCalendar from "../components/dashboard/SideCalendar";
import BigCalendar from "../components/calendar/BigCalendar";
import EventList from '../components/CalendarOfEvents/EventList';
import EventCards from '../components/CalendarOfEvents/EventCards';

const Calendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'events'>('calendar');

  return (
    <div className="flex">
      <div className="p-3 border-r-2 border-gray-300 h-dvh" style={{ width: '75%' }}>
        <p className='text-2xl text-blue-950 font-bold p-2'>Event Management</p>
        <EventCards/>
        <div className="tabs">
          <ul className="flex mb-4 border-b-2 border-b-gray-200">
            <li
              className={`px-4 py-2 cursor-pointer ${activeTab === 'calendar' ? 'border-b-2 border-blue-500 font-bold text-blue-600 rounded-lg' : ''}`}
              onClick={() => setActiveTab('calendar')}
            >
              Calendar
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${activeTab === 'events' ? 'border-b-2 border-blue-500 font-bold text-blue-600 rounded-lg' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Events List
            </li>
          </ul>

          {/* Tabs Content */}
          <div className="tab-content">
            {activeTab === 'calendar' && <BigCalendar />}
            {activeTab === 'events' && <EventList />}
          </div>
        </div>
      </div>

      {/* Side Calendar */}
      <div className="right flex justify-center" style={{ width: '25%' }}>
        <SideCalendar />
      </div>
    </div>
  );
};

export default Calendar;
