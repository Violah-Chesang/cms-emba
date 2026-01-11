import DateToday from './DateToday'
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { logout } from '../../store/slices/authSlice'
import { IoNotifications, IoSettings, IoLogOut } from "react-icons/io5";
import UserModal from './UserModal';

interface UserDetails {
  _id: string;
  userName: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Topnav = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsCookie = Cookies.get('userDetails');
        if (userDetailsCookie) {
          const parsedUserDetails: UserDetails = JSON.parse(userDetailsCookie);
          setUserDetails(parsedUserDetails);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error parsing user details from cookie:', error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    Cookies.remove('token');
    Cookies.remove('userDetails');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#f0f5fe] border-b border-blue-900/10 shadow-sm">
      <div className="h-20 px-4 md:px-8 flex items-center justify-between">

        {/* LEFT SECTION: Branding & Text */}
        <div className="flex items-center">

          {/* This container handles the "room" for the hamburger.
              - min-[1502px]:pl-0 -> No extra space when sidebar is docked.
              - max-[1501px]:pl-16 -> Creates 64px of space for the floating button.
          */}
          <div className="flex flex-col justify-center transition-all duration-300 ease-in-out max-[1501px]:pl-16">
            <h1 className="text-blue-950 font-bold text-lg md:text-xl leading-tight">
              Welcome, {userDetails ? userDetails.userName : "Guest"}
            </h1>
            <div className="flex items-center gap-1 text-gray-500 font-medium text-xs">
              <span className="hidden sm:inline">Today is</span>
              <DateToday />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 border-r border-blue-900/10 pr-3 md:pr-6">
            <button title="Settings" className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-all">
              <IoSettings size={22} />
            </button>
            <div className="relative p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-all cursor-pointer">
              <IoNotifications size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#f0f5fe]"></span>
            </div>
          </div>

          {/* User Profile Area */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end justify-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-blue-950">
                  {userDetails ? `${userDetails.firstname} ${userDetails.lastname}` : "User"}
                </span>
                <span className="text-[10px] bg-blue-950 text-white px-2 py-0.5 rounded font-bold uppercase">
                  {userDetails?.role || "Staff"}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {userDetails?.email}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <UserModal userDetails={userDetails} />
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <IoLogOut size={26} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Topnav;