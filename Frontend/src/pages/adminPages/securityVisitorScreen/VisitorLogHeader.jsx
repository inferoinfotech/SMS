import React from 'react';

function VisitorLogHeader() {
  return (
    <div className="flex flex-col mt-[20px] max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full">
          <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-3xl max-md:pr-5 max-md:max-w-full">
            <div className="sm:min-w-[256px] grow">Visitor Name</div>
            <div className="sm:w-[398px] w-full text-center">Phone Number</div>
            <div className="sm:w-[306px] w-full text-center">Date</div>
            <div className="sm:w-[325px] w-full text-center">Unit Number</div>
            <div className="sm:w-[182px] w-full text-center">Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorLogHeader;