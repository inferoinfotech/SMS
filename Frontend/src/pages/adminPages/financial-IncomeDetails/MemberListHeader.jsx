import React from 'react';

function MemberListHeader() {
  return (
    <div className="flex justify-between p-5 mt-5 text-sm font-semibold bg-indigo-100 rounded-t-2xl text-neutral-800 max-md:max-w-full overflow-scroll">
      <div className="w-[170px] grow">Unit Number</div>
      <div className="w-[297px] text-center">Payment Date</div>
      <div className="w-[347px] text-center">Tnant/Owner Status</div>
      <div className="w-[279px] text-center">Phone Number</div>
      <div className="w-[256px] text-center">Amount</div>
      <div className="w-[146px] text-center">Payment</div>
    </div>
  );
}

export default MemberListHeader;