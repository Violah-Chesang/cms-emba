import React from "react";
import SideCalendar from "./SideCalendar";
import BigCalendar from "./BigCalendar";

const Calendar = () => {
  return (
    <div className="flex flex-row">
      <div className="w-9/12 pr-2 border-r-2">
        <BigCalendar />
      </div>
      <div className="flex justify-center w-3/12 shadow-2xl">
        <SideCalendar />
      </div>
    </div>
  );
};

export default Calendar;
