import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';

export default function NavBar() {
  return (
    <>
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </ul>
        </nav>
    </>
  )
}
