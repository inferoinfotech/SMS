import React from "react";
import images from "../../../Images";

function ProtocolListItem({ title, description, date, time, onEdit, onDelete, onView }) {
  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex items-center px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full">
        <div className="md:w-[282px] w-full grow flex gap-2.5 items-center text-base font-medium text-neutral-600">
          {/* <img loading="lazy" src={images.profileIcon} alt={`${title}'s profile`} className="object-contain shrink-0 w-10 rounded-full aspect-square md:block hidden" /> */}
          <div className="my-auto">{title}</div>
        </div>

        <div className="md:w-[511px] w-full flex items-center text-base font-medium text-neutral-600 break-words">
          {description}
        </div>

        <div className="md:w-[250px] w-full flex items-center justify-center gap-2">
          {date}
        </div>

        <div className="md:w-[183px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
          <div className={`flex items-center justify-center my-auto px-3 py-1.5 bg-[#F6F8FB] whitespace-nowrap rounded-[70px] w-[100px]`}>
            {time}
          </div>
        </div>

        <div className="md:w-[207px] w-full flex flex-wrap items-center justify-end gap-2">
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
}

export default ProtocolListItem;