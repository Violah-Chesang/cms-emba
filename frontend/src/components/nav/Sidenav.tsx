import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { MdDashboard, MdOutlineInventory, MdMenu, MdClose } from "react-icons/md";
import { FaUsers, FaMoneyBillWave, FaChevronDown } from "react-icons/fa";
import { FaCalendarDays, FaChevronRight } from "react-icons/fa6";
import { IoDocumentAttach } from "react-icons/io5";
import logo from '../../assets/mck_logo.png';
import churchFamily from '../../assets/churchFamily.png';

const Sidenav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile/Tablet toggle state

  const navItems = [
    { to: '/dashboard', icon: <MdDashboard size={22} />, label: 'Dashboard' },
    { to: '/calendar', icon: <FaCalendarDays size={20} />, label: 'Calendar' },
    { to: '/inventory', icon: <MdOutlineInventory size={22} />, label: 'Inventory' },
    { to: '/finance', icon: <FaMoneyBillWave size={22} />, label: 'Finance' },
    { to: '/archives', icon: <IoDocumentAttach size={22} />, label: 'Archives' },
  ];

  const activeClass = "bg-blue-600/40 border-l-4 border-blue-400 text-white font-bold shadow-lg";
  const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 hover:pl-5";

  return (
    <>
      {/* Hamburger Menu - Visible when width <= 1500px */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="min-[1501px]:hidden fixed top-5 left-5 z-[60] p-2 bg-blue-950 text-white rounded-md shadow-lg border border-white/10"
      >
        {isOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
      </button>

      {/* Main Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-full bg-blue-950 text-white transform transition-transform duration-300 ease-in-out
        /* Logic: Hide if screen <= 1500px unless 'isOpen' is true. Always show if > 1500px */
        ${isOpen ? "translate-x-0" : "-translate-x-full"} min-[1501px]:translate-x-0 min-[1501px]:static 
        flex flex-col h-screen overflow-y-auto border-r border-white/10
      `}>

        {/* Logo Section */}
        <div className='flex flex-row p-6 items-center gap-3 border-b border-white/5'>
          <img className='size-10 object-contain' src={logo} alt="MCK Logo" />
          <p className="font-bold text-xl tracking-tight italic">MCK Embakasi</p>
        </div>

        {/* Navigation Section */}
        <nav className='flex-1 px-3 py-6'>
          <ul className='space-y-2'>
            {/* Dashboard Link */}
            <li>
              <NavLink
                to='/dashboard'
                onClick={() => setIsOpen(false)} // Close menu on click for small screens
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-slate-300'}`}
              >
                <MdDashboard size={22} />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* Member Management with Dropdown */}
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full ${baseClass} justify-between text-slate-300`}
              >
                <div className="flex items-center gap-3">
                  <FaUsers size={22} />
                  <span>Members</span>
                </div>
                <FaChevronDown size={12} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className='pl-6 mt-1 space-y-1 border-l border-white/10 ml-6'>
                  {['All', 'Men', 'Women', 'Youth', 'JSS', 'Clergy'].map((group) => (
                    <li key={group}>
                      <NavLink
                        to={`/members/${group.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-sm transition-colors ${isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        <FaChevronRight size={10} />
                        {group} Members
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Dynamic Other Links */}
            {navItems.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-slate-300'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Illustration */}
        <div className='p-6 mt-auto'>
          <div className='bg-blue-900/40 rounded-xl p-4 flex justify-center items-center backdrop-blur-sm'>
            <img src={churchFamily} alt="Church Family" className="w-40 h-auto opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Mobile Overlay - Visible when width <= 1500px AND menu is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 min-[1501px]:hidden"
        />
      )}
    </>
  );
};

export default Sidenav;