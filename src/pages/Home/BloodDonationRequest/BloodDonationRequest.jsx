import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const BloodDonationRequest = () => {
      const axiosPublic = useAxiosPublic();
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

      return (
            <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">Blood Donation Requests</h2>
                  {donationRequests.length > 0 ? (
                        donationRequests.map((request) => (
                              <div key={request._id} className="border p-4 mb-4  rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    <h3 className="font-bold text-lg">{request.recipientName}</h3>
                                    <p>Location: {request.recipientDistrict}, {request.recipientUpazila}</p>
                                    <p>Blood Group: {request.bloodGroup}</p>
                                    <p>Date: {request.donationDate}</p>
                                    <p>Time: {request.donationTime}</p>
                                    <Link to="/blood-donation-request-details">
                                          <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
                                    </Link>
                              </div>
                        ))
                  ) : (
                        <p>No pending donation requests found.</p>
                  )}
            </div>
      );
};

export default BloodDonationRequest;
