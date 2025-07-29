// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from './useAuth';  // Make sure this path is correct

// const useAxiosSecure = () => {
//   const { logOut } = useAuth();  // Destructure logOut from your auth context
//   const navigate = useNavigate();

//   const axiosSecure = axios.create({
//     baseURL: 'http://localhost:8001/',  // Update to your API's base URL
//   });

//   useEffect(() => {
//     // Request Interceptor
//     axiosSecure.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem('access_token');
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     // Response Interceptor
//     axiosSecure.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//           // Unauthorized or Forbidden response
//           localStorage.removeItem('access_token');  // Clear the token
//           await logOut();  // Ensure logout function is called to clear the user session
//           alert('Session expired or unauthorized access. Please log in again.');
//           navigate('/login', { replace: true });  // Redirect to login
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [logOut, navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Create axios instance once outside the hook
const axiosSecure = axios.create({
  baseURL: 'http://localhost:8001/',
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const interceptorsAdded = useRef(false);

  useEffect(() => {
    if (!interceptorsAdded.current) {
      // Request interceptor to add token header
      axiosSecure.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('access_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // Response interceptor to handle 401/403 errors
      axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('access_token');
            await logOut();
            alert('Session expired or unauthorized access. Please log in again.');
            navigate('/login', { replace: true });
          }
          return Promise.reject(error);
        }
      );

      interceptorsAdded.current = true;  // Mark interceptors as added
    }
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
