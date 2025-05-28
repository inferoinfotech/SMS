import React from 'react';

function VisitorLogEntry({ name, number, date, unitNumber, time }) {
  // Provide default values if unitNumber is undefined
  const unitParts = unitNumber ? unitNumber.split(" ") : ["", ""];

  // Function to format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex justify-between items-center px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full">
      <div className="sm:min-w-[256px] w-full grow flex gap-2.5 items-center text-base font-medium text-neutral-600">
        {/* <img loading="lazy" src={images.profileIcon} className="object-contain shrink-0 w-10 aspect-square min-h-[40px] md:block hidden" alt={`${name}'s avatar`} /> */}
        <div className="my-auto basis-auto">{name}</div>
      </div>

      <div className="sm:w-[398px] w-full flex items-center justify-center text-base font-medium text-neutral-600">
        {number}
      </div>

      <div className="sm:w-[306px] w-full flex items-center justify-center text-base font-medium text-neutral-600">
        {formatDate(date)}
      </div>

      <div className="sm:w-[325px] w-full flex items-center justify-center gap-1.5 whitespace-nowrap">
        <div className="flex flex-col text-sm font-bold text-center text-indigo-500">
          <div className="px-2 w-7 rounded-full bg-slate-50 fill-slate-50">
            {unitParts[0]}
          </div>
        </div>
        <div className="text-base font-medium text-neutral-600">
          {unitParts[1]}
        </div>
      </div>

      <div className="min-w-[182px] flex gap-2.5 items-center justify-center text-base font-medium text-neutral-600">
        {time}
      </div>
    </div>
  );
}

export default VisitorLogEntry;