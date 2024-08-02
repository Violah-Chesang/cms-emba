import React, { useState, useEffect } from "react";
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
import Cookies from 'js-cookie';

const Sidenav = ({ isOpen, toggleSidenav }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userDetails = useSelector((state) => state.auth.user);
  const [parsedUserDetails, setParsedUserDetails] = useState(null);
  
  useEffect(() => {
    const userDetailsCookie = Cookies.get('userDetails');
    if (userDetailsCookie) {
      try {
        const parsedUserDetails = JSON.parse(userDetailsCookie);
        setParsedUserDetails(parsedUserDetails);
      } catch (error) {
        console.error('Error parsing user details from cookie:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      setParsedUserDetails(userDetails);
    }
  }, [userDetails]);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`sidenav ${isOpen ? "sidenav-open" : "sidenav-closed"} bg-blue-950 pb-96`}
      style={{ width: isOpen ? '13vw' : '3vw' }}
    >
      <div
        className={`flex ${isOpen ? "flex-row" : "flex-col-reverse gap-5"} items-center justify-between p-4 w-full`}
      >
        <img
          src="../../src/assets/mck_logo.png"
          alt="Logo"
          className="size-10"
        />
        {isOpen && (
          <p className="text-white pl-3 font-bold text-xl">MCK Embakasi</p>
        )}
        <button onClick={toggleSidenav} className="text-white">
          {isOpen ? <GrClose size={30} /> : <FaBars size={24}/>}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-1">
        <div className="">
          {isOpen && parsedUserDetails && (
            <p
              style={{
                fontSize: isOpen ? '50px' : '30px',
                padding: `${isOpen ? '0px 24px 0px 24px' : '0px 6px 0px 6px'}`,
                color: '#1e3a8a',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
              }}
            >
              {parsedUserDetails.firstname.charAt(0)}
            </p>
          )}
        </div>

        {isOpen && parsedUserDetails && (
          <div className="flex flex-col items-center justify-center text-white pt-1">
            <p className="font-bold text-lg " style={{ color: "#EFBF04" }}>
              {`${parsedUserDetails.firstname} ${parsedUserDetails.lastname}`}
            </p>
            <p className="font-normal text-md text-[#EFBF04] truncate w-[160px]">
              {parsedUserDetails.email}
            </p>

            <p className="font-light text-sm" style={{ color: "#EFBF04" }}>
              {parsedUserDetails.role}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center text-white pt-6">
        <ul>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
              }
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
                    className={({ isActive }) =>
                      `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
                    }
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">All Fellowships</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/men"
                    className={({ isActive }) =>
                      `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
                    }
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">Men Fellowship</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/women"
                    className={({ isActive }) =>
                      `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
                    }
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">Women Fellowship</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/youth"
                    className={({ isActive }) =>
                      `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
                    }
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">Youth Fellowship</span>
                  </NavLink>
                </li>
                <li className="flex flex-row p-2 text-lg ml-2">
                  <NavLink
                    to="/members/junior"
                    className={({ isActive }) =>
                      `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
                    }
                  >
                    <BiSolidRightArrow size={24} className="pr-2" />
                    <span className="text-only">JSS Fellowship</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
              }
            >
              <FaCalendarDays size={isOpen ? 25 : 35} className="pr-2" />
              {isOpen && <span className="text-only">Calendar</span>}
            </NavLink>
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/finance"
              className={({ isActive }) =>
                `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
              }
            >
              <FaMoneyBillWave size={isOpen ? 25 : 35} className="pr-2" />
              {isOpen && <span className="text-only">Finance</span>}
            </NavLink>
          </li>
          <li className="flex flex-row p-4 text-lg">
            <NavLink
              to="/archives"
              className={({ isActive }) =>
                `flex flex-row items-center text-sm hover:text-amber-400 ${isActive ? 'text-amber-400' : ''}`
              }
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
