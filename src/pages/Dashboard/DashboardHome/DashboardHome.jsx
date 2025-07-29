import React, { useEffect, useState } from 'react';
import UserHome from '../UserHome/UserHome';
import AdminHome from '../AdminHome/AdminHome';
import useAuth from '../../../Hooks/useAuth'; // Assuming you have this hook for fetching the logged-in user
import axios from 'axios';

const DashboardHome = () => {
  const { user } = useAuth(); // Logged-in user from AuthProvider
  const [user1, setUser] = useState(null); // Store the fetched user details
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
        const email = user?.email; // Use the logged-in user's email
        if (email) {
          const response = await axios.get(`http://localhost:8001/users/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          });
          setUser(response.data); // Set the fetched user data
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchUser();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div>
     
      <div>
        {user1?.role === 'admin' || user1?.role === 'volunteer' ? (
          <AdminHome />
        ) : user1?.role === 'donor' ? (
          <UserHome />
        ) : (
          <div>Unauthorized Access</div> // Handle unauthorized or unknown roles
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
