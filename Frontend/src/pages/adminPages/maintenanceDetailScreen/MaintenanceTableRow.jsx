import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import images from "../../../Images";
import MaintenanceDetailsModal from "./MaintenanceDetailsModal";
import { getMaintenanceOne } from "../../../api/maintenanceApi"; // Import the API function
import moment from "moment";

function MaintenanceTableRow({ _id, data }) {
  const id = data?._id || "N/A";
  const profilePhoto = data?.residentId?.images?.profilePhoto || images.noUser;
  const name = data?.residentId?.firstName || "--";
  const wing = data?.residentId?.wing || "--";
  const unit = data?.residentId?.unit || "--";
  const date = data?.maintenanceDueDate || "--";
  const formattedDate = moment(date)?.format("DD/MM/YYYY") || "26/11/2012";
  const status = data?.residentId?.owner ? "Owner" : "Tenant";
  const phoneNumber = data?.residentId?.phoneNumber || "--";
  const amount = data?.maintenanceAmount || "--";
  const penalty = data?.penaltyAmount || "--";
  const paymentStatus = data?.status || "--";
  const paymentMethod = data?.paymentType === "Online" ? "Online" : "Cash";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);

  const openModal = async () => {
    try {
      const response = await getMaintenanceOne(id);
        setMaintenanceDetails(response.record);
        setIsModalOpen(true);
     
    } catch (error) {
      console.error("Error fetching maintenance details:", error);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:pr-5 max-md:max-w-full">
        <div className="flex items-center md:text-base text-[14px] font-medium text-neutral-600 w-full">
          <div className="w-[206px] grow flex gap-2.5 items-center md:text-base text-[14px] font-medium text-neutral-600">
            <img
              loading="lazy"
              // src={profilePhoto || images.noUser}
              src={images.noUser}
              alt={`${name}'s profile`}
              className="object-contain shrink-0 w-10 rounded-full aspect-square md:block hidden"
            />
            <div className="my-auto">{name}</div>
          </div>

          <div className="w-[134px] flex items-center pl-7 gap-1.5 whitespace-nowrap">
            <div className="flex flex-col text-sm font-bold text-center text-indigo-500">
              <div className="px-2 w-7 rounded-full bg-slate-50 fill-slate-50">
                {wing}
              </div>
            </div>
            <div className="md:text-base text-[14px] font-medium text-neutral-600">
              {unit}
            </div>
          </div>

          <div className="w-[152px] flex items-center justify-center gap-2 pl-[10px]">
            {formattedDate}
          </div>

          <div className="w-[134px] flex items-center justify-center gap-2 pl-[10px]">
            <div
              className={`flex gap-2 justify-center items-center self-stretch px-3 py-1.5 my-auto text-sm text-center ${
                status === "Tenant"
                  ? "text-pink-500 bg-pink-50"
                  : "text-indigo-600 bg-indigo-50"
              } whitespace-nowrap rounded-[70px]`}
            >
              {status === "Tenant" ? (
                <img
                  loading="lazy"
                  src={images.tenant}
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
              ) : (
                <img
                  loading="lazy"
                  src={images.owner}
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
              )}
              <div className="self-stretch my-auto">{status}</div>
            </div>
          </div>

          <div className="w-[177px] flex items-center justify-center gap-2 pl-[10px]">
            {phoneNumber}
          </div>

          <div className="w-[130px] flex items-center justify-center gap-2 pl-[10px]">
            <div className="flex gap-1 items-center self-stretch my-auto text-green-600 whitespace-nowrap">
              <img
                loading="lazy"
                src={images.rupeeGreen}
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
              />
              <div className="self-stretch my-auto">{amount}</div>
            </div>
          </div>

          <div className="w-[146px] flex items-center justify-center gap-2 pl-[10px]">
            <div
              className={`flex justify-center items-center h-[30px] w-[65px] rounded-[70px] ${
                penalty === "--" ? "bg-slate-50" : "bg-red-500 text-white"
              }`}
            >
              {penalty}
            </div>
          </div>

          <div className="w-[177px] flex items-center justify-center gap-2 pl-[10px]">
            <div
              className={`flex gap-1.5 justify-center items-center self-stretch px-3 py-1.5 my-auto text-sm ${
                paymentStatus === "Pending"
                  ? "text-yellow-400 bg-yellow-400"
                  : "text-green-600 bg-green-600"
              } bg-opacity-10 rounded-[58px]`}
            >
              {paymentStatus === "Pending" ? (
                <img
                  loading="lazy"
                  src={images.pendingIcon}
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
              ) : (
                <img
                  loading="lazy"
                  src={images.doneIcon}
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
              )}
              <div className="self-stretch my-auto">{paymentStatus}</div>
            </div>
          </div>

          <div className="w-[146px] flex items-center justify-center gap-2 pl-[10px]">
            <div
              className={`flex gap-1.5 justify-center items-center self-stretch px-3 py-1.5 my-auto text-sm ${
                paymentMethod === "Online"
                  ? "text-indigo-500 bg-indigo-500"
                  : "text-neutral-800 bg-neutral-800"
              } bg-opacity-10 rounded-[58px]`}
            >
              {paymentMethod === "Online" ? (
                <img
                  loading="lazy"
                  src={images.onlineIcon}
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
              ) : (
                <img
                  loading="lazy"
                  src={images.cashIcon}
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
              )}
              <div className="self-stretch my-auto">{paymentMethod}</div>
            </div>
          </div>

          <div className="w-[71px] flex items-center justify-center gap-2 pl-[10px]">
            <button onClick={openModal} className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50">
              <img
                loading="lazy"
                src={images.showIcon}
                alt=""
                className="object-contain w-6 aspect-square"
              />
            </button>
          </div>
        </div>
      </div>
      {maintenanceDetails && (
        <MaintenanceDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={images.profileImage}
          tagUser={images.tagUser}
          moneys={images.moneys}
          timer={images.timer}
          maintenanceDetails={maintenanceDetails}
        />
      )}
    </div>
  );
}

export default MaintenanceTableRow;