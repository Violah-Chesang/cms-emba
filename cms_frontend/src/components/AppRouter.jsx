import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidenav from "./dashboard/nav/Sidenav";
import Dashboard from "./dashboard/Dashboard";
import Calendar from "./dashboard/calendar/Calendar";
import Finance from "./Finance/Finance";
import Archives from "./Archives/Archives";
import Men from "./dashboard/members/Men";
import Women from "./dashboard/members/Women";
import Youth from "./dashboard/members/Youth";
import Jss from "./dashboard/members/Jss";
import TopNav from "./dashboard/nav/TopNav";
import AllMembers from "./dashboard/members/AllMembers";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="*"
        element={
          <div className="flex flex-row">
            <Sidenav />
            <div className="flex-grow">
              <TopNav />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/members/all" element={<AllMembers />} />
                <Route path="/members/men" element={<Men />} />
                <Route path="/members/women" element={<Women />} />
                <Route path="/members/youth" element={<Youth />} />
                <Route path="/members/junior" element={<Jss />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRouter;
