
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, fetchUserDetails } from '../../store/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (status === 'succeeded' && username) {
      dispatch(fetchUserDetails(username));
      navigate('/dashboard');
    }
  }, [status, token, username, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const data = {
      userName: username,
      password: password,
    };

    dispatch(loginUser(data));
    setUsername(username);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-auth-background h-screen bg-cover bg-opacity-100 shadow-blue-lg">
      <div className="absolute inset-0 bg-blue-950 bg-opacity-80"></div>

      <form
        className="relative z-10 form bg-opacity-80 px-16 py-6 rounded shadow-2xl flex flex-col justify-center items-center"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <img src="../src/assets/mck_logo.png" alt="" width={150} height={150} />
        <div className="flex flex-col mb-1">
          <label className="text-white" htmlFor="username">Username:</label>
          <input
            className="w-96 h-9 rounded m-1 p-2 text-gray-700"
            name="username"
            type="text"
          />
        </div>
        <div className="flex flex-col mb-1">
          <label className="text-white mt-4" htmlFor="password">Password:</label>
          <input
            className="w-96 h-9 rounded m-1 p-2 text-gray-700"
            name="password"
            type="password"
          />
        </div>
        <input
          className="text-white w-48 h-10 bg-sky-700 rounded m-1 mt-4 hover:bg-sky-900"
          type="submit"
          name="submit"
          value="Login"
        />
        {status === 'loading' && <p>Logging in...</p>}
        {status === 'failed' && <p className="text-red-900">{error}</p>}
        <p className="relative z-10 text-gray-400 mt-4">
          Don't have an account? <a href="/signup" className="text-sky-700 hover:text-sky-900">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
