import React from 'react';

function GuardTableHeader() {
  return (
    <div className="flex flex-col justify-center py-px w-full text-sm font-semibold text-neutral-800 max-md:max-w-full overflow-y-hidden overflow-x-auto">
      <div className="flex p-5 rounded-t-2xl bg-indigo-100 max-md:max-w-full">
        <div className="md:w-[200px] w-full grow">Security Guard Name</div>
        <div className="md:w-[380px] w-full shrink-0 grow-0 text-center">Email</div>
        <div className="md:w-[175px] w-full shrink-0 grow-0 text-center">Phone Number</div>
        <div className="md:w-[165px] w-full shrink-0 grow-0 text-center">Select Shift</div>
        <div className="md:w-[150px] w-full shrink-0 grow-0 text-center">Shift Date</div>
        <div className="md:w-[130px] w-full shrink-0 grow-0 text-center">Shift Time</div>
        <div className="md:w-[140px] w-full shrink-0 grow-0 text-center">Gender</div>
        <div className="md:w-[160px] w-full shrink-0 grow-0 text-center">Action</div>
      </div>
    </div>
  );
}

export default GuardTableHeader;