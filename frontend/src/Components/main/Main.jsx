import Dashboard from '../pages/dashboard/Dashboard';
import Test from '../pages/test/Test';
import Login from '../pages/login/Login'
import './main.css';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/register/Register';
import CreateMember from '../routes/createMember/CreateMember';
import FetchAllMembers from '../routes/fetch-members/FetchAllMembers';
import FetchMember from '../routes/fetch-member/FetchMember';
import GetMmf from '../routes/fetch-mmf/GetMmf';
import WomenFellowship from '../routes/women-fellowship/womenFellowship';
import Youth from '../routes/youth/Youth';
import Jss from '../routes/jss/Jss';
import Married from '../routes/married/Married';
import FullMember from '../routes/full-members/FullMembers';
import AssociateMembers from '../routes/associate-members/AssociateMembers';
import NotFound from '../NotFound';
import Home from '../pages/home/Home';
import NavBar from '../nav-bar/NavBar';

function Main() {
  return (
    <div className="main">
      <NavBar />
        <Routes> 
          <Route path="/" element={<Home />} />       
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={ < Test/> } />
          <Route path="/login" element={ < Login /> } />
          <Route path="/register" element={ < Register /> } />
          <Route path="/add" element={ < CreateMember /> } />
          <Route path="/all-members" element = {<FetchAllMembers />} />
          <Route path="/get-a-member" element = {<FetchMember />} />
          <Route path="/men-fellowship" element = {<GetMmf />} />
          <Route path="/women-fellowship" element = {<WomenFellowship />} />
          <Route path="/youth" element = {<Youth />} />
          <Route path="/jss" element = {<Jss />} />
          <Route path="/married" element = {<Married />} />
          <Route path="/full-members" element = {<FullMember />} />
          <Route path="/associate-members" element = {<AssociateMembers />} />
          <Route path="*" element = {<NotFound />} />
        </Routes>
      
    </div>
  );
}

export default Main;