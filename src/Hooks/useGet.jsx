import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async (email) => {
  const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
  const response = await axios.get(`http://localhost:8001/users/${email}`, {
    headers: {
      Authorization: `Bearer ${token}` // Include the token in the request headers
    }
  });
  return response.data;
};

export const useGet = (email) => {
  return useQuery(['user', email], () => fetchUser(email));
};
