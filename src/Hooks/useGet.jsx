import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async (email) => {
 const token = localStorage.getItem('access_token');

const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${email}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

  return response.data;
};

export const useGet = (email) => {
  return useQuery(['user', email], () => fetchUser(email));
};
