import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import bloodAnimation from '../../../assets/Blood Donation.json'; // add a blood drop Lottie JSON file in this path
import { Helmet } from 'react-helmet-async';

const WhyDonate = () => {
  return (
    <div className="min-h-screen my-12 bg-base-100 ">
      <Helmet>
        <title>Why Donate | BloodConnect</title>
      </Helmet>

      <motion.div
        className="text-center lg:w-11/12 mx-auto md:px-10 px-4 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <h1 className="text-4xl md:text-5xl font-bold text-error mb-4">Why Donate Blood?</h1>
        <p className="text-lg text-gray-600">
          Every drop counts. Your blood can save lives and give hope.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Lottie animationData={bloodAnimation} loop={true} />
        </motion.div>

        <motion.div
          className="space-y-4  px-4 text-gray-700"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold text-error">You can save up to 3 lives!</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Blood donation is safe and simple.</li>
            <li>Donating regularly helps hospitals maintain an adequate supply.</li>
            <li>It improves your own heart health and stimulates blood cell production.</li>
            <li>It’s a way to give back and support your community.</li>
          </ul>
          <p className="text-sm text-gray-500 italic">
            “A single pint can save three lives, a single gesture can create a million smiles.”
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyDonate;
