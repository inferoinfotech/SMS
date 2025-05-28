import React, { useState, useEffect } from "react";
import "./style.css";
import { getFacilitiesResident } from "../../../api/facilityMnagementApi";
import UserFacilityCard from "./UserFacilityCard";

const UserFacilityManagementScreen = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const data = await getFacilitiesResident();
      setFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };
  return (
    <div className="userfacilityManagement h-full">
      <div className="flex flex-col gap-[10px] bg-white con rounded-2xl p-5 h-full">
        <div className="frame-578">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-wrapper-184">Facility Management</div>
          </div>
          <div className="flex flex-wrap gap-4 content-start items-start mt-5 max-md:max-w-full h-[790px] overflow-y-scroll">
            {facilities.length === 0 ? (
              <div className="text-center text-gray-500 font-bold p-4">
                Data not found
              </div>
            ) : (
              facilities.map((facility, index) => (
                <div key={index} className="flex facility-card">
                  <UserFacilityCard {...facility} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFacilityManagementScreen;
