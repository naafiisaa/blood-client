// import React, { useState, useEffect } from "react";
// import JoditEditor from "jodit-react";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAuth from "../../../Hooks/useAuth";

// const AddBlog = () => {
//   const axiosPublic = useAxiosPublic();
//   const { user } = useAuth();

//   const [blogs, setBlogs] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [title, setTitle] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [content, setContent] = useState("");
//   const [userRole, setUserRole] = useState("");

//   const fetchUserRole = async () => {
//     try {
//       const { data } = await axiosPublic.get(`/users/${user.email}`);
//       setUserRole(data.role);
//     } catch (error) {
//       console.error("Error fetching user role:", error);
//     }
//   };

//   const fetchBlogs = async () => {
//     try {
//       const { data } = await axiosPublic.get("/blogs", {
//         params: { status: filter },
//       });
//       setBlogs(data.blogs || []); // Ensure blogs is an array
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       setBlogs([]); // Set blogs to an empty array in case of error
//     }
//   };

//   const handleCreateBlog = async () => {
//     if (!user?.email) {
//       console.error("User is not logged in!");
//       return;
//     }

//     try {
//       await axiosPublic.post("/blogs", {
//         title,
//         thumbnail,
//         content,
//         createdBy: user.email, // Use email from the logged-in user
//       });
//       fetchBlogs();
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Blog created successfully!",
//       });
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to create blog.",
//       });
//     }
//   };

//   const handleChangeStatus = async (id, status) => {
//     try {
//       await axiosPublic.patch(`/blogs/${id}/status`, { status });
//       fetchBlogs();
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: `Blog status updated to ${status}!`,
//       });
//     } catch (error) {
//       console.error("Error updating status:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update blog status.",
//       });
//     }
//   };

//   const handleDeleteBlog = async (id) => {
//     try {
//       await axiosPublic.delete(`/blogs/${id}`);
//       fetchBlogs();
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Blog deleted successfully!",
//       });
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to delete blog.",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchUserRole();
//     fetchBlogs();
//   }, [filter]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Add Blog</h2>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input input-bordered mb-2 w-full"
//         />
//         <input
//           type="text"
//           placeholder="Thumbnail URL"
//           value={thumbnail}
//           onChange={(e) => setThumbnail(e.target.value)}
//           className="input input-bordered mb-2 w-full"
//         />
//         <JoditEditor
//           value={content}
//           onChange={(value) => setContent(value)}
//         />
//         <button onClick={handleCreateBlog} className="btn btn-primary mt-2">
//           Create Blog
//         </button>
//       </div>

//       <div className="mb-4">
//         <select onChange={(e) => setFilter(e.target.value)} className="select select-bordered">
//           <option value="">All Blogs</option>
//           <option value="draft">Draft</option>
//           <option value="published">Published</option>
//         </select>
//       </div>

//       <div>
//         {blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <div key={blog._id} className="card bg-base-100 shadow-md p-4 mb-4">
//               <h3 className="font-bold text-lg">{blog.title}</h3>
//               <img src={blog.thumbnail} alt="Thumbnail" className="w-full h-40 object-cover mb-2" />
//               <p dangerouslySetInnerHTML={{ __html: blog.content }} />
//               {userRole === "admin" && (
//                 <div className="flex gap-2 mt-2">
//                   {blog.status === "draft" ? (
//                     <button
//                       onClick={() => handleChangeStatus(blog._id, "published")}
//                       className="btn btn-success"
//                     >
//                       Publish
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleChangeStatus(blog._id, "draft")}
//                       className="btn btn-warning"
//                     >
//                       Unpublish
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDeleteBlog(blog._id)}
//                     className="btn btn-danger"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No blogs found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddBlog;
import React, { useState } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const AddBlog = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");

  const handleCreateBlog = async () => {
    if (!user?.email) {
      return Swal.fire("Error", "You must be logged in to create a blog.", "error");
    }

    if (!title || !thumbnail || !content) {
      return Swal.fire("Error", "Please fill all fields.", "error");
    }

    try {
      await axiosPublic.post("/blogs", {
        title,
        thumbnail,
        content,
        createdBy: user.email,
        status: "draft", // Default status
      });

      Swal.fire("Success", "Blog created as draft!", "success");
      setTitle("");
      setThumbnail("");
      setContent("");
    } catch (err) {
      Swal.fire("Error", "Failed to create blog.", "error");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <input
        type="text"
        placeholder="Thumbnail URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <JoditEditor value={content} onChange={(value) => setContent(value)} />

      <button className="btn btn-primary mt-4" onClick={handleCreateBlog}>
        Create Blog
      </button>
    </div>
  );
};

export default AddBlog;
