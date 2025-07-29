import React, { useState, useEffect } from 'react';
import distictsData from '../../../assets/districts.json';
import upazilasData from '../../../assets/upazilas.json';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';


const SearchPage = () => {
  const axiosPublic = useAxiosPublic();
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [donors, setDonors] = useState([]);

  const handleSearch = async () => {
      try {
        const params = { bloodGroup }; // Add bloodGroup to query params
        if (district) params.recipientDistrict = district; // Optionally add district filter
        if (upazila) params.recipientUpazila = upazila; // Optionally add upazila filter
    
        const response = await axiosPublic.get('/donation-requests', { params });
        setDonors(response.data.donationRequests);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };
    

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Donors</h2>
      <div className="mb-4">
        <label className="block mb-2">Blood Group:</label>
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        >
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
      <div className="mb-4">
        <label className="block mb-2">District:</label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select District</option>
          {distictsData.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Upazila:</label>
        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Upazila</option>
          {upazilasData
            .filter((upazila) => upazila.district_id === district)
            .map((upazila) => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.name}
              </option>
            ))}
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <div className="mt-4">
        {donors.length > 0 ? (
          donors.map((donor) => (
            <div key={donor._id} className="border p-4 mb-4 rounded">
              <h3 className="font-bold text-lg">{donor.recipientName}</h3>
              <p>Blood Group: {donor.bloodGroup}</p>
              <p>District: {donor.recipientDistrict}</p>
              <p>Upazila: {donor.recipientUpazila}</p>
              <p>Contact: {donor.requesterEmail}</p>
            </div>
          ))
        ) : (
          <p>No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
