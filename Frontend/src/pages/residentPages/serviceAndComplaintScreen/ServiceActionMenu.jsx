// src/pages/residentPages/serviceAndComplaintScreen/ServiceActionMenu.jsx
import React, { useState } from "react";
import ServiceDeleteConfirmationModal from "./ServiceDeleteConfirmationModal";

function ServiceActionMenu({ onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    if (typeof onDelete === 'function') {
      onDelete();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="flex flex-col justify-center self-start px-2.5 text-sm whitespace-nowrap bg-white rounded-xl shadow-2xl h-[41px] text-neutral-400 w-[102px]">
        <button onClick={handleDeleteClick}> Delete </button>
      </nav>
      <ServiceDeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}

export default ServiceActionMenu;