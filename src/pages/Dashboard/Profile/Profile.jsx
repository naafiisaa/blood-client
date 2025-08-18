// import React, { useState, useEffect } from 'react'; 
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import useAuth from '../../../Hooks/useAuth';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';  // import axiosSecure hook
// import { FiEdit3, FiSave, FiInfo } from 'react-icons/fi';

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
//   }, [user, axiosSecure, setValue]);

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

//     axiosSecure.patch(`/users/${userInfo._id}`, data)
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
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-3xl font-semibold text-gray-800">My Profile</h2>
//         {/* Edit Button on top right */}
//         {!isEditable ? (
//           <motion.button
//             type="button"
//             onClick={() => setIsEditable(true)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             className="btn btn-outline btn-sm flex items-center gap-1 text-white bg-red-500 border-red-700"
//             title="Edit Profile"
//           >
//             <FiEdit3 /> Edit
//           </motion.button>
//         ) : (
//           <motion.button
//             form="profile-form"
//             type="submit"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             className="btn btn-primary btn-sm flex items-center gap-1 bg-orange-600 border-orange-700"
//             title="Save Changes"
//           >
//             <FiSave /> Save
//           </motion.button>
//         )}
//       </div>

//       <p className="text-gray-700 mb-6 flex items-center gap-2">
//         <FiInfo className="text-orange-600" /> Manage your personal information
//       </p>

//       {userInfo && (
//         <form
//           id="profile-form"
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-5"
//           // When clicking Save on top button, this form will submit
//         >
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
//         </form>
//       )}
//     </motion.div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiEdit3, FiSave, FiInfo } from 'react-icons/fi';

// Helper to read CSS vars
const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    secondary: getCSSVar('--secondary'),
    accent: getCSSVar('--accent'),
    neutral: getCSSVar('--neutral'),
    background: getCSSVar('--background'),
    text: getCSSVar('--text'),
  });

  // Watch theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar('--primary'),
        secondary: getCSSVar('--secondary'),
        accent: getCSSVar('--accent'),
        neutral: getCSSVar('--neutral'),
        background: getCSSVar('--background'),
        text: getCSSVar('--text'),
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (user && user.email) {
      axiosSecure.get(`/users/${user.email}`)
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
      className="max-w-3xl mx-auto p-6 rounded-2xl shadow-xl mt-10"
      style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.text})` }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold" style={{ color: `rgb(${colors.primary})` }}>
          My Profile
        </h2>

        {!isEditable ? (
          <motion.button
            type="button"
            onClick={() => setIsEditable(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm flex items-center gap-1"
            style={{
              backgroundColor: `rgb(${colors.primary})`,
              // color: "white",
              color: `rgb(${colors.text})`,
              borderColor: `rgb(${colors.secondary})`
            }}
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
            className="btn btn-sm flex items-center gap-1"
            style={{
              backgroundColor: `rgb(${colors.primary})`,
              color: `rgb(${colors.text})`,
              borderColor: `rgb(${colors.primary})`
            }}
            title="Save Changes"
          >
            <FiSave /> Save
          </motion.button>
        )}
      </div>

      <p className="mb-6 flex items-center gap-2"
         style={{ color: `rgb(${colors.text})` }}>
        <FiInfo style={{ color: `rgb(${colors.primary})` }} /> Manage your personal information
      </p>

      {userInfo && (
        <form
          id="profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="flex justify-center mb-6">
            <motion.img
              src={userInfo.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 shadow-md object-cover"
              style={{ borderColor: `rgb(${colors.primary})` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 160 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label-text">Name</label>
                 <input
                type="text"
                {...register("avatar", { required: true })}
                className="input input-bordered w-full"
                style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
                disabled={!isEditable}
              />
              {errors.name && <span className=' text-sm'style={{ color: `rgb(${colors.primary})` }}>Name is required</span>}
            </div>

            <div>
              <label className="label-text">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full "
                style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
                disabled
              />
            </div>

            <div>
              <label className="label-text">Avatar URL</label>
              <input
                type="text"
                {...register("avatar", { required: true })}
                className="input input-bordered w-full"
                style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
                disabled={!isEditable}
              />
              {errors.avatar && <span className=' text-sm' style={{ color: `rgb(${colors.primary})` }}>Avatar URL is required</span>}
            </div>

            <div>
              <label className="label-text">Blood Group</label>
              <select
                {...register("bloodGroup", { required: true })}
                className="select select-bordered w-full"
                style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
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
              {errors.bloodGroup && <span className=' text-sm' style={{ color: `rgb(${colors.primary})` }}>Blood Group is required</span>}
            </div>

            <div>
              <label className="label-text">District</label>
              <input
                type="text"
                {...register("district", { required: true })}
                className="input input-bordered w-full"
                style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
                disabled={!isEditable}
              />
              {errors.district && <span className=' text-sm' style={{ color: `rgb(${colors.primary})` }}>District is required</span>}
            </div>

            <div>
              <label className="label-text">Upazila</label>
              <input
                type="text"
                {...register("upazila", { required: true })}
                className="input input-bordered w-full"
                style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
                disabled={!isEditable}
              />
              {errors.upazila && <span className='text-sm ' style={{ color: `rgb(${colors.primary})` }}>Upazila is required</span>}
            </div>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Profile;
