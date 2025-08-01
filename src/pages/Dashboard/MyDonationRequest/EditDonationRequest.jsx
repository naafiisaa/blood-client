import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('pending'); // Store original status

  useEffect(() => {
     axiosSecure.get(`/donation-requests/${id}`)

      .then(res => {
        const data = res.data;
        setValue('recipientName', data.recipientName);
        setValue('recipientDistrict', data.recipientDistrict);
        setValue('recipientUpazila', data.recipientUpazila);
        setValue('donationDate', data.donationDate?.split('T')[0]);
        setValue('donationTime', data.donationTime);
        setValue('bloodGroup', data.bloodGroup);
        setStatus(data.status); // Save the existing status
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching donation request', err);
        Swal.fire('Error', 'Failed to fetch donation request', 'error');
      });
  }, [axiosSecure, id, setValue]);

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      status // Re-include status explicitly
    };

    axiosSecure.patch(`/donation-requests/${id}`, updatedData)
      .then(() => {
        Swal.fire('Updated!', 'Donation request has been updated.', 'success');
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Update failed:', error);
        Swal.fire('Error', 'You did not change anything. No update happened.', 'error');
      });
  };

  if (loading) return <Loading />

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Recipient Name</label>
          <input {...register('recipientName', { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold">Recipient District</label>
          <input {...register('recipientDistrict', { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold">Recipient Upazila</label>
          <input {...register('recipientUpazila', { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold">Donation Date</label>
          <input type="date" {...register('donationDate', { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold">Donation Time</label>
          <input type="time" {...register('donationTime', { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold">Blood Group</label>
          <select {...register('bloodGroup', { required: true })} className="select select-bordered w-full">
            <option value="">Select</option>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
        </div>

        {/* Removed the status field from the form */}

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">Update Donation Request</button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;
