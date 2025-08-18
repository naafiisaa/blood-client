import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const getCSSVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const eventsData = [
  { title: 'Blood Drive - Dhaka', date: '2025-09-10', location: 'Dhaka Central Hospital' },
  { title: 'Community Donation Camp', date: '2025-09-15', location: 'Chittagong City Hall' },
  { title: 'Awareness Event - Rajshahi', date: '2025-09-20', location: 'Rajshahi Stadium' },
  { title: 'Raising Fund - Khulna', date: '2025-09-20', location: 'Khulna Stadium' },
];

const UpcomingEvents = () => {
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
  return (
    <section className="py-10" style={{ backgroundColor: `rgb(${colors.neutral})`}}>
      <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: `rgb(${colors.primary})` }}>
        Upcoming Drives & Events
      </h2>

      <div className="grid md:grid-cols-4 gap-6 lg:w-11/12 md:px-10 mx-auto px-4">
        {eventsData.map((event, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: `rgb(${colors.accent})`, color: `rgb(${colors.text})` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2" style={{ color: `rgb(${colors.primary})` }}>{event.title}</h3>
            <p className="text-sm mb-1"><strong>Date:</strong> {event.date}</p>
            <p className="text-sm"><strong>Location:</strong> {event.location}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
