import React from 'react';
import { motion } from 'framer-motion';

const eventsData = [
  { title: 'Blood Drive - Dhaka', date: '2025-09-10', location: 'Dhaka Central Hospital' },
  { title: 'Community Donation Camp', date: '2025-09-15', location: 'Chittagong City Hall' },
  { title: 'Awareness Event - Rajshahi', date: '2025-09-20', location: 'Rajshahi Stadium' },
];

const UpcomingEvents = ({ colors }) => {
  return (
    <section className="py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: `rgb(${colors.primary})` }}>
        Upcoming Drives & Events
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {eventsData.map((event, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: `rgb(${colors.neutral})`, color: `rgb(${colors.text})` }}
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
