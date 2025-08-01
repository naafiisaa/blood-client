import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaHospital, FaMapMarkerAlt, FaTint, FaCalendarAlt, FaClock, FaCommentDots } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
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

    if (!user) {
      Swal.fire('Error', 'You must be logged in to submit a request', 'error');
      return;
    }

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
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Donation request created successfully!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        // Reset form
        setRecipientName('');
        setRecipientDistrict('');
        setRecipientUpazila('');
        setHospitalName('');
        setFullAddress('');
        setBloodGroup('');
        setDonationDate('');
        setDonationTime('');
        setRequestMessage('');
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8"
    >
      <h3 className="text-3xl font-bold mb-8 text-center text-red-600 drop-shadow-md">
        <FaTint className="inline mr-2" /> Blood Donation Request
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Requester Info - Readonly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex items-center gap-2 font-semibold text-red-700">
            <FaUser /> Requester Name:
            <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered w-full bg-red-50" />
          </label>
          <label className="flex items-center gap-2 font-semibold text-red-700">
            <FaEnvelope /> Requester Email:
            <input type="email" value={user?.email || ''} readOnly className="input input-bordered w-full bg-red-50" />
          </label>
        </div>

        {/* Recipient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaUser /> Recipient Name:
            </span>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
              placeholder="Enter recipient name"
              className="input input-bordered w-full"
            />
          </label>

          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaMapMarkerAlt /> Recipient District:
            </span>
            <select
              value={recipientDistrict}
              onChange={(e) => setRecipientDistrict(e.target.value)}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaMapMarkerAlt /> Recipient Upazila:
            </span>
            <select
              value={recipientUpazila}
              onChange={(e) => setRecipientUpazila(e.target.value)}
              required
              className="select select-bordered w-full"
              disabled={!recipientDistrict}
            >
              <option value="">Select Upazila</option>
              {upazilas
                .filter((upazila) => upazila.district_id === recipientDistrict)
                .map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaHospital /> Hospital Name:
            </span>
            <input
              type="text"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
              placeholder="Enter hospital name"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {/* Address and Blood Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaMapMarkerAlt /> Full Address:
            </span>
            <input
              type="text"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              required
              placeholder="Enter full address"
              className="input input-bordered w-full"
            />
          </label>

          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaTint /> Blood Group:
            </span>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaCalendarAlt /> Donation Date:
            </span>
            <input
              type="date"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </label>

          <label className="flex flex-col font-semibold text-red-700">
            <span className="flex items-center gap-2 mb-1">
              <FaClock /> Donation Time:
            </span>
            <input
              type="time"
              value={donationTime}
              onChange={(e) => setDonationTime(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {/* Message */}
        <label className="flex flex-col font-semibold text-red-700">
          <span className="flex items-center gap-2 mb-1">
            <FaCommentDots /> Request Message:
          </span>
          <textarea
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            required
            placeholder="Write your message here..."
            className="textarea textarea-bordered resize-none"
            rows={4}
          />
        </label>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn bg-red-600 hover:bg-red-700 border-none w-full md:w-auto mx-auto block text-white font-bold text-lg shadow-lg"
        >
          Submit Request
        </motion.button>
      </form>
    </motion.div>
  );
};

export default DonationRequest;

