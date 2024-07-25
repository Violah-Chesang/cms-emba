import React from "react";
import Hero from "./dashboardCard/Hero";
import AnalyticsList from "./dashboardCard/Analytics";
import Leaders from "./members/Leaders";
import SideCalendar from "./calendar/SideCalendar";

const Dashboard = () => {
  return (
    <div className="ml-2 mt-2 flex flex-row">
      <div className="pr-2 border-r-2"  style={{width:"76%"}}>
        <Hero />
        <AnalyticsList />
        <Leaders />
      </div>
      <div className="flex justify-centershadow-2xl" style={{width:"20%"}}>
        <SideCalendar />
      </div>
    </div>
  );
};

export default Dashboard;
