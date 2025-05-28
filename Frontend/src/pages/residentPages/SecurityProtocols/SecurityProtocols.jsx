import React, { useEffect, useState } from 'react';
import { getSecurityProtocolsResident } from '../../../api/securityProtocolsMnagementApi';

const SecurityProtocols = () => {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const data = await getSecurityProtocolsResident();
        setProtocols(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto p-5 w-full bg-white rounded-2xl max-md:max-w-full">
      <h1 className="text-[20px] font-semibold text-[#202224] mb-6">Security Protocols</h1>
      <div className="flex flex-col gap-4">
        {/* Header Row */}
        <div className="flex justify-between bg-[rgba(86,120,233,0.1)] rounded-lg p-4 font-semibold text-[#202224]">
          <div className="flex-1 text-start">Title</div>
          <div className="flex-1 text-center">Description</div>
          <div className="flex-1 text-center">Date</div>
          <div className="flex-1 text-center">Time</div>
        </div>

        {/* Data Rows */}
        {protocols.map((protocol, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white border-b border-solid border-b-[#F4F4F4] p-4 rounded-lg"
          >
            <div className="flex-1 text-start text-[16px] font-medium text-[#4F4F4F]">{protocol.title}</div>
            <div className="flex-1 text-center text-[16px] font-medium text-[#4F4F4F]">{protocol.description}</div>
            <div className="flex-1 text-center text-[16px] font-medium text-[#4F4F4F]">
              {new Date(protocol.date).toLocaleDateString()}
            </div>
            <div className="flex-1 text-center">
                <span className="text-[16px] font-medium text-[#4F4F4F]">{protocol.time}</span>
              {/* <div className="bg-[#F6F8FB] p-3 rounded-[80px] w-[92px] h-[34px] flex items-center justify-center">
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityProtocols;