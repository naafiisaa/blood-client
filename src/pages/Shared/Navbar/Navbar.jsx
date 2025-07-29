 
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { FiLogIn } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';



const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
const axiosSecure = useAxiosSecure(); // 🔐 secure Axios with token

const { data: userInfo, isLoading, isError, error } = useQuery({
  queryKey: ['userInfo', user?.email],
  queryFn: async () => {
    if (user?.email) {
      const res = await axiosSecure.get(`/users/${user.email}`); // ✅ SECURE + Specific
      return res.data; // 🔁 No need to filter manually now
    }
    return null;
  },
  enabled: !!user?.email,
});


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to log out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log out',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire('Logged out!', 'You have been logged out.', 'success');
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Error!', 'Logout failed.', 'error');
          });
      }
    });
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/founding">Funding</NavLink></li>
      <li><NavLink to="/searchPage">Search</NavLink></li>
      <li><NavLink to="/blood-donation-request">Donation Requests</NavLink></li>
      <li><NavLink to="/blog">Blog</NavLink></li>
    </>
  );

  return (
    <div className="bg-red-100 text-red-600 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <RxCross2 className="text-3xl text-red-500" />
            ) : (
              <GiHamburgerMenu className="text-3xl text-red-500" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co.com/0y3TKf4/images-q-tbn-ANd9-Gc-QTFUPJ215o-Q9m-Bln91-MMv65-J4-IRMUi-JZXi-Dw-s.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-red-500">LifeStream</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 font-semibold">{navLinks}</ul>

        {/* Auth Buttons */}
        <div className="flex items-center">
          {isLoading ? (
            <span className="loading loading-dots loading-sm text-red-500"></span>
          ) : isError ? (
            <span className="text-red-900">Error</span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-red-500">
                  <img src={userInfo?.avatar || user.photoURL} alt="User" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] mt-3 p-3 bg-white shadow rounded-box w-52"
              >
                <li className="text-center font-semibold text-black">
                  {userInfo?.name || user.displayName}
                </li>
                <li className="text-sm text-center text-gray-500">{user.email}</li>
                <li className="text-sm text-center text-red-500 font-semibold">
                  Role: {userInfo?.role || 'User'}
                </li>
                <li className="mt-2">
                  <Link
                    to={
                      userInfo?.role === 'Admin'
                        ? '/dashboard/adminHome'
                        : userInfo?.role === 'Volunteer'
                        ? '/dashboard/volunteerHome'
                        : userInfo?.role === 'Donor'
                        ? '/dashboard/donorHome'
                        : '/dashboard'
                    }
                    className="btn btn-sm btn-outline w-full"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-red-500 text-white w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 btn btn-outline btn-sm ml-3">
              <FiLogIn className="text-xl text-red-500" /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {open && (
        <ul className="lg:hidden flex flex-col bg-white shadow-md p-4 space-y-3">
          {navLinks}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
