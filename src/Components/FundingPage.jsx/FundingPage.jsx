// import React from 'react';
// import Payment from '../Payment/Payment';

// const FundingPage = () => {
//       return (
//             <div>
//                   <Payment></Payment>
//             </div>
//       );
// };

// export default FundingPage;
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionTitle from '../SectionTitle/SectionTitle';
import Payment from '../Payment/Payment';
import Swal from 'sweetalert2';

const FundingPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [fundings, setFundings] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    axiosSecure
      .get(`/fundings?page=${page}&limit=${limit}`)
      .then((res) => {
        setFundings(res.data.fundings);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.error('Error fetching fundings:', err);
        Swal.fire('Error', 'Could not fetch funding data.', 'error');
      });
  }, [axiosSecure, page]);

  return (
    <div className="py-4 lg:w-11/12 mx-auto px-4 md:px-10 mt-20">
      {/* <SectionTitle heading="Funding Records" subHeading="  Life Stream" /> */}
<h1 className='font-bold text-red-600 text-xl md:text-2xl lg:text-4xl my-4 text-center'>Funding records</h1>
      {/* Give Fund Button */}
      <div className="mb-4">
        <button onClick={() => setShowPayment(!showPayment)} className="btn btn-primary bg-red-600">
          {showPayment ? 'Close Fund Form' : 'Give Fund'}
        </button>
      </div>

      {/* Payment Form */}
    {showPayment && (
  <Payment
    onSuccess={(newFund) => {
      setFundings((prev) => [newFund, ...prev]);
      setTotalCount((count) => count + 1);
      setShowPayment(false); // Optional: auto-close form
    }}
  />
)}


      {/* Funding Table */}
      <div className="overflow-x-auto mt-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User No</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {fundings.map((fund, index) => (
              <tr key={fund._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{fund.name || 'Anonymous'}</td>
                <td>{fund.email}</td>
                <td>${fund.price}</td>
                <td>{new Date(fund.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm bg-red-600 ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundingPage;
