// src/pages/adminPages/securityVisitorScreen/SecurityVisitor.jsx

import React, { useEffect, useState } from "react";
import VisitorLogHeader from "./VisitorLogHeader";
import VisitorLogEntry from "./VisitorLogEntry";
import { getVisitorLogs } from "../../../api/visitorLogApi";

function SecurityVisitor() {
  const [visitorData, setVisitorData] = useState([]);

  useEffect(() => {
    const fetchVisitorLogs = async () => {
      try {
        const data = await getVisitorLogs();
        console.log(data,"security visitor admin side");
        
        setVisitorData(data);
      } catch (error) {
        console.error("Error fetching visitor logs:", error);
      }
    };

    fetchVisitorLogs();
  }, []);

  return (
    <div className="flex overflow-hidden h-full flex-wrap gap-2 pt-5 px-5 bg-white rounded-2xl">
      <div className="flex flex-col w-full h-full">
        <h1 className="self-start text-xl font-semibold text-neutral-800">
          Visitor Logs
        </h1>
        <VisitorLogHeader />

        <div className="flex flex-col w-full h-[784px] overflow-scroll">
          {/* {visitorData.map((visitor, index) => (
                        <VisitorLogEntry key={index} {...visitor} />
                    ))} */}

          {visitorData.length === 0 ? (
            <div className="text-center text-gray-500 font-bold p-4">
              Data not found
            </div>
          ) : (
            visitorData.data.map((visitor, index) => (
              <VisitorLogEntry key={index} {...visitor} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SecurityVisitor;
