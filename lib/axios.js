import axios from 'axios';

const api = axios.create({
  baseURL: 'https://863e96daf242.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error--->:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
