import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaUsers } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loading/Loading';

const AdminHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const fetchAdminState = async () => {
    const response = await axiosPublic.get('/admin-state');
    return response.data;
  };

  const { data: adminState, isLoading, error } = useQuery({
    queryKey: ['adminState'],
    queryFn: fetchAdminState,
  });

  if (isLoading) return <Loading></Loading>
  if (error) return <div className="text-center text-red-500 mt-10">Error fetching admin state</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold text-primary mb-3">Welcome, {user?.displayName} 👋</h2>
        <p className="text-lg text-gray-600">Here's an overview of your  dashboard</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-blue-500"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaUsers className="text-3xl text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{adminState.users}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-green-500"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaBook className="text-3xl text-green-500" />
            <h3 className="text-xl font-semibold text-gray-700">Donation Requests</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{adminState.donationRequest}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-purple-500"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl text-purple-500">$</span>
            <h3 className="text-xl font-semibold text-gray-700">Total Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">${adminState.revenue}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;

