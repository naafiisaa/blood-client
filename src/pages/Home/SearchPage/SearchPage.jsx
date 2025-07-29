import { useState } from "react";
import { FaSearch, FaTint, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

import distictsData from '../../../assets/districts.json';
import upazilasData from '../../../assets/upazilas.json';

import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SearchPage = () => {
  const axiosPublic = useAxiosPublic();

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [donors, setDonors] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      // Fetch all donors (you can optimize with query params if backend supports)
      const res = await axiosPublic.get("/users");
      const donorList = res.data.users || [];

      // Filter on client side based on selections
      const filtered = donorList.filter((donor) => {
        return (
          (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
          (district ? donor.district === district : true) &&
          (upazila ? donor.upazila === upazila : true)
        );
      });

      setDonors(filtered);
      setShowResults(true);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaSearch className="inline mr-2 text-red-600" />
        Search for Blood Donors
      </motion.h2>

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Blood Group Selector */}
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        {/* District Selector */}
        <select
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setUpazila(""); // Reset upazila when district changes
          }}
          className="select select-bordered w-full"
        >
          <option value="">Select District</option>
          {distictsData.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        {/* Upazila Selector */}
        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="select select-bordered w-full"
          disabled={!district} // Disable upazila if no district selected
        >
          <option value="">Select Upazila</option>
          {upazilasData
            .filter((u) => u.district_id === district)
            .map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>

        {/* Search Button */}
        <motion.button
          onClick={handleSearch}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="btn btn-error text-white px-6"
        >
          <FaSearch className="mr-2" /> Search
        </motion.button>
      </div>

      {/* Results */}
      {showResults && (
        <div>
          {donors.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {donors.map((donor) => (
                <motion.div
                  key={donor._id}
                  className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <FaUser className="text-red-500" />
                    {donor.name}
                  </h3>
                  <p className="flex items-center gap-2">
                    <FaTint className="text-red-600" /> <strong>Blood:</strong> {donor.bloodGroup}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" /> <strong>District:</strong> {distictsData.find(d => d.id === donor.district)?.name || donor.district}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-400" /> <strong>Upazila:</strong> {upazilasData.find(u => u.id === donor.upazila)?.name || donor.upazila}
                  </p>
                  <p className="mt-2"><strong>Email:</strong> {donor.email}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-600 mt-10">No donors found. Try different filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
