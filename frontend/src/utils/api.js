import axios from 'axios';

// Create a configured instance of axios
const api = axios.create({
  // Ensure this URL points directly to your backend server
  baseURL: 'https://attendance-1-2cfd.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * This is the interceptor. It's a piece of code that runs *before* every single
 * request is sent. Its job is to grab the token from localStorage and
 * add it to the 'Authorization' header. This is how your backend
 * will know that you are logged in and have the correct role.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // The header format must be 'Bearer <token>'
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // This will handle any errors during the request setup
    return Promise.reject(error);
  }
);

export default api;