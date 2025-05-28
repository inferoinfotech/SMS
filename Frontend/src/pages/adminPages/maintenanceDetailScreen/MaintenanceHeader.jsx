import React, { useState } from 'react';
import "./style.css"
import MaintenanceCard from './MaintenanceCard';
import CustomButton from '../../../components/customButton/CustomButton';
import SetMaintenance from '../../../components/setMaintenance/SetMaintenance';

function MaintenanceHeader() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="flex flex-wrap justify-between items-center p-5 sm:pb-5 pb-44 w-full bg-white rounded-2xl sm:h-[145px] h-[185px] man-card-spece max-md:max-w-full">
      <div className="sm:flex block flex-1 shrink gap-2.5 items-start self-stretch my-auto basis-7 min-w-[240px] max-md:max-w-full">
        <MaintenanceCard
          title="Maintenance Amount"
          amount={0}
          color="green"
        />
        <MaintenanceCard
          title="Penalty Amount"
          amount={0}
          color="red"
        />
      </div>
      <CustomButton text='Set Maintenance' onClick={handleOpenPopup} width='' />
      {showPopup && (
        <div className="">
          <SetMaintenance onClose={handleClosePopup} onSave={handleClosePopup} />
        </div>
      )}
    </div>
  );
}

export default MaintenanceHeader;