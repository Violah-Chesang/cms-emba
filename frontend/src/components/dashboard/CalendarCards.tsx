import { useEffect } from "react";
import { BiSolidCalendarEvent } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchEvents } from "../../store/slices/eventSlice";

const groupColors: { [key: string]: { iconColor: string; bgColor: string } } = {
    All: { iconColor: "#3b9ebf", bgColor: "#e1eef2" },
    Youth: {
        iconColor: "#ff5722",
        bgColor: "#ffe0e0"
    },
    Men: {
        iconColor: "#9c27b0",
        bgColor: "#f3e1f7"
    },
    Women: {
        iconColor: "#4caf50",
        bgColor: "#e9f5e9"
    },
    JSS: { iconColor: "#4caf50", bgColor: "#e9f5e9" }
};

const defaultColors = {
    iconColor: "#ffc107",
    bgColor: "#fff3cd"
};

const CalendarCards = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { events, loading, error } = useSelector((state: RootState) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);


    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="flex flex-row justify-between">
                <p className="text-xl text-blue-900 font-extrabold">Upcoming Events</p>
                <a href="#" className="text-blue-600 font-light hover:text-amber-500">See all</a>
            </div>

            {upcomingEvents.length === 0 ? (
                <p className="text-gray-500">No events scheduled for this month.</p>
            ) : (
                upcomingEvents.map(event => {
                    const { iconColor, bgColor } = groupColors[event.targetAudience as keyof typeof groupColors] || defaultColors;

                    return (
                        <div key={event._id} className="flex flex-row items-center shadow-sm p-4 rounded-md bg-white shadow-slate-600 hover:shadow-lg my-4">
                            <div className="p-2 rounded-md mr-6" style={{ backgroundColor: bgColor }}>
                                <BiSolidCalendarEvent size={30} color={iconColor} />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-blue-950 capitalize">{event.title}</p>
                                <p className="text-xs text-gray-700">{new Date(event.eventDate).toDateString()}</p>
                            </div>
                            <div className="ml-auto">
                                <IoIosArrowForward size={25} color={iconColor} />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CalendarCards;
