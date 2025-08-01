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

const fetchDonationRequests = async ({ queryKey }) => {
  const [_key, page, status] = queryKey;
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/donation-requests`, {
    params: { page, limit: 10, status },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const fetchUserRoleAndStatus = async (email) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${email}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
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

const deleteDonationRequest = async (id) => {
  const token = localStorage.getItem('access_token');
  return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const AllBloodDonationRequest = () => {
  const { user, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleDelete = async (id) => {
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

  if (isLoading) return <div className="text-center py-10"> <FaHeartbeat className="text-red-500 text5xl animate-pulse" /></div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error.message}</div>;

  return (
    <RoleRoute>
      <motion.div
        className="px-4 md:px-10 py-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="lg:text-2xl font-bold text-red-600 text-[18px] flex items-center gap-2">
            <FaHeartbeat className="text-red-500 text-4xl lg:text-5xl animate-pulse" /> Blood Donation Requests
          </h2>
          <div className="flex items-center gap-2">
            <MdOutlineFilterList className="text-xl text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="select select-bordered select-sm"
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
          <table className="table table-zebra w-full text-sm md:text-base">
            <thead className="bg-red-600 text-white">
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
              {donationRequests.map((req) => (
                <motion.tr
                  key={req._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * Math.random() }}
                  className="hover:bg-red-50"
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
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    ) : (
                      <span className="badge">{req.status}</span>
                    )}
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    {canView && (
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => navigate(`/donation-details/${req._id}`)}
                      >
                        <FaEye />
                      </button>
                    )}
                    {canEditDelete && (
                      <>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-error"
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
              className={`btn btn-sm ${page === i + 1 ? 'btn-error' : 'btn-outline'}`}
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



// // export default AllBloodDonationRequest;import { useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { AuthContext } from '../../../Providers/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import RoleRoute from '../../../Routers/RoleRoute';
// import Swal from 'sweetalert2';
// import { useContext, useEffect, useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// const fetchDonationRequests = async ({ queryKey }) => {
//   const [_key, page, status] = queryKey;
//   const token = localStorage.getItem('access_token');
//   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/donation-requests`, {
//     params: { page, limit: 10, status },
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// };

// const fetchUserRoleAndStatus = async (email) => {
//   const token = localStorage.getItem('access_token');
//   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${email}`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// };

// const updateDonationRequestStatus = async (id, status) => {
//   const token = localStorage.getItem('access_token');
//   const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`, { status }, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// };

// const deleteDonationRequest = async (id) => {
//   const token = localStorage.getItem('access_token');
//   return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`, {
//     headers: { Authorization: `Bearer ${token}` }
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
//           console.error(err);
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
//       console.error(err);
//       Swal.fire('Error', 'Failed to update status.', 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmed = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'This action cannot be undone!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (confirmed.isConfirmed) {
//       try {
//         await deleteDonationRequest(id);
//         refetch();
//         Swal.fire('Deleted!', 'Donation request deleted.', 'success');
//       } catch (err) {
//         console.error(err);
//         Swal.fire('Error', 'Could not delete donation request.', 'error');
//       }
//     }
//   };

//   const donationRequests = data?.donationRequests || [];
//   const total = data?.total || 0;
//   const totalPages = Math.ceil(total / 10);

//   const canEditDelete = currentUser?.role === 'admin';
//   const canChangeStatus = ['admin', 'volunteer'].includes(currentUser?.role);

//   if (isLoading) return <div>Loading donation requests...</div>;
//   if (error) return <div>Error loading donation requests: {error.message}</div>;

//   return (
//     <RoleRoute>
//       <div>
//         <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests ({donationRequests.length})</h2>

//         <div className="mb-4">
//           <label className="label">Filter by Status:</label>
//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setPage(1);
//             }}
//             className="select select-bordered"
//           >
//             <option value="">All</option>
//             <option value="pending">Pending</option>
//             <option value="inprogress">In Progress</option>
//             <option value="done">Done</option>
//             <option value="canceled">Canceled</option>
//           </select>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Recipient Name</th>
//                 <th>District</th>
//                 <th>Upazila</th>
//                 <th>Hospital</th>
//                 <th>Address</th>
//                 <th>Blood Group</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Status</th>
//                 {canEditDelete && <th>Actions</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {donationRequests.map((request) => (
//                 <tr key={request._id}>
//                   <td>{request.recipientName}</td>
//                   <td>{request.recipientDistrict}</td>
//                   <td>{request.recipientUpazila}</td>
//                   <td>{request.hospitalName}</td>
//                   <td>{request.fullAddress}</td>
//                   <td>{request.bloodGroup}</td>
//                   <td>{request.donationDate}</td>
//                   <td>{request.donationTime}</td>
//                   <td>
//                     {canChangeStatus ? (
//                       <select
//                         className="select select-bordered select-sm"
//                         value={request.status}
//                         onChange={(e) => handleStatusChange(request._id, e.target.value)}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="inprogress">In Progress</option>
//                         <option value="done">Done</option>
//                         <option value="canceled">Canceled</option>
//                       </select>
//                     ) : (
//                       <span className="badge">{request.status}</span>
//                     )}
//                   </td>
//                   {canEditDelete && (
//                     <td className="space-x-2">
//                       <button
//                         className="btn btn-sm btn-info"
//                         onClick={() => navigate(`/donation-details/${request._id}`)}
//                       >
//                         View
//                       </button>
//                       <button
//                         className="btn btn-sm btn-warning"
//                         onClick={() => navigate(`/dashboard/edit-donation/${request._id}`)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-error"
//                         onClick={() => handleDelete(request._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-4 flex flex-wrap gap-2">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`btn ${page === index + 1 ? 'btn-primary' : 'btn-outline'}`}
//               onClick={() => setPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </RoleRoute>
//   );
// };

// export default AllBloodDonationRequest;
