// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import blooddonation from '../../../assets/Customer Support.json';
// import Lottie from 'lottie-react';
// import { motion } from 'framer-motion';

// const ContactMe = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [errors, setErrors] = useState({});

//   const contactNumber = '+880 1234 567890';

//   const handleChange = e => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.message.trim()) newErrors.message = 'Message is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (validate()) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Message sent!',
//         text: `Thank you, ${formData.name}. We will get back to you soon.`,
//         confirmButtonColor: '#e11d48',
//       });
//       setFormData({ name: '', email: '', message: '' });
//       setErrors({});
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please fix the errors in the form before submitting.',
//         confirmButtonColor: '#e11d48',
//       });
//     }
//   };

//   const colorPulse = {
//     animate: {
//       filter: [
//         'hue-rotate(0deg) saturate(100%) brightness(100%)',
//         'hue-rotate(330deg) saturate(150%) brightness(110%)',
//         'hue-rotate(0deg) saturate(100%) brightness(100%)',
//       ],
//       transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
//     },
//   };

//   return (
//     <section className=" mx-auto  bg-white rounded-xl shadow-lg">
//       <h2 className="text-4xl font-extrabold mb-8 text-center text-red-600">Contact Us</h2>

//       <div className="mb-8 text-center text-lg font-medium">
//         <p>Call us anytime at:</p>
//         <p className="text-red-600 text-xl font-bold">{contactNumber}</p>
//       </div>

//       <div className="flex lg:w-11/12 mx-auto md:px-10 px-4 flex-col lg:flex-row items-center gap-10">
//         {/* Animation FIRST */}
//         <motion.div
//           className="w-full"
//           {...colorPulse}
//           animate="animate"
//         >
//           <Lottie animationData={blooddonation} loop={true} />
//         </motion.div>

//         {/* Form SECOND */}
//         <form
//           onSubmit={handleSubmit}
//           className=" w-full  max-w-md space-y-6"
//           noValidate
//         >
//           <div>
//             <label htmlFor="name" className="block mb-2 font-semibold">
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-md border ${
//                 errors.name ? 'border-red-500' : 'border-gray-300'
//               } focus:outline-none focus:ring-2 focus:ring-red-400`}
//               placeholder="Your Name"
//             />
//             {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
//           </div>

//           <div>
//             <label htmlFor="email" className="block mb-2 font-semibold">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-md border ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               } focus:outline-none focus:ring-2 focus:ring-red-400`}
//               placeholder="Your Email"
//             />
//             {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
//           </div>

//           <div>
//             <label htmlFor="message" className="block mb-2 font-semibold">
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows="5"
//               value={formData.message}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-md border ${
//                 errors.message ? 'border-red-500' : 'border-gray-300'
//               } focus:outline-none focus:ring-2 focus:ring-red-400`}
//               placeholder="Your message..."
//             />
//             {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ContactMe;

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import blooddonation from '../../../assets/Customer Support.json';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [colors, setColors] = useState({
    primary: getCSSVar('--primary'),
    secondary: getCSSVar('--secondary'),
    text: getCSSVar('--text'),
    background: getCSSVar('--background'),
    accent: getCSSVar('--accent'),
    neutral: getCSSVar('--neutral'),
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar('--primary'),
        secondary: getCSSVar('--secondary'),
        text: getCSSVar('--text'),
        background: getCSSVar('--background'),
        accent: getCSSVar('--accent'),
        neutral: getCSSVar('--neutral'),
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const contactNumber = '+880 1234 567890';

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        icon: 'success',
        title: 'Message sent!',
        text: `Thank you, ${formData.name}. We will get back to you soon.`,
        confirmButtonColor: `rgb(${colors.primary})`,
      });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fix the errors in the form before submitting.',
        confirmButtonColor: `rgb(${colors.primary})`,
      });
    }
  };

  const colorPulse = {
    animate: {
      filter: [
        'hue-rotate(0deg) saturate(100%) brightness(100%)',
        'hue-rotate(330deg) saturate(150%) brightness(110%)',
        'hue-rotate(0deg) saturate(100%) brightness(100%)',
      ],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section
      className="mx-auto  shadow-lg p-8"
      style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center" style={{ color: `rgb(${colors.primary})` }}>
        Contact Us
      </h2>

      <div className="mb-8 text-center text-lg font-medium">
        <p>Call us anytime at:</p>
        <p className="text-xl font-bold" style={{ color: `rgb(${colors.primary})` }}>{contactNumber}</p>
      </div>

      <div className="flex lg:w-11/12 mx-auto md:px-10 px-4  flex-col lg:flex-row items-center gap-10"
      style={{ backgroundColor: `rgb(${colors.accent})`, color: `rgb(${colors.text})` }}>
        {/* Animation */}
        <motion.div className="w-full" {...colorPulse} animate="animate">
          <Lottie animationData={blooddonation} loop={true} />
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6" noValidate>
          {['name', 'email', 'message'].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block mb-2 font-semibold" style={{ color: `rgb(${colors.text})` }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field !== 'message' ? (
                <input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2`}
                  style={{
                    borderColor: errors[field] ? `rgb(${colors.primary})` : `rgb(${colors.neutral})`,
                    color: `rgb(${colors.text})`,
                    backgroundColor: `rgb(${colors.background})`,
                  }}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                />
              ) : (
                <textarea
                  id={field}
                  name={field}
                  rows="5"
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2`}
                  style={{
                    borderColor: errors[field] ? `rgb(${colors.primary})` : `rgb(${colors.neutral})`,
                    color: `rgb(${colors.text})`,
                    backgroundColor: `rgb(${colors.background})`,
                  }}
                  placeholder="Your message..."
                />
              )}
              {errors[field] && <p className="mt-1 text-sm" style={{ color: `rgb(${colors.primary})` }}>{errors[field]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 rounded-md font-bold transition"
            style={{
              backgroundColor: `rgb(${colors.primary})`,
              color: `rgb(${colors.background})`,
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
