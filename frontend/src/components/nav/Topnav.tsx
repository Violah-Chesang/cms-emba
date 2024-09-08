import DateToday from './DateToday'
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { logout } from '../../store/slices/authSlice'
import { IoNotifications, IoSettings } from "react-icons/io5";
import UserModal from './UserModal';
import { IoLogOut } from "react-icons/io5";

// Update the UserDetails interface to include all required properties
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
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userDetails');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex flex-row h-16 bg-[#f0f5fe] items-center border-b-1 border-[#01102d] shadow-3xl p-2 justify-between" >
      <div className='flex flex-col justify-between'>
        <p className="text-blue-900 font-bold text-xl">
          Welcome {userDetails ? userDetails.userName : "Guest"}
        </p>
        <div className="flex flex-row text-gray-600 font-normal text-sm ">
          <p className="text-gray-600 font-normal text-sm flex">
            Today is
          </p>
          <DateToday />
        </div>
      </div>
      <div className='flex flex-row gap-4 items-center pr-3'>
       
        {/* <button onClick={handleLogout} className="bg-blue-950 px-4 py-1 text-white rounded text-sm">
          Logout
        </button> */}
        <a href="#">
          <IoSettings size={25} />
        </a>
        <a href="#" className='items-center'>
          <IoNotifications size={24} color='#01102d' />
        </a>
        
        <a href="" onClick={handleLogout}>
          <IoLogOut size={30} />
        </a>
         <UserModal userDetails={userDetails} />
        <div className='flex flex-col h-3 justify-center text-blue-950 gap-0'>
          <p className='font-bold text-md'>
            {userDetails ? `${userDetails.firstname} ${userDetails.lastname}` : ""} {userDetails ? `(${userDetails.role})` : ""}
          </p>
          <p className='font-normal text-sm'>
            {userDetails ? `${userDetails.email}` : ""}
          </p>
        </div>
       


      </div>
    </div>
  )
}

export default Topnav