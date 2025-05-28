import React from "react";
import RequestListItem from "./RequestListItem";
import { useLocation } from "react-router-dom";

const RequestDetailList = ({ requests, onEdit, onDelete, onView }) => {
  const adminId = localStorage.getItem('adminId');
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";

  return (
    <div className="flex flex-col mt-5 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full">
          <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-3xl overflow-scroll">
            <div className="md:min-w-[98px] grow">Request Name</div>
            <div className="md:w-[212px] w-full text-left">Requester Name</div>
            {adminId && adminId !== "undefined" && adminId !== "" ? (
              <>
                {!isDashboardRoute && (
                  <div className="md:w-[300px] w-full text-center">Description</div>
                )}
              </>
            ) : (
              <>
                <div className="md:w-[300px] w-full text-center">Description</div>
              </>
            )}
            <div className="md:w-[152px] w-full text-center">Date</div>
            <div className="md:w-[120px] w-full text-center">Unit Number</div>
            <div className="md:w-[162px] w-full text-center">Priority</div>
            <div className="md:w-[142px] w-full text-center pl-3">Status</div>
            <div className="md:w-[157px] w-full text-center">Action</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-[760px] overflow-scroll">
        {Array.isArray(requests) && requests.length === 0 ? (
          <div className="text-center text-gray-500 font-bold p-4">Data not found</div>
        ) : (
          requests.map((request, index) => {
            return (
              <RequestListItem
                key={index}
                data={request}
                onEdit={() => onEdit(index)}
                onDelete={() => onDelete(index)}
                onView={() => onView(index)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default RequestDetailList;
