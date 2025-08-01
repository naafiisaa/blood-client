import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';


// TODO: Add Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);

const Payment = () => {
  const [donationAmount, setDonationAmount] = useState(0);

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 md:p-8">
    
<h1 className='font-bold text-center text-xl md:text-2xl lg:text-4xl mb-6 text-orange-600'>Donate here For Life Stream</h1>
      <div className="mb-10">
        <label
          htmlFor="donationAmount"
          className="block text-sm font-medium text-gray-700 mb-1 sm:text-base"
        >
          Donation Amount
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm sm:text-base">$</span>
          </div>
          <input
            type="number"
            name="donationAmount"
            id="donationAmount"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-base border border-gray-300 rounded-md"
            placeholder="0.00"
            min="0"
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

