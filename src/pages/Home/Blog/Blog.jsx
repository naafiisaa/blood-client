import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    secondary: getCSSVar('--secondary'),
    text: getCSSVar('--text'),
    background: getCSSVar('--background'),
    neutral: getCSSVar('--neutral'),
    accent: getCSSVar('--accent'),
  });

  // Update colors dynamically on theme change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar('--primary'),
        secondary: getCSSVar('--secondary'),
        text: getCSSVar('--text'),
        background: getCSSVar('--background'),
        neutral: getCSSVar('--neutral'),
       accent: getCSSVar('--accent'),
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosPublic.get('/blogs', { params: { status: 'published', page: 1, limit: 10 } });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [axiosPublic]);

  return (
    <div className="mx-auto py-10 overflow-hidden" style={{ backgroundColor: `rgb(${colors.accent})`, color: `rgb(${colors.text})` }}>
      <h2 className="text-3xl mt-20 font-extrabold mb-8 text-center" style={{ color: `rgb(${colors.primary})` }}>
        Latest Blogs
      </h2>
      <div className="lg:w-11/12 mx-auto md:px-10 px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {blogs.map(blog => (

            <motion.div
  key={blog._id}
  className="rounded-xl overflow-hidden transition-transform duration-300"
  style={{
    backgroundColor: `rgb(${colors.background})`,
    color: `rgb(${colors.text})`,
    boxShadow: `0 4px 6px rgba(${colors.primary}, 0.3)`,
  }}
  whileHover={{
    scale: 1.03,
    boxShadow: `0 8px 15px rgba(${colors.secondary}, 0.5)`,
  }}
>
  <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover" />
  <div className="p-4">
    <h3 className="font-extrabold text-lg mb-2 line-clamp-1" style={{ color: `rgb(${colors.primary})` }}>
      {blog.title}
    </h3>
    <p className="text-sm font-medium line-clamp-2" style={{ color: `rgb(${colors.text})` }}>
      {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
    </p>
    <Link
      to={`/blogs/${blog._id}`}
      className="flex items-center gap-2 mt-4 font-extrabold px-3 py-1 rounded transition"
      style={{
        background: `linear-gradient(90deg, rgb(${colors.primary}), rgb(${colors.secondary}))`,
        color: `rgb(${colors.background})`,
      }}
      onMouseEnter={e => e.currentTarget.style.background = `rgb(${colors.secondary})`}
      onMouseLeave={e => e.currentTarget.style.background = `linear-gradient(90deg, rgb(${colors.primary}), rgb(${colors.secondary}))`}
    >
      <EyeIcon className="w-5 h-5" />
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
//     <div className=" mx-auto py-10 overflow-hidden">
//       <h2 className="text-3xl mt-20  font-extrabold mb-8 text-center text-pink-600">Latest Blogs</h2>
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
