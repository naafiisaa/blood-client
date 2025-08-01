// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../../Providers/AuthProvider';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';

// import { FiEdit, FiTrash2, FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';

// const updateDonationRequestStatus = async (id, status) => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}/status`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });
//     return response.json();
//   } catch (error) {
//     console.error('Error updating donation request status:', error);
//   }
// };

// const deleteDonationRequest = async (id) => {
//   try {
//     await fetch(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`, { method: 'DELETE' });
//   } catch (error) {
//     console.error('Error deleting donation request:', error);
//   }
// };

// const statusColors = {
//   inprogress: 'bg-yellow-200 text-yellow-800',
//   pending: 'bg-gray-200 text-gray-700',
//   done: 'bg-green-200 text-green-800',
//   canceled: 'bg-red-200 text-red-800',
// };

// const UserHome = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const axiosSecure = useAxiosSecure();
//   const [editingId, setEditingId] = useState(null);
//   const [newStatus, setNewStatus] = useState('');

//   const fetchDonationRequests = async () => {
//     try {
//       const response = await axiosSecure.get(
//         `/donation-requests/user/${user?.email}?limit=3&page=1`
//       );
//       return response.data.donationRequests || [];
//     } catch (error) {
//       console.error("Error fetching donation requests:", error);
//       return [];
//     }
//   };

//   const { data: donationRequests = [], isLoading, error } = useQuery({
//     queryKey: ['donationRequests', user?.email],
//     queryFn: fetchDonationRequests,
//     enabled: !!user?.email,
//   });

//   const handleEdit = (id, currentStatus) => {
//     setEditingId(id);
//     setNewStatus(currentStatus);
//   };

//   const handleSave = (id) => {
//     updateDonationRequestStatus(id, newStatus).then(() => {
//       queryClient.invalidateQueries(['donationRequests', user?.email]);
//       setEditingId(null);
//       setNewStatus('');
//     });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteDonationRequest(id).then(() => {
//           queryClient.invalidateQueries(['donationRequests', user?.email]);
//           Swal.fire('Deleted!', 'Your donation request has been deleted.', 'success');
//         });
//       }
//     });
//   };

//   const handleView = (id) => {
//     navigate("myDonationRequest");
//   };

//   const handleStatusChange = (id, status) => {
//     updateDonationRequestStatus(id, status).then(() => {
//       queryClient.invalidateQueries(['donationRequests', user?.email]);
//     });
//   };

//   if (isLoading) return <p className="text-center mt-8 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center mt-8 text-red-500">Error loading donation requests: {error.message}</p>;

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h2 className="text-4xl font-semibold text-center text-red-500 mb-8">
//         Welcome <span className="text-blue-500">{user.displayName}</span> to Life Stream
//       </h2>

//       {donationRequests.length > 0 ? (
//         <>
//           <h3 className="text-2xl font-medium mb-4 text-gray-800">Your Recent Donation Requests:</h3>
//           <div className="overflow-x-auto shadow-lg rounded-lg">
//             <table className="table-auto w-full min-w-[800px] bg-white rounded-lg overflow-hidden">
//               <thead className="bg-red-100 text-red-700">
//                 <tr>
//                   {['#', 'Recipient Name', 'Location', 'Date', 'Time', 'Blood Group', 'Status', 'Donor Info', 'Actions'].map((heading) => (
//                     <th key={heading} className="py-3 px-4 text-left font-semibold text-sm uppercase tracking-wider">{heading}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence>
//                   {donationRequests.map((request, index) => (
//                     <motion.tr
//                       key={request._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="border-b last:border-none hover:bg-red-50"
//                     >
//                       <td className="py-3 px-4 text-sm">{index + 1}</td>
//                       <td className="py-3 px-4 text-sm font-medium">{request.recipientName}</td>
//                       <td className="py-3 px-4 text-sm">{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
//                       <td className="py-3 px-4 text-sm">{request.donationDate}</td>
//                       <td className="py-3 px-4 text-sm">{request.donationTime}</td>
//                       <td className="py-3 px-4 text-sm font-semibold text-red-600">{request.bloodGroup}</td>
//                       <td className="py-3 px-4 text-sm">
//                         {editingId === request._id ? (
//                           <select
//                             value={newStatus}
//                             onChange={(e) => setNewStatus(e.target.value)}
//                             className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
//                           >
//                             <option value="">Select Status</option>
//                             <option value="inprogress">In Progress</option>
//                             <option value="pending">Pending</option>
//                             <option value="done">Done</option>
//                             <option value="canceled">Canceled</option>
//                           </select>
//                         ) : (
//                           <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[request.status] || 'bg-gray-200 text-gray-700'}`}>
//                             {request.status}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3 px-4 text-sm break-words max-w-xs">
                        
//                         <div> {request.fullAddress || '-'}</div>
//                       </td>
//                       <td className="py-3 px-4 text-sm space-x-1 flex flex-wrap gap-1">
//                         {editingId === request._id ? (
//                           <button
//                             onClick={() => handleSave(request._id)}
//                             className="btn btn-primary px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded flex items-center gap-1"
//                           >
//                             Save <FiCheckCircle />
//                           </button>
//                         ) : (
//                           <>
//                             {request.status === 'inprogress' && (
//                               <>
//                                 <button
//                                   onClick={() => handleStatusChange(request._id, 'done')}
//                                   className="btn btn-success px-3 py-1 text-white bg-green-500 hover:bg-green-600 rounded flex items-center gap-1"
//                                   title="Mark as Done"
//                                 >
//                                   Done <FiCheckCircle />
//                                 </button>
//                                 <button
//                                   onClick={() => handleStatusChange(request._id, 'canceled')}
//                                   className="btn btn-warning px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded flex items-center gap-1"
//                                   title="Cancel Request"
//                                 >
//                                   Cancel <FiXCircle />
//                                 </button>
//                               </>
//                             )}
//                             <button
//                               onClick={() => handleEdit(request._id, request.status)}
//                               className="btn btn-info px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded flex items-center gap-1"
//                               title="Edit Status"
//                             >
//                               <FiEdit />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(request._id)}
//                               className="btn btn-danger px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded flex items-center gap-1"
//                               title="Delete Request"
//                             >
//                               <FiTrash2 />
//                             </button>
//                             <button
//                               onClick={() => handleView(request._id)}
//                               className="btn btn-secondary px-3 py-1 text-white bg-gray-600 hover:bg-gray-700 rounded flex items-center gap-1"
//                               title="View Details"
//                             >
//                               <FiEye />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={() => navigate('myDonationRequest')}
//               className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
//             >
//               View My All Requests
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="mt-8 text-center text-gray-600 text-lg">You have not made any donation requests yet.</p>
//       )}
//     </div>
//   );
// };

// export default UserHome;

// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../../Providers/AuthProvider';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';

// import { FiEdit, FiTrash2, FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';

// const updateDonationRequestStatus = async (id, status) => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}/status`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });
//     return response.json();
//   } catch (error) {
//     console.error('Error updating donation request status:', error);
//   }
// };

// const deleteDonationRequest = async (id) => {
//   try {
//     await fetch(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`, { method: 'DELETE' });
//   } catch (error) {
//     console.error('Error deleting donation request:', error);
//   }
// };

// const statusColors = {
//   inprogress: 'bg-yellow-200 text-yellow-800',
//   pending: 'bg-gray-200 text-gray-700',
//   done: 'bg-green-200 text-green-800',
//   canceled: 'bg-red-200 text-red-800',
// };

// const UserHome = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const axiosSecure = useAxiosSecure();
//   const [editingId, setEditingId] = useState(null);
//   const [newStatus, setNewStatus] = useState('');

//   const fetchDonationRequests = async () => {
//     try {
//       const response = await axiosSecure.get(
//         `/donation-requests/user/${user?.email}?limit=3&page=1`
//       );
//       return response.data.donationRequests || [];
//     } catch (error) {
//       console.error("Error fetching donation requests:", error);
//       return [];
//     }
//   };

//   const { data: donationRequests = [], isLoading, error } = useQuery({
//     queryKey: ['donationRequests', user?.email],
//     queryFn: fetchDonationRequests,
//     enabled: !!user?.email,
//   });

//   // Navigate to Edit page
//   const handleEdit = (id) => {
//     navigate(`/dashboard/edit-donation/${id}`);
//   };

//   const handleSave = (id) => {
//     updateDonationRequestStatus(id, newStatus).then(() => {
//       queryClient.invalidateQueries(['donationRequests', user?.email]);
//       setEditingId(null);
//       setNewStatus('');
//     });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteDonationRequest(id).then(() => {
//           queryClient.invalidateQueries(['donationRequests', user?.email]);
//           Swal.fire('Deleted!', 'Your donation request has been deleted.', 'success');
//         });
//       }
//     });
//   };

//   // Navigate to View page
//   const handleView = (id) => {
//     navigate(`/donation-details/${id}`);
//   };

//   const handleStatusChange = (id, status) => {
//     updateDonationRequestStatus(id, status).then(() => {
//       queryClient.invalidateQueries(['donationRequests', user?.email]);
//     });
//   };

//   if (isLoading) return <p className="text-center mt-8 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center mt-8 text-red-500">Error loading donation requests: {error.message}</p>;

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h2 className="text-4xl font-semibold text-center text-red-500 mb-8">
//         Welcome <span className="text-blue-500">{user.displayName}</span> to Life Stream
//       </h2>

//       {donationRequests.length > 0 ? (
//         <>
//           <h3 className="text-2xl font-medium mb-4 text-gray-800">Your Recent Donation Requests:</h3>
//           <div className="overflow-x-auto shadow-lg rounded-lg">
//             <table className="table-auto w-full min-w-[800px] bg-white rounded-lg overflow-hidden">
//               <thead className="bg-red-100 text-red-700">
//                 <tr>
//                   {['#', 'Recipient Name', 'Location', 'Date', 'Time', 'Blood Group', 'Status', 'Donor Info', 'Actions'].map((heading) => (
//                     <th key={heading} className="py-3 px-4 text-left font-semibold text-sm uppercase tracking-wider">{heading}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence>
//                   {donationRequests.map((request, index) => (
//                     <motion.tr
//                       key={request._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="border-b last:border-none hover:bg-red-50"
//                     >
//                       <td className="py-3 px-4 text-sm">{index + 1}</td>
//                       <td className="py-3 px-4 text-sm font-medium">{request.recipientName}</td>
//                       <td className="py-3 px-4 text-sm">{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
//                       <td className="py-3 px-4 text-sm">{request.donationDate}</td>
//                       <td className="py-3 px-4 text-sm">{request.donationTime}</td>
//                       <td className="py-3 px-4 text-sm font-semibold text-red-600">{request.bloodGroup}</td>
//                       <td className="py-3 px-4 text-sm">
//                         {editingId === request._id ? (
//                           <select
//                             value={newStatus}
//                             onChange={(e) => setNewStatus(e.target.value)}
//                             className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
//                           >
//                             <option value="">Select Status</option>
//                             <option value="inprogress">In Progress</option>
//                             <option value="pending">Pending</option>
//                             <option value="done">Done</option>
//                             <option value="canceled">Canceled</option>
//                           </select>
//                         ) : (
//                           <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[request.status] || 'bg-gray-200 text-gray-700'}`}>
//                             {request.status}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3 px-4 text-sm break-words max-w-xs">
//                         <div> {request.requesterName}</div>
//                         <div> {request.requesterEmail }</div>
                     
//                       </td>
//                       <td className="py-3 px-4 text-sm space-x-1 flex flex-wrap gap-1">
//                         {editingId === request._id ? (
//                           <button
//                             onClick={() => handleSave(request._id)}
//                             className="btn btn-primary px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded flex items-center gap-1"
//                           >
//                             Save <FiCheckCircle />
//                           </button>
//                         ) : (
//                           <>
//                             {request.status === 'inprogress' && (
//                               <>
//                                 <button
//                                   onClick={() => handleStatusChange(request._id, 'done')}
//                                   className="btn btn-success px-3 py-1 text-white bg-green-500 hover:bg-green-600 rounded flex items-center gap-1"
//                                   title="Mark as Done"
//                                 >
//                                   Done <FiCheckCircle />
//                                 </button>
//                                 <button
//                                   onClick={() => handleStatusChange(request._id, 'canceled')}
//                                   className="btn btn-warning px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded flex items-center gap-1"
//                                   title="Cancel Request"
//                                 >
//                                   Cancel <FiXCircle />
//                                 </button>
//                               </>
//                             )}
//                             <button
//                               onClick={() => handleEdit(request._id)}
//                               className="btn btn-info px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded flex items-center gap-1"
//                               title="Edit Status"
//                             >
//                               <FiEdit />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(request._id)}
//                               className="btn btn-danger px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded flex items-center gap-1"
//                               title="Delete Request"
//                             >
//                               <FiTrash2 />
//                             </button>
//                             <button
//                               onClick={() => handleView(request._id)}
//                               className="btn btn-secondary px-3 py-1 text-white bg-gray-600 hover:bg-gray-700 rounded flex items-center gap-1"
//                               title="View Details"
//                             >
//                               <FiEye />
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={() => navigate('my-donation-requests')}
//               className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
//             >
//               View My All Requests
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="mt-8 text-center text-gray-600 text-lg">You have not made any donation requests yet.</p>
//       )}
//     </div>
//   );
// };

// export default UserHome;
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import { FiEdit, FiTrash2, FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../../../Components/Loading/Loading';

const updateDonationRequestStatus = async (id, status) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  } catch (error) {
    console.error('Error updating donation request status:', error);
  }
};

const deleteDonationRequest = async (id) => {
  try {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/donation-requests/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error deleting donation request:', error);
  }
};

const statusColors = {
  inprogress: 'bg-yellow-200 text-yellow-800',
  pending: 'bg-gray-200 text-gray-700',
  done: 'bg-green-200 text-green-800',
  canceled: 'bg-red-200 text-red-800',
};

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchDonationRequests = async () => {
    try {
      const response = await axiosSecure.get(`/donation-requests/user/${user?.email}?limit=3&page=1`);
      return response.data.donationRequests || [];
    } catch (error) {
      console.error("Error fetching donation requests:", error);
      return [];
    }
  };

  const { data: donationRequests = [], isLoading, error } = useQuery({
    queryKey: ['donationRequests', user?.email],
    queryFn: fetchDonationRequests,
    enabled: !!user?.email,
  });

  const handleEdit = (id) => setEditingId(id);

  const handleSave = (id) => {
    updateDonationRequestStatus(id, newStatus).then(() => {
      queryClient.invalidateQueries(['donationRequests', user?.email]);
      setEditingId(null);
      setNewStatus('');
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This request will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDonationRequest(id).then(() => {
          queryClient.invalidateQueries(['donationRequests', user?.email]);
          Swal.fire('Deleted!', 'Your donation request has been removed.', 'success');
        });
      }
    });
  };

  const handleView = (id) => navigate(`/donation-details/${id}`);

  const handleStatusChange = (id, status) => {
    updateDonationRequestStatus(id, status).then(() => {
      queryClient.invalidateQueries(['donationRequests', user?.email]);
    });
  };

  if (isLoading) return <Loading />
  if (error) return <p className="text-center mt-8 text-red-500">Error loading donation requests: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-4xl font-semibold text-center text-red-500 mb-8">
        Welcome <span className="text-blue-500">{user.displayName}</span> to Life Stream
      </h2>

      {donationRequests.length > 0 && (
        <>
          <h3 className="text-2xl font-medium mb-4 text-gray-800">Your Recent Donation Requests:</h3>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table-auto w-full min-w-[800px] bg-white rounded-lg overflow-hidden">
              <thead className="bg-red-100 text-red-700">
                <tr>
                  {['#', 'Recipient Name', 'Location', 'Date', 'Time', 'Blood Group', 'Status', 'Donor Info', 'Actions'].map((heading) => (
                    <th key={heading} className="py-3 px-4 text-left font-semibold text-sm uppercase tracking-wider">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {donationRequests.map((request, index) => (
                    <motion.tr
                      key={request._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border-b last:border-none hover:bg-red-50"
                    >
                      <td className="py-3 px-4 text-sm">{index + 1}</td>
                      <td className="py-3 px-4 text-sm font-medium">{request.recipientName}</td>
                      <td className="py-3 px-4 text-sm">{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                      <td className="py-3 px-4 text-sm">{request.donationDate}</td>
                      <td className="py-3 px-4 text-sm">{request.donationTime}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-red-600">{request.bloodGroup}</td>
                      <td className="py-3 px-4 text-sm">
                        {editingId === request._id ? (
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            <option value="">Select Status</option>
                            <option value="inprogress">In Progress</option>
                            <option value="pending">Pending</option>
                            <option value="done">Done</option>
                            <option value="canceled">Canceled</option>
                          </select>
                        ) : (
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[request.status] || 'bg-gray-200 text-gray-700'}`}>
                            {request.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm break-words max-w-xs">
                        <div>{request.requesterName}</div>
                        <div>{request.requesterEmail}</div>
                      </td>
                      <td className="py-3 px-4 text-sm space-x-1 flex flex-wrap gap-1">
                        {editingId === request._id ? (
                          <button
                            onClick={() => handleSave(request._id)}
                            className="btn btn-primary px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded flex items-center gap-1"
                          >
                            Save <FiCheckCircle />
                          </button>
                        ) : (
                          <>
                            {request.status === 'inprogress' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(request._id, 'done')}
                                  className="btn btn-success px-3 py-1 text-white bg-green-500 hover:bg-green-600 rounded flex items-center gap-1"
                                >
                                  Done <FiCheckCircle />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(request._id, 'canceled')}
                                  className="btn btn-warning px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded flex items-center gap-1"
                                >
                                  Cancel <FiXCircle />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleEdit(request._id)}
                              className="btn btn-info px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded flex items-center gap-1"
                            >
                              <FiEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(request._id)}
                              className="btn btn-danger px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded flex items-center gap-1"
                            >
                              <FiTrash2 />
                            </button>
                            <button
                              onClick={() => handleView(request._id)}
                              className="btn btn-secondary px-3 py-1 text-white bg-gray-600 hover:bg-gray-700 rounded flex items-center gap-1"
                            >
                              <FiEye />
                            </button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('my-donation-requests')}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
            >
              View My All Requests
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHome;
