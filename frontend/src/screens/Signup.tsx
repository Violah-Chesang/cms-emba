import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import AuthInput from '../components/auth/AuthInput'; // Import AuthInput component

// Define type for form data
interface FormData {
  firstname: string;
  lastname: string;
  userName: string;
  role: 'Minister' | 'Executive Leader' | 'Fellowship Leader' | 'Other';
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth);

  // Initialize form data with TypeScript type
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    userName: '',
    role: 'Other',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input change for text and select fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...formData,
    };

    dispatch(registerUser(payload));
  };

  // Redirect to login page on successful registration
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/login');
    }
  }, [status, navigate]);

  return (
    <div className="flex flex-col justify-center items-center bg-auth-background h-screen bg-cover bg-opacity-100 shadow-blue-lg">
      <div className="absolute inset-0 bg-blue-950 bg-opacity-80"></div>
      <form
        className="relative z-10 form bg-opacity-80 px-16 py-6 rounded shadow-2xl flex flex-col justify-center items-center"
        autoComplete="off"
        onSubmit={handleRegister}
      >
        <img src="../src/assets/mck_logo.png" alt="" width={130} height={130} />
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
            label="First Name"
            name="firstname"
            type="text"
            onChange={handleInputChange}
            value={formData.firstname}
          />
          <AuthInput
            label="Last Name"
            name="lastname"
            type="text"
            onChange={handleInputChange}
            value={formData.lastname}
          />
          <AuthInput
            label="Username"
            name="userName"
            type="text"
            onChange={handleInputChange}
            value={formData.userName}
          />
          <div className="flex flex-col mb-4">
            <label className="text-white" htmlFor="role">Role:</label>
            <select
              className="h-9 rounded m-1 p-2 w-96"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="Minister">Minister</option>
              <option value="Executive Leader">Executive Leader</option>
              <option value="Fellowship Leader">Fellowship Leader</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <AuthInput
            label="Email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={formData.email}
          />
          <AuthInput
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={formData.password}
          />
          <AuthInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
        <input
          className="text-white w-48 h-10 bg-sky-700 rounded m-1 mt-4 hover:bg-sky-900"
          type="submit"
          value="Register"
        />
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
