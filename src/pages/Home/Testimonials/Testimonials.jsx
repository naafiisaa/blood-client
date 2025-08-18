import React from 'react';
import { motion } from 'framer-motion';

const testimonialsData = [
  { name: 'Ali Rahman', story: 'Donating blood saved 3 lives. Truly fulfilling experience!' },
  { name: 'Nafisa Chowdhury', story: 'Easy and safe process, staff were very supportive.' },
  { name: 'Tanvir Ahmed', story: 'I encourage everyone to donate at least once a year.' },
];

const Testimonials = ({ colors }) => {
  return (
    <section className="py-12 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: `rgb(${colors.primary})` }}>
        Testimonials & Stories
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {testimonialsData.map((t, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <p className="mb-4 text-gray-700">{t.story}</p>
            <h4 className="font-semibold" style={{ color: `rgb(${colors.primary})` }}>— {t.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
