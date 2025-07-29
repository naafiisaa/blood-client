import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
;

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Blog</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded shadow">
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-bold text-lg">{blog.title}</h3>
            <p>{blog.content.split(' ').slice(0, 6).join(' ')}...</p>
            <button
              onClick={() => openModal(blog)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              View More
            </button>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Blog Details">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{selectedBlog.title}</h2>
            <img src={selectedBlog.thumbnail} alt={selectedBlog.title} className="w-full h-40 object-cover mb-2" />
            <p>{selectedBlog.content}</p>
            <p>Created By: {selectedBlog.createdBy}</p>
            <p>Created At: {new Date(selectedBlog.createdAt).toLocaleString()}</p>
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Blog;
