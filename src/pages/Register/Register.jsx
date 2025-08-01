import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import districtsData from '../../assets/districts.json';
import upazilasData from '../../assets/upazilas.json';

import Lottie from 'react-lottie';
import animationData from '../../assets/Animation - 1736856643838.json'
import useAxiosPublic from '../../Hooks/useAxiosPublic';


const Register = () => {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const axiosPublic = useAxiosPublic(); // Use your custom hook

  const onSubmit = (data) => {
    //console.log(data);
    createUser(data.email, data.password)
      .then((userCredential) => {
        //console.log('User registered:', userCredential.user);

        updateUserProfile(data.name, data.avatar)
          .then(() => {
            //console.log('User profile info Updated');
            // Save user info to the server
            axiosPublic.post('/users', data)
              .then(response => {
               // console.log('User info saved:', response.data);
                reset();
                Swal.fire({
                  icon: 'success',
                  title: 'Registration Successful',
                  text: 'You have successfully registered!',
                });
                navigate('/');
              })
              .catch(error => {
                console.error('Error saving user info:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Saving User Info Failed',
                  text: error.message,
                });
              });
          })
          .catch(error => console.log(error));
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message,
        });
      });
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const districts = districtsData;
  const upazilas = upazilasData.filter(upazila => upazila.district_id === districts.find(d => d.name === selectedDistrict)?.id);

  const defaultOptions = {
    loop: true, autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
  };

  return (
    <>
      <Helmet>
        <title>Life Stream | Register</title>
      </Helmet>
      <div className="hero mt-20 bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="text-center lg:text-left">
              <Lottie options={defaultOptions} height={400} width={300} />
            </div>
          </div>
          <div className=" bg-base-100 w-full max-w-xs shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered" />
                {errors.email && <span className='text-red-600'>Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" {...register("name", { required: true })} className="input input-bordered" />
                {errors.name && <span className='text-red-600'>Name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar URL</span>
                </label>
                <input type="text" placeholder="Image URL" {...register("avatar", { required: true })} className="input input-bordered" />
                {errors.avatar && <span className='text-red-600'>Avatar URL is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select {...register("bloodGroup", { required: true })} className="select select-bordered">
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
                {errors.bloodGroup && <span className='text-red-600'>Blood Group is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select {...register("district", { required: true })} className="select select-bordered" onChange={handleDistrictChange}>
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.district && <span className='text-red-600'>District is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upazila</span>
                </label>
                <select {...register("upazila", { required: true })} className="select select-bordered">
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
                {errors.upazila && <span className='text-red-600'>Upazila is required</span>}
              </div>
            <div className="form-control">
  <label className="label">
    <span className="label-text">Password</span>
  </label>
  <input
    type="password"
    placeholder="password"
    {...register("password", {
      required: true,
      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{6,10}$/,
    })}
    className="input input-bordered"
  />

  {errors.password?.type === 'required' && (
    <span className='text-red-600'>Password is required</span>
  )}
  {errors.password?.type === 'pattern' && (
    <span className='text-red-600'>
      Password must be 6–10 characters long, include lowercase letters, at least one number, and one special character (!@#$%^&*)
    </span>
  )}
</div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="confirm password" {...register("confirmPassword", {
                  required: true,
                  validate: value => value === watch('password') || 'Passwords do not match'
                })} className="input input-bordered" />
                {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword.message}</span>}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <p className='p-2'>Already have an account?</p>
           <Link to="/login" className="btn btn-outline btn-primary bg-base-100 w-full text-center text-red-600 m-auto">
  Login
</Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;