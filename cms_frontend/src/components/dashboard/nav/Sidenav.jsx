import React, { useState } from "react";
import './SideNav.css'
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaCalendarDays, FaMoneyBillWave } from "react-icons/fa6";
import { IoDocumentAttach } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-2/12 bg-blue-950 h-dvh">
      <div className="flex flex-row items-center justify-center p-4 w-full">
        <img src="../../src/assets/mck_logo.png" alt="Logo" className="size-12" />
        <p className="text-white pl-3 font-bold text-xl ">MCK Embakasi</p>
      </div>
      <div className="flex flex-col items-center justify-center p-1">
        <div className="rounded-full bg-white p-2">
          <img src="../../src/assets/react.svg" alt="" className="size-16" />
        </div>
        <div className="flex flex-col items-center justify-center text-white pt-1">
          <p className="font-bold text-md" style={{color:"#EFBF04"}}>Risper James</p>
          <p className="font-light text-sm" style={{color:"#EFBF04"}}>Youth Leader</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-white pt-6">
        <ul>
          <li className="flex flex-row p-4 text-lg">
            <NavLink to="/dashboard" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
              <MdDashboard size={24} className="pr-2" /> Dashboard
            </NavLink>
          </li>
          <li className="flex flex-col p-4 text-lg">
            <button onClick={toggleDropdown} className="flex flex-row items-center text-sm">
              <FaUsers size={24} className="pr-2" /> Members Management
            </button>
            <ul className={`${isOpen ? "block" : "hidden"} mt-0`}>
            <li className="flex flex-row p-2 text-lg ml-2">
                <NavLink to="/members/all" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
                  <BiSolidRightArrow size={24} className="pr-2" /> All Fellowships
                </NavLink>
              </li>
              <li className="flex flex-row p-2 text-lg ml-2">
                <NavLink to="/members/men" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
                  <BiSolidRightArrow size={24} className="pr-2" /> Men Fellowship
                </NavLink>
              </li>
              <li className="flex flex-row p-2 text-lg ml-2">
                <NavLink to="/members/women" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
                  <BiSolidRightArrow size={24} className="pr-2" /> Women Fellowship
                </NavLink>
              </li>
              <li className="flex flex-row p-2 text-lg ml-2">
                <NavLink to="/members/youth" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
                  <BiSolidRightArrow size={24} className="pr-2" /> Youth Fellowship
                </NavLink>
              </li>
              <li className="flex flex-row p-2 text-lg ml-2">
                <NavLink to="/members/junior" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
                  <BiSolidRightArrow size={24} className="pr-2" /> Junior Sunday School
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink to="/calendar" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
              <FaCalendarDays size={24} className="pr-2" /> Calendar of events
            </NavLink>
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink to="/finance" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
              <FaMoneyBillWave size={24} className="pr-2" /> Finance
            </NavLink>
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink to="/archives" activeClassName="bg-efbf04" className="flex flex-row items-center text-sm">
              <IoDocumentAttach size={24} className="pr-2" /> Archives
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
