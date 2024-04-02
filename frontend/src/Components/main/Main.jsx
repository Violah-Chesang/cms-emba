import Dashboard from '../pages/dashboard/Dashboard';
import Test from '../pages/test/Test';
import Login from '../pages/login/Login'
import './main.css';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/register/Register';
import CreateMember from '../routes/createMember/CreateMember';
import FetchAllMembers from '../routes/fetch-members/FetchAllMembers';

function Main() {
  return (
    <div className="main">
        <Routes>        
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={ < Test/> } />
            <Route path="/login" element={ < Login /> } />
            <Route path="/register" element={ < Register /> } />
            <Route path="/add" element={ < CreateMember /> } />
            <Route path="/all-members" element = {<FetchAllMembers />} />
        </Routes>
      
    </div>
  );
}

export default Main;