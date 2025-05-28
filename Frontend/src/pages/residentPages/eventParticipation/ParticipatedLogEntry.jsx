import React from "react";
import images from "../../../Images";

function ParticipatedLogEntry({ name, description, time, date, eventName }) {
  return (
    <div className="flex justify-between items-center px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full">
      <div className="sm:min-w-[256px] min-w-full flex shrink-0 grow-0 gap-2.5 items-center text-base font-medium text-neutral-600">
        <img
          loading="lazy"
          src={images.profileIcon}
          className="object-contain shrink-0 w-10 aspect-square min-h-[40px] md:block hidden"
          alt={`${name}'s avatar`}
        />
        <div className="my-auto basis-auto">{name}</div>
      </div>

      <div className="sm:w-[398px] w-full flex grow items-center justify-center text-base font-medium text-neutral-600">
        {description}
      </div>

      <div className="min-w-[182px] flex shrink-0 grow-0 gap-2.5 items-center justify-center text-base font-medium text-neutral-600">
        {time}
      </div>

      <div className="sm:w-[306px] w-full flex shrink-0 grow-0 items-center justify-center text-base font-medium text-neutral-600">
        {date}
      </div>

      <div className="sm:w-[325px] w-full flex shrink-0 grow-0 items-center justify-center gap-1.5 whitespace-nowrap">
        {eventName}
      </div>
    </div>
  );
}

export default ParticipatedLogEntry;
