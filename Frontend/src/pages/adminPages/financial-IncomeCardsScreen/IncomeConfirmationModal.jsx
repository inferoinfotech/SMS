import React from "react";

const IncomeConfirmationModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-[15px] shadow-lg md:w-[410px] w-full">
        <h1 className="text-xl font-semibold mb-4 text-[#202224] border-b border-solid border-[#F4F4F4] pb-3">
          Delete {title}?
        </h1>
        <p className="mb-4 font-normal text-[#A7A7A7]">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-3 bg-white text-gray-600 border border-solid border-gray-300 rounded-[10px] w-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-3 bg-red-500 text-white rounded-[10px] w-full"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeConfirmationModal;
