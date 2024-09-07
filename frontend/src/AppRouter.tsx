import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidenav from './components/nav/Sidenav';
import Calendar from "./screens/Calendar";
import Dashboard from "./screens/Dashboard";
import Finance from "./screens/Finance";
import Archives from "./screens/Archives";
import Men from "./screens/members/Men";
import Women from "./screens/members/Women";
import Youth from "./screens/members/Youth";
import Jss from "./screens/members/Jss";
import AllMembers from "./screens/members/AllMembers";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Topnav from "./components/nav/Topnav";
import { RootState } from "./store/store";

const AppRouter: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = (): boolean => {
    return token !== null;
  };

  return (
    <Routes>
      {/* Redirect root path to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {isAuthenticated() ? (
        <Route
          path="*"
          element={
            <div className="flex flex-row bg-slate-50" style={{ width: "99vw" }}>
              <div style={{width:"14%"}}>
                <Sidenav />
              </div>

              <div style={{width:"86%", margin: "", justifyContent: "center" }}>
                <Topnav />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/finance" element={<Finance />} />
                  <Route path="/inventory" element={<Archives />} />
                  <Route path="/archives" element={<Archives />} />
                  <Route path="/members/all" element={<AllMembers />} />
                  <Route path="/members/men" element={<Men />} />
                  <Route path="/members/women" element={<Women />} />
                  <Route path="/members/youth" element={<Youth />} />
                  <Route path="/members/jss" element={<Jss />} />
                </Routes>
              </div>
            </div>
          }
        />
      ) : (
        <>
          {/* Redirect any other paths to login */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login/>}
          />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
