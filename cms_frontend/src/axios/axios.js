// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cms-emba-api.vercel.app/',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
