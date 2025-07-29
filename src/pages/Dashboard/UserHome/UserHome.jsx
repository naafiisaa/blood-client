import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const fetchDonationRequests = async (email) => {
  try {
    const { data } = await axios.get(`http://localhost:8001/donation-requests/${email}`);
    console.log('Fetched Donation Requests (API Response):', data.donationRequests);
    return (data.donationRequests || []).slice(0, 3); // Ensure donationRequests is an array
  } catch (error) {
    console.error('Error fetching donation requests:', error);
    return [];
  }
};

const updateDonationRequestStatus = async (id, status) => {
  try {
    const response = await axios.patch(`http://localhost:8001/donation-requests/${id}/status`, { status });
    console.log('Updated Donation Request Status:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating donation request status:', error);
  }
};

const deleteDonationRequest = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8001/donation-requests/${id}`);
    console.log('Deleted Donation Request:', response.data);
  } catch (error) {
    console.error('Error deleting donation request:', error);
  }
};

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const { data: donationRequests = [], isLoading, error } = useQuery({
    queryKey: ['donationRequests', user?.email],
    queryFn: () => fetchDonationRequests(user?.email),
    enabled: !!user?.email, // Only fetch when email is available
  });

  const handleEdit = (id) => {
    setEditingId(id);
  };

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
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDonationRequest(id).then(() => {
          queryClient.invalidateQueries(['donationRequests', user?.email]);
          Swal.fire(
            'Deleted!',
            'Your donation request has been deleted.',
            'success'
          );
        });
      }
    });
  };

  const handleView = (id) => {
    navigate("myDonationRequest");
  };

  const handleStatusChange = (id, status) => {
    updateDonationRequestStatus(id, status).then(() => {
      queryClient.invalidateQueries(['donationRequests', user?.email]);
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading donation requests: {error.message}</p>;
  }

  console.log('Donation Requests in Component:', donationRequests);

  return (
    <div>
      <h2 className='text-3xl text-center text-red-400'>
        Welcome <span className='text-blue-400'>{user.displayName}</span> to Blood Bank
      </h2>
      {donationRequests.length > 0 ? (
        <div className='mt-4'>
          <h3 className='text-xl'>Your Recent Donation Requests:</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Information</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donationRequests.map((request, index) => (
                  <tr key={request._id}>
                    <td>{index + 1}</td>
                    <td>{request.recipientName}</td>
                    <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                    <td>{request.donationDate}</td>
                    <td>{request.donationTime}</td>
                    <td>{request.bloodGroup}</td>
                    <td>
                      {editingId === request._id ? (
                        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="select select-bordered">
                          <option value="">Select Status</option>
                          <option value="inprogress">In Progress</option>
                          <option value="pending">Pending</option>
                          <option value="done">Done</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      ) : (
                        request.status
                      )}
                    </td>
                    <td>
                      {request.donorName} {request.donorEmail} {request.fullAddress}
                    </td>
                    <td>
                      {editingId === request._id ? (
                        <button onClick={() => handleSave(request._id)} className='btn btn-primary mr-2'>Save</button>
                      ) : (
                        <>
                          {request.status === 'inprogress' && (
                            <>
                              <button onClick={() => handleStatusChange(request._id, 'done')} className='btn btn-success mr-2'>Done</button>
                              <button onClick={() => handleStatusChange(request._id, 'canceled')} className='btn btn-warning mr-2'>Cancel</button>
                            </>
                          )}
                          <button onClick={() => handleEdit(request._id)} className='btn btn-info mr-2'>Edit</button>
                          <button onClick={() => handleDelete(request._id)} className='btn btn-danger mr-2'>Delete</button>
                          <button onClick={() => handleView(request._id)} className='btn btn-secondary'>View</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => navigate('myDonationRequest')} className='btn btn-primary mt-4'>View My All Requests</button>
        </div>
      ) : (
        <p className='mt-4'>You have not made any donation requests yet.</p>
      )}
    </div>
  );
};

export default UserHome;