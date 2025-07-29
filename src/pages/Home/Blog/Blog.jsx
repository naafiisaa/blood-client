// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// ;

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
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Blog</h2>
//       <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
//         {blogs.map((blog) => (
//           <div key={blog._id} className="border p-4 rounded shadow">
//             <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover mb-2" />
//             <h3 className="font-bold text-lg">{blog.title}</h3>
//             <p>{blog.content.split(' ').slice(0, 6).join(' ')}...</p>
//             <button
//               onClick={() => openModal(blog)}
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//             >
//               View More
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedBlog && (
//         <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Blog Details">
//           <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">{selectedBlog.title}</h2>
//             <img src={selectedBlog.thumbnail} alt={selectedBlog.title} className="w-full h-40 object-cover mb-2" />
//             <p>{selectedBlog.content}</p>
//             <p>Created By: {selectedBlog.createdBy}</p>
//             <p>Created At: {new Date(selectedBlog.createdAt).toLocaleString()}</p>
//             <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
//               Close
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Blog;
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { motion } from 'framer-motion';
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';

Modal.setAppElement('#root');

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setModalIsOpen(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto bg-red-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Latest Blogs</h2>
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
              <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
              </p>
              <button
                onClick={() => openModal(blog)}
                className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <EyeIcon className="w-5 h-5" />
                View More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedBlog && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Blog Details"
          className="bg-white max-w-2xl mx-auto mt-24 p-6 rounded-lg shadow-2xl outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedBlog.title}</h2>
              <button onClick={closeModal}>
                <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <img
              src={selectedBlog.thumbnail}
              alt={selectedBlog.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <div
              className="text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
            <p className="mt-4 text-sm text-gray-500">
              Created By: <span className="font-semibold">{selectedBlog.createdBy}</span> |{' '}
              {new Date(selectedBlog.createdAt).toLocaleString()}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Blog;
