import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaHospital,
  FaTint,
  FaClock,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaCommentDots,
  FaRegCheckCircle,
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import Loading from '../../../Components/Loading/Loading';

const BloodDonationRequestDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: request, isLoading } = useQuery({
    queryKey: ['donationRequest', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`/donation-requests/${id}/status`, {
        status: 'inprogress',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['donationRequest']);
      Swal.fire('Confirmed!', 'You have confirmed the donation.', 'success');
    },
  });

  const handleConfirmDonate = () => {
    Swal.fire({
      title: 'Confirm Donation?',
      html: `
        <p><strong>Donor Name:</strong> ${user?.displayName}</p>
        <p><strong>Donor Email:</strong> ${user?.email}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate();
      }
    });
  };

  if (isLoading)
    return <Loading />
  if (!request)
    return <p className="text-center py-20 text-red-600 font-semibold">Request not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto p-6 mt-20 bg-white shadow-2xl rounded-2xl"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Donation Request Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700">
        <p className="flex items-center gap-2">
          <FaUser className="text-red-500" />
          <span className="font-semibold ">Requester:</span> {request.requesterName}
        </p>
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-blue-500" />
          <span className="font-semibold">Email:</span> {request.requesterEmail}
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-green-600" />
          <span className="font-semibold">Recipient:</span> {request.recipientName}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-600" />
          <span className="font-semibold">District:</span> {request.recipientDistrict}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-400" />
          <span className="font-semibold">Upazila:</span> {request.recipientUpazila}
        </p>
        <p className="flex items-center gap-2">
          <FaHospital className="text-pink-500" />
          <span className="font-semibold">Hospital:</span> {request.hospitalName}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <span className="font-semibold">Address:</span> {request.fullAddress}
        </p>
        <p className="flex items-center gap-2">
          <FaTint className="text-red-700" />
          <span className="font-semibold">Blood Group:</span> {request.bloodGroup}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" />
          <span className="font-semibold">Date:</span> {request.donationDate}
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-yellow-600" />
          <span className="font-semibold">Time:</span> {request.donationTime}
        </p>
        <p className="flex items-center gap-2 md:col-span-2">
          <FaCommentDots className="text-gray-600" />
          <span className="font-semibold">Message:</span> {request.requestMessage}
        </p>
        <p className="flex items-center gap-2">
          <FaRegCheckCircle className="text-green-500" />
          <span className="font-semibold">Status:</span>{' '}
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              request.status === 'pending'
                ? 'bg-yellow-500'
                : request.status === 'inprogress'
                ? 'bg-blue-500'
                : 'bg-green-600'
            }`}
          >
            {request.status}
          </span>
        </p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleConfirmDonate}
          disabled={mutation.isLoading}
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-colors text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg"
        >
          {mutation.isLoading ? 'Processing...' : 'Confirm to Donate'}
        </button>
      </div>
    </motion.div>
  );
};

export default BloodDonationRequestDetail;



