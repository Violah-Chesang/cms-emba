import React from "react";
import Hero from "./dashboardCard/Hero";
import AnalyticsList from "./dashboardCard/Analytics";
import Leaders from "./members/Leaders";
import Calendar from "./calendar/Calendar";

const Dashboard = () => {
  return (
    <div className="m-2 flex flex-row h-full">
      <div className="w-9/12 pr-2 border-r-2 ">
        <Hero />
        <AnalyticsList />
        <Leaders />
      </div>
      <div className="flex justify-center w-3/12 shadow-2xl">
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
