import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const faqData = [
  { question: "Who can donate blood?", answer: "Anyone aged 18-65 with good health can donate blood." },
  { question: "How often can I donate?", answer: "You can donate whole blood every 3 months, plasma more frequently." },
  { question: "Is blood donation safe?", answer: "Yes, it is safe with sterile equipment and trained staff." },
  { question: "Can I donate if I take medication?", answer: "It depends on the medication. Some are acceptable, but check with your local blood bank first." },
  { question: "How long does the donation take?", answer: "The process usually takes 30-45 minutes, including registration and recovery." },
  { question: "Will I feel weak after donating?", answer: "Most people feel fine. You may feel a bit tired, so rest and drink fluids after donating." },
  { question: "Can I donate if I had COVID-19?", answer: "Yes, you can donate after fully recovering and waiting at least 14 days symptom-free." },
  { question: "What should I eat before donating?", answer: "Eat a healthy meal, avoid fatty foods, and drink plenty of water before donating." },
];

const FAQ = () => {
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

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-10" style={{ backgroundColor: `rgb(${colors.neutral})` }}>
      <h2
        className="text-2xl  md:text-3xl font-bold text-center mb-10"
        style={{ color: `rgb(${colors.primary})` }}
      >
        Frequently Asked Questions
      </h2>

      <div className="lg:w-11/12 px-4 md:px-10 mx-auto space-y-4" >
        {faqData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-4 sm:p-6 rounded-xl shadow-md cursor-pointer"
            style={{ backgroundColor: `rgb(${colors.background})` }}
            onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
          >
            <div className="flex justify-between items-center">
              <h3
                className="font-semibold text-base sm:text-lg md:text-xl"
                style={{ color: `rgb(${colors.primary})` }}
              >
                {item.question}
              </h3>
              {activeIndex === idx ? (
                <FiChevronUp className="text-xl sm:text-2xl" style={{ color: `rgb(${colors.primary})` }} />
              ) : (
                <FiChevronDown className="text-xl sm:text-2xl" style={{ color: `rgb(${colors.primary})` }} />
              )}
            </div>

            <AnimatePresence>
              {activeIndex === idx && (
                <motion.p
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm sm:text-base md:text-lg"
                  style={{ color: `rgb(${colors.text})` }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

