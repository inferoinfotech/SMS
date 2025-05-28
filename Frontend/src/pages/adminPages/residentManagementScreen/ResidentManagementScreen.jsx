import React, { useState, useEffect } from "react";
import './style.css';
import ResidentTableRow from "./ResidentTableRow";
import CustomButton from '../../../components/customButton/CustomButton';
import ResidenceStatus from "../../../components/residenceStatus/ResidenceStatus";
import VacanteStatus from "../../../components/vacanteStatus/VacanteStatus";
import { getAllResidents, deleteResident } from '../../../api/residentApi';

function ResidentManagementScreen() {
  const [residents, setResidents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showVacateStatusPopup, setShowVacateStatusPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedWing, setSelectedWing] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const data = await getAllResidents();
        setResidents(data);
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    };

    fetchResidents();
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const openVacateStatus = () => {
    setShowVacateStatusPopup(true);
  };

  const closeVacateStatus = () => {
    setShowVacateStatusPopup(false);
  };

  const openDeletePopup = (wing, unit) => {
    console.log('Opening delete popup with wing:', wing, 'and unit:', unit); // Log the data being passed
    setSelectedWing(wing);
    setSelectedUnit(unit);
    setShowDeletePopup(true);
    // setShowVacateStatusPopup(false);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteResident(selectedWing, selectedUnit);
      console.log('Deleting resident with wing:', selectedWing, 'and unit:', selectedUnit); // Log the data being sent

      if (response) {
        console.log('Resident deleted successfully');
        closeDeletePopup();
        closeVacateStatus();
        handleClosePopup();
        // Refresh residents list
        const data = await getAllResidents();
        setResidents(data);
      } else {
        console.error('Error deleting resident: Invalid response from server');
      }
    } catch (error) {
      console.error('Error deleting resident:', error);
    }
  };

  const handleSaveVacateStatus = (vacanteData) => {
    console.log('Saving vacante data:', vacanteData); // Log the data being saved
    closeVacateStatus();
    openDeletePopup(vacanteData.wing, vacanteData.unit);
  };

  return (
    <section className="flex p-5 bg-white rounded-2xl w-full h-full">
      <div className="flex flex-col w-full">
        <div className="frame-682 flex-col sm:flex-row">
          <p className="text-wrapper-433">Resident Tenant and Owner Details</p>
          <CustomButton text='Add New Resident details' imageType='Add' onClick={handleOpenPopup} />
          {showPopup && (
            <ResidenceStatus
              onCancel={handleClosePopup}
              onSave={handleClosePopup}
              openVacateStatus={openVacateStatus}
            />
          )}
        </div>

        {showVacateStatusPopup && (
          <div className="overlay">
            <VacanteStatus
              onClose={closeVacateStatus}
              onSave={handleSaveVacateStatus}
              onAdd={() => { }}
              onUpdate={() => { }}
              openDeletePopup={openDeletePopup}
            />
          </div>
        )}

        {showDeletePopup && (
          <div className="popup-overlay" onClick={closeDeletePopup}>
            <div className="frame-427" onClick={(e) => e.stopPropagation()}>
              <div className="frame-428">
                <div className="frame-424">
                  <div className="text-wrapper-234">Delete Residents ?</div>
                </div>
                <p className="text-wrapper-256">Are you sure you want to delete this Residents ?</p>
              </div>
              <div className="frame-429">
                <button className="component hover-button-false border-button-true gray-button-false component-97" onClick={closeDeletePopup}>
                  <div className="buttons component-98">Cancel</div>
                </button>
                <button className="component hover-button-true border-button-false gray-button-false component-99" onClick={handleDelete}>
                  <div className="buttons undefined">Delete</div>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col mt-[20px] max-md:max-w-full ">
          <div className="flex flex-col max-w-full w-full">
            <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full">
              <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-3xl max-md:pr-5 max-md:max-w-full overflow-x-scroll">
                <div className="w-[236px] grow"><span>Full Name</span></div>
                <div className="w-[182px] text-center"><span>Unit Number</span></div>
                <div className="w-[182px] text-center"><span>Unit Status</span></div>
                <div className="w-[224px] text-center"><span>Resident Status</span></div>
                <div className="w-[209px] text-center"><span>Phone Number</span></div>
                <div className="w-[184px] text-center"><span>Member</span></div>
                <div className="w-[170px] text-center"><span>Vehicle</span></div>
                <div className="w-[170px] text-center"><span>Action</span></div>
              </div>
            </div>
            <div className="flex flex-col w-full h-[720px] overflow-y-scroll mt-[-20px]">
            {residents.length === 0 ? (
                <div className="text-center text-gray-500 font-bold p-4">
                  Data not found
                </div>
              ) : (
                residents.map((resident, index) => (
                  <ResidentTableRow key={index} {...resident} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResidentManagementScreen;