import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import districts from '../../../assets/districts.json';
import upazilas from '../../../assets/upazilas.json';
import useAuth from '../../../Hooks/useAuth';

const DonationRequest = () => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientDistrict, setRecipientDistrict] = useState('');
  const [recipientUpazila, setRecipientUpazila] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [donationTime, setDonationTime] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDistrict = districts.find(district => district.id === recipientDistrict);
    const selectedUpazila = upazilas.find(upazila => upazila.id === recipientUpazila);
    const newRequest = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      recipientName,
      recipientDistrict: selectedDistrict ? selectedDistrict.name : '',
      recipientUpazila: selectedUpazila ? selectedUpazila.name : '',
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      status: 'pending',
    };
    try {
      const response = await axiosPublic.post('/donation-requests', newRequest);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Donation request created successfully!',
        });
      }
    } catch (error) {
      console.error('Error creating donation request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create donation request.',
      });
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Donation Request</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">Requester Name:</label>
          <input type="text" value={user.displayName} readOnly className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Requester Email:</label>
          <input type="email" value={user.email} readOnly className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Recipient Name:</label>
          <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Recipient District:</label>
          <select value={recipientDistrict} onChange={(e) => setRecipientDistrict(e.target.value)} required className="select select-bordered">
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">Recipient Upazila:</label>
          <select value={recipientUpazila} onChange={(e) => setRecipientUpazila(e.target.value)} required className="select select-bordered">
            <option value="">Select Upazila</option>
            {upazilas
              .filter((upazila) => upazila.district_id === recipientDistrict)
              .map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">Hospital Name:</label>
          <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Full Address:</label>
          <input type="text" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Blood Group:</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="select select-bordered">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">Donation Date:</label>
          <input type="date" value={donationDate} onChange={(e) => setDonationDate(e.target.value)} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Donation Time:</label>
          <input type="time" value={donationTime} onChange={(e) => setDonationTime(e.target.value)} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Request Message:</label>
          <textarea value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} required className="textarea textarea-bordered" />
        </div>
        <button type="submit" className="btn btn-primary">Request</button>
      </form>
    </div>
  );
};

export default DonationRequest;
