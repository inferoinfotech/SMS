import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentMethodModal({ isOpen, onClose, onPayNow }) {
  const navigate = useNavigate()
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  if (!isOpen) return null;
  
  const handlePayNow = () => {
    console.log("handlePayNow", selectedPaymentMethod)
    onPayNow(selectedPaymentMethod);
    navigate("/maintenanceInvoices");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 border-solid border-b border-[#F4F4F4] pb-3">
          Payment Method
        </h2>
        <div className="flex flex-col justify-center p-5 bg-white rounded-md max-md:max-w-full mb-[20px] shadow-md">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700">
            <div className="flex items-center">
              Online Payment
            </div>
            <input
              type="radio"
              name="paymentMethod"
              value="Online"
              className="mr-2"
              onChange={() => setSelectedPaymentMethod("Online")}
            />
          </label>
        </div>
        <div className="flex flex-col justify-center p-5 bg-white rounded-md max-md:max-w-full mb-[20px] shadow-md">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700">
            <div className="flex items-center">
              Cash Payment
            </div>
            <input
              type="radio"
              name="paymentMethod"
              value="CashPayment"
              className="mr-2"
              onChange={() => setSelectedPaymentMethod("CashPayment")}
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-black bg-transparent border border-solid rounded-md w-full mr-[20px]"
          >
            Close
          </button>
          <button
            onClick={handlePayNow}
            className="px-4 py-2 text-white rounded-md bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] w-full"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodModal;