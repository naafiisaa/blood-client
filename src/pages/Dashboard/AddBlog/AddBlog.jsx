import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const AddBlog = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");

  const [colors, setColors] = useState({
    primary: getCSSVar("--primary"),
    secondary: getCSSVar("--secondary"),
    text: getCSSVar("--text"),
    background: getCSSVar("--background"),
    accent: getCSSVar("--accent"),
    neutral: getCSSVar("--neutral"),
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar("--primary"),
        secondary: getCSSVar("--secondary"),
        text: getCSSVar("--text"),
        background: getCSSVar("--background"),
        accent: getCSSVar("--accent"),
        neutral: getCSSVar("--neutral"),
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

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
        status: "draft",
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
    <div
      className="p-6 rounded shadow-md max-w-4xl mx-auto"
      style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
    >
      <h2 className="text-2xl font-bold mb-4" style={{ color: `rgb(${colors.primary})` }}>
        Create New Blog
      </h2>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full mb-4"
        style={{
          backgroundColor: `rgb(${colors.background})`,
          color: `rgb(${colors.text})`,
          borderColor: `rgb(${colors.accent})`,
        }}
      />
      <input
        type="text"
        placeholder="Thumbnail URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        className="input input-bordered w-full mb-4"
        style={{
          backgroundColor: `rgb(${colors.background})`,
          color: `rgb(${colors.text})`,
          borderColor: `rgb(${colors.accent})`,
        }}
      />
      <div className="mb-4">
        <JoditEditor value={content} onChange={(value) => setContent(value)} />
      </div>
      <button
        className="btn mt-4"
        style={{
          backgroundColor: `rgb(${colors.primary})`,
          color: `rgb(${colors.background})`,
        }}
        onClick={handleCreateBlog}
      >
        Create Blog
      </button>
    </div>
  );
};

export default AddBlog;

// import React, { useState } from "react";
// import JoditEditor from "jodit-react";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAuth from "../../../Hooks/useAuth";

// const AddBlog = () => {
//   const axiosPublic = useAxiosPublic();
//   const { user } = useAuth();

//   const [title, setTitle] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [content, setContent] = useState("");

//   const handleCreateBlog = async () => {
//     if (!user?.email) {
//       return Swal.fire("Error", "You must be logged in to create a blog.", "error");
//     }

//     if (!title || !thumbnail || !content) {
//       return Swal.fire("Error", "Please fill all fields.", "error");
//     }

//     try {
//       await axiosPublic.post("/blogs", {
//         title,
//         thumbnail,
//         content,
//         createdBy: user.email,
//         status: "draft", // Default status
//       });

//       Swal.fire("Success", "Blog created as draft!", "success");
//       setTitle("");
//       setThumbnail("");
//       setContent("");
//     } catch (err) {
//       Swal.fire("Error", "Failed to create blog.", "error");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
//       <input
//         type="text"
//         placeholder="Blog Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="input input-bordered w-full mb-4"
//       />
//       <input
//         type="text"
//         placeholder="Thumbnail URL"
//         value={thumbnail}
//         onChange={(e) => setThumbnail(e.target.value)}
//         className="input input-bordered w-full mb-4"
//       />
//       <JoditEditor value={content} onChange={(value) => setContent(value)} />

//       <button className="btn btn-primary mt-4" onClick={handleCreateBlog}>
//         Create Blog
//       </button>
//     </div>
//   );
// };

// export default AddBlog;
