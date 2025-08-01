
// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';

// import { motion } from 'framer-motion';
// import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';

// Modal.setAppElement('#root');

// const Blog = () => {
//   const axiosPublic = useAxiosPublic();
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axiosPublic.get('/blogs', {
//           params: { status: 'published', page: 1, limit: 10 },
//         });
//         setBlogs(response.data.blogs);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, [axiosPublic]);

//   const openModal = (blog) => {
//     setSelectedBlog(blog);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedBlog(null);
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="p-4 max-w-7xl mt-20 mx-auto">
//       <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600">Latest Blogs</h2>
//       <div className="grid lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-6">
//         {blogs.map((blog) => (
//           <motion.div
//             key={blog._id}
//             className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
//             whileHover={{ scale: 1.03 }}
//           >
//             <img
//               src={blog.thumbnail}
//               alt={blog.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-extrabold text-lg mb-2 text-pink-500 line-clamp-1">
//                 {blog.title}
//               </h3>
//               <p className="text-sm text-gray-600  font-medium line-clamp-2">
//                 {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
//               </p>
//               <button
//                 onClick={() => openModal(blog)}
//                 className="flex items-center gap-2 mt-4 text-green-600 hover:text-green-800 font-extrabold"
//               >
//                 <EyeIcon className="w-5 text-green-700 h-5" />
//                 View More
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {selectedBlog && (
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           contentLabel="Blog Details"
//           className="bg-white max-w-2xl mx-auto mt-24 p-6 rounded-lg shadow-2xl outline-none"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
//         >
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">{selectedBlog.title}</h2>
//               <button onClick={closeModal}>
//                 <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-red-500" />
//               </button>
//             </div>
//             <img
//               src={selectedBlog.thumbnail}
//               alt={selectedBlog.title}
//               className="w-full h-56 object-cover rounded mb-4"
//             />
//             <div
//               className="text-gray-700 prose max-w-none"
//               dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
//             />
//             <p className="mt-4 text-sm text-gray-500">
//               Created By: <span className="font-semibold">{selectedBlog.createdBy}</span> |{' '}
//               {new Date(selectedBlog.createdAt).toLocaleString()}
//             </p>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Blog;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosPublic.get('/blogs', {
          params: { status: 'published', page: 1, limit: 10 },
        });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [axiosPublic]);

  return (
    <div className="p-4 max-w-7xl mt-20 mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600">Latest Blogs</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-extrabold text-lg mb-2 text-pink-500 line-clamp-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium line-clamp-2">
                {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
              </p>
              <Link
                to={`/blogs/${blog._id}`}
                className="flex items-center gap-2 mt-4 text-green-600 hover:text-green-800 font-extrabold"
              >
                <EyeIcon className="w-5 h-5 text-green-700" />
                View More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
