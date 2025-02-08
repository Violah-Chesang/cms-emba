import { useState } from 'react'
import logo from '../../assets/mck_logo.png'
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoDocumentAttach } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import churchFamily from '../../assets/churchFamily.png'

const Sidenav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-blue-950 h-screen">
      <div className='flex flex-row p-2 justify-center items-center'>
        <img className='size-11' src={logo} alt="" />
        <p className="text-white pl-3 font-bold text-lg">MCK Embakasi</p>
      </div>
      <div className=' flex flex-col justify-center items-center text-white p-2 mt-7'>
        <ul>
          <li className='p-3 text-md font-medium'>
            <NavLink to='/dashboard'
              className={({ isActive }) =>
                `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
              }>
              <MdDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className='p-3 text-md font-medium'>
            <button onClick={toggleDropdown} >
              <NavLink to='/members/all' className={({ isActive }) =>
                `flex flex-row items-center  ${isActive ? 'bg-[#799BF4] p-2 rounded-md  gap-1' : 'gap-3'}`
              }>
                <FaUsers size={20} />
                <span>Member Management</span>
              </NavLink>
            </button>
            <ul className={`${isDropdownOpen ? "block" : "hidden"} mt-0`}>
              <li className='p-3 text-md font-medium'>
                <NavLink
                  to="/members/all" className={({ isActive }) =>
                    `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
                  }>
                  <BiSolidRightArrow size={17} />
                  <span>All Members</span>
                </NavLink>
              </li>
              <li className='p-3 text-md font-medium'>
                <NavLink
                  to="/members/men" className={({ isActive }) =>
                    `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
                  }>
                  <BiSolidRightArrow size={17} />
                  <span>Men Fellowship</span>
                </NavLink>
              </li>
              <li className='p-3 text-md font-medium'>
                <NavLink
                  to="/members/women" className={({ isActive }) =>
                    `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
                  }>
                  <BiSolidRightArrow size={17} />
                  <span>Women Fellowship</span>
                </NavLink>
              </li>
              <li className='p-3 text-md font-medium'>
                <NavLink
                  to="/members/youth" className={({ isActive }) =>
                    `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
                  }>
                  <BiSolidRightArrow size={17} />
                  <span>Youth Fellowship</span>
                </NavLink>
              </li>
              <li className='p-3 text-md font-medium'>
                <NavLink
                  to="/members/jss" className={({ isActive }) =>
                    `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
                  }>
                  <BiSolidRightArrow size={17} />
                  <span>Junior Sunday School</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className='p-3 text-md font-medium'>
            <NavLink to='/calendar' className={({ isActive }) =>
              `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
            }>
              <FaCalendarDays size={20} />
              <span>Calendar of Events</span>
            </NavLink>
          </li>
          <li className='p-3 text-md font-medium'>
            <NavLink to='/inventory' className={({ isActive }) =>
              `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
            }>
              <MdOutlineInventory size={20} />
              <span>Inventory</span>
            </NavLink>
          </li>
          <li className='p-3 text-md font-medium'>
            <NavLink to='/finance' className={({ isActive }) =>
              `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
            }>
              <FaMoneyBillWave size={20} />
              <span>Finance</span>
            </NavLink>
          </li>
          <li className='p-3 text-md font-medium'>
            <NavLink to='/archives' className={({ isActive }) =>
              `flex flex-row items-center gap-3 ${isActive ? 'bg-[#799BF4] p-2 rounded-md font-bold' : ''}`
            }>
              <IoDocumentAttach size={20} />
              <span>Archives</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='pl-3' style={{ position: 'absolute', bottom: '0', marginBottom: '25px' }}>
        <img src={churchFamily} alt="Church Family" className="" style={{width:"180px"}} />
      </div>
    </div>
  )
}

export default Sidenav