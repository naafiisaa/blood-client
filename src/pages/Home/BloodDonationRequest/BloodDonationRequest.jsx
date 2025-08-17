
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { BsDropletHalf, BsCalendarDate, BsClock } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loading/Loading';

const BloodDonationRequest = () => {
  const axiosPublic = useAxiosPublic();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['pendingDonationRequests'],
    queryFn: async () => {
      const res = await axiosPublic.get('/donation-requests?status=pending');
      return res.data.donationRequests;
    },
  });

  if (isLoading) return <Loading />

  return (
    <div className=" mt-20 mx-auto overflow-hidden">
      <h1 className="md:text-3xl text-2xl font-bold text-red-600 mb-6 text-center"> Blood Donation Requests</h1>
     <div className='lg:w-11/12 mx-auto md:px-10 px-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
     <div key={req._id} className="border bg-red-50 shadow-lg rounded-xl p-5 space-y-3">
  <h2 className="text-xl text-red-700  font-bold">{req.recipientName}</h2>
  <p className="text-sm font-medium text-red-500">Requested by: {req.requesterName} ({req.requesterEmail})</p>
  <p className="flex items-center font-medium text-red-500 gap-2"><FiMapPin /> {req.fullAddress}, {req.recipientUpazila}, {req.recipientDistrict}</p>
  <p className="flex items-center text-red-500 gap-2"><BsDropletHalf /> Blood Group: {req.bloodGroup}</p>
  <p className="flex items-center text-red-500 gap-2"><BsCalendarDate /> Date: {req.donationDate}</p>
  <p className="flex items-center text-red-500 gap-2"><BsClock /> Time: {req.donationTime}</p>
  <p className="text-gray-500 mb-2 italic">Note: {req.requestMessage}</p>
  <Link
    to={`/donation-details/${req._id}`}
    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-colors text-white btn rounded-lg shadow-lg"
  >
    View
  </Link>
</div>

        ))}
      </div>
    </div>
    </div>
  );
};

export default BloodDonationRequest;

// import React, { useState, useEffect } from 'react';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiMapPin } from 'react-icons/fi';
// import { BsDropletHalf, BsClock, BsCalendarDate } from 'react-icons/bs';

// const BloodDonationRequest = () => {
//   const axiosPublic = useAxiosPublic();
//   const [donationRequests, setDonationRequests] = useState([]);

//   useEffect(() => {
//     const fetchDonationRequests = async () => {
//       try {
//         const response = await axiosPublic.get('/donation-requests', {
//           params: { status: 'pending' },
//         });
//         setDonationRequests(response.data.donationRequests);
//       } catch (error) {
//         console.error('Error fetching donation requests:', error);
//       }
//     };

//     fetchDonationRequests();
//   }, [axiosPublic]);

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-extrabold text-center text-red-600 mb-8">
//         Blood Donation Requests
//       </h2>

//       {donationRequests.length > 0 ? (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {donationRequests.map((request, index) => (
//             <motion.div
//               key={request._id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition"
//             >
//               <h3 className="text-xl font-bold text-red-500 mb-2">
//                 {request.recipientName}
//               </h3>

//               <p className="text-gray-700 flex items-center gap-2">
//                 <FiMapPin className="text-red-500" />
//                 {request.recipientDistrict}, {request.recipientUpazila}
//               </p>

//               <p className="text-gray-700 flex items-center gap-2 mt-2">
//                 <BsDropletHalf className="text-red-500" />
//                 Blood Group: <span className="font-semibold">{request.bloodGroup}</span>
//               </p>

//               <p className="text-gray-700 flex items-center gap-2 mt-2">
//                 <BsCalendarDate className="text-red-500" />
//                 Date: {request.donationDate}
//               </p>

//               <p className="text-gray-700 flex items-center gap-2 mt-2 mb-4">
//                 <BsClock className="text-red-500" />
//                 Time: {request.donationTime}
//               </p>

// <Link to={`/blood-donation-request-details/${request._id}`}>
//   <button className="btn btn-outline">View Details</button>
// </Link>


//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600 mt-10">No pending donation requests found.</p>
//       )}
//     </div>
//   );
// };

// export default BloodDonationRequest;
