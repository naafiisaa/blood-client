

// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { FaTrashAlt } from "react-icons/fa";
// import { MdOutlinePublish } from "react-icons/md";
// import { RiUnpinLine } from "react-icons/ri";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
// import { motion } from "framer-motion";

// const ContentManagement = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure(); // ✅ FIXED: no destructuring

//   const { data: blogs = [], refetch } = useQuery({
//     queryKey: ["blogs"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/blogs");
//       return res.data.blogs || [];
//     },
//   });

//   const userBlogs = blogs.filter((blog) => blog.createdBy === user?.email);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       const res = await axiosSecure.delete(`/blogs/${id}`);
//       if (res.data.deletedCount > 0) {
//         Swal.fire("Deleted!", "Your blog has been deleted.", "success");
//         refetch();
//       }
//     }
//   };

//   const handleToggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === "draft" ? "published" : "draft";
//     const res = await axiosSecure.patch(`/blogs/${id}/status`, { status: newStatus });
//     if (res.data.modifiedCount > 0) {
//       Swal.fire("Updated!", `Blog status changed to ${newStatus}`, "success");
//       refetch();
//     }
//   };

//   return (
//     <motion.div
//       className="w-full px-4 md:px-10"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-3xl font-bold mb-6 text-center text-primary">My Blog Posts</h2>

//       <div className="overflow-x-auto shadow-md border rounded-xl bg-white">
//         <table className="table table-zebra w-full text-center">
//           <thead className="bg-base-200 text-base font-semibold">
//             <tr>
//               <th>#</th>
//               <th>Thumbnail</th>
//               <th>Title</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userBlogs.map((blog, index) => (
//               <motion.tr
//                 key={blog._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <td>{index + 1}</td>
//                 <td>
//                   <img
//                     src={blog.thumbnail}
//                     alt="Thumbnail"
//                     className="w-20 h-14 rounded-lg object-cover border"
//                   />
//                 </td>
//                 <td className="font-medium">{blog.title}</td>
//                 <td>
//                   <span
//                     className={`badge px-3 py-1 rounded-full text-white ${
//                       blog.status === "published" ? "bg-green-500" : "bg-yellow-500"
//                     }`}
//                   >
//                     {blog.status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="flex items-center justify-center gap-2">
//                     <button
//                       onClick={() => handleToggleStatus(blog._id, blog.status)}
//                       className="btn btn-sm btn-outline tooltip"
//                       data-tip={blog.status === "draft" ? "Publish" : "Unpublish"}
//                     >
//                       {blog.status === "draft" ? (
//                         <MdOutlinePublish className="text-green-600 text-lg" />
//                       ) : (
//                         <RiUnpinLine className="text-orange-500 text-lg" />
//                       )}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(blog._id)}
//                       className="btn btn-sm btn-outline tooltip"
//                       data-tip="Delete"
//                     >
//                       <FaTrashAlt className="text-red-600 text-lg" />
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>

//         {userBlogs.length === 0 && (
//           <div className="text-center text-gray-500 py-10 text-lg">
//             No blogs found.
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default ContentManagement;
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import { RiUnpinLine } from "react-icons/ri";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";

const ContentManagement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data.blogs || [];
    },
  });

  const { data: userDoc, isLoading: loadingUserDoc } = useQuery({
    enabled: !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (loadingUserDoc) {
    return <Loading />
  }

  const isAdmin = userDoc?.role === "admin";

  const filteredBlogs =
    filter === "all"
      ? blogs
      : blogs.filter((blog) => blog.status === filter);

  // Your handlers remain the same...




  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/blogs/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Blog has been removed.", "success");
        refetch();
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "draft" ? "published" : "draft";
    const res = await axiosSecure.patch(`/blogs/${id}/status`, {
      status: newStatus,
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", `Blog status set to ${newStatus}`, "success");
      refetch();
    }
  };
return (
    <motion.div
      className="w-full px-4 md:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lg:mb-24 md:mb-8 mb-2">
            <Outlet></Outlet>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-primary">Manage Blogs</h2>

        <div className="flex gap-3">
          <select
            className="select select-bordered"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            onClick={() => navigate("/dashboard/content-management/add-blog")}
            className="btn btn-primary"
          >
            Add Blog
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md border rounded-xl bg-white">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>No</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Status</th>
              <th>Author</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog, index) => (
              <motion.tr
                key={blog._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <td>{index + 1}</td>
                <td>
                  <img
                    src={blog.thumbnail}
                    alt="Thumbnail"
                    className="w-20 h-14 rounded-lg object-cover border"
                  />
                </td>
                <td className="font-medium">{blog.title}</td>
                <td>
                  <span
                    className={`badge px-3 py-1 rounded-full text-white ${
                      blog.status === "published"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td>{blog.createdBy}</td>
                {isAdmin && (
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          handleToggleStatus(blog._id, blog.status)
                        }
                        className="btn btn-sm btn-outline tooltip"
                        data-tip={
                          blog.status === "draft" ? "Publish" : "Unpublish"
                        }
                      >
                        {blog.status === "draft" ? (
                          <MdOutlinePublish className="text-green-600 text-lg" />
                        ) : (
                          <RiUnpinLine className="text-orange-500 text-lg" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-sm btn-outline tooltip"
                        data-tip="Delete"
                      >
                        <FaTrashAlt className="text-red-600 text-lg" />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredBlogs.length === 0 && (
          <div className="text-center text-gray-500 py-10 text-lg">
            No blogs found.
          </div>
        )}
      </div>
      
    </motion.div>
  );
};

export default ContentManagement;

