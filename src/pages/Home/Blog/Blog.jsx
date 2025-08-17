import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

// Helper to read CSS variables
const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    secondary: getCSSVar('--secondary'),
    accent: getCSSVar('--accent'),
    neutral: getCSSVar('--neutral'),
    background: getCSSVar('--background'),
  });

  // Update colors when theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar('--primary'),
        secondary: getCSSVar('--secondary'),
        accent: getCSSVar('--accent'),
        neutral: getCSSVar('--neutral'),
        background: getCSSVar('--background'),
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosPublic.get('/blogs', { params: { status: 'published', page: 1, limit: 10 } });
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [axiosPublic]);

  return (
    <div className="mt-20 mx-auto overflow-hidden" style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.neutral})` }}>
      <h2 className="text-3xl font-extrabold mb-8 text-center" style={{ color: `rgb(${colors.primary})` }}>
        Latest Blogs
      </h2>
      <div className="lg:w-11/12 mx-auto md:px-10 px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {blogs.map(blog => (
            <motion.div
              key={blog._id}
              className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
              whileHover={{ scale: 1.03 }}
              style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.neutral})` }}
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-extrabold text-lg mb-2 line-clamp-1" style={{ color: `rgb(${colors.accent})` }}>
                  {blog.title}
                </h3>
                <p style={{ color: `rgb(${colors.neutral})` }} className="text-sm font-medium line-clamp-2">
                  {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
                </p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="flex items-center gap-2 mt-4 font-extrabold"
                  style={{ color: `rgb(${colors.primary})` }}
                >
                  <EyeIcon className="w-5 h-5" style={{ color: `rgb(${colors.primary})` }} />
                  View More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { EyeIcon } from '@heroicons/react/24/outline';
// import { Link } from 'react-router-dom';
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';

// const Blog = () => {
//   const axiosPublic = useAxiosPublic();
//   const [blogs, setBlogs] = useState([]);

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

//   return (
//     <div className=" mt-20 mx-auto overflow-hidden">
//       <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600">Latest Blogs</h2>
//      <div className='lg:w-11/12  mx-auto md:px-10 px-4'>
//       <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
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
//               <p className="text-sm text-gray-600 font-medium line-clamp-2">
//                 {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
//               </p>
//               <Link
//                 to={`/blogs/${blog._id}`}
//                 className="flex items-center gap-2 mt-4 text-green-600 hover:text-green-800 font-extrabold"
//               >
//                 <EyeIcon className="w-5 h-5 text-green-700" />
//                 View More
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </div></div>
//     </div>
//   );
// };

// export default Blog;
