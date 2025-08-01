import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/error.json';
import Navbar from '../pages/Shared/Navbar/Navbar';


const Error = () => {
    return (
      <>
       <Navbar />
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center text-red-600 bg-base-200 px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-md w-full">
                {/* Animated Lottie error illustration */}
                <Lottie
                    animationData={errorAnimation}
                    loop
                    className="w-full max-w-xs mx-auto"
                />

                {/* Animated heading for error message */}
                <motion.h1
                    className="text-4xl font-bold text-red mb-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Oops! Page Not Found
                </motion.h1>

                {/* Animated descriptive paragraph */}
                <motion.p
                    className="text-red-500 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                {/* Animated button to navigate back to homepage */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/" className="btn btn-primary bg-red-600">
                        Go Back Home
                    </Link>
                </motion.div>
            </div>
        </motion.div>
        </>
    );
};

export default Error;