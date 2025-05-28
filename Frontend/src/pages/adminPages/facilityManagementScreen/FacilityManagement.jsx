import React, { useState, useEffect } from "react";
import "./style.css";
import FacilityCard from "./FacilityCard";
import CustomButton from "../../../components/customButton/CustomButton";
import AddFacility from "../../../components/addFacility/AddFacility";
import {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} from "../../../api/facilityMnagementApi";

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const data = await getFacilities();
      setFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedFacility(null);
  };

  const handleAddFacility = async (newFacility) => {
    try {
      if (selectedFacility) {
        const updatedFacility = await updateFacility(
          selectedFacility._id,
          newFacility
        );
        setFacilities(
          facilities.map((facility) =>
            facility._id === selectedFacility._id ? updatedFacility : facility
          )
        );
      } else {
        const createdFacility = await createFacility(newFacility);
        setFacilities([...facilities, createdFacility]);
      }
      closePopup();
    } catch (error) {
      console.error("Error adding/updating facility:", error);
    }
  };

  const handleEditFacility = (facility) => {
    setSelectedFacility(facility);
    togglePopup();
  };

  const handleDeleteFacility = async (facilityId) => {
    try {
      await deleteFacility(facilityId);
      setFacilities(
        facilities.filter((facility) => facility._id !== facilityId)
      );
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  return (
    <div className="facilityManagement h-full">
      <div className="flex flex-col gap-[10px] bg-white con rounded-2xl p-5 h-full">
        <div className="frame-578">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-wrapper-184">Facility Management</div>
            <CustomButton
              text="Create Facility"
              width=""
              onClick={togglePopup}
            />
          </div>
          <div className="flex flex-wrap gap-4 content-start items-start mt-5 max-md:max-w-full h-[790px] overflow-y-scroll">
            {facilities.length === 0 ? (
              <div className="text-center text-gray-500 font-bold p-4">
                Data not found
              </div>
            ) : (
              facilities.map((facility, index) => (
                <div key={index} className="flex facility-card">
                  <FacilityCard
                    {...facility}
                    onEdit={() => handleEditFacility(facility)}
                    onDelete={() => handleDeleteFacility(facility._id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div>
              <AddFacility
                closePopup={closePopup}
                onSubmit={handleAddFacility}
                facility={selectedFacility}
                mode={selectedFacility ? "edit" : "add"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityManagement;
