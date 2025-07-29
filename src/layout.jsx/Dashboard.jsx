import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaTachometerAlt, FaRegFileAlt, FaPlusCircle, FaListAlt } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import '../CSS/Dashboard/Dashboard.css';

const Dashboard = () => {
  const [user1, setUser] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.email) return;
        const response = await axiosSecure.get(`/users/${user.email}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [user, axiosSecure]);

  if (!user1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-red-600 text-white shadow-lg p-5">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <ul className="space-y-3 text-base font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
              }
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
              }
            >
              <FaTachometerAlt /> Dashboard Home
            </NavLink>
          </li>

          <div className="divider my-2"></div>

          {user1.role === 'admin' && (
            <li>
              <NavLink
                to="allUser"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
                }
              >
                <FaUsers /> All Users
              </NavLink>
            </li>
          )}

          {(user1.role === 'admin' || user1.role === 'volunteer') && (
            <>
              <li>
                <NavLink
                  to="all-blood-donation-request"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
                  }
                >
                  <FaListAlt /> All Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="content-management"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
                  }
                >
                  <FaRegFileAlt /> Content Management
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
              }
            >
              <FaUser /> Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="donationRequest"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
              }
            >
              <FaPlusCircle /> Create Request
            </NavLink>
          </li>

          {user1.role === 'donor' && (
            <li>
              <NavLink
                to="myDonationRequest"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-700 ${isActive ? 'bg-red-700' : ''}`
                }
              >
                <FaListAlt /> My Donation Requests
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-white overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
