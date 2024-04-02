import Dashboard from '../pages/dashboard/Dashboard';
import Test from '../pages/test/Test';
import Login from '../pages/login/Login'
import './main.css';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/register/Register';
import CreateMember from '../routes/createMember/CreateMember';

function Main() {
  return (
    <div className="main">
        <Routes>        
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={ < Test/> } />
            <Route path="/login" element={ < Login /> } />
            <Route path="/register" element={ < Register /> } />
            <Route path="/add" element={ < CreateMember /> } />
        </Routes>
      
    </div>
  );
}

export default Main;