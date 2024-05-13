import './dashboard.css';
import compUser from '../../../images/comp-user.jpg';
import { Link } from 'react-router-dom';
import GetMmf from '../../routes/fetch-mmf/GetMmf';
import { useState } from 'react';
import WomenFellowship from '../../routes/women-fellowship/womenFellowship';
import FetchAllMembers from '../../routes/fetch-members/FetchAllMembers';
import Youth from '../../routes/youth/Youth';
import Jss from '../../routes/jss/Jss';

function Dashboard(){
  const [mmfCount, setMmfCount] = useState(0);
  const [mwfCount, setMwfCount] = useState(0);
  const [totalMembersCount, setTotalMembersCount] = useState(0);
  const [myfCount, setMyfCount] = useState(0);
  const [jssCount, setJssCount] = useState(0);

  // mmf
  const updateMmfCount = (count) => {
    setMmfCount(count);
  }  
  
  // mwf
  const updateMwfCount = (count) => {
    setMwfCount(count);
  }
  // all members count
  const updateTotalMembers = (count) => {
    setTotalMembersCount(count)
  }

  // myf
  const updateMyfCount = (count) => {
    setMyfCount(count);
    console.log(`Youth count is: ${count}`);
  }

  // jss
  const updateJssCount = (count) => {
    setJssCount(count);
  }
  return (  
      <div className='dashboard'>
        <div className='dashboard-container'>
          <div className='upper-row'>
            <div className='upper-col'>
              <h1>Welcome to MCK Embakasi Church management system</h1>
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

              <Link to="/full-members" className='report-link'>
                <button className='sidebar-btn'>View full member</button>
              </Link>

              <Link to="/associate-members" className='report-link'>
                <button className='sidebar-btn'>Associate member</button>              
              </Link>
            </div>

            <div className='rows'>
              <div className='dashboard-row'> 

                  <div className='dashboard-col'>   
                    <span class="material-symbols-outlined">
                      query_stats
                    </span> 
                    <h3>All Members</h3>
                    <h1>{totalMembersCount}</h1>
                    <span className='dashboard-children'>{< FetchAllMembers updateTotalMembers={updateTotalMembers} />}</span>

                  </div>

                              
                  <div className='dashboard-col'>
                    <span class="material-symbols-outlined">
                      male
                    </span>
                    <h3>Men Fellowship members</h3>
                    <h1>{ mmfCount }</h1>
                    <span className='dashboard-children'>{< GetMmf updateMmfCount={updateMmfCount} />}</span>
                  </div>  

                  <div className='dashboard-col'>
                    <span class="material-symbols-outlined">
                      female
                    </span>
                    <h3>Women Fellowship members</h3>
                    <h1>{mwfCount}</h1>
                    <span className='dashboard-children'>{< WomenFellowship updateMwfCount={updateMwfCount} />}</span>
                  </div>             
              </div>

              <div className='dashboard-row'>       
                  <div className='dashboard-col'>
                    <span class="material-symbols-outlined">
                      diversity_1
                    </span>
                    <h3>Find youth members</h3>
                    <h1>{myfCount}</h1>
                    <span className='dashboard-children'>{< Youth updateMyfCount={updateMyfCount} />}</span>

                  </div>            
              </div>

              {/* Another row */}
              <div className='dashboard-row'>              
                <div className='dashboard-col'>
                  <sh3an class="material-symbols-outlined">
                    diversity_3
                  </sh3an>
                  <h3>JSS Members</h3>
                  <h1>{jssCount}</h1>
                  <span className='dashboard-children'>{< Jss updateJssCount={updateJssCount} />}</span>

                </div>

                <div className='dashboard-col'>
                  <sh3an class="material-symbols-outlined">
                    church
                  </sh3an>
                  <h3>Full members</h3>
                  {/* <h1>{full}</h1> */}
                </div>

                <div className='dashboard-col'>
                  <sh3an class="material-symbols-outlined">
                    other_houses
                  </sh3an>
                  <h3>Associate Members</h3>
                  {/* <h1>{associate}</h1> */}
                </div>           
              </div>          
            </div>
          </div>
        </div>
      </div>
  );
}


export default Dashboard;
