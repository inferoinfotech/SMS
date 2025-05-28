// src/pages/security/VisitorTrackingTable.jsx

import React, { useEffect, useState } from "react";
import "./style.css";
import { getVisitorSecurityPannel } from "../../api/visitorLogApi";

const VisitorTrackingTable = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorLogs = async () => {
      try {
        const data = await getVisitorSecurityPannel();
        setVisitors(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVisitorLogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[rgba(86,120,233,0.1)] visitor-tracking-thead">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#202224] tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#202224] tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#202224] tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#202224] tracking-wider">
              Unit Number
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#202224] tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* {visitors.map((visitor, index) => (
            <tr key={index} className={'bg-white border-b border-solid border-b-[#F4F4F4]'}>
              <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">{visitor.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">{visitor.number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">{new Date(visitor.date).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">{visitor.unitNumber}</td>
              <div className='bg-[#F6F8FB] p-3 rounded-[80px] w-[92px] h-[34px] flex items-center justify-center'>
                <td className="whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">{visitor.time}</td>
              </div>
            </tr>
          ))} */}

          {visitors.length === 0 ? (
            <div className="text-center text-gray-500 font-bold p-4">
              Data not found
            </div>
          ) : (
            visitors.map((visitor, index) => (
              <tr
                key={index}
                className={"bg-white border-b border-solid border-b-[#F4F4F4]"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">
                  {visitor.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">
                  {visitor.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">
                  {new Date(visitor.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">
                  {visitor.unitNumber}
                </td>
                <td className="bg-[#F6F8FB] p-3 rounded-[80px] w-[92px] h-[34px] flex items-center justify-center">
                  <div className="whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">
                    {visitor.time}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorTrackingTable;
