import React from "react";
import { useLocation } from "react-router-dom";
import images from "../../../Images";
import moment from "moment";

const ComplaintListItem = ({ profilePhoto, complainerName, complaintName, description, createdAt, wing, unit, priority, status, onEdit, onDelete, onView }) => {
  const formattedDate = moment(createdAt).format('DD/MM/YYYY');
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";
  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex items-center px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full">
        <div className="md:w-[98px] w-full grow flex gap-2.5 items-center md:text-base text-[14px] font-medium text-neutral-600">
          <img loading="lazy" src={profilePhoto || images.profileIcon} alt={`${complainerName}'s profile`} className="object-contain shrink-0 w-10 rounded-full aspect-square md:block hidden" />
          <div className="my-auto">{complainerName}</div>
        </div>

        <div className="md:w-[218px] w-full flex items-center md:text-base text-[14px] font-medium text-neutral-600">
          {complaintName}
        </div>

        {!isDashboardRoute && (
          <div className="w-[300px] flex items-center md:text-base text-[14px] font-medium text-neutral-600 break-words">
            {description}
          </div>
        )}

        <div className="md:w-[152px] w-full flex items-center justify-center gap-2">
          {formattedDate}
        </div>

        <div className="md:w-[120px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
          <div className="flex flex-col text-sm font-bold text-center text-indigo-500">
            <div className="w-7 h-7 flex justify-center items-center rounded-full bg-blue-50 fill-slate-50">
              {wing}
            </div>
          </div>
          <div className="md:text-base text-[14px] font-medium text-neutral-600">
            {unit}
          </div>
        </div>

        <div className="md:w-[162px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
          <div
            className={`flex items-center justify-center my-auto px-3 py-1.5 font-semibold text-[#FFF] whitespace-nowrap rounded-[70px] md:w-[100px] w-[80px] ${priority === 'Medium' ? 'bg-[#5678E9]' :
              priority === 'Low' ? 'bg-[#39973D]' :
                priority === 'High' ? 'bg-[#E74C3C]' : ''
              }`}
          >
            {priority}
          </div>
        </div>

        <div className="md:w-[142px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
          <div
            className={`flex items-center justify-center my-auto px-3 py-1.5 font-semibold whitespace-nowrap rounded-[70px] md:w-[100px] w-[80px] ${status === 'Pending' ? 'bg-[#FFFAE8] text-[#FFC313]' :
              status === 'Open' ? 'bg-[#EFF2FD] text-[#5678E9]' :
                status === 'Solved' ? 'bg-[#EDF5EC] text-[#39973D]' : ''
              }`}
          >
            {status}
          </div>
        </div>

        <div className="md:w-[157px] w-full flex md:flex-nowrap flex-wrap items-center justify-end gap-2">
          <button onClick={onEdit} className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50">
            <img
              loading="lazy"
              src={images.edit}
              alt=""
              className="object-contain w-6 aspect-square"
            />
          </button>
          <button onClick={onView} className="frame-50">
            <img src={images.showIcon} alt="" />
          </button>
          <button onClick={onDelete} className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50">
            <img
              loading="lazy"
              src={images.deleteIcon}
              alt=""
              className="object-contain w-6 aspect-square"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintListItem;