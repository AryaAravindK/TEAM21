import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.227.138.56:2424/api',
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
