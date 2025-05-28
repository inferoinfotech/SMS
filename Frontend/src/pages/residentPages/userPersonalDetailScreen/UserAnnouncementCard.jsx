import React, { useState } from "react";
// import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import moment from "moment";

function UserAnnouncementCard({ Announcement_title, createdAt, time, description, onActionSelect, isPopupOpen, onTogglePopup }) {
  const formattedDate = moment(createdAt).format('DD/MM/YYYY');
  // const time = moment(time) 
  const parsedTime = moment(createdAt);
  const formattedTime = parsedTime.format("hh:mm A");
  const handleActionClick = (action) => {
    onActionSelect(action);
    onTogglePopup(false);
  };

  return (
    <article className="flex pr-3.5 md:w-[370px] w-full relative">
      <div className="flex flex-col grow shrink-0 mr-0 basis-0 w-fit">
        <div className="flex flex-col max-w-full text-base font-medium text-white rounded-none md:w-[370px] w-full">
          <header className="p-4 bg-[#5678E9] rounded-xl rounded-b-none max-md:pr-5 flex justify-between items-center">
            <h3>{Announcement_title}</h3>
            <button 
              onClick={() => onTogglePopup()}
              className="text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle actions menu"
            >
              {/* Add here option icon, and make popuup available */}
              {/* ND */}
              {/* <EllipsisVerticalIcon className="h-6 w-6" /> */}
            </button>
          </header>
        </div>
        <div className="flex flex-col max-w-full text-sm rounded-none md:w-[370px] w-full">
          <div className="flex flex-col justify-center p-4 bg-white rounded-none border-r border-b border-l border-solid border-b-[#5678E9] border-b-opacity-30 border-x-[#5678E9] border-x-opacity-30 rounded-b-[10px]">
            <div className="flex flex-col justify-center w-full max-w-[340px]">
              <div className="flex gap-10 items-center w-full">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  Announcement Date
                </h4>
                <p className="self-stretch my-auto font-medium text-neutral-800">{formattedDate}</p>
              </div>
              <div className="flex gap-4 items-center mt-2 w-full">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  Announcement Time
                </h4>
                <p className="self-stretch my-auto font-medium text-neutral-800">
                  {formattedTime}
                </p>
              </div>
              <div className="flex flex-col mt-2 w-full">
                <h4 className="text-neutral-600">Description</h4>
                <p className="font-medium text-neutral-800">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="absolute right-0 top-16 bg-white rounded-xl shadow-2xl py-2 z-10">
          <button
            onClick={() => handleActionClick("edit")}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-neutral-800 font-semibold"
          >
            Edit
          </button>
          <button
            onClick={() => handleActionClick("view")}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-neutral-400"
          >
            View
          </button>
          <button
            onClick={() => handleActionClick("delete")}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-neutral-400"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default UserAnnouncementCard;
