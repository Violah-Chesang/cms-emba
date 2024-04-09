import React from 'react';
import './dashboard.css';
import compUser from '../../../images/comp-user.jpg';
import { Link } from 'react-router-dom';

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
              <h1>Welcome to Church Central management System</h1>
              <p>Church management made  simple. <br /> Get the church's information with just a click! </p>
            </div>
            <div className='upper-col'>
              <img src={compUser} alt='Computer user' className='dashboard-comp-user'/>
            </div>
          </div>
          <div className='rows'>
            <div className='dashboard-row'>
              <div className='dashboard-col'>
                <h2>Register a member</h2>
                
              </div>
              <Link to="/all-members">
                <div className='dashboard-col'>                
                    <h2>Search a member</h2>                
                </div>
              </Link>
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
                <h2>Find active members</h2>
              </div>
              <div className='dashboard-col'>
                <h2>Find married members</h2>
              </div>
              <div className='dashboard-col'>
                <h2>Find under 18 members</h2>
              </div>              
            </div>

            {/* Another row */}
            <div className='dashboard-row'>
              <div className='dashboard-col'>
                <h2>Find married embers</h2>
              </div>
              <div className='dashboard-col'>
                <h2>Find dormant members</h2>
              </div>
              <div className='dashboard-col'>
                <h2>Find full members</h2>
              </div>             
            </div>
          
          </div>

        </div>

      </div>
  );
}


export default Dashboard;
