//  import axios from 'axios';
// import { AuthContext } from '../../../Providers/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import RoleRoute from '../../../Routers/RoleRoute';
// import Swal from 'sweetalert2';
// import { useContext, useEffect, useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
// import { FaTrashAlt, FaEdit, FaEye, FaHeartbeat } from 'react-icons/fa';
// import { MdOutlineFilterList } from 'react-icons/md';

// const fetchDonationRequests = async ({ queryKey }) => {
//   const [_key, page, status] = queryKey;
//   const token = localStorage.getItem('access_token');
//   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/donation-requests`, {
//     params: { page, limit: 10, status },
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// const fetchUserRoleAndStatus = async (email) => {
//   const token = localStorage.getItem('access_token');
//   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${email}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// const updateDonationRequestStatus = async (id, status) => {
//   const token = localStorage.getItem('access_token');
//   const response = await axios.patch(
//     `${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`,
//     { status },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// const deleteDonationRequest = async (id) => {
//   const token = localStorage.getItem('access_token');
//   return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// const AllBloodDonationRequest = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [page, setPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [currentUser, setCurrentUser] = useState(null);
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUserRoleAndStatus = async () => {
//       if (user?.email) {
//         try {
//           const userData = await fetchUserRoleAndStatus(user.email);
//           if (!userData || userData.status === 'blocked') {
//             logout();
//             navigate('/login');
//           } else {
//             setCurrentUser(userData);
//           }
//         } catch (err) {
//           logout();
//           navigate('/login');
//         }
//       }
//     };
//     checkUserRoleAndStatus();
//   }, [user, logout, navigate]);

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ['donationRequests', page, statusFilter],
//     queryFn: fetchDonationRequests,
//     keepPreviousData: true,
//     enabled: !!user?.email,
//   });

//   const handleStatusChange = async (id, status) => {
//     try {
//       await updateDonationRequestStatus(id, status);
//       queryClient.invalidateQueries(['donationRequests', page, statusFilter]);
//       Swal.fire('Updated', `Donation request marked as ${status}.`, 'success');
//     } catch (err) {
//       Swal.fire('Error', 'Failed to update status.', 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmed = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'This action cannot be undone!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (confirmed.isConfirmed) {
//       try {
//         await deleteDonationRequest(id);
//         refetch();
//         Swal.fire('Deleted!', 'Donation request deleted.', 'success');
//       } catch (err) {
//         Swal.fire('Error', 'Could not delete donation request.', 'error');
//       }
//     }
//   };

//   const donationRequests = data?.donationRequests || [];
//   const totalPages = Math.ceil((data?.total || 0) / 10);

//   const canEditDelete = currentUser?.role === 'admin';
//   const canChangeStatus = ['admin', 'volunteer'].includes(currentUser?.role);
//   const canView = ['admin', 'volunteer'].includes(currentUser?.role);

//   if (isLoading) return <div className="text-center py-10"> <FaHeartbeat className="text-red-500 text5xl animate-pulse" /></div>;
//   if (error) return <div className="text-red-500 text-center py-10">Error: {error.message}</div>;

//   return (
//     <RoleRoute>
//       <motion.div
//         className="px-4 md:px-10 py-8 max-w-7xl mx-auto"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="lg:text-2xl font-bold text-red-600 text-[18px] flex items-center gap-2">
//             <FaHeartbeat className="text-red-500 text-4xl lg:text-5xl animate-pulse" /> Blood Donation Requests
//           </h2>
//           <div className="flex items-center gap-2">
//             <MdOutlineFilterList className="text-xl text-gray-600" />
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setPage(1);
//               }}
//               className="select select-bordered select-sm"
//             >
//               <option value="">All</option>
//               <option value="pending">Pending</option>
//               <option value="inprogress">In Progress</option>
//               <option value="done">Done</option>
//               <option value="canceled">Canceled</option>
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto shadow-md rounded-lg">
//           <table className="table table-zebra w-full text-sm md:text-base">
//             <thead className="bg-red-600 text-white">
//               <tr>
//                 <th>Recipient</th>
//                 <th>District</th>
//                 <th>Upazila</th>
//                 <th>Hospital</th>
//                 <th>Address</th>
//                 <th>Blood</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {donationRequests.map((req) => (
//                 <motion.tr
//                   key={req._id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.05 * Math.random() }}
//                   className="hover:bg-red-50"
//                 >
//                   <td>{req.recipientName}</td>
//                   <td>{req.recipientDistrict}</td>
//                   <td>{req.recipientUpazila}</td>
//                   <td>{req.hospitalName}</td>
//                   <td>{req.fullAddress}</td>
//                   <td>{req.bloodGroup}</td>
//                   <td>{req.donationDate}</td>
//                   <td>{req.donationTime}</td>
//                   <td>
//                     {canChangeStatus ? (
//                       <select
//                         value={req.status}
//                         className="select select-bordered select-xs"
//                         onChange={(e) => handleStatusChange(req._id, e.target.value)}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="inprogress">In Progress</option>
//                         <option value="done">Done</option>
//                         <option value="canceled">Canceled</option>
//                       </select>
//                     ) : (
//                       <span className="badge">{req.status}</span>
//                     )}
//                   </td>
//                   <td className="flex gap-2 flex-wrap">
//                     {canView && (
//                       <button
//                         className="btn btn-sm btn-info"
//                         onClick={() => navigate(`/donation-details/${req._id}`)}
//                       >
//                         <FaEye />
//                       </button>
//                     )}
//                     {canEditDelete && (
//                       <>
//                         <button
//                           className="btn btn-sm btn-warning"
//                           onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-error"
//                           onClick={() => handleDelete(req._id)}
//                         >
//                           <FaTrashAlt />
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-6 flex-wrap gap-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               className={`btn btn-sm ${page === i + 1 ? 'btn-error' : 'btn-outline'}`}
//               onClick={() => setPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </motion.div>
//     </RoleRoute>
//   );
// };

// export default AllBloodDonationRequest;


import axios from 'axios';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import RoleRoute from '../../../Routers/RoleRoute';
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaEdit, FaEye, FaHeartbeat } from 'react-icons/fa';
import { MdOutlineFilterList } from 'react-icons/md';

const getCSSVar = name =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const fetchDonationRequests = async ({ queryKey }) => {
  const [_key, page, status] = queryKey;
  const token = localStorage.getItem('access_token');
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/donation-requests`,
    {
      params: { page, limit: 10, status },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const fetchUserRoleAndStatus = async email => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/${email}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const updateDonationRequestStatus = async (id, status) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const deleteDonationRequest = async id => {
  const token = localStorage.getItem('access_token');
  return await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const AllBloodDonationRequest = () => {
  const { user, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    secondary: getCSSVar('--secondary'),
    text: getCSSVar('--text'),
    background: getCSSVar('--background'),
    accent: getCSSVar('--accent'),
    neutral: getCSSVar('--neutral'),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRoleAndStatus = async () => {
      if (user?.email) {
        try {
          const userData = await fetchUserRoleAndStatus(user.email);
          if (!userData || userData.status === 'blocked') {
            logout();
            navigate('/login');
          } else {
            setCurrentUser(userData);
          }
        } catch (err) {
          logout();
          navigate('/login');
        }
      }
    };
    checkUserRoleAndStatus();
  }, [user, logout, navigate]);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar('--primary'),
        secondary: getCSSVar('--secondary'),
        text: getCSSVar('--text'),
        background: getCSSVar('--background'),
        accent: getCSSVar('--accent'),
        neutral: getCSSVar('--neutral'),
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['donationRequests', page, statusFilter],
    queryFn: fetchDonationRequests,
    keepPreviousData: true,
    enabled: !!user?.email,
  });

  const handleStatusChange = async (id, status) => {
    try {
      await updateDonationRequestStatus(id, status);
      queryClient.invalidateQueries(['donationRequests', page, statusFilter]);
      Swal.fire('Updated', `Donation request marked as ${status}.`, 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to update status.', 'error');
    }
  };

  const handleDelete = async id => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteDonationRequest(id);
        refetch();
        Swal.fire('Deleted!', 'Donation request deleted.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Could not delete donation request.', 'error');
      }
    }
  };

  const donationRequests = data?.donationRequests || [];
  const totalPages = Math.ceil((data?.total || 0) / 10);

  const canEditDelete = currentUser?.role === 'admin';
  const canChangeStatus = ['admin', 'volunteer'].includes(currentUser?.role);
  const canView = ['admin', 'volunteer'].includes(currentUser?.role);

  if (isLoading)
    return (
      <div className="text-center py-10">
        <FaHeartbeat
          className="text-5xl animate-pulse"
          style={{ color: `rgb(${colors.primary})` }}
        />
      </div>
    );

  if (error)
    return (
      <div
        className="text-center py-10"
        style={{ color: `rgb(${colors.primary})` }}
      >
        Error: {error.message}
      </div>
    );

  return (
    <RoleRoute>
      <motion.div
        className="px-4 md:px-10 py-8 max-w-7xl mx-auto rounded-xl shadow-lg"
        style={{
          backgroundColor: `rgb(${colors.neutral})`,
          color: `rgb(${colors.text})`,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="lg:text-2xl font-bold text-[18px] flex items-center gap-2"
            style={{ color: `rgb(${colors.primary})` }}
          >
            <FaHeartbeat
              className="text-4xl lg:text-5xl animate-pulse"
              style={{ color: `rgb(${colors.secondary})` }}
            />{' '}
            Blood Donation Requests
          </h2>
          <div className="flex items-center gap-2">
            <MdOutlineFilterList className="text-xl" />
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="select select-bordered select-sm"
              style={{
                background: `rgb(${colors.background})`,
                color: `rgb(${colors.text})`,
              }}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table
            className="table table-zebra w-full text-sm md:text-base"
            style={{ color: `rgb(${colors.text})` }}
          >
            <thead style={{ background: `rgb(${colors.primary})`, color: '#fff' }}>
              <tr>
                <th>Recipient</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Hospital</th>
                <th>Address</th>
                <th>Blood</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests.map(req => (
                <motion.tr
                  key={req._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * Math.random() }}
                  className="hover:opacity-80"
                  style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.text})` }}
                >
                  <td>{req.recipientName}</td>
                  <td>{req.recipientDistrict}</td>
                  <td>{req.recipientUpazila}</td>
                  <td>{req.hospitalName}</td>
                  <td>{req.fullAddress}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>
                    {canChangeStatus ? (
                      <select
                        value={req.status}
                        className="select select-bordered select-xs"
                         style={{ backgroundColor: `rgb(${colors.primary})`, color: `rgb(${colors.text})`, }}
                        onChange={e =>
                          handleStatusChange(req._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    ) : (
                      <span className="badge"
                       >{req.status}</span>
                    )}
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    {canView && (
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: `rgb(${colors.secondary})`, color: `rgb(${colors.text})`, }}
                        onClick={() => navigate(`/donation-details/${req._id}`)}
                      >
                        <FaEye />
                      </button>
                    )}
                    {canEditDelete && (
                      <>
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: `rgb(${colors.accent})`, color: `rgb(${colors.text})`, }}
                          onClick={() =>
                            navigate(`/dashboard/edit-donation/${req._id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: `rgb(${colors.primary})`, color: `rgb(${colors.text})`, }}
                          onClick={() => handleDelete(req._id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className="btn btn-sm"
              style={{
                background:
                  page === i + 1 ? `rgb(${colors.primary})` : 'transparent',
                color: page === i + 1 ? '#fff' : `rgb(${colors.text})`,
                border: `1px solid rgb(${colors.primary})`,
              }}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </motion.div>
    </RoleRoute>
  );
};

export default AllBloodDonationRequest;
