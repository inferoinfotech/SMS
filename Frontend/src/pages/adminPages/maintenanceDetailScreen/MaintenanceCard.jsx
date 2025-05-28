import React from 'react';

function MaintenanceCard({ title, amount, color }) {
  return (
    <div className="flex flex-col sm:w-[236px] w-full sm:mb-0 mb-5">
      <div className={`flex gap-5 justify-between py-5 pr-8 w-full bg-white rounded-xl shadow-[0px_0px_40px_rgba(0,0,0,0.06)] max-md:pr-5`}>
        <div className={`flex shrink-0 my-auto bg-${color}-600 rounded-none h-[52px] w-[5px]`} />
        <div className="flex gap-10 items-center">
          <div className="flex flex-col self-stretch my-auto">
            <div className="sm:text-base text-[10px] font-medium text-neutral-800">{title}</div>
            <div className={`px-6 mt-1.5 w-11 text-2xl font-bold text-${color}-600 whitespace-nowrap max-md:pl-5`}>
              {amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceCard;