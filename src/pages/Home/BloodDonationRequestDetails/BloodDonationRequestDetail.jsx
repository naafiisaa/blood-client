



import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaHospital, FaTint, FaClock, FaUser, FaEnvelope, FaCalendarAlt, FaCommentDots, FaRegCheckCircle } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import Loading from '../../../Components/Loading/Loading';

const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const BloodDonationRequestDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    secondary: getCSSVar('--secondary'),
    text: getCSSVar('--text'),
    background: getCSSVar('--background'),
    neutral: getCSSVar('--neutral'),
    accent: getCSSVar('--accent'),
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar('--primary'),
        secondary: getCSSVar('--secondary'),
        text: getCSSVar('--text'),
        background: getCSSVar('--background'),
        neutral: getCSSVar('--neutral'),
        accent: getCSSVar('--accent'),
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const { data: request, isLoading } = useQuery({
    queryKey: ['donationRequest', id],
    queryFn: async () => (await axiosSecure.get(`/donation-requests/${id}`)).data,
  });

  const mutation = useMutation({
    mutationFn: async () => axiosSecure.patch(`/donation-requests/${id}/status`, { status: 'inprogress' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['donationRequest']);
      Swal.fire('Confirmed!', 'You have confirmed the donation.', 'success');
    },
  });

  const handleConfirmDonate = () => {
    Swal.fire({
      title: 'Confirm Donation?',
      html: `<p><strong>Donor Name:</strong> ${user?.displayName}</p><p><strong>Donor Email:</strong> ${user?.email}</p>`,
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
    }).then(result => { if (result.isConfirmed) mutation.mutate(); });
  };

  if (isLoading) return <Loading />;
  if (!request) return <p className="text-center py-20 font-semibold" style={{ color: `rgb(${colors.primary})` }}>Request not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden mx-auto px-4 md:px-10  py-20 shadow-2xl "
      style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
    >
      <h2 className="md:text-3xl text-2xl
 font-bold text-center mb-6" style={{ color: `rgb(${colors.primary})` }}>
        Donation Request Details
      </h2>

      <div
        className="grid shadow-2xl rounded-xl lg:w-11/12 px-4 md:px-10   mx-auto py-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.text})` }}
      >
        {[
          { icon: FaUser, label: 'Requester', value: request.requesterName, color: `rgb(${colors.primary})` },
          { icon: FaEnvelope, label: 'Email', value: request.requesterEmail, color: `rgb(${colors.primary})` },
          { icon: FaUser, label: 'Recipient', value: request.recipientName, color: `rgb(${colors.primary})` },
          { icon: FaMapMarkerAlt, label: 'District', value: request.recipientDistrict, color: `rgb(${colors.primary})` },
          { icon: FaMapMarkerAlt, label: 'Upazila', value: request.recipientUpazila, color: `rgb(${colors.primary})` },
          { icon: FaHospital, label: 'Hospital', value: request.hospitalName, color: `rgb(${colors.primary})` },
          { icon: FaMapMarkerAlt, label: 'Address', value: request.fullAddress, color: `rgb(${colors.primary})` },
          { icon: FaTint, label: 'Blood Group', value: request.bloodGroup, color: `rgb(${colors.primary})` },
          { icon: FaCalendarAlt, label: 'Date', value: request.donationDate, color: `rgb(${colors.primary})` },
          { icon: FaClock, label: 'Time', value: request.donationTime, color: `rgb(${colors.primary})` },
          { icon: FaCommentDots, label: 'Message', value: request.requestMessage, color: `rgb(${colors.text})` },
        ].map(({ icon: Icon, label, value, color }, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ backgroundColor: `rgb(${colors.neutral})` }}
          >
            <div className="text-2xl" style={{ color }}>
              <Icon />
            </div>
            <div className=" flex flex-col">
              <span className="font-semibold">{label}</span>
              <span className="text-sm">{value}</span>
            </div>
          </div>
        ))}

        <p className="flex rounded-xl px-4 items-center gap-2 "
        style={{ backgroundColor: `rgb(${colors.neutral})` }}>
          <FaRegCheckCircle className="text-green-500" />
          <span className="font-semibold">Status:</span>{' '}
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${request.status === 'pending'
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
          className="px-8 py-3 text-lg font-bold rounded-lg shadow-lg transition-colors"
          style={{
            background: `linear-gradient(90deg, rgb(${colors.primary}) 0%, rgb(${colors.secondary}) 100%)`,
            color: `rgb(${colors.text})`,
          }}
        >
          {mutation.isLoading ? 'Processing...' : 'Confirm to Donate'}
        </button>
      </div>
    </motion.div>
  );
};

export default BloodDonationRequestDetail;
