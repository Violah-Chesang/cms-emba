import { BiSolidCalendarEvent } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const CalendarCards = () => {
    const events = [
        {
            id: 1,
            title: "Youth Service",
            date: "27 Oct 2024 Sunday",
            group: "Youth",
            iconColor: "#3b9ebf",
            bgColor: "#e1eef2"
        },
        {
            id: 2,
            title: "Men's Fellowship",
            date: "02 Nov 2024 Saturday",
            group: "Men",
            iconColor: "#ff5722",
            bgColor: "#ffe0e0"
        },
        {
            id: 3,
            title: "Women's Prayer",
            date: "15 Nov 2024 Friday",
            group: "Women",
            iconColor: "#9c27b0",
            bgColor: "#f3e1f7"
        },
        {
            id: 4,
            title: "JSS Bible Study",
            date: "22 Nov 2024 Wednesday",
            group: "JSS",
            iconColor: "#4caf50",
            bgColor: "#e9f5e9"
        },
        {
            id: 5,
            title: "All Church Meeting",
            date: "29 Nov 2024 Sunday",
            group: "All",
            iconColor: "#ffc107",
            bgColor: "#fff3cd"
        }
    ];

    return (
        <div>
            <div className="flex flex-row justify-between">
                <p className="text-xl text-blue-900 font-extrabold">Upcoming Events</p>
                <a href="#" className="text-blue-600 font-light hover:text-amber-500">See all</a>
            </div>

            {events.map(event => (
                <div key={event.id} className="flex flex-row items-center shadow-sm p-4 rounded-md bg-white shadow-slate-600 hover:shadow-lg my-4">
                    <div className="p-2 rounded-md mr-6" style={{ backgroundColor: event.bgColor }}>
                        <BiSolidCalendarEvent size={30} color={event.iconColor} />
                    </div>
                    <div>
                        <p className="font-bold text-lg text-blue-950">{event.title}</p>
                        <p className="text-xs text-gray-700">{event.date}</p>
                    </div>
                    <div className="ml-auto">
                        <IoIosArrowForward size={25} color={event.iconColor} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarCards;
