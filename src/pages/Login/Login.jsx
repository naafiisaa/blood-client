// import React from 'react';
// import Lottie from 'lottie-react';
// import animation from "../../assets/Animation - 1736856643838.json";
// import useAuth from '../../Hooks/useAuth';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation()

//   const from = location.state?.from?.pathname || "/";
//   const handleLogin = event => {
//     event.preventDefault();
//     const form = event.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     //console.log(email, password);
//     login(email, password)
//       .then(result => {
//         const user = result.user;
//         //console.log(user);
//         Swal.fire({
//           icon: 'success',
//           title: 'Login Successful',
//           text: 'You have successfully logged in!',
//         });
//         navigate(from, {replace: true});
//       })
//       .catch(error => {
//         console.error('Error logging in:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Login Failed',
//           text: error.message,
//         });
//       });
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Life Stream | Login</title>
//       </Helmet>
//       <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-left">
//             <Lottie animationData={animation} loop={true} />
//           </div>
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <form onSubmit={handleLogin} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input type="email" placeholder="email" name='email' className="input input-bordered" required />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input type="password" placeholder="password" name='password' className="input input-bordered" required />
//                 <label className="label">
//                   <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//                 </label>
//               </div>
//               <div className="form-control mt-6">
//                 <button className="btn btn-primary">Login</button>
//               </div>
//             </form>
//             <p>New Here?</p>
//             <button className='btn text-red-600'><Link to="/register">Register here</Link></button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import React from 'react';
import Lottie from 'lottie-react';
import animation from "../../assets/Animation - 1736856643838.json";
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Login = () => {
  const { login } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ Secure Axios instance
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await login(email, password);
      const user = result.user;

      // ✅ Request JWT from your backend after Firebase login
      const res = await axiosSecure.post('/jwt', { email: user.email });
      const token = res.data.token;

      if (token) {
        localStorage.setItem('access_token', token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
        });

        navigate(from, { replace: true });
      } else {
        throw new Error("Token not received");
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Something went wrong',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Life Stream | Login</title>
      </Helmet>
      <div className="hero mt-20 bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Lottie animationData={animation} loop={true} />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className='p-2'>New Here?</p>
           <Link to="/register" className="btn btn-outline btn-primary w-full text-center text-red-600">
  Register here
</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

