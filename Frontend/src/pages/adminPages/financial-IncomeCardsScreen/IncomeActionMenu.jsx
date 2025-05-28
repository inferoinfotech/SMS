import React, { useState } from "react";
import IncomeConfirmationModal from "./IncomeConfirmationModal";

const IncomeActionMenu = ({ onEdit, onDelete, title }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };
  return (
    <nav className="flex flex-col justify-center self-start px-2.5 text-sm whitespace-nowrap bg-white rounded-xl shadow-2xl h-[70px] text-neutral-400 w-[102px]">
      <button className="font-semibold text-neutral-800" onClick={onEdit}>
        Edit
      </button>
      <button className="mt-2.5" onClick={handleDeleteClick}>
        Delete
      </button>
      <IncomeConfirmationModal
        title={title}
        isOpen={showModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </nav>
  );
};
export default IncomeActionMenu;
