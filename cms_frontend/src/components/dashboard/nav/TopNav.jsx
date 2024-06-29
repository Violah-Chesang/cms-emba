import React from "react";
import DateToday from "../../DateToday";
import { IoNotifications } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { useSelector } from "react-redux";

const TopNav = () => {
  const userDetails = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-row h-16 bg-white items-center border-b-1 border-blue-950 shadow-2xl">
      <div className="flex flex-row w-10/12 justify-between">
        <div className="flex flex-col ml-3">
          <p className=" text-blue-900 font-bold text-2xl">
            Welcome {userDetails ? userDetails.userName : ""}
          </p>
          <p className="text-gray-600 front- text-sm flex">
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
            className="border-x-2 border-blue-950 w-96 h-11 rounded-lg border-spacing-2 border-gray-1 pl-5  bg-blue-950 text-white"
          />
        </div>
      </div>
      <div className="w-2/12 flex justify-evenly">
        <a href="">
          <IoNotifications size={25} />
        </a>
        <a href="">
          <IoSettings size={25} />
        </a>
        <button className="bg-blue-950 px-4 py-2 text-white rounded text-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNav;
