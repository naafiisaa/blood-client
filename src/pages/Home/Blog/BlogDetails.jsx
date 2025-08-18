import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loading/Loading';

const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    text: getCSSVar('--text'),
    background: getCSSVar('--background'),
    accent: getCSSVar('--accent'),
    neutral: getCSSVar('--neutral'),
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar('--primary'),
        text: getCSSVar('--text'),
        background: getCSSVar('--background'),
        accent: getCSSVar('--accent'),
         neutral: getCSSVar('--neutral'),
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load blog details.');
      }
    };
    fetchBlog();
  }, [axiosPublic, id]);

  if (error) return <div className="text-center mt-20" style={{ color: `rgb(${colors.primary})` }}>{error}</div>;
  if (!blog) return <Loading />;

  return (
    <div className="mx-auto py-6  shadow " style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}>
      <div className='lg:w-11/12 py-10 card px-4 mt-20 md:px-10 mx-auto'style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.text})` }}>
        <h1 className="text-3xl font-bold mb-4" style={{ color: `rgb(${colors.primary})` }}>{blog.title}</h1>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <p className="mt-6 text-sm" style={{ color: `rgb(${colors.text})` }}>
          Created By: <span className="font-semibold">{blog.createdBy}</span> | {new Date(blog.createdAt).toLocaleString()}
        </p>
        <div className="mt-6">
          <Link
            to="/blog"
            className="font-medium hover:underline"
            style={{ color: `rgb(${colors.primary})` }}
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

