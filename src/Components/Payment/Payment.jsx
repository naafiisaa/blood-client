import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
import SectionTitle from '../SectionTitle/SectionTitle';

// TODO: Add Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);

const Payment = () => {
  const [donationAmount, setDonationAmount] = useState(0);

  return (
    <div>
      <SectionTitle subHeading="Donation" heading="please Donate here for Blood Bank"></SectionTitle>
      <div className='mb-10'>
        <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700">
          Donation Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="donationAmount"
            id="donationAmount"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm donationAmount={donationAmount} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
