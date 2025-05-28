import React from "react";

const StyledInvoice = ({ event }) => {
  return (
    <div className="styled-invoice p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Invoice Details</h2>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <p>
          <strong className="text-gray-500">Invoice ID:</strong> {event.id}
        </p>
        <p>
          <strong className="text-gray-500">Owner Name:</strong> {event.ownerName}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <p>
          <strong className="text-gray-500">Bill Date:</strong> {event.billDate}
        </p>
        <p>
          <strong className="text-gray-500">Payment Date:</strong>{" "}
          {event.paymentDate}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <p>
          <strong className="text-gray-500">Event Date:</strong>{" "}
          {event.eventDate}
        </p>
        <p>
          <strong className="text-gray-500">Phone Number:</strong>{" "}
          {event.phoneNumber}
        </p>
      </div>
      <p className="mb-5">
        <strong className="text-gray-500">Email:</strong> {event.email}
      </p>
      <p className="mb-5">
        <strong className="text-gray-500">Event Name:</strong> {event.eventName}
      </p>
      <p className="mb-5">
        <strong className="text-gray-500">Description:</strong>{" "}
        {event.description}
      </p>
      <div className="bg-[#F6F8FB] p-5 rounded-[10px] my-5">
        <div className="flex items-center justify-between border-b border-solid border-[#D3D3D3] pb-4 mb-3">
          <strong className="text-[16px] font-normal text-[#202224]">
            Maintenance Amount
          </strong>
          <p className="text-[16px] font-normal text-[#39973D]">
            ₹ {event.maintenanceAmount}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-[16px] font-normal text-[#202224]">
            Grand Total
          </strong>
          <p className="text-[16px] font-medium text-[#202224]">
            ₹ {event.maintenanceAmount + event.pendingAmount}
          </p>
        </div>
      </div>
      <p>
        <strong className="text-gray-500">Note:</strong> {event.note}
      </p>
    </div>
  );
};

export default StyledInvoice;