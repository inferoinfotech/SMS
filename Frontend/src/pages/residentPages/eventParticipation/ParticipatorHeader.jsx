import React from 'react';

function ParticipatorHeader() {
  return (
    <div className="flex flex-col mt-[20px] max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full">
          <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-3xl max-md:pr-5 max-md:max-w-full">
            <div className="sm:min-w-[256px] shrink-0 grow-0">Participator Name</div>
            <div className="sm:w-[398px] grow w-full text-center">Description</div>
            <div className="sm:w-[182px] shrink-0 grow-0 w-full text-center">Time</div>
            <div className="sm:w-[306px] shrink-0 grow-0 w-full text-center">Date</div>
            <div className="sm:w-[325px] shrink-0 grow-0 w-full text-center">Event Name</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipatorHeader;