import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IncomeConfirmationModal from './IncomeConfirmationModal';
function ActionMenu({ onEdit, onDelete, onView, tabState }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };
  
  const handleConfirmDelete = () => {
    onDelete();
    setShowModal(false);
  };
  
  
    const handleViewClick = () => {
      navigate("/otherIncomeDetails", { state: { onView: onView, tabState: tabState } });
      ;
    };

  const handleCancelDelete = () => {
    setShowModal(false);
  };
  return (
    <nav className="flex flex-col justify-center self-start px-2.5 text-sm whitespace-nowrap bg-white rounded-xl shadow-2xl h-[102px] text-neutral-400 w-[102px]">
      <button
        className="font-semibold text-neutral-800"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="mt-2.5"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
      <button
        className="mt-2.5"
        onClick={handleViewClick}
      >
        Participator
      </button>
      <IncomeConfirmationModal
        isOpen={showModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </nav>
  );
}

export default ActionMenu;