import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';
import logo from '../../../src/images/mck-logo.png';

export default function NavBar() {
  return (
    <nav>
      <div className='nav-logo'>
        <img src={logo} alt='logo' />
      </div>

      {/* <div className='nav-church-name'>
        <span className='emba-name'>embakasi methodist church</span>
      </div> */}

      <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/register'>Signup</NavLink></li>
      </ul>
    </nav>
  )
}
