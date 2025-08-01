// import React, { useState, useContext } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';
// import { AuthContext } from '../../../Providers/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const MyDonationRequest = () => {
//   const { user } = useContext(AuthContext);
//   const [page, setPage] = useState(1);
//   const limit = 3;

//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['donationRequests', user?.email, page],
//     queryFn: async () => {
//       const response = await axiosPublic.get(`/donation-requests/user/${user.email}`, {
//         params: { page, limit },
//       });
//       return response.data;
//     },
//     enabled: !!user?.email,
//   });

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axiosPublic.patch(`/donation-requests/${id}/status`, { status: newStatus });
//       queryClient.invalidateQueries(['donationRequests', user?.email]);
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this donation request?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axiosPublic.delete(`/donation-requests/${id}`);
//         Swal.fire('Deleted!', 'Donation request has been deleted.', 'success');
//         queryClient.invalidateQueries(['donationRequests', user?.email]);
//       } catch (error) {
//         Swal.fire('Error', 'Failed to delete donation request.', 'error');
//       }
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/dashboard/edit-donation/${id}`);
//   };

//   const handleView = (id) => {
//     navigate(`/donation-details/${id}`);
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   if (!user) return <div className="text-center py-10 text-gray-500">Loading user data...</div>;
//   if (isLoading) return <div className="text-center py-10 text-gray-500">Loading donation requests...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">Error loading donation requests</div>;

//   const { donationRequests, total } = data || { donationRequests: [], total: 0 };
//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//       <h2 className="text-3xl font-extrabold mb-6 text-center text-red-700 drop-shadow-md">
//         My Donation Requests <span className="text-gray-600 text-lg">({donationRequests.length})</span>
//       </h2>

//       <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-red-100">
//             <tr>
//               {[
//                 'Recipient Name',
//                 'Location',
//                 'Date',
//                 'Time',
//                 'Blood Group',
//                 'Status',
//                 'Donor Info',
//                 'Actions',
//               ].map((heading) => (
//                 <th
//                   key={heading}
//                   className="px-4 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider whitespace-nowrap"
//                 >
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {donationRequests.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="text-center py-6 text-gray-500 italic">
//                   No donation requests found.
//                 </td>
//               </tr>
//             ) : (
//               donationRequests.map((request) => (
//                 <tr key={request._id} className="hover:bg-red-50 transition">
//                   <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
//                     {request.recipientName}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
//                     {request.recipientDistrict}, {request.recipientUpazila}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{request.donationDate}</td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{request.donationTime}</td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-red-600">
//                     {request.bloodGroup}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm capitalize font-semibold text-gray-700">
//                     {request.status}
//                   </td>
//                    <td className="py-3 px-4 text-sm break-words max-w-xs">
//                         <div> {request.requesterName}</div>
//                         <div> {request.requesterEmail }</div>
                       
//                       </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm space-x-1 flex flex-wrap gap-1">
//                     {request.status === 'inprogress' && (
//                       <>
//                         <button
//                           className="btn btn-xs bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 transition"
//                           onClick={() => handleStatusChange(request._id, 'done')}
//                           title="Mark as Done"
//                         >
//                           Done
//                         </button>
//                         <button
//                           className="btn btn-xs bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 transition"
//                           onClick={() => handleStatusChange(request._id, 'canceled')}
//                           title="Cancel Request"
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     )}

//                     <button
//                       className="btn btn-xs bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 transition"
//                       onClick={() => handleEdit(request._id)}
//                       title="Edit Request"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-xs bg-rose-600 hover:bg-rose-700 text-white rounded px-2 py-1 transition"
//                       onClick={() => handleDelete(request._id)}
//                       title="Delete Request"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="btn btn-xs bg-gray-600 hover:bg-gray-700 text-white rounded px-2 py-1 transition"
//                       onClick={() => handleView(request._id)}
//                       title="View Details"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-2 flex-wrap">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
//               page === index + 1
//                 ? 'bg-red-600 text-white shadow-md'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//             onClick={() => handlePageChange(index + 1)}
//             disabled={page === index + 1}
//             aria-label={`Page ${index + 1}`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyDonationRequest;

import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const limit = 3;

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['donationRequests', user?.email, page],
    queryFn: async () => {
      const response = await axiosPublic.get(`/donation-requests/user/${user.email}`, {
        params: { page, limit },
      });
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosPublic.patch(`/donation-requests/${id}/status`, { status: newStatus });
      queryClient.invalidateQueries(['donationRequests', user?.email]);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this donation request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.delete(`/donation-requests/${id}`);
        Swal.fire('Deleted!', 'Donation request has been deleted.', 'success');
        queryClient.invalidateQueries(['donationRequests', user?.email]);
      } catch (error) {
        Swal.fire('Error', 'Failed to delete donation request.', 'error');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-donation/${id}`);
  };

  const handleView = (id) => {
    navigate(`/donation-details/${id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  if (!user) return <div className="text-center py-10 text-gray-500">Loading user data...</div>;
  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading donation requests...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading donation requests</div>;

  const { donationRequests, total } = data || { donationRequests: [], total: 0 };
  const totalPages = Math.ceil(total / limit);

  // Apply filter
  const filteredRequests =
    statusFilter === 'all'
      ? donationRequests
      : donationRequests.filter((req) => req.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-red-700 drop-shadow-md">
        My Donation Requests <span className="text-gray-600 text-lg">({filteredRequests.length})</span>
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        <label className="mr-2 font-medium text-sm text-gray-700">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="select select-sm select-bordered"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-100">
            <tr>
              {[
                'Recipient Name',
                'Location',
                'Date',
                'Time',
                'Blood Group',
                'Status',
                'Donor Info',
                'Actions',
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((request) => (
                <tr key={request._id} className="hover:bg-red-50 transition">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    {request.recipientName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{request.donationDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{request.donationTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-red-600">
                    {request.bloodGroup}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm capitalize font-semibold text-gray-700">
                    {request.status}
                  </td>
                  <td className="py-3 px-4 text-sm break-words max-w-xs">
                    <div>{request.requesterName}</div>
                    <div>{request.requesterEmail}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm space-x-1 flex flex-wrap gap-1">
                    {request.status === 'inprogress' && (
                      <>
                        <button
                          className="btn btn-xs bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 transition"
                          onClick={() => handleStatusChange(request._id, 'done')}
                          title="Mark as Done"
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-xs bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 transition"
                          onClick={() => handleStatusChange(request._id, 'canceled')}
                          title="Cancel Request"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    <button
                      className="btn btn-xs bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 transition"
                      onClick={() => handleEdit(request._id)}
                      title="Edit Request"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs bg-rose-600 hover:bg-rose-700 text-white rounded px-2 py-1 transition"
                      onClick={() => handleDelete(request._id)}
                      title="Delete Request"
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-xs bg-gray-600 hover:bg-gray-700 text-white rounded px-2 py-1 transition"
                      onClick={() => handleView(request._id)}
                      title="View Details"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
              page === index + 1
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequest;
