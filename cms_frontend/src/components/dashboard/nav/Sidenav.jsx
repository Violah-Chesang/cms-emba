import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import "./SideNav.css";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoDocumentAttach } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector } from 'react-redux'; 

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userDetails = useSelector((state) => state.auth.user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`sidenav ${
        isOpen ? "sidenav-open" : "sidenav-closed"
      } bg-blue-950 pb-96`}
    >
      <div
        className={`flex ${
          isOpen ? "flex-row" : "flex-col-reverse gap-5"
        } items-center justify-between p-4 w-full`}
      >
        <img
          src="../../src/assets/mck_logo.png"
          alt="Logo"
          className="size-10"
        />
        {isOpen && (
          <p className="text-white pl-3 font-bold text-xl">MCK Embakasi</p>
        )}
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <GrClose size={30} /> : <FaBars size={24}/>}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-1">
        <div className="">
          {isOpen ? (
            <p className={`text-6xl font-normal text-blue-900 rounded-full py-4 px-7 bg-white` }>
              {userDetails ? userDetails.firstname.charAt(0) : ""}
            </p>
          ) : (
            <p className={`text-3xl font-normal text-blue-900 rounded-full py-1 px-3 bg-white` }>
              {userDetails ? userDetails.firstname.charAt(0) : ""}
            </p>
          )}
        </div>

        {isOpen && userDetails && (
          <div className="flex flex-col items-center justify-center text-white pt-1">
            <p className="font-bold text-lg " style={{ color: "#EFBF04" }}>
              {`${userDetails.firstname} ${userDetails.lastname}`}
            </p>
            <p className="font-normal text-md" style={{ color: "#EFBF04" }}>
              {userDetails.email}
            </p>
            <p className="font-light text-sm" style={{ color: "#EFBF04" }}>
              {userDetails.role}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center text-white pt-6">
        <ul>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/dashboard"
              className="flex flex-row items-center text-sm   hover:text-amber-400 active:text-amber-400"
            >
              <MdDashboard size={isOpen ? 25 : 35} className="pr-2" />

              {isOpen && <span className="text-only">Dashboard</span>}
            </NavLink>
          </li>
          <li className="flex flex-col p-4 text-lg">
            <button
              onClick={toggleDropdown}
              className="flex flex-row items-center text-sm hover:text-amber-400 active:text-amber-400"
            >
              <FaUsers size={isOpen ? 25 : 35} className="pr-2" />
              {isOpen && <span className="text-only">Members Management</span>}
            </button>
            {isOpen && (
              <ul className={`${isDropdownOpen ? "block" : "hidden"} mt-0`}>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/all"
                    className="flex flex-row items-center text-sm  hover:text-amber-400 active:text-amber-400"
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">All Fellowships</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/men"
                    className="flex flex-row items-center text-sm  hover:text-amber-400 active:text-amber-400"
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">Men Fellowship</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/women"
                    className="flex flex-row items-center text-sm  hover:text-amber-400 active:text-amber-400"
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">Women Fellowship</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/youth"
                    className="flex flex-row items-center text-sm  hover:text-amber-400 active:text-amber-400"
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">Youth Fellowship</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/junior"
                    className="flex flex-row items-center text-sm  hover:text-amber-400 active:text-amber-400"
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">Junior Sunday School</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/calendar"
              className="flex flex-row items-center text-sm  hover:text-amber-400 active:text-amber-400"
            >
              <FaCalendarDays size={isOpen ? 25 : 35} className="pr-2" />
              {isOpen && <span className="text-only">Calendar of events</span>}
            </NavLink>
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/finance"
              className="flex flex-row items-center text-sm  hover:text-amber-400 active:text-amber-400"
            >
              <FaMoneyBillWave size={isOpen ? 25 : 35} className="pr-2" />
              {isOpen && <span className="text-only">Finance</span>}
            </NavLink>
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/archives"
              className="flex flex-row items-center text-sm hover:text-amber-400 active:text-amber-400"
            >
              <IoDocumentAttach size={isOpen ? 25 : 35} className="pr-2" />
              {isOpen && <span className="text-only">Archives</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
