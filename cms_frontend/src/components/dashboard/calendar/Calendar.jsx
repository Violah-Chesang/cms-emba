import React from "react";
import MyCalendar from "./MyCalendar";
import EventsList from "../../calendarOfEvents/EventsList";
import { IoIosAdd } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Calendar = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <p className="text-2xl font-semibold text-center">Calendar of events</p>
        <MyCalendar />
        <div className="flex justify-between items-center gap-36 mt-5">
          <button className="bg-blue-950 text-white px-3 py-2 rounded-lg flex items-center text-sm">
            Create Event <IoIosAdd color="white" size={25} />
          </button>
          <p className="font-medium text-md flex items-center">
            View all <IoIosArrowForward size={20} />
          </p>
        </div>
        <EventsList className="w-full"/>
      </div>
    </div>
  );
};
4;

export default Calendar;
