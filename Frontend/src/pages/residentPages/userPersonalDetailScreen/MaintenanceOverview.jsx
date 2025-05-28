import React from "react";

function MaintenanceOverview({ maintenanceAmount, penaltyAmount }) {
  return (
    <section className="flex flex-col justify-center p-5 mt-5 bg-white rounded-2xl max-md:max-w-full">
      <div className="flex md:justify-between justify-center flex-wrap gap-10 items-center max-md:max-w-full">
        <h2 className="self-stretch my-auto text-xl font-semibold text-neutral-800">
          Show Maintenance Details
        </h2>
        <div className="flex flex-wrap gap-2.5 items-start self-stretch my-auto min-w-[240px] max-md:max-w-full">
          <article className="flex flex-col w-[236px]">
            <div className="flex gap-5 justify-between py-5 pr-8 w-full bg-white rounded-xl border border-green-600 border-solid shadow-2xl max-md:pr-5">
              <div className="flex shrink-0 my-auto bg-green-600 rounded-none h-[52px] w-[5px]" />
              <div className="flex gap-10 items-center">
                <div className="flex flex-col self-stretch my-auto">
                  <h3 className="text-base font-medium text-neutral-800">
                    Maintenance Amount
                  </h3>
                  <p className="px-6 mt-1.5 w-24 text-2xl font-bold text-green-600 whitespace-nowrap max-md:pl-5">
                    {maintenanceAmount}
                  </p>
                </div>
              </div>
            </div>
          </article>
          <article className="flex flex-col w-[236px]">
            <div className="flex gap-6 py-5 pr-12 w-full bg-white rounded-xl border border-red-500 border-solid shadow-2xl max-md:pr-5">
              <div className="flex shrink-0 my-auto rounded-none bg-red-500 bg-opacity-50 h-[52px] w-[5px]" />
              <div className="flex gap-10 items-center">
                <div className="flex flex-col self-stretch my-auto">
                  <h3 className="text-base font-medium text-neutral-800">
                    Penalty Amount
                  </h3>
                  <p className="px-6 mt-1.5 text-2xl font-bold text-red-500 whitespace-nowrap w-[78px] max-md:pl-5">
                    {penaltyAmount}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default MaintenanceOverview;