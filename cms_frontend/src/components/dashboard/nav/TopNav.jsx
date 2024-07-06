import React, { useState, useEffect } from "react";
import DateToday from "../../DateToday";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slice/authSlice";
import Cookies from 'js-cookie';

const TopNav = () => {
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsCookie = Cookies.get('userDetails');
        if (userDetailsCookie) {
          const parsedUserDetails = JSON.parse(userDetailsCookie);
          setUserDetails(parsedUserDetails);
        } else {
          // If userDetailsCookie is not found, handle as needed (e.g., redirect to login)
          navigate('/login');
        }
      } catch (error) {
        console.error('Error parsing user details from cookie:', error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [navigate]); // Include navigate in dependencies to prevent missing dependencies warning

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userDetails');
    dispatch(logout());
    navigate('/login');
  };

  // Conditional rendering based on userDetails
  return (
    <div className="flex flex-row h-16 bg-white items-center border-b-1 border-blue-950 shadow-2xl">
      <div className="flex flex-row w-10/12 justify-between">
        <div className="flex flex-col ml-3">
          <p className="text-blue-900 font-bold text-2xl">
            Welcome {userDetails ? userDetails.userName : "Guest"}
          </p>
          <p className="text-gray-600 font-normal text-sm flex">
            Today is {"  "}
            <DateToday className="pr-3 ml-2" />
          </p>
        </div>
        <div>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search here....."
            className="border-2 border-blue-950 w-96 h-11 rounded-lg border-spacing-2 border-gray-1 pl-5 bg-blue-950 text-white"
          />
        </div>
      </div>
      <div className="w-2/12 flex justify-evenly">
        <a href="#">
          <IoNotifications size={25} />
        </a>
        <a href="#">
          <IoSettings size={25} />
        </a>
        <button onClick={handleLogout} className="bg-blue-950 px-4 py-2 text-white rounded text-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNav;
