import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 10;

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['donationRequests', user?.email, page],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error('User email is not available');
      }
      const response = await axiosPublic.get(`/donation-requests/${user.email}`, {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    },
    enabled: !!user?.email, // Only run the query if user email is available
  });

  const handleStatusChange = async (id, status) => {
    try {
      await axiosPublic.patch(`/donation-requests/${id}/status`, { status });
      queryClient.invalidateQueries(['donationRequests', user?.email]);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  if (!user) return <div>Loading user data...</div>;
  if (isLoading) return <div>Loading donation requests...</div>;
  if (error) return <div>Error loading donation requests</div>;

  const { donationRequests, total } = data;
  const totalPages = Math.ceil(total / limit);
  console.log(donationRequests);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Donation Requests ({donationRequests.length})</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Recipient Name</th>
              <th>District</th>
              <th>Upazila</th>
              <th>Hospital Name</th>
              <th>Full Address</th>
              <th>Blood Group</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donationRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.recipientName}</td>
                <td>{request.recipientDistrict}</td>
                <td>{request.recipientUpazila}</td>
                <td>{request.hospitalName}</td>
                <td>{request.fullAddress}</td>
                <td>{request.bloodGroup}</td>
                <td>{request.donationDate}</td>
                <td>{request.donationTime}</td>
                <td>
                  <select
                    className="select select-bordered"
                    value={request.status}
                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn bg-slate-300 text-black ${page === index + 1 ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequest;
