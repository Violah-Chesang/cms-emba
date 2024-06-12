import React from "react";
import { FaPenFancy } from "react-icons/fa";

const events = [
  {
    id: 1,
    date: "09 July 2024",
    title: "Youth Service",
    leaderInCharge: "John Doee",
    timeline: "2 days away",
  },
  {
    id: 2,
    date: "09 July 2024",
    title: "Youth Service",
    leaderInCharge: "John Doee",
    timeline: "2 days away",
  },
  {
    id: 3,
    date: "09 July 2024",
    title: "Youth Service",
    leaderInCharge: "John Doee",
    timeline: "2 days away",
  },
  {
    id: 4,
    date: "09 July 2024",
    title: "Youth Service",
    leaderInCharge: "John Doee",
    timeline: "2 days away",
  },
];

const EventsCard = ({ date, title, timeline, leaderInCharge }) => {
  return (
    <div className="bg-gradient-to-b from-sky-600 to-blue-950 rounded-xl p-4 mb-4">
      <div className="flex justify-between items-center mb-2 gap-10">
        <p className="text-white text-sm">{date}</p>
        <button className="bg-white text-black flex items-center px-2 py-1 rounded text-sm">
          Edit <FaPenFancy className="ml-1" />
        </button>
      </div>
      <div>
        <p className="text-white font-semibold text-md">{title}</p>
        <p className="text-white font-light text-md mb-2">{leaderInCharge}</p>
        <p className="text-gray-400 text-sm">{timeline}</p>
      </div>
    </div>
  );
};

const EventsList = () => {
  return (
    <div className="flex flex-col mt-4 w-80">
      {events.map((event) => (
        <EventsCard
          key={event.id}
          date={event.date}
          title={event.title}
          leaderInCharge={event.leaderInCharge}
          timeline={event.timeline}
        />
      ))}
    </div>
  );
};

export default EventsList;
