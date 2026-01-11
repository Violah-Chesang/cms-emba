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
import Inventory from "./screens/Inventory";
import { RootState } from "./store/store";
import Clergy from "./screens/members/Clergy";

const AppRouter: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = (): boolean => {
    return token !== null;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {isAuthenticated() ? (
        <Route
          path="*"
          element={
            <div className="flex min-h-screen bg-slate-50">
              {/* SIDENAV CONTAINER 
                On screens > 1500px: It takes up fixed space (w-72).
                On screens <= 1500px: The container itself disappears from the flow, 
                letting the Sidenav component handle its own floating/fixed logic.
              */}
              <div className="hidden min-[1501px]:block min-[1501px]:w-72 flex-shrink-0">
                <Sidenav />
              </div>

              {/* MAIN CONTENT AREA
                'flex-1' makes it take up all remaining space.
                When sidebar is hidden (<= 1500px), this automatically becomes 100% width.
              */}
              <div className="flex-1 flex flex-col min-w-0">
                  <Topnav />
                

                {/* Independent Sidenav for mobile/tablet (<= 1500px) */}
                <div className="min-[1501px]:hidden">
                  <Sidenav />
                </div>

                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/archives" element={<Archives />} />
                    <Route path="/members/all" element={<AllMembers />} />
                    <Route path="/members/men" element={<Men />} />
                    <Route path="/members/women" element={<Women />} />
                    <Route path="/members/youth" element={<Youth />} />
                    <Route path="/members/jss" element={<Jss />} />
                    <Route path="/members/clergy" element={<Clergy />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default AppRouter;