import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const faqData = [
  { question: 'Who can donate blood?', answer: 'Anyone aged 18-65 with good health can donate blood.' },
  { question: 'How often can I donate?', answer: 'You can donate whole blood every 3 months, plasma more frequently.' },
  { question: 'Is blood donation safe?', answer: 'Yes, it is safe with sterile equipment and trained staff.' },
];

const FAQ = ({ colors }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: `rgb(${colors.primary})` }}>
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="p-4 rounded-xl shadow-md cursor-pointer"
            style={{ backgroundColor: `rgb(${colors.neutral})` }}
            onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
          >
            <h3 className="font-semibold" style={{ color: `rgb(${colors.primary})` }}>
              {item.question}
            </h3>
            {activeIndex === idx && (
              <p className="mt-2 text-gray-700" style={{ color: `rgb(${colors.text})` }}>
                {item.answer}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
