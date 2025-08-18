// import React from 'react';
// import { FaHandsHelping, FaHeartbeat, FaBookOpen } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const features = [
//   {
//     id: 1,
//     icon: <FaHeartbeat className="text-red-500 w-14 h-14" />,
//     title: 'THE GLOBAL BLOOD CRISIS',
//     description:
//       'While many developed countries benefit from well-organized blood donation systems and widespread community participation, millions around the world still face shortages of safe, reliable blood supplies. Challenges such as lack of infrastructure, awareness, and resources contribute to this urgent gap, putting countless lives at risk.',
//   },
//   {
//     id: 2,
//     icon: <FaHandsHelping className="text-red-600 w-14 h-14" />,
//     title: 'EFFORTLESS DONATION EXPERIENCE',
//     description:
//       'We believe donating blood should be simple and stress-free. With conveniently located centers, flexible appointment options, and caring professionals, your safety and comfort are our top priority.',
//   },
//   {
//     id: 3,
//     icon: <FaBookOpen className="text-red-700 w-14 h-14" />,
//     title: 'KNOWLEDGE AND SUPPORT',
//     description:
//       "We empower donors with clear information and helpful resources. Whether you're a first-timer or regular donor, we provide expert guidance and ongoing communication to make your journey confident and rewarding.",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: i => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.3,
//       duration: 0.6,
//       ease: 'easeOut',
//     },
//   }),
// };

// const cardHover = {
//   scale: 1.05,
//   boxShadow: '0 15px 25px rgba(239, 68, 68, 0.4)', // red-ish shadow
//   transition: { type: 'spring', stiffness: 300 },
// };

// const Featured = () => {
//   return (
//     <section className="  bg-gradient-to-br from-red-50 to-white rounded-xl shadow-xl">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className="text-4xl font-extrabold text-red-600 mb-12 text-center"
//       >
//         Featured
//         <motion.span
//           layoutId="underline"
//           className="block h-1 w-24 bg-red-600 rounded mt-2 mx-auto"
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ duration: 0.6, ease: 'easeOut' }}
//         />
//       </motion.h2>

//       <div className="grid gap-12 lg:w-11/12 mx-auto md:px-10 px-4 md:grid-cols-3">
//         {features.map(({ id, icon, title, description }, index) => (
//           <motion.article
//             key={id}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={containerVariants}
//             whileHover={cardHover}
//             className="bg-white rounded-xl p-8 flex flex-col items-start space-y-6 cursor-pointer select-none"
//           >
//             <div className="bg-red-100 rounded-full p-5 mb-4 shadow-md">
//               {icon}
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//             <p className="text-gray-700 leading-relaxed">{description}</p>
//           </motion.article>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Featured;
 import React, { useState, useEffect } from 'react';
import { FaHandsHelping, FaHeartbeat, FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const features = [
  {
    id: 1,
    icon: <FaHeartbeat className="text-red-500 w-14 h-14" />,
    title: 'THE GLOBAL BLOOD CRISIS',
    description:
      'While many developed countries benefit from well-organized blood donation systems and widespread community participation, millions around the world still face shortages of safe, reliable blood supplies. Challenges such as lack of infrastructure, awareness, and resources contribute to this urgent gap, putting countless lives at risk.',
  },
  {
    id: 2,
    icon: <FaHandsHelping className="text-red-600 w-14 h-14" />,
    title: 'EFFORTLESS DONATION EXPERIENCE',
    description:
      'We believe donating blood should be simple and stress-free. With conveniently located centers, flexible appointment options, and caring professionals, your safety and comfort are our top priority.',
  },
  {
    id: 3,
    icon: <FaBookOpen className="text-red-700 w-14 h-14" />,
    title: 'KNOWLEDGE AND SUPPORT',
    description:
      "We empower donors with clear information and helpful resources. Whether you're a first-timer or regular donor, we provide expert guidance and ongoing communication to make your journey confident and rewarding.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' } }),
};

const Featured = () => {
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

  const cardHover = {
    scale: 1.05,
    boxShadow: `0 15px 25px rgba(${colors.primary}, 0.4)`,
    transition: { type: 'spring', stiffness: 300 },
  };

  return (
    <section className=" py-10 shadow-xl" style={{ background: `rgb(${colors.neutral})` }}>
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center"
        style={{ color: `rgb(${colors.primary})` }}
      >
        Featured
      </motion.h2>

      <div className="grid gap-12 lg:w-11/12 mx-auto md:px-10 px-4 md:grid-cols-3">
        {features.map(({ id, icon, title, description }, index) => (
          <motion.article
            key={id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            whileHover={cardHover}
            className="rounded-xl p-8 flex flex-col items-start space-y-6 cursor-pointer select-none"
            style={{ backgroundColor: `rgb(${colors.background})`, color: `rgb(${colors.text})` }}
          >
            <div className="rounded-full p-5 shadow-md" style={{ backgroundColor: `rgb(${colors.primary})` }}>
              {React.cloneElement(icon, { className: `w-14 h-14 text-white` })}
            </div>
            <h3 className="text-xl font-semibold" style={{ color: `rgb(${colors.primary})` }}>{title}</h3>
            <p style={{ color: `rgb(${colors.text})` }}>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Featured; 
 


