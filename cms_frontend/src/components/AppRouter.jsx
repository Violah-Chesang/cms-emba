import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const { token } = useSelector((state) => state.auth);
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);

  const isAuthenticated = () => {
    return token !== null;
  };

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {isAuthenticated() ? (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={
              <div className="flex flex-row"style={{width:"100%"}}>
                <Sidenav isOpen={isSidenavOpen} toggleSidenav={toggleSidenav} />
                <div style={{margin:"2px"}}>
                  <TopNav />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard style={{ width: isSidenavOpen ? "76.2%" : "86.2%" }} />} />
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
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login showAlert={true} alertMessage="Login to access protected pages" />}
          />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
