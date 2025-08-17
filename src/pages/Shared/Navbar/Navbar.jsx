import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FiLogIn } from "react-icons/fi";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ThemeToggle from "../../../Utilis/ThemeToggle";

// Helper to read CSS variables dynamically
const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [colors, setColors] = useState({
    primary: getCSSVar("--primary"),
    secondary: getCSSVar("--secondary"),
    accent: getCSSVar("--accent"),
    neutral: getCSSVar("--neutral"),
    background: getCSSVar("--background"),
  });

  // Update colors dynamically when theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar("--primary"),
        secondary: getCSSVar("--secondary"),
        accent: getCSSVar("--accent"),
        neutral: getCSSVar("--neutral"),
        background: getCSSVar("--background"),
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"], // watch for .dark
    });
    return () => observer.disconnect();
  }, []);

  const { data: userInfo, isLoading, isError } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user?.email,
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: `rgb(${colors.primary})`,
      cancelButtonColor: `rgb(${colors.secondary})`,
      confirmButtonText: "Yes, log out",
    }).then(result => {
      if (result.isConfirmed) {
        logOut()
          .then(() => Swal.fire("Logged out!", "You have been logged out.", "success"))
          .catch(() => Swal.fire("Error!", "Logout failed.", "error"));
      }
    });
  };

  const guestLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/blog">Blog</NavLink></li>
      <li><NavLink to="/blood-donation-request">Donation Requests</NavLink></li>
    </>
  );

  const userLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/blog">Blog</NavLink></li>
      <li><NavLink to="/blood-donation-request">Donation Requests</NavLink></li>
      <li><NavLink to="/funding">Funding</NavLink></li>
      <li>
        <Link
          to={
            userInfo?.role === "Admin"
              ? "/dashboard/adminHome"
              : userInfo?.role === "Volunteer"
              ? "/dashboard/volunteerHome"
              : userInfo?.role === "Donor"
              ? "/dashboard/donorHome"
              : "/dashboard"
          }
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <div
      className="shadow-md fixed top-0 left-0 w-full z-50 transition-colors"
      style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.neutral})` }}
    >
      <div className="navbar lg:w-11/12 mx-auto md:px-10 px-4 py-2 flex justify-between items-center">

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <RxCross2 className="text-3xl" style={{ color: `rgb(${colors.primary})` }} />
            ) : (
              <GiHamburgerMenu className="text-3xl" style={{ color: `rgb(${colors.primary})` }} />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/WWwzMPSt/Nice-Png-blood-symbol-png-3647802.png"
            alt="Logo"
            className="md:w-8 md:h-8 w-6 h-6"
          />
          <span className="font-bold text-base md:text-lg" style={{ color: `rgb(${colors.primary})` }}>
            LifeStream
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 font-semibold">
          {user ? userLinks : guestLinks}
        </ul>

        {/* Auth / Avatar */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoading ? (
            <span className="loading loading-dots loading-sm" style={{ color: `rgb(${colors.primary})` }} />
          ) : isError ? (
            <span style={{ color: `rgb(${colors.secondary})` }}>Error</span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="md:w-8 w-6 rounded-full border-2" style={{ borderColor: `rgb(${colors.primary})` }}>
                  <img src={userInfo?.avatar || user.photoURL} alt="User" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] mt-3 p-3 shadow rounded-box w-52"
                style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.neutral})` }}
              >
                <li className="text-center font-semibold">{userInfo?.name || user.displayName}</li>
                <li className="text-sm text-center">{user.email}</li>
                <li className="text-sm text-center font-semibold" style={{ color: `rgb(${colors.primary})` }}>
                  Role: {userInfo?.role || "User"}
                </li>
                <li className="mt-2">
                  <Link
                    to={
                      userInfo?.role === "Admin"
                        ? "/dashboard/adminHome"
                        : userInfo?.role === "Volunteer"
                        ? "/dashboard/volunteerHome"
                        : userInfo?.role === "Donor"
                        ? "/dashboard/donorHome"
                        : "/dashboard"
                    }
                    className="w-full py-2 rounded text-center font-semibold"
                    style={{
                      border: `2px solid rgb(${colors.primary})`,
                      color: `rgb(${colors.primary})`,
                      backgroundColor: "transparent",
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 rounded font-semibold"
                    style={{
                      backgroundColor: `rgb(${colors.primary})`,
                      color: `rgb(${colors.neutral})`,
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-1 rounded border font-semibold"
              style={{
                border: `2px solid rgb(${colors.primary})`,
                color: `rgb(${colors.primary})`,
              }}
            >
              <FiLogIn className="text-xl" /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul
          className="lg:hidden flex flex-col shadow-md p-4 space-y-3"
          style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.neutral})` }}
        >
          {user ? userLinks : guestLinks}
        </ul>
      )}
    </div>
  );
};

export default Navbar;




//  import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { RxCross2 } from 'react-icons/rx';
// import { FiLogIn } from 'react-icons/fi';
// import Swal from 'sweetalert2';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../Hooks/useAuth';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import ThemeToggle from '../../../Utilis/ThemeToggle';

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const { user, logOut } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: userInfo, isLoading, isError } = useQuery({
//     queryKey: ['userInfo', user?.email],
//     queryFn: async () => {
//       if (user?.email) {
//         const res = await axiosSecure.get(`/users/${user.email}`);
//         return res.data;
//       }
//       return null;
//     },
//     enabled: !!user?.email,
//   });

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You want to log out!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, log out',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logOut()
//           .then(() => {
//             Swal.fire('Logged out!', 'You have been logged out.', 'success');
//           })
//           .catch(() => {
//             Swal.fire('Error!', 'Logout failed.', 'error');
//           });
//       }
//     });
//   };

//   // NavLinks for before login
//   const guestLinks = (
//     <>  
//      <li><NavLink to="/">Home</NavLink></li>
//        <li><NavLink to="/blog">Blog</NavLink></li>
//       <li><NavLink to="/blood-donation-request">Donation Requests</NavLink></li>
    
   
//     </>
//   );

//   // NavLinks for after login
//   const userLinks = (
//     <> <li><NavLink to="/">Home</NavLink></li>
//     <li><NavLink to="/blog">Blog</NavLink></li>
//       <li><NavLink to="/blood-donation-request">Donation Requests</NavLink></li>
//       <li><NavLink to="/funding">Funding</NavLink></li>
      
//                         <Link
//                     to={
//                       userInfo?.role === 'Admin'
//                         ? '/dashboard/adminHome'
//                         : userInfo?.role === 'Volunteer'
//                         ? '/dashboard/volunteerHome'
//                         : userInfo?.role === 'Donor'
//                         ? '/dashboard/donorHome'
//                         : '/dashboard'
//                     }
//                     className=" "
//                   >
//                     Dashboard
//                   </Link>
     
//     </>
//   );

//   return (
//     <div className="bg-red-100 text-red-600 shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="navbar lg:w-11/12 mx-auto md:px-10 px-4 py-2 flex justify-between items-center">
        
//         {/* Mobile menu button */}
//         <div className="lg:hidden">
//           <button onClick={() => setOpen(!open)}>
//             {open ? (
//               <RxCross2 className="text-3xl text-red-500" />
//             ) : (
//               <GiHamburgerMenu className="text-3xl text-red-500" />
//             )}
//           </button>
//         </div>

//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <img
//             src="https://i.ibb.co/WWwzMPSt/Nice-Png-blood-symbol-png-3647802.png"
//             alt="Logo"
//             className="md:w-8 md:h-8 w-6 h-6"
//           />
//           <span className="font-bold text-base md:text-lg text-red-500">LifeStream</span>
//         </div>

//         {/* Desktop Nav */}
//         <ul className="hidden lg:flex gap-6 font-semibold">
//           {user ? userLinks : guestLinks}
//         </ul>

//         {/* Auth Buttons or Avatar */}
//         <div className="flex items-center">
//           <ThemeToggle />
//           {isLoading ? (
//             <span className="loading loading-dots loading-sm text-red-500"></span>
//           ) : isError ? (
//             <span className="text-red-900">Error</span>
//           ) : user ? (
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle avatar"
//               >
//                 <div className="md:w-8  w-6 rounded-full border-2 border-red-500">
//                   <img src={userInfo?.avatar || user.photoURL} alt="User" />
//                 </div>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] mt-3 p-3 bg-white shadow rounded-box w-52"
//               >
//                 <li className="text-center font-semibold text-black">
//                   {userInfo?.name || user.displayName}
//                 </li>
//                 <li className="text-sm text-center text-gray-500">{user.email}</li>
//                 <li className="text-sm text-center text-red-500 font-semibold">
//                   Role: {userInfo?.role || 'User'}
//                 </li>
//                 <li className="mt-2">
//                   <Link
//                     to={
//                       userInfo?.role === 'Admin'
//                         ? '/dashboard/adminHome'
//                         : userInfo?.role === 'Volunteer'
//                         ? '/dashboard/volunteerHome'
//                         : userInfo?.role === 'Donor'
//                         ? '/dashboard/donorHome'
//                         : '/dashboard'
//                     }
//                     className="btn btn-sm btn-outline w-full"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <button
//                     onClick={handleLogout}
//                     className="btn btn-sm bg-red-500 text-white w-full"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <Link to="/login" className="flex items-center gap-1 btn btn-outline btn-sm ml-3">
//               <FiLogIn className="text-xl text-red-500" /> Login
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <ul className="lg:hidden flex flex-col bg-white shadow-md p-4 space-y-3">
//           {user ? userLinks : guestLinks}
//         </ul>
//       )}
//     </div>
//   );
// };

//  export default Navbar;