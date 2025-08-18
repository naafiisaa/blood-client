import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiHeart } from "react-icons/fi";

const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const testimonialsData = [
  {
    name: "Ali Rahman",
    story: "Donating blood saved 3 lives. Truly fulfilling experience!",
    icon: <FiHeart />,
  },
  {
    name: "Nafisa Chowdhury",
    story: "Easy and safe process, staff were very supportive.",
    icon: <FiUser />,
  },
  {
    name: "Tanvir Ahmed",
    story: "I encourage everyone to donate at least once a year.",
    icon: <FiHeart />,
  },
  {
    name: "Farhana Islam",
    story: "Seeing my small act help children in need motivates me to keep donating.",
    icon: <FiUser />,
  },
];

const Testimonials = () => {
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
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10   shadow-xl" style={{ backgroundColor: `rgb(${colors.neutral})` }}>
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-10"
        style={{ color: `rgb(${colors.primary})` }}
      >
        Testimonials & Stories
      </h2>

      <div className="lg:w-11/12 md:px-10 mx-auto grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {testimonialsData.map((t, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
            style={{
              backgroundColor: `rgb(${colors.background})`,
              color: `rgb(${colors.text})`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
          >
            <div className="text-3xl mb-3 text-red-500">{t.icon}</div>
            <p className="mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
              "{t.story}"
            </p>
            <h4
              className="font-semibold text-base sm:text-lg md:text-xl"
              style={{ color: `rgb(${colors.primary})` }}
            >
              — {t.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

