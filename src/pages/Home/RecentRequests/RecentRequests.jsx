import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loading/Loading';
import { FaTint, FaMapMarkerAlt } from 'react-icons/fa';
const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const RecentRequests = () => {

  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
      const [colors, setColors] = useState({
      primary: getCSSVar('--primary'),
      secondary: getCSSVar('--secondary'),
      text: getCSSVar('--text'),
      background: getCSSVar('--background'),
      accent: getCSSVar('--accent'),
      neutral: getCSSVar('--neutral'),
    });
  
    useEffect(() => {
      const observer = new MutationObserver(() => {
        setColors({
          primary: getCSSVar('--primary'),
          secondary: getCSSVar('--secondary'),
          text: getCSSVar('--text'),
          background: getCSSVar('--background'),
          accent: getCSSVar('--accent'),
          neutral: getCSSVar('--neutral'),
        });
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }, []);

useEffect(() => {
  const fetchRequests = async () => {
    try {
      const res = await axiosPublic.get('/donation-requests?limit=6');
      console.log(res.data);
      setRequests(res.data.donationRequests ?? []); // extract the array
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
    <section className="py-10" style={{ backgroundColor: `rgb(${colors.neutral})` }}>
      <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: `rgb(${colors.primary})` }}>
        Recent Blood Requests
      </h2>

      <div className="lg:w-11/12 md:px-10 mx-auto grid md:grid-cols-3 gap-6 px-4">
        {requests.map((req, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: `rgb(${colors.accent})`, color: `rgb(${colors.text})` }}
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
