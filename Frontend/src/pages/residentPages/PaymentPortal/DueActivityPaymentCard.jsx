import React, { useEffect, useState } from "react";
import PaymentMethodModal from "../PaymentModal/PaymentModal";
import { initiatePayment, handlePaymentCallback } from "../../../api/AnnouncementApi";
import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

const DueActivityPaymentCard = ({ status, member, amount, activityDate, date, activityName, descriptions, isDue, _id }) => {
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
    useState(false);

  const openPaymentMethodModal = () => setIsPaymentMethodModalOpen(true);
  const closePaymentMethodModal = () => setIsPaymentMethodModalOpen(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); 
  };
  console.log("DueActivityPaymentCard")
  const handlePayNow = async (paymentMethod , announcementId) => {
    console.log("handlePayNow", paymentMethod)
    if (paymentMethod === "Online") {
      try {
        const response = await initiatePayment({ announcementId: _id });
        const { order } = response;
        const options = {
          key: "rzp_test_V7TeUgAIzcpzOL",
          amount: order.amount,
          currency: order.currency,
          name: "Your Company Name",
          description: "Payment for activity",
          order_id: order.id,
          handler: async function (response) {
            await handlePaymentCallback({
              announcementId: _id,
              razorpayPaymentId: response.razorpay_payment_id,
            });
            alert("Payment successful!");
            closePaymentMethodModal();
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
            contact: "1234567890",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#F37254",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error initiating payment:", error);
      }
    } else {
      alert("Cash payment selected 22");
      console.log("Cash payment selected 22,--------------------------",_id);
        socket.emit('sendNotification', {
          announcementId: _id,
          message: 'Cash payment selected for announcement',
          type: 'cash_payment',
          currentUserId: localStorage.getItem('residentId'),
          role: 'resident'
        });
        console.log("Socket notification sent for cash payment.");
      closePaymentMethodModal();
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server with ID:', socket.id);
    });
  
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      console.log('Connection URL:', import.meta.env.VITE_SERVER_URL);
    });
  
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('error');
    };
  }, []);

  return (
    <article className="flex flex-col self-stretch min-w-[240px] w-[370px]">
      <div className="flex flex-col max-w-full font-medium text-white whitespace-nowrap rounded-none w-[370px]">
        <header className="flex flex-col justify-center px-4 py-3 w-full bg-[#5678E9] rounded-xl rounded-b-none">
          <div className="flex gap-10 items-center justify-between">
            <h3 className="self-stretch my-auto text-base">
              {isDue ? "Due Activity Payment" : "No Due Activity Payment"}
            </h3>
            <div
              className={`gap-1.5 self-stretch px-3 py-1.5 my-auto text-sm text-center bg-white bg-opacity-10 rounded-[58px] w-[113px] ${
                status === "Done" ? "bg-green-500" : ""
              }`}
            >
              {status}
            </div>
          </div>
        </header>
      </div>
      <div className="flex flex-col justify-center p-4 max-w-full bg-white rounded-b-[10px] border-r border-b border-l border-solid border-b-[#5678E9] border-b-opacity-30 border-x-[#5678E9] border-x-opacity-30 w-[370px]">
        <div className="flex flex-col w-full max-w-[340px]">
          <div className="flex flex-col w-full text-sm">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center w-full whitespace-nowrap mb-3">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  {activityName ? "Activity Name" : "Activity Name"}
                </h4>
                <p className="self-stretch my-auto font-medium text-neutral-400">
                  {activityName}
                </p>
              </div>
              <div className="flex justify-between items-center w-full whitespace-nowrap mb-3">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  {member ? "Total Member" : "Total Member"}
                </h4>
                <p className="self-stretch my-auto font-medium text-neutral-400">
                  {member}
                </p>
              </div>
              <div className="flex justify-between items-center w-full whitespace-nowrap mb-3">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  {date ? "Date" : "Date"}
                </h4>
                <p className="self-stretch my-auto font-medium text-neutral-400">
                  {formatDate(date)}
                </p>
              </div>
              <div className="flex justify-between items-center w-full whitespace-nowrap mb-3">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  {isDue ? "Activity Due Date" : "Activity Due Date"}
                </h4>
                <p className="self-stretch my-auto font-medium text-neutral-400">
                  {formatDate(activityDate)}
                </p>
              </div>
              <div className="flex justify-between items-center w-full whitespace-nowrap mb-3">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  {descriptions ? "Activity Description" : "Activity Description"}
                </h4>
                <p className="my-auto font-medium text-neutral-400">
                  {descriptions}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600">
                  {isDue ? "Amount" : "Amount"}
                </h4>
                <p className="gap-0.5 self-stretch my-auto font-medium text-red-500 whitespace-nowrap">
                  {amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          {isDue && status !== "Done" && (
            <button
              onClick={openPaymentMethodModal}
              className="gap-2.5 self-stretch px-14 py-3 mt-2.5 text-lg font-semibold text-center text-white rounded-xl bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] md:w-[340px] w-full max-md:px-5"
            >
              Pay Now
            </button>
          )}
          {status === "Done" && (
            <button
              className="gap-2.5 self-stretch px-14 py-3 mt-2.5 text-lg font-semibold text-center text-white rounded-xl bg-green-500 md:w-[340px] w-full max-md:px-5"
              disabled
            >
              Payment Done
            </button>
          )}
        </div>
      </div>
      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={closePaymentMethodModal}
        onPayNow={handlePayNow}
      />
    </article>
  );
};

export default DueActivityPaymentCard;