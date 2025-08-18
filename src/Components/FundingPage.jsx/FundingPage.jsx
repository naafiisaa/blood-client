
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../Providers/AuthProvider';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import SectionTitle from '../SectionTitle/SectionTitle';
// import Payment from '../Payment/Payment';
// import Swal from 'sweetalert2';

// const FundingPage = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [fundings, setFundings] = useState([]);
//   const [showPayment, setShowPayment] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const limit = 10;

//   const totalPages = Math.ceil(totalCount / limit);

//   useEffect(() => {
//     axiosSecure
//       .get(`/fundings?page=${page}&limit=${limit}`)
//       .then((res) => {
//         setFundings(res.data.fundings);
//         setTotalCount(res.data.totalCount);
//       })
//       .catch((err) => {
//         console.error('Error fetching fundings:', err);
//         Swal.fire('Error', 'Could not fetch funding data.', 'error');
//       });
//   }, [axiosSecure, page]);

//   return (
//     <div className="py-4 lg:w-11/12 mx-auto px-4 md:px-10 mt-20">
//       {/* <SectionTitle heading="Funding Records" subHeading="  Life Stream" /> */}
// <h1 className='font-bold text-red-600 text-xl md:text-2xl lg:text-4xl my-4 text-center'>Funding records</h1>
//       {/* Give Fund Button */}
//       <div className="mb-4">
//         <button onClick={() => setShowPayment(!showPayment)} className="btn btn-primary bg-red-600">
//           {showPayment ? 'Close Fund Form' : 'Give Fund'}
//         </button>
//       </div>

//       {/* Payment Form */}
//     {showPayment && (
//   <Payment
//     onSuccess={(newFund) => {
//       setFundings((prev) => [newFund, ...prev]);
//       setTotalCount((count) => count + 1);
//       setShowPayment(false); // Optional: auto-close form
//     }}
//   />
// )}


//       {/* Funding Table */}
//       <div className="overflow-x-auto mt-6">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>User No</th>
//               <th>User Name</th>
//               <th>Email</th>
//               <th>Amount ($)</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fundings.map((fund, index) => (
//               <tr key={fund._id}>
//                 <td>{(page - 1) * limit + index + 1}</td>
//                 <td>{fund.name || 'Anonymous'}</td>
//                 <td>{fund.email}</td>
//                 <td>${fund.price}</td>
//                 <td>{new Date(fund.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex gap-2 justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               className={`btn btn-sm bg-red-600 ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
//               onClick={() => setPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FundingPage;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Payment from "../Payment/Payment";
import Swal from "sweetalert2";

const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const FundingPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [fundings, setFundings] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 10;
  const totalPages = Math.ceil(totalCount / limit);

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
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/fundings?page=${page}&limit=${limit}`)
      .then((res) => {
        setFundings(res.data.fundings);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.error("Error fetching fundings:", err);
        Swal.fire("Error", "Could not fetch funding data.", "error");
      });
  }, [axiosSecure, page]);

  return (
    <div
      className="py-10  mx-auto  shadow-lg"
      style={{
        backgroundColor: `rgb(${colors.neutral})`,
        color: `rgb(${colors.text})`,
      }}
    >
      {/* Title */}
      <h1
        className="font-bold mt-20 text-2xl md:text-3xl lg:text-4xl mb-8 text-center"
        style={{ color: `rgb(${colors.primary})` }}
      >
        Funding Records
      </h1>
<div className="lg:w-11/12 px-4 mx-auto md:px-10">
      {/* Give Fund Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowPayment(!showPayment)}
          className="px-6 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition-transform"
          style={{
            backgroundColor: `rgb(${colors.primary})`,
            color: `rgb(${colors.background})`,
          }}
        >
          {showPayment ? "Close Fund Form" : "Give Fund"}
        </button>
      </div>

      {/* Payment Form */}
      {showPayment && (
        <div className="mb-8">
          <Payment
            onSuccess={(newFund) => {
              setFundings((prev) => [newFund, ...prev]);
              setTotalCount((count) => count + 1);
              setShowPayment(false); // Auto-close form after success
            }}
          />
        </div>
      )}

      {/* Funding Table */}
      <div className="overflow-x-auto  mx-auto mt-6  rounded-lg shadow">
        <table
          className="table w-full "
          style={{
            backgroundColor: `rgb(${colors.background})`,
            color: `rgb(${colors.text})`,
          }}
        >
          <thead>
            <tr style={{ backgroundColor: `rgb(${colors.secondary})`, color: `rgb(${colors.text})`, }}>
              <th className="text-left px-4 py-3">User No</th>
              <th className="text-left px-4 py-3">User Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Amount ($)</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {fundings.map((fund, index) => (
              <tr
                key={fund._id}
                className="hover:bg-opacity-70"
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? `rgba(${colors.primary}, 0.5)`
                      : `rgb(${colors.background})`,
                }}
              >
                <td className="px-4 py-3">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="px-4 py-3">{fund.name || "Anonymous"}</td>
                <td className="px-4 py-3">{fund.email}</td>
                <td className="px-4 py-3">${fund.price}</td>
                <td className="px-4 py-3">
                  {new Date(fund.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md shadow font-medium ${
              page === i + 1 ? "scale-110" : ""
            }`}
            style={{
              backgroundColor:
                page === i + 1
                  ? `rgb(${colors.primary})`
                  : `rgba(${colors.primary}, 0.2)`,
              color:
                page === i + 1
                  ? `rgb(${colors.background})`
                  : `rgb(${colors.primary})`,
            }}
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
