// //colour chane for dark mood
// import React, { useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import Loading from '../../../Components/Loading/Loading';

// const fetchUsers = async ({ queryKey }) => {
//   const [_, page, statusFilter] = queryKey;
//   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
//     params: { page, limit: 5, status: statusFilter },
//   });
//   return response.data;
// };

// const updateUserStatus = async (id, status) => {
//   const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/status`, { status });
//   return response.data;
// };

// const updateUserRole = async (id, role) => {
//   const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/role`, { role });
//   return response.data;
// };

// const AllUser = () => {
//   const [page, setPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState('');
//   const queryClient = useQueryClient();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['users', page, statusFilter],
//     queryFn: fetchUsers,
//     keepPreviousData: true,
//   });

//   const handleStatusChange = async (id, status) => {
//     try {
//       await updateUserStatus(id, status);
//       queryClient.invalidateQueries(['users', page, statusFilter]);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: `User status set to ${status}`,
//         confirmButtonColor: '#ef4444', // brand red
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Could not update user status.',
//         confirmButtonColor: '#ef4444',
//       });
//     }
//   };

//   const handleRoleChange = async (id, role) => {
//     try {
//       await updateUserRole(id, role);
//       queryClient.invalidateQueries(['users', page, statusFilter]);
//       Swal.fire({
//         icon: 'success',
//         title: 'Role Updated',
//         text: `User role set to ${role}`,
//         confirmButtonColor: '#ef4444',
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Could not update user role.',
//         confirmButtonColor: '#ef4444',
//       });
//     }
//   };

//   if (isLoading) return <Loading />;
//   if (error) return <div className="text-center py-20 text-red-500 dark:text-red-400">Failed to load users.</div>;

//   const users = data?.users || [];
//   const totalPages = data?.totalPages || 1;

//   return (
//     <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto bg-gray-50 dark:bg-[#0f172a] min-h-screen transition-colors">
//       <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">
//         Manage All Users
//       </h2>

//       {/* Filter */}
//       <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
//         <div>
//           <label className="text-lg font-medium mr-2 dark:text-gray-200">Filter by Status:</label>
//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setPage(1);
//             }}
//             className="select select-bordered max-w-xs dark:bg-[#1e293b] dark:text-gray-200 dark:border-gray-600"
//           >
//             <option value="">All</option>
//             <option value="active">Active</option>
//             <option value="blocked">Blocked</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white dark:bg-[#1e293b] shadow-md rounded-lg">
//         <table className="table table-zebra w-full text-sm md:text-base">
//           <thead className="bg-red-600 dark:bg-red-500 text-white">
//             <tr>
//               <th>Avatar</th>
//               <th>Email</th>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody className="dark:text-gray-200">
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-600 dark:text-gray-400 py-8">
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id} className="hover dark:hover:bg-[#334155]">
//                   <td>
//                     <div className="avatar">
//                       <div className="w-10 md:w-12 rounded-full ring ring-red-400 dark:ring-red-500 ring-offset-2">
//                         <img src={user.avatar} alt="Avatar" />
//                       </div>
//                     </div>
//                   </td>
//                   <td>{user.email}</td>
//                   <td>{user.name}</td>
//                   <td>{user.role === 'user' ? 'donor' : user.role}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         user.status === 'active'
//                           ? 'bg-green-500 text-white'
//                           : 'bg-red-500 text-white'
//                       }`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>
//                   <td>
//                     <details className="dropdown">
//                       <summary className="btn btn-sm btn-outline dark:border-red-500 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white">
//                         Actions
//                       </summary>
//                       <ul className="p-2 shadow menu dropdown-content z-[1] bg-white dark:bg-[#1e293b] dark:text-gray-200 text-sm rounded-box w-48 border dark:border-gray-700">
//                         <li>
//                           {user.status === 'active' ? (
//                             <button onClick={() => handleStatusChange(user._id, 'blocked')}>Block</button>
//                           ) : (
//                             <button onClick={() => handleStatusChange(user._id, 'active')}>Unblock</button>
//                           )}
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => handleRoleChange(user._id, 'volunteer')}
//                             disabled={user.status === 'blocked'}
//                           >
//                             Make Volunteer
//                           </button>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => handleRoleChange(user._id, 'admin')}
//                             disabled={user.status === 'blocked'}
//                           >
//                             Make Admin
//                           </button>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => handleRoleChange(user._id, 'donor')}
//                             disabled={user.status === 'blocked'}
//                           >
//                             Make Donor
//                           </button>
//                         </li>
//                       </ul>
//                     </details>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 flex-wrap gap-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             className={`btn btn-sm ${
//               page === i + 1
//                 ? 'bg-red-600 text-white dark:bg-red-500'
//                 : 'btn-outline dark:border-red-500 dark:text-red-400'
//             }`}
//             onClick={() => setPage(i + 1)}
//             disabled={page === i + 1}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllUser;
import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';

const fetchUsers = async ({ queryKey }) => {
  const [_, page, statusFilter] = queryKey;
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    params: { page, limit: 5, status: statusFilter },
  });
  return response.data;
};

const updateUserStatus = async (id, status) => {
  const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/status`, { status });
  return response.data;
};

const updateUserRole = async (id, role) => {
  const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/role`, { role });
  return response.data;
};

const getCSSVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const AllUser = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    secondary: getCSSVar('--secondary'),
    text: getCSSVar('--text'),
    background: getCSSVar('--background'),
    accent: getCSSVar('--accent'),
    neutral: getCSSVar('--neutral'),
  });

  const queryClient = useQueryClient();

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

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page, statusFilter],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  const handleStatusChange = async (id, status) => {
    try {
      await updateUserStatus(id, status);
      queryClient.invalidateQueries(['users', page, statusFilter]);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `User status set to ${status}`,
        confirmButtonColor: colors.primary,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update user status.',
        confirmButtonColor: colors.primary,
      });
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      queryClient.invalidateQueries(['users', page, statusFilter]);
      Swal.fire({
        icon: 'success',
        title: 'Role Updated',
        text: `User role set to ${role}`,
        confirmButtonColor: colors.primary,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update user role.',
        confirmButtonColor: colors.primary,
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center py-20" style={{ color: `rgb(${colors.accent})` }}>
        Failed to load users.
      </div>
    );

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div
      className="px-4 md:px-10 py-8 max-w-7xl mx-auto min-h-screen transition-colors"
      style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
    >
      <h2 className="text-3xl font-bold mb-6" style={{ color: `rgb(${colors.primary})` }}>
        Manage All Users
      </h2>

      {/* Filter */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <label className="text-lg font-medium mr-2" style={{ color: `rgb(${colors.text})` }}>
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="select select-bordered max-w-xs"
style={{ backgroundColor: `rgb(${colors.secondary})`, color: `rgb(${colors.text})` }}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg"
      style={{backgroundColor: `rgb(${colors.secondary})`}}>
  <table className="table w-full text-sm md:text-base">
    <thead
      style={{
        backgroundColor: `rgb(${colors.primary})`,
        color: 'white',
      }}
    >
      <tr>
        <th>Avatar</th>
        <th>Email</th>
        <th>Name</th>
        <th>Role</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length === 0 ? (
        <tr>
          <td
            colSpan="6"
            className="text-center py-8"
            style={{ color: `rgb(${colors.text})` }}
          >
            No users found.
          </td>
        </tr>
      ) : (
        users.map((user, index) => (
          <tr
            key={user._id}
            className="hover"
            style={{
              backgroundColor:
                index % 2 === 0
                  ? `rgb(${colors.background})`
                  : `rgba(${colors.text}, 0.05)`, // slightly lighter/darker for odd rows
                  // backgroundColor: `rgb(${colors.secondary})`,
              color: `rgb(${colors.text})`,
              transition: 'background 0.3s',
            }}
          >
            <td>
              <div className="avatar">
                <div className="w-10 md:w-12 rounded-full ring ring-red-400 dark:ring-red-500 ring-offset-2">
                  <img src={user.avatar} alt="Avatar" />
                </div>
              </div>
            </td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.role === 'user' ? 'donor' : user.role}</td>
            <td>
              <span
                className="badge"
                style={{
                  background: user.status === 'active' ? '#22c55e' : '#ef4444',
                  color: 'white',
                }}
              >
                {user.status}
              </span>
            </td>
            <td>
              <details className="dropdown">
                <summary
                  className="btn btn-sm btn-outline"
                  style={{
                    borderColor: `rgb(${colors.primary})`,
                    color: `rgb(${colors.primary})`,
                  }}
                >
                  Actions
                </summary>
                <ul
                  className="p-2 shadow menu dropdown-content z-[1] rounded-box w-48 border"
                  style={{
                    background: `rgb(${colors.background})`,
                    color: `rgb(${colors.text})`,
                    borderColor: `rgb(${colors.accent})`,
                  }}
                >
                  <li>
                    {user.status === 'active' ? (
                      <button onClick={() => handleStatusChange(user._id, 'blocked')}>
                        Block
                      </button>
                    ) : (
                      <button onClick={() => handleStatusChange(user._id, 'active')}>
                        Unblock
                      </button>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => handleRoleChange(user._id, 'volunteer')}
                      disabled={user.status === 'blocked'}
                    >
                      Make Volunteer
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleRoleChange(user._id, 'admin')}
                      disabled={user.status === 'blocked'}
                    >
                      Make Admin
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleRoleChange(user._id, 'donor')}
                      disabled={user.status === 'blocked'}
                    >
                      Make Donor
                    </button>
                  </li>
                </ul>
              </details>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

      {/* <div
        className="overflow-x-auto shadow-md rounded-lg"
        style={{ background: `rgb(${colors.background})` }}
      >
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead style={{ backgroundColor: `rgb(${colors.primary})`, color: 'white' }}>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ color: `rgb(${colors.text})` }}>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover" style={{ transition: 'background 0.3s' }}>
                  <td>
                    <div className="avatar">
                      <div className="w-10 md:w-12 rounded-full ring ring-red-400 dark:ring-red-500 ring-offset-2">
                        <img src={user.avatar} alt="Avatar" />
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role === 'user' ? 'donor' : user.role}</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background: user.status === 'active' ? '#22c55e' : '#ef4444',
                        color: 'white',
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <details className="dropdown">
                      <summary
                        className="btn btn-sm btn-outline"
                        style={{
                          borderColor: `rgb(${colors.primary})`,
                          color: `rgb(${colors.primary})`,
                        }}
                      >
                        Actions
                      </summary>
                      <ul
                        className="p-2 shadow menu dropdown-content z-[1] rounded-box w-48 border"
                        style={{
                          background: `rgb(${colors.background})`,
                          color: `rgb(${colors.text})`,
                          borderColor: `rgb(${colors.accent})`,
                        }}
                      >
                        <li>
                          {user.status === 'active' ? (
                            <button onClick={() => handleStatusChange(user._id, 'blocked')}>Block</button>
                          ) : (
                            <button onClick={() => handleStatusChange(user._id, 'active')}>Unblock</button>
                          )}
                        </li>
                        <li>
                          <button
                            onClick={() => handleRoleChange(user._id, 'volunteer')}
                            disabled={user.status === 'blocked'}
                          >
                            Make Volunteer
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleRoleChange(user._id, 'admin')}
                            disabled={user.status === 'blocked'}
                          >
                            Make Admin
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleRoleChange(user._id, 'donor')}
                            disabled={user.status === 'blocked'}
                          >
                            Make Donor
                          </button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div> */}

      {/* Pagination */}
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${page === i + 1 ? '' : 'btn-outline'}`}
            style={{
              background: page === i + 1 ? `rgb(${colors.primary})` : 'transparent',
              color: page === i + 1 ? 'white' : `rgb(${colors.primary})`,
              borderColor: `rgb(${colors.accent})`,
            }}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
