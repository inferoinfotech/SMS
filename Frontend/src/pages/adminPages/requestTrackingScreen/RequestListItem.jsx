import React from "react";
import moment from "moment";
import images from "../../../Images";
import { useLocation } from "react-router-dom";

// function RequestListItem({ profilePhoto, requesterName, requestName, description, date, wing, unit, priority, status, onEdit, onDelete, onView }) {
function RequestListItem({ data, onEdit, onDelete, onView }) {
  const adminId = localStorage.getItem('adminId');
  const formattedDate = moment(data.date).format('DD/MM/YYYY');
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex items-center px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full">
        <div className="md:w-[98px] w-full grow flex gap-2.5 items-center md:text-base text-[14px] font-medium text-neutral-600">
          <img loading="lazy" src={data.profilePhoto || images.profileIcon} alt={`${data.requestName}'s profile`} className="object-contain shrink-0 w-10 rounded-full aspect-square md:block hidden" />
          <div className="my-auto">{data.requestName}</div>
        </div>

        <div className="md:w-[218px] w-full flex items-center md:text-base text-[14px] font-medium text-neutral-600">
          {data.requesterName}
        </div>

        {adminId && adminId !== "undefined" && adminId !== "" ? (
          <>
            {!isDashboardRoute && (
              <div className="md:w-[300px] w-full flex items-center md:text-base text-[14px] font-medium text-neutral-600 break-words">
                {data.description}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="md:w-[300px] w-full flex items-center md:text-base text-[14px] font-medium text-neutral-600 break-words">
              {data.description}
            </div>
          </>
        )}

        <div className="md:w-[152px] w-full flex items-center justify-center gap-2">
          {formattedDate}
        </div>

        {
          isDashboardRoute ? (
            <div className="md:w-[120px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
              <div className="flex flex-col text-sm font-bold text-center text-indigo-500">
                <div className="w-7 h-7 flex justify-center items-center rounded-full bg-blue-50 fill-slate-50">
                  {data.unit.split(" ")[0]}
                </div>
              </div>
              <div className="md:text-base text-[14px] font-medium text-neutral-600">
                {data.unit.split(" ")[1]}
              </div>
            </div>
          ) : (
            <div className="md:w-[120px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
              <div className="flex flex-col text-sm font-bold text-center text-indigo-500">
                <div className="w-7 h-7 flex justify-center items-center rounded-full bg-blue-50 fill-slate-50">
                  {data.wing}
                </div>
              </div>
              <div className="md:text-base text-[14px] font-medium text-neutral-600">
                {data.unit}
              </div>
            </div>
          )
        }

        <div className="md:w-[162px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
          <div
            className={`flex items-center justify-center my-auto px-3 py-1.5 font-semibold text-[#FFF] whitespace-nowrap rounded-[70px] md:w-[100px] w-[80px] ${data.priority === 'Medium' ? 'bg-[#5678E9]' :
              data.priority === 'Low' ? 'bg-[#39973D]' :
                data.priority === 'High' ? 'bg-[#E74C3C]' : ''
              }`}
          >
            {data.priority}
          </div>
        </div>

        <div className="md:w-[142px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
          <div
            className={`flex items-center justify-center my-auto px-3 py-1.5 font-semibold whitespace-nowrap rounded-[70px] md:w-[100px] w-[80px] ${data.status === 'Pending' ? 'bg-[#FFFAE8] text-[#FFC313]' :
              data.status === 'Open' ? 'bg-[#EFF2FD] text-[#5678E9]' :
                data.status === 'Solved' ? 'bg-[#EDF5EC] text-[#39973D]' : ''
              }`}
          >
            {data.status}
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
    </div >
  );
}

export default RequestListItem;