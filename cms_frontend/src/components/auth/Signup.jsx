import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/slice/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/login');
    }
  }, [status, navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();

    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const username = event.target.username.value;
    const role = event.target.role.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const payload = {
      firstname,
      lastname,
      userName: username,
      role,
      email,
      password,
    };

    dispatch(registerUser(payload));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-auth-background h-screen bg-cover bg-opacity-100 shadow-blue-lg">
      <div className="absolute inset-0 bg-blue-950 bg-opacity-60"></div>
      <form
        className="relative z-10 form bg-opacity-80 px-12 py-6 rounded shadow-2xl flex flex-col justify-center items-center"
        autoComplete="off"
        onSubmit={handleRegister}
      >
        <img src="../src/assets/mck_logo.png" alt="" width={140} height={140} />
        <div className="grid grid-cols-2 gap-4 w-3/4">
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="firstName">First Name:</label>
            <input className="h-9 rounded m-1 p-2  w-80" type="text" name="firstname" placeholder="e.g. John" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="lastName">Last Name:</label>
            <input className="h-9 rounded m-1 p-2 w-80" type="text" name="lastname" placeholder="e.g. Doe" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="username">Username:</label>
            <input className="h-9 rounded m-1 p-2 w-80" type="text" name="username" placeholder="e.g. jdoe" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="role">Role:</label>
            <input className="h-9 rounded m-1 p-2 w-80" type="text" name="role" placeholder="e.g. Minister" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="email">Email:</label>
            <input className="h-9 rounded m-1 p-2 w-80" type="email" name="email" placeholder="e.g. johndoe@email.com" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="password">Password:</label>
            <input className="h-9 rounded m-1 p-2 w-80" type="password" name="password" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="confirmPassword">Confirm Password:</label>
            <input className="h-9 rounded m-1 p-2 w-80" type="password" name="confirmPassword" />
          </div>
        </div>
        <input className="text-white w-48 h-10 bg-sky-700 rounded m-1 mt-4 hover:bg-sky-900" type="submit" value="Register" />
        {status === 'loading' && <p>Registering...</p>}
        {status === 'failed' && <p className="text-red-500">{error}</p>}
        <p className="relative z-10 text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-sky-700 hover:text-sky-900">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
