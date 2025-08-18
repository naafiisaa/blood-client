import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loading/Loading';
import { FaTint, FaMapMarkerAlt } from 'react-icons/fa';

const RecentRequests = ({ colors }) => {
  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosPublic.get('/donation-requests?limit=6'); // adjust API
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosPublic]);

  if (loading) return <Loading />;

  return (
    <section className="py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: `rgb(${colors.primary})` }}>
        Recent Blood Requests
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {requests.map((req, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <p className="mb-2"><FaTint className="inline mr-2" style={{ color: `rgb(${colors.primary})` }} /> <strong>Blood:</strong> {req.bloodGroup}</p>
            <p className="mb-2"><FaMapMarkerAlt className="inline mr-2" style={{ color: `rgb(${colors.primary})` }} /> <strong>District:</strong> {req.recipientDistrict}</p>
            <p className="mb-2"><strong>Status:</strong> {req.status}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentRequests;
