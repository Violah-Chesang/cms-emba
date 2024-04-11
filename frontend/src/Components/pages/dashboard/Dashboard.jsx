import React from 'react';
import './dashboard.css';
import compUser from '../../../images/comp-user.jpg';
import { Link } from 'react-router-dom';
import logo from '../../../../src/images/mck-logo.png';

function Dashboard(){  
  return (  
      <div className='dashboard'>
        <div className='dashboard-container'>
          {/* <div className='dashboard-header'>
            <ul>
              <li>LOGO</li>
              <li>DASHBOARD</li>
              <li>LOGOUT</li>
            </ul>
          </div> */}
          {/* Upper columns of the dashboard */}
          <div className='upper-row'>
            <div className='upper-col'>
              {/* <img src={logo} alt='logo' /> */}
              <h1>Welcome to Church Central management System</h1>
              <p>Church management made  simple. <br /> Get the church information with a click! </p>
            </div>
            <div className='upper-col'>
              <img src={compUser} alt='Computer user' className='dashboard-comp-user'/>
            </div>
          </div>

          {/* sidebar */}
          <div className='rows-cover'>
            <div className='sidebar'>

              <h1>Reports</h1>
              <Link to="/add" className='report-link'>
                <button className='sidebar-btn'>Add a member</button>
              </Link>
              
              <Link to="/get-a-member" className='report-link'>
                <button className='sidebar-btn'>Search a member</button>
              </Link>

              <Link to="/all-members" className='report-link'>
                <button className='sidebar-btn'>View all member</button>
              </Link>

              <Link to="/jss" className='report-link'>
                <button className='sidebar-btn'>View JSS member</button>
              </Link>

              <Link to="/youth" className='report-link'>
                <button className='sidebar-btn'>View Youth member</button>
              </Link>

              <Link to="/men-fellowship" className='report-link'>
                <button className='sidebar-btn'>View MMF member</button>
              </Link>

              <Link to="/women-fellowship" className='report-link'>
                <button className='sidebar-btn'>View W.F member</button>
              </Link>

              <Link to="/married" className='report-link'>
                <button className='sidebar-btn'>All Married member</button>
              </Link>

              <Link to="/active" className='report-link'>
                <button className='sidebar-btn'>View Active member</button>
              </Link>

              <Link to="/active" className='report-link'>
                <button className='sidebar-btn'>Update a Member</button>
              </Link>

              <Link to="/full" className='report-link'>
                <button className='sidebar-btn'>View full member</button>
              </Link>

              <Link to="/associate-members" className='report-link'>
                <button className='sidebar-btn'>Associate member</button>              
              </Link>
            </div>

            <div className='rows'>
            <div className='dashboard-row'>
                <div className='dashboard-col'>
                  <h2>Register a member</h2>                
                </div>              
                <div className='dashboard-col'>                
                    <h2>Search a member</h2>                
                </div>              
                <div className='dashboard-col'>
                  <h2>Find all members</h2>
                </div>
              <div className='dashboard-col'>
                <h2>Update a member</h2>
              </div>              
            </div>

            <div className='dashboard-row'>
                <div className='dashboard-col'>
                  <h2>Delete a member</h2>
                </div>              
                <div className='dashboard-col'>
                  <h2>Find MMF members</h2>
                </div>              
                <div className='dashboard-col'>
                  <h2>Find WF members</h2>
                </div>              
                <div className='dashboard-col'>
                  <h2>Find youth members</h2>
                </div>            
            </div>

            {/* Another row */}
            <div className='dashboard-row'>              
                <div className='dashboard-col'>
                  <h2>Find JSS Members</h2>
                </div>              
                <div className='dashboard-col'>
                  <h2>Find full members</h2>
                </div>              
                <div className='dashboard-col'>
                  <h2>Find associate Members</h2>
                </div>               
                <div className='dashboard-col'>
                  <h2>Find married members</h2>
                </div>            
            </div>          
          </div>
          </div>
        </div>
      </div>
  );
}


export default Dashboard;
