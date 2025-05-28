import React from 'react';
import images from "../../../Images";
import moment from 'moment';

function MemberListItem({ unitNumber, paymentDate, status, phoneNumber, amount, paymentMethod, residentId, paymentType }) {
  const formattedDate = moment(paymentDate).format('DD/MM/YYYY'); // Format date as DD/MM/YYYY
  const unitAndWing = `${residentId?.wing} ${residentId?.unit}`; // Combine wing and unit

  // Determine the status based on the `owner` field
  const displayStatus = residentId?.owner ? 'Owner' : 'Tenant';

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:pr-5 max-md:max-w-full">
        <div className="flex items-center md:text-base text-[14px] font-medium text-neutral-600 w-full">

          <div className="w-[170px] grow flex items-center gap-1.5 whitespace-nowrap">
            <div className="flex flex-col text-sm font-bold text-center text-indigo-500">
              <div className="px-2 w-7 rounded-full bg-slate-50 fill-slate-50">
                {unitAndWing?.split(" ")[0]}
              </div>
            </div>
            <div className="md:text-base text-[14px] font-medium text-neutral-600">
              {unitAndWing?.split(" ")[1]}
            </div>
          </div>

          <div className="w-[297px] flex items-center justify-center gap-2">
            {formattedDate} {/* Display formatted date */}
          </div>

          <div className="w-[347px] flex items-center justify-center gap-2">
            <div className={`flex gap-2 justify-center items-center self-stretch px-3 py-1.5 my-auto text-sm text-center ${displayStatus === 'Tenant' ? 'text-pink-500 bg-pink-50' : 'text-indigo-600 bg-indigo-50'} whitespace-nowrap rounded-[70px]`}>
              {displayStatus === 'Tenant'
                ?
                <img loading="lazy" src={images.tenant} alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                :
                <img loading="lazy" src={images.owner} alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
              }
              <div className="self-stretch my-auto">{displayStatus}</div> {/* Use displayStatus */}
            </div>
          </div>

          <div className="w-[279px] flex items-center justify-center gap-2">
            {residentId?.phoneNumber} {/* Display phoneNumber */}
          </div>

          <div className="w-[256px] flex items-center justify-center gap-2">
            <div className="flex gap-1 items-center self-stretch my-auto text-green-600 whitespace-nowrap">
              <img loading="lazy" src={images.rupeeGreen} alt="" className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square" />
              <div className="self-stretch my-auto">{amount}</div> {/* Display amount */}
            </div>
          </div>

          <div className="w-[146px] flex items-center justify-center gap-2 pl-3">
  <div className={`flex gap-1.5 justify-center items-center self-stretch px-3 py-1.5 my-auto text-sm ${paymentType === 'Online' ? 'text-indigo-500 bg-indigo-500' : 'text-neutral-800 bg-neutral-800'} bg-opacity-10 rounded-[58px]`}>
    {paymentType === 'Online' ? (
      <img loading="lazy" src={images.onlineIcon} alt="Online" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
    ) : (
      <img loading="lazy" src={images.cashIcon} alt="Cash" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
    )}
    <div className="self-stretch my-auto">{paymentType}</div>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}

export default MemberListItem;