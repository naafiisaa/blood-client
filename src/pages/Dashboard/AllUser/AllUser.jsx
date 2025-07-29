
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const fetchUsers = async ({ queryKey }) => {
  const [_, page, statusFilter] = queryKey;
  const response = await axios.get('http://localhost:8001/users', {
    params: { page, limit: 5, status: statusFilter },
  });
  console.log('API response data:', response.data);
  return response.data; // { users, totalUsers, totalPages, currentPage }
};

const updateUserStatus = async (id, status) => {
  const response = await axios.patch(`http://localhost:8001/users/${id}/status`, { status });
  return response.data;
};

const updateUserRole = async (id, role) => {
  const response = await axios.patch(`http://localhost:8001/users/${id}/role`, { role });
  return response.data;
};

const AllUser = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const queryClient = useQueryClient();

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
        confirmButtonColor: '#e11d48',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update user status.',
        confirmButtonColor: '#e11d48',
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
        confirmButtonColor: '#e11d48',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update user role.',
        confirmButtonColor: '#e11d48',
      });
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading users...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Failed to load users.</div>;

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  if (users.length === 0) {
    return <div className="text-center text-gray-600 py-10">No users found.</div>;
  }

  return (
    <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-6">Manage All Users</h2>

      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <label className="text-lg font-medium mr-2">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1); // reset to first page on filter change
            }}
            className="select select-bordered max-w-xs"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead className="bg-red-600 text-white">
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
            {users.map((user) => (
              <tr key={user._id} className="hover">
                <td>
                  <div className="avatar">
                    <div className="w-10 md:w-12 rounded-full ring ring-red-400 ring-offset-2">
                      <img src={user.avatar} alt="Avatar" />
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.role === 'user' ? 'donor' : user.role}</td>
                <td>
                  <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <details className="dropdown">
                    <summary className="btn btn-sm btn-outline">Actions</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-white text-sm rounded-box w-48 border">
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${page === i + 1 ? 'btn-error' : 'btn-outline'}`}
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



