
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div
      className="hero min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/TLmFY3n/banner-mobile.jpg)",
      }}
    >
      <div className="hero-overlay animate-red-pulse"></div>
      <div className="hero-content text-neutral-content text-center">
        <motion.div
          className="max-w-md space-x-6 flex justify-between"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link to="register">
            <motion.button
              className="btn btn-md btn-error"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Join as a donor
            </motion.button>
          </Link>
          <Link to="searchPage">
            <motion.button
              className="btn btn-md btn-error"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Search Donors
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;

