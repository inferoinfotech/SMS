import React from "react";
import images from "../../../Images";// Import the API function
import moment from "moment";

function MaintenanceDetailsModal({ isOpen, onClose, maintenanceDetails }) {
    const profilePhoto = maintenanceDetails?.residentId?.images?.profilePhoto || images.noUser
    const residentStatus = maintenanceDetails?.residentId?.owner ? "Owner" : "Tenant"
    const paymentMethod = maintenanceDetails?.paymentType === "Online" ? "Online" : "Cash"
    
    const date = maintenanceDetails.maintenanceDueDate
    const formattedDate = moment(date).format('MMM DD, YYYY');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between border-b border-solid border-[#F4F4F4] pb-3">
          <h5 className="text-lg font-semibold text-[#202224]">
            View Maintenance Details
          </h5>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <img
              src={profilePhoto}
              alt="Maintenance Details"
              className="w-[90px] h-[90px] rounded-full object-cover"
            />
            <div className="flex flex-col ml-4">
              <h6 className="text-[18px] font-semibold text-[#202224] text-left mb-2">
                {maintenanceDetails?.residentId?.firstName || "User Not Found"}
              </h6>
              <p className="text-[16px] text-[#A7A7A7] text-left">
                {formattedDate}
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
            <div className="flex flex-col items-center border-r border-solid border-[#F4F4F4]">
              <p className="text-[16px] text-[#A7A7A7] text-left">Wing</p>

              <div className="bg-[#F6F8FB] rounded-full overflow-hidden w-7 h-7 px-1.5 py-0.5">
                <p className="text-sm font-bold text-[#5678E9] text-center">
                  {maintenanceDetails?.residentId?.wing || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center border-r border-solid border-[#F4F4F4]">
              <p className="text-[16px] text-[#A7A7A7]">Unit</p>
              <p className="text-[16px] text-[#202224]">
                {maintenanceDetails?.residentId?.unit || "N/A"}
              </p>
            </div>
            <div className="flex flex-col items-center border-r border-solid border-[#F4F4F4]">
              <p className="text-[16px] text-[#A7A7A7]">Status</p>
              <div className="flex items-center justify-center bg-[#F1F0FF] rounded-[40px] overflow-hidden w-[86px] h-7 px-8 py-1">
                <img src={residentStatus === "Owner" ? images.owner : images.tenant} alt="" />
                <p className="text-sm font-medium text-[#4F46E5] ml-2">
                  {residentStatus}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center border-r border-solid border-[#F4F4F4]">
              <p className="text-[16px] text-[#A7A7A7]">Status</p>
              <div className="flex items-center justify-center bg-[#F1F0FF] rounded-[40px] overflow-hidden w-[86px] h-7 px-8 py-1">
                <img src={images.rupeeBlack} alt="" width="12px" />
                <p className="text-sm font-medium text-[#202224] ml-2">
                  {maintenanceDetails?.amount || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
            <div className="flex flex-col items-center border-r border-solid border-[#F4F4F4]">
              <p className="text-[16px] text-[#A7A7A7]">Penalty</p>
              <div className="bg-[#F1F0FF] rounded-[40px] overflow-hidden w-[86px] h-7 px-8 py-1">
                <p className="text-[16px] font-semibold text-[#4F4F4F]">
                  {maintenanceDetails?.penaltyAmount || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center border-r border-solid border-[#F4F4F4]">
              <p className="text-[16px] text-[#A7A7A7]">Status</p>
              <div className="flex items-center justify-center bg-[rgba(255,195,19,0.1)] rounded-[40px] overflow-hidden w-[90px] h-7 px-8 py-1">
                <img src={images.pendingIcon} alt="" />
                <p className="text-sm font-medium text-[#FFC313] ml-2">
                  {maintenanceDetails?.status || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center border-r border-solid border-[#F4F4F4]">
              <p className="text-[16px] text-[#A7A7A7]">Status</p>
              <div className="flex items-center justify-center bg-[#F1F0FF] rounded-[40px] overflow-hidden w-[86px] h-7 px-8 py-1">
                <img src={images.cashcard} alt="" />
                <p className="text-sm font-medium text-[#202224] ml-2">
                  {paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceDetailsModal;