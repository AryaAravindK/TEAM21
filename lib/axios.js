import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://<your-ip>:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default instance;
