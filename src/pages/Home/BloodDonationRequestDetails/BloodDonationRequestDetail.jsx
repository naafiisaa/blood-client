import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const BloodDonationRequestDetail = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [donationRequests, setDonationRequests] = useState([]);

  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        const response = await axiosPublic.get('/donation-requests', {
          params: { status: 'pending' },
        });
        setDonationRequests(response.data.donationRequests);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    fetchDonationRequests();
  }, [axiosPublic]);

  const handleConfirmDonation = async (id) => {
    try {
      await axiosPublic.patch(`/donation-requests/${id}`, { status: 'inprogress' });
      setDonationRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: 'inprogress' } : request
        )
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Donation confirmed successfully!',
      });
    } catch (error) {
      console.error('Error confirming donation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to confirm donation.',
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Blood Donation Details</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {donationRequests.length > 0 ? (
          donationRequests.map((request) => (
            <div key={request._id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">{request.recipientName}</h3>
              <p>Location: {request.recipientDistrict}, {request.recipientUpazila}</p>
              <p>Blood Group: {request.bloodGroup}</p>
              <p>Date: {request.donationDate}</p>
              <p>Time: {request.donationTime}</p>
              <p>Hospital: {request.hospitalName}</p>
              <p>Address: {request.fullAddress}</p>
              <p>Requester: {request.requesterName} ({request.requesterEmail})</p>
              <p>Message: {request.requestMessage}</p>
              <p>Status: {request.status}</p>
              <div className="mt-4">
                <label className="block mb-2">Donor Name:</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="block w-full p-2 border border-gray-300 rounded"
                />
                <label className="block mb-2 mt-2">Donor Email:</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="block w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() => handleConfirmDonation(request._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Confirm Donation
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending donation requests found.</p>
        )}
      </div>
    </div>
  );
};

export default BloodDonationRequestDetail;
