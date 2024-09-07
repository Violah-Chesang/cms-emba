import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import logo from '../assets/mck_logo.png';
import AuthInput from '../components/auth/AuthInput';
import useAuthStatus from '../hooks/useAuthStatus';
import { AppDispatch } from '../store/store';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { status } = useAuthStatus(username);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(loginUser({ userName: username, password }));
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-auth-background h-screen bg-cover bg-opacity-100 shadow-blue-lg">
      <div className="absolute inset-0 bg-blue-950 bg-opacity-80"></div>

      <form
        className="relative z-10 form bg-opacity-80 px-16 py-6 rounded shadow-2xl flex flex-col justify-center items-center"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <img src={logo} alt="logo" width={150} height={150} />
        <p
          style={{
            fontSize: '25px',
            background: '-webkit-linear-gradient(#ffffff, #0C4A6E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '15px',
          }}
        >
          EMBAKASI METHODIST CHURCH
        </p>
        <AuthInput 
          label="Username" 
          name="username" 
          type="text" 
          value={username} 
          onChange={handleUsernameChange} 
        />
        <AuthInput 
          label="Password" 
          name="password" 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
        />
        <input
          className="text-white w-48 h-10 bg-sky-700 rounded m-1 mt-4 hover:bg-sky-900"
          type="submit"
          name="submit"
          value="Login"
        />
        {status === 'loading' && <p>Logging in...</p>}
        {status === 'failed' && <p className="text-red-900">Login failed. Please try again.</p>}
        <p className="relative z-10 text-gray-400 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-sky-700 hover:text-sky-900">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
