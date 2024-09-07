import MyCalendar from "./Calendar";
import CalendarCards from "./CalendarCards";

const SideCalendar: React.FC = () => {
    return (
        <div className="bg-slate-50">
            <div className="flex flex-col items-center text-black">
                <p className="text-xl text-blue-900 font-bold">Calendar of Events</p>
                <MyCalendar />
            </div>
            <div className="mt-10 px-4">
                <CalendarCards />
            </div>
        </div>
    )
}
export default SideCalendar;
