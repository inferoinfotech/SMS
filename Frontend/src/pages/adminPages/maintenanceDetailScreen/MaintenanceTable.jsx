import React, { useEffect, useState } from "react";
import MaintenanceTableRow from "./MaintenanceTableRow";
import { getMaintenance } from "../../../api/maintenanceApi"; // Import the API function

function MaintenanceTable() {
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await getMaintenance();
        setMaintenanceData(response.records);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      }
    };

    fetchMaintenanceData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <h2 className="self-start mb-5 text-xl font-semibold text-neutral-800">
        Maintenance Details
      </h2>
      <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full">
        <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-3xl max-md:pr-5 max-md:max-w-full overflow-scroll">
          <div className="md:min-w-[206px] grow">Name</div>
          <div className="md:w-[134px] w-full text-center">Unit Number</div>
          <div className="md:w-[152px] w-full text-center">Date</div>
          <div className="md:w-[134px] w-full text-center">Status</div>
          <div className="md:w-[177px] w-full text-center">Phone Number</div>
          <div className="md:w-[130px] w-full text-center">Amount</div>
          <div className="md:w-[146px] w-full text-center">Penalty</div>
          <div className="md:w-[177px] w-full text-center">Status</div>
          <div className="md:w-[146px] w-full text-center">Payment</div>
          <div className="md:w-[71px] w-full text-center">Action</div>
        </div>
      </div>
      <div className="flex flex-col max-w-full h-[584px] overflow-scroll">
        {maintenanceData.length === 0 ? (
          <div className="text-center text-gray-500 font-bold p-4">
            Data not found
          </div>
        ) : (
          maintenanceData?.map((maintenance, index) => (
            <MaintenanceTableRow key={index} data={maintenance} />
          ))
        )}
      </div>
    </div>
  );
}

export default MaintenanceTable;
