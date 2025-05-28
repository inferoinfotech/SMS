import React from 'react';

function ServiceDeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 border-b border-solid border-[#F4F4F4] pb-2">Delete Complain?</h2>
        <p className="text-[#A7A7A7] font-normal text-[14px] mb-6">Are you sure you want to delete this Complain?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300 w-full mr-5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDeleteConfirmationModal;