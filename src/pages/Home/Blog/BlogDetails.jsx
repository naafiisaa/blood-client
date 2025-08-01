import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loading/Loading';

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');

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

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  if (!blog) {
    return <Loading />
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">{blog.title}</h1>
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <p className="mt-6 text-sm text-gray-500">
        Created By: <span className="font-semibold">{blog.createdBy}</span> |{' '}
        {new Date(blog.createdAt).toLocaleString()}
      </p>
      <div className="mt-6">
        <Link
          to="/blog"
          className="text-red-600 hover:underline font-medium"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
