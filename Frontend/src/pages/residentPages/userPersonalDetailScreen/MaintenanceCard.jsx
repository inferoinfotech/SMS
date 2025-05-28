import React, { useState } from 'react';
import CardDetailsModal from '../PaymentModal/CardDetailsModal';
import moment from "moment";
import { socket } from '../PaymentPortal/DueActivityPaymentCard';

function MaintenanceCard({ 
  _id,
  status, 
  maintenanceAmount, 
  penaltyAmount, 
  amount, 
  maintenanceDueDate, 
  penaltyAppliedAfterDays, 
  isDue = false, 
  onPayNow, 
  isCompleted = false 
}) {
  const formattedDate = moment(maintenanceDueDate).format('DD/MM/YYYY');
  const penaltyDate = moment(maintenanceDueDate).add(penaltyAppliedAfterDays, "days");
  const modifiedPendingDate = penaltyDate.format("DD/MM/YYYY");
  const [isCardDetailsModalOpen, setIsCardDetailsModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const openCardDetailsModal = () => setIsCardDetailsModalOpen(true);
  const closeCardDetailsModal = () => setIsCardDetailsModalOpen(false);

  const handlePayNow = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    if (paymentMethod === 'Online') {
      onPayNow(() => {
        closeCardDetailsModal();
        alert('Payment Successful');
      }, () => {
        alert('Payment Failed');
      });
    } else {
      alert("Cash payment selected 22");
      console.log("Cash payment selected 22,--------------------------",_id);
      socket.emit('sendNotification', {
        maintenanceId: _id,
        message: 'Cash payment selected for announcement ------------------------',
        type: 'cash_payment',
        currentUserId: localStorage.getItem('residentId'),
        role: 'resident',
        notificationType:"maintenance"
      });
      console.log("Socket notification sent for cash payment.");
      closeCardDetailsModal();
    }
  };

  return (
    <article className="flex flex-col self-stretch my-auto min-w-[240px] w-[370px]">
      <div className="flex flex-col max-w-full font-medium text-white whitespace-nowrap rounded-none w-[370px]">
        <header className="flex flex-col justify-center px-4 py-3 w-full bg-[#5678E9] rounded-xl rounded-b-none">
          <div className="flex gap-10 items-center justify-between">
            <h3 className="self-stretch my-auto text-base">Maintenance</h3>
            <div className={`gap-1.5 self-stretch px-3 py-1.5 my-auto text-sm text-center bg-white bg-opacity-10 rounded-[58px] w-[113px] ${
              status === "Done" ? "bg-green-500" : ""
            }`}>
              {status}
            </div>
          </div>
        </header>
      </div>
      <div className="flex flex-col justify-center p-4 max-w-full bg-white rounded-none border-r border-b border-l border-solid border-b-[#5678E9] rounded-b-[10px] border-b-opacity-30 border-x-[#5678E9] border-x-opacity-30 w-[370px]">
        <div className="flex flex-col w-full max-w-[340px]">
          <div className="flex flex-col w-full text-sm">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center w-full whitespace-nowrap">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  {isDue ? "Date" : "Bill Date"}
                </h4>
                <p className="self-stretch my-auto font-medium text-neutral-400">{formattedDate}</p>
              </div>
              {!isDue && (
                <div className="flex justify-between items-start mt-2.5 w-full">
                  <h4 className="flex-1 shrink basis-0 text-neutral-600">Pending Date</h4>
                  <p className="font-medium text-neutral-400">{modifiedPendingDate}</p>
                </div>
              )}
              <div className="mt-2.5 w-full border border-solid bg-zinc-100 border-zinc-100 min-h-[1px]" />
              <div className="flex justify-between items-center mt-2.5 w-full">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  Maintenance Amount
                </h4>
                <p className="gap-0.5 self-stretch my-auto font-medium text-red-500 whitespace-nowrap">
                  {maintenanceAmount}
                </p>
              </div>
              <div className="flex flex-col justify-between mt-2.5 w-full min-h-[26px]">
                <div className="flex justify-between items-center w-full">
                  <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                    Maintenance Penalty Amount
                  </h4>
                  <p className="gap-0.5 self-stretch my-auto font-medium text-red-500 whitespace-nowrap">
                    {penaltyAmount}
                  </p>
                </div>
                <div className="mt-1.5 w-full min-h-0 border border-solid bg-zinc-100 border-zinc-100" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2.5 w-full font-semibold">
              <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                Grand Total
              </h4>
              <div className="flex gap-0.5 items-center self-stretch my-auto text-green-600 whitespace-nowrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9a2b25d3efab58de76a16ea04a55f6c7793152b28fef0fe44aa527f486f0be4?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
                <p className="self-stretch my-auto">{amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          {isCompleted ? (
            <button
            className="gap-2.5 self-stretch px-14 py-3 mt-2.5 text-lg font-semibold text-center text-white rounded-xl bg-green-500 md:w-[340px] w-full max-md:px-5"
            disabled
          >
              Payment Done
            </button>
          ) : (
            <button
              onClick={openCardDetailsModal}
              className="gap-2.5 self-stretch px-14 py-3 mt-2.5 text-lg font-semibold text-center text-white rounded-xl bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] md:w-[340px] w-full max-md:px-5"
            >
              Pay Now
            </button>     
          )}
        </div>
      </div>
      <CardDetailsModal isOpen={isCardDetailsModalOpen} onClose={closeCardDetailsModal} onPayNow={handlePayNow} />
    </article>
  );
}

export default MaintenanceCard;