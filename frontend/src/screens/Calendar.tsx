import SideCalendar from "../components/dashboard/SideCalendar"
import BigCalendar from "../components/calendar/BigCalendar"
import EventList from '../components/CalendarOfEvents/EventList'
const Calendar = () => {
  return (
    <div className="flex">
      <div className="p-2 border-r-2 border-gray-300 h-dvh" style={{ width: '75%' }}>
       <BigCalendar/>
       <EventList/>
      </div>
      <div className="right flex justify-center" style={{ width: '25%' }}>
        <SideCalendar />
      </div>
    </div>
  )
}

export default Calendar