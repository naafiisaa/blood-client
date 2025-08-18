// // WhyDonateBlood.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const getCSSVar = (name) =>
//   getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// const dropletVariants = {
//   float: {
//     y: ["0%", "-10%", "0%"],
//     opacity: [1, 0.7, 1],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// const WhyDonateBlood = () => {
//   const [colors, setColors] = useState({
//     primary: getCSSVar("--primary"),
//     secondary: getCSSVar("--secondary"),
//     text: getCSSVar("--text"),
//     background: getCSSVar("--background"),
//     accent: getCSSVar("--accent"),
//     neutral: getCSSVar("--neutral"),
//   });

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setColors({
//         primary: getCSSVar("--primary"),
//         secondary: getCSSVar("--secondary"),
//         text: getCSSVar("--text"),
//         background: getCSSVar("--background"),
//         accent: getCSSVar("--accent"),
//         neutral: getCSSVar("--neutral"),
//       });
//     });

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       className="py-10 "
//       style={{
//         backgroundColor: `rgb(${colors.neutral})`,
//         color: `rgb(${colors.text})`,
//       }}
//     >
//       <div className="lg:w-11/12 mx-auto px-4 md:px-10">
//         {/* Floating Blood Droplets */}
//         <motion.div
//           className="absolute w-4 h-4 bg-red-600 rounded-full top-10 left-30"
//           variants={dropletVariants}
//           animate="float"
//         />
//         <motion.div
//           className="absolute w-3 h-3 bg-red-500 rounded-full top-32 right-30"
//           variants={dropletVariants}
//           animate="float"
//           transition={{ duration: 3 }}
//         />
//         <motion.div
//           className="absolute w-5 h-5 bg-red-700 rounded-full top-1/2 left-1/4"
//           variants={dropletVariants}
//           animate="float"
//           transition={{ duration: 4 }}
//         />

//         {/* Flex Row */}
//         <div className="mx-auto min-h-[350px] sm:h-[400px] md:min-h-[500px] flex flex-col md:flex-row items-stretch gap-10 py-10 relative z-10">
      

//           {/* Content */}
//           <div
//             className="flex-1 rounded-xl shadow-2xl p-6 flex flex-col justify-between"
//             style={{
//               backgroundColor: `rgb(${colors.background})`,
//               color: `rgb(${colors.text})`,
//             }}
//           >
//             <div>
//               <h2
//                 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
//                 style={{ color: `rgb(${colors.primary})` }}
//               >
//                 Why Donate Blood?
//               </h2>
//               <p
//                 className="text-base sm:text-lg mb-4 sm:mb-6"
//                 style={{ color: `rgb(${colors.text})` }}
//               >
//                 Every day, countless lives depend on the generosity of blood
//                 donors. Your single donation can be the difference between life
//                 and death for patients in critical need, especially children
//                 undergoing life-saving treatments.
//               </p>

//               <ul
//                 className="space-y-3 sm:space-y-4 text-base sm:text-lg"
//                 style={{ color: `rgb(${colors.text})` }}
//               >
//                 <li className="flex items-start">
//                   <span className="text-red-600 mr-2 sm:mr-3 text-lg sm:text-xl">
//                     🩸
//                   </span>
//                   <span>
//                     Save Lives: One donation can help up to three patients in
//                     need.
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-red-600 mr-2 sm:mr-3 text-lg sm:text-xl">
//                     💉
//                   </span>
//                   <span>
//                     Support Medical Treatments: Vital for surgeries, cancer
//                     therapies, and trauma care.
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-red-600 mr-2 sm:mr-3 text-lg sm:text-xl">
//                     🌍
//                   </span>
//                   <span>
//                     Aid Vulnerable Populations: Essential for infants, children,
//                     and those with chronic conditions.
//                   </span>
//                 </li>
//               </ul>

//               <p
//                 className="mt-4 sm:mt-6 text-sm sm:text-md"
//                 style={{ color: `rgb(${colors.secondary})` }}
//               >
//                 In Bangladesh, the demand for blood often exceeds supply. By
//                 donating, you become a vital part of a compassionate community
//                 ensuring no one is left behind due to lack of blood.
//               </p>
//             </div>

//             {/* Donate Button */}
//             <Link
//               to="/blood-donation-request"
//               className="mt-6 sm:mt-8 inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition duration-300 self-start text-sm sm:text-base"
//               style={{
//                 backgroundColor: `rgb(${colors.primary})`,
//                 color: `rgb(${colors.background})`,
//               }}
//             >
//               Donate Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyDonateBlood;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const WhyDonateBlood = () => {
  const [colors, setColors] = useState({
    primary: getCSSVar("--primary"),
    text: getCSSVar("--text"),
    background: getCSSVar("--background"),
    accent: getCSSVar("--accent"),
    neutral: getCSSVar("--neutral"),
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        primary: getCSSVar("--primary"),
        text: getCSSVar("--text"),
        background: getCSSVar("--background"),
        accent: getCSSVar("--accent"),
        neutral: getCSSVar("--neutral"),
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="mx-auto py-10 shadow"
      style={{
        backgroundColor: `rgb(${colors.neutral})`,
        color: `rgb(${colors.text})`,
      }}
    >
      <div
        className="lg:w-11/12 py-10 px-4 mt-10 md:px-10 mx-auto"
        style={{
          backgroundColor: `rgb(${colors.neutral})`,
          color: `rgb(${colors.text})`,
        }}
      >
        <h1
          className="text-3xl font-bold mb-10 text-center"
          style={{ color: `rgb(${colors.primary})` }}
        >
          Why Donate Blood?
        </h1>

        {/* GRID LAYOUT */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="h-full">
            <img
              src="https://i.ibb.co.com/GfK1JSZN/Screenshot-2025-08-18-080636.png"
              alt="Donate Blood"
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <p>
              Every 2 seconds, someone in the world needs blood. Donating blood
              is one of the most powerful ways you can help save lives. A single
              donation can save up to <strong>three lives</strong>.
            </p>

            <h2 className="my-4" style={{ color: `rgb(${colors.primary})` }}>
              🌟 Benefits of Donating Blood
            </h2>
            <ul>
              <li>Saves lives during emergencies, surgeries, and accidents.</li>
              <li>Supports cancer, anemia, and other patients in need.</li>
              <li>Helps maintain healthy blood circulation for donors.</li>
              <li>Encourages a sense of community and compassion.</li>
            </ul>

            <h2 className="my-4" style={{ color: `rgb(${colors.primary})` }}>
              🩸 Who Can Donate?
            </h2>
            <p>
              Most healthy individuals between the ages of 18–65 can donate
              blood, provided they meet weight and medical eligibility
              requirements.
            </p>

            <h2 className="my-4" style={{ color: `rgb(${colors.primary})` }}>
              ❤️ Make a Difference
            </h2>
            <p>
              Your blood donation is a simple act of kindness that creates a
              ripple effect of hope and healing. Be the reason someone lives
              another day.
            </p>

             <div className="mt-6">
              <Link
                to="/blood-donation-request"
                className="font-medium hover:underline"
                style={{ color: `rgb(${colors.primary})` }}
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyDonateBlood;









// import { motion } from 'framer-motion';
// import Lottie from 'lottie-react';
// import bloodAnimation from '../../../assets/Blood Donation.json';
// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect } from 'react';

// const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// const WhyDonate = () => {
//   const [colors, setColors] = useState({
//     primary: getCSSVar('--primary'),
//     secondary: getCSSVar('--secondary'),
//     text: getCSSVar('--text'),
//     background: getCSSVar('--background'),
//     accent: getCSSVar('--accent'),
//       neutral: getCSSVar('--neutral'),
//   });

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setColors({
//         primary: getCSSVar('--primary'),
//         secondary: getCSSVar('--secondary'),
//         text: getCSSVar('--text'),
//         background: getCSSVar('--background'),
//         accent: getCSSVar('--accent'),
//           neutral: getCSSVar('--neutral'),
//       });
//     });
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="min-h-screen py-10" style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}>
//       <Helmet>
//         <title>Why Donate | BloodConnect</title>
//       </Helmet>

//       <motion.div
//         className="text-center lg:w-11/12 mx-auto md:px-10 px-4 mb-10"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: `rgb(${colors.primary})` }}>
//           Why Donate Blood?
//         </h1>
//         <p style={{ color: `rgb(${colors.text})` }}>Every drop counts. Your blood can save lives and give hope.</p>
//       </motion.div>

//       <div className="grid md:grid-cols-2 gap-10 items-center lg:w-11/12 mx-auto px-4">
//         <motion.div
//           className="w-full h-full"
//           initial={{ opacity: 0, x: -100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <Lottie animationData={bloodAnimation} loop={true} />
//         </motion.div>

//         <motion.div
//           className="space-y-4"
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h2 className="text-2xl font-semibold" style={{ color: `rgb(${colors.primary})` }}>
//             You can save up to 3 lives!
//           </h2>
//           <ul className="list-disc pl-5 space-y-2" style={{ color: `rgb(${colors.text})` }}>
//             <li>Blood donation is safe and simple.</li>
//             <li>Donating regularly helps hospitals maintain an adequate supply.</li>
//             <li>It improves your own heart health and stimulates blood cell production.</li>
//             <li>It’s a way to give back and support your community.</li>
//           </ul>
//           <p className="text-sm italic" style={{ color: `rgb(${colors.secondary})` }}>
//             “A single pint can save three lives, a single gesture can create a million smiles.”
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default WhyDonate;
