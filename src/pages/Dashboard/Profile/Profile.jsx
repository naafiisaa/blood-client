import React, { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';  // import axiosSecure hook
import { FiEdit3, FiSave, FiInfo } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();  // use secure axios with token attached
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      axiosSecure.get(`/users/${user.email}`)   // use axiosSecure here
        .then(response => {
          const userData = response.data;
          setUserInfo(userData);
          setValue('name', userData.name);
          setValue('email', userData.email);
          setValue('avatar', userData.avatar);
          setValue('district', userData.district);
          setValue('upazila', userData.upazila);
          setValue('bloodGroup', userData.bloodGroup);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [user, axiosSecure, setValue]);

  const onSubmit = (data) => {
    const currentValues = getValues();
    const hasChanged = Object.keys(currentValues).some(key => currentValues[key] !== userInfo[key]);

    if (!hasChanged) {
      Swal.fire({
        icon: 'info',
        title: 'No Changes',
        text: 'No changes were made to the profile.',
      });
      return;
    }

    axiosSecure.patch(`/users/${userInfo._id}`, data)
      .then(response => {
        setUserInfo(response.data);
        setIsEditable(false);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
        });
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating your profile.',
        });
      });
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-orange-300 rounded-2xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800">My Profile</h2>
        {/* Edit Button on top right */}
        {!isEditable ? (
          <motion.button
            type="button"
            onClick={() => setIsEditable(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline btn-sm flex items-center gap-1 text-white bg-red-500 border-red-700"
            title="Edit Profile"
          >
            <FiEdit3 /> Edit
          </motion.button>
        ) : (
          <motion.button
            form="profile-form"
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-sm flex items-center gap-1 bg-orange-600 border-orange-700"
            title="Save Changes"
          >
            <FiSave /> Save
          </motion.button>
        )}
      </div>

      <p className="text-gray-700 mb-6 flex items-center gap-2">
        <FiInfo className="text-orange-600" /> Manage your personal information
      </p>

      {userInfo && (
        <form
          id="profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          // When clicking Save on top button, this form will submit
        >
          <div className="flex justify-center mb-6">
            <motion.img
              src={userInfo.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-md object-cover"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 160 }}
            />
          </div>

          <div className="grid grid-cols-1 text-red-600 font-semibold md:grid-cols-2 gap-5">
            <div>
              <label className="label-text">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                disabled={!isEditable}
              />
              {errors.name && <span className='text-red-600 text-sm'>Name is required</span>}
            </div>

            <div>
              <label className="label-text">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="label-text">Avatar URL</label>
              <input
                type="text"
                {...register("avatar", { required: true })}
                className="input input-bordered w-full"
                disabled={!isEditable}
              />
              {errors.avatar && <span className='text-red-600 text-sm'>Avatar URL is required</span>}
            </div>

            <div>
              <label className="label-text">Blood Group</label>
              <select
                {...register("bloodGroup", { required: true })}
                className="select select-bordered w-full"
                disabled={!isEditable}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodGroup && <span className='text-red-600 text-sm'>Blood Group is required</span>}
            </div>

            <div>
              <label className="label-text">District</label>
              <input
                type="text"
                {...register("district", { required: true })}
                className="input input-bordered w-full"
                disabled={!isEditable}
              />
              {errors.district && <span className='text-red-600 text-sm'>District is required</span>}
            </div>

            <div>
              <label className="label-text">Upazila</label>
              <input
                type="text"
                {...register("upazila", { required: true })}
                className="input input-bordered w-full"
                disabled={!isEditable}
              />
              {errors.upazila && <span className='text-red-600 text-sm'>Upazila is required</span>}
            </div>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Profile;

// import React, { useState, useEffect } from 'react'; 
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import useAuth from '../../../Hooks/useAuth';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';  // import axiosSecure hook

// const Profile = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();  // use secure axios with token attached
//   const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
//   const [isEditable, setIsEditable] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     if (user && user.email) {
//       axiosSecure.get(`/users/${user.email}`)   // use axiosSecure here
//         .then(response => {
//           const userData = response.data;
//           setUserInfo(userData);
//           setValue('name', userData.name);
//           setValue('email', userData.email);
//           setValue('avatar', userData.avatar);
//           setValue('district', userData.district);
//           setValue('upazila', userData.upazila);
//           setValue('bloodGroup', userData.bloodGroup);
//         })
//         .catch(error => {
//           console.error('Error fetching user info:', error);
//         });
//     }
//   }, [user, axiosSecure, setValue]);  // also update dependencies

//   const onSubmit = (data) => {
//     const currentValues = getValues();
//     const hasChanged = Object.keys(currentValues).some(key => currentValues[key] !== userInfo[key]);

//     if (!hasChanged) {
//       Swal.fire({
//         icon: 'info',
//         title: 'No Changes',
//         text: 'No changes were made to the profile.',
//       });
//       return;
//     }

//     axiosSecure.patch(`/users/${userInfo._id}`, data)  // and here too
//       .then(response => {
//         setUserInfo(response.data);
//         setIsEditable(false);
//         Swal.fire({
//           icon: 'success',
//           title: 'Profile Updated',
//           text: 'Your profile has been updated successfully!',
//         });
//       })
//       .catch(error => {
//         console.error('Error updating profile:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: 'There was an error updating your profile.',
//         });
//       });
  
//   };

//   return (
//     <motion.div
//       className="max-w-3xl mx-auto p-6 bg-orange-300 rounded-2xl shadow-xl mt-10"
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//     >
//       <h2 className="text-3xl font-semibold text-center mb-2 text-gray-800">My Profile</h2>
//       <p className="text-center text-gray-500 mb-6">Manage your personal information</p>

//       {userInfo && (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           <div className="flex justify-center mb-6">
//             <motion.img
//               src={userInfo.avatar}
//               alt="avatar"
//               className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-md object-cover"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 160 }}
//             />
//           </div>

//           <div className="grid grid-cols-1 text-red-600 font-semibold md:grid-cols-2 gap-5">
//             <div>
//               <label className="label-text">Name</label>
//               <input
//                 type="text"
//                 {...register("name", { required: true })}
//                 className="input input-bordered w-full"
//                 disabled={!isEditable}
//               />
//               {errors.name && <span className='text-red-600 text-sm'>Name is required</span>}
//             </div>

//             <div>
//               <label className="label-text">Email</label>
//               <input
//                 type="email"
//                 {...register("email", { required: true })}
//                 className="input input-bordered w-full bg-gray-100"
//                 disabled
//               />
//             </div>

//             <div>
//               <label className="label-text">Avatar URL</label>
//               <input
//                 type="text"
//                 {...register("avatar", { required: true })}
//                 className="input input-bordered w-full"
//                 disabled={!isEditable}
//               />
//               {errors.avatar && <span className='text-red-600 text-sm'>Avatar URL is required</span>}
//             </div>

//             <div>
//               <label className="label-text">Blood Group</label>
//               <select
//                 {...register("bloodGroup", { required: true })}
//                 className="select select-bordered w-full"
//                 disabled={!isEditable}
//               >
//                 <option value="">Select</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//               </select>
//               {errors.bloodGroup && <span className='text-red-600 text-sm'>Blood Group is required</span>}
//             </div>

//             <div>
//               <label className="label-text">District</label>
//               <input
//                 type="text"
//                 {...register("district", { required: true })}
//                 className="input input-bordered w-full"
//                 disabled={!isEditable}
//               />
//               {errors.district && <span className='text-red-600 text-sm'>District is required</span>}
//             </div>

//             <div>
//               <label className="label-text">Upazila</label>
//               <input
//                 type="text"
//                 {...register("upazila", { required: true })}
//                 className="input input-bordered w-full"
//                 disabled={!isEditable}
//               />
//               {errors.upazila && <span className='text-red-600 text-sm'>Upazila is required</span>}
//             </div>
//           </div>

//           <div className="text-center mt-6">
//             {isEditable ? (
//               <motion.button
//                 type="submit"
//                 whileTap={{ scale: 0.95 }}
//                 className="btn btn-primary bg-orange-500 border-orange-600 px-8"
//               >
//                 Save Changes
//               </motion.button>
//             ) : (
//               <motion.button
//                 type="button"
//                 whileTap={{ scale: 0.95 }}
//                 className="btn btn-outline px-8"
//                 onClick={() => setIsEditable(true)}
//               >
//                 Edit Profile
//               </motion.button>
//             )}
//           </div>
//         </form>
//       )}
//     </motion.div>
//   );
// };

// export default Profile;
