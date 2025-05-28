import React, { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function ActionMenu({ onEdit, onDelete, setShow, name }) {
  const [showModal, setShowModal] = useState(false);
  
  const handleEdit = () => {
    onEdit();
    setShow(false);
  };
  
  const handleDeleteClick = () => {
    setShowModal(true);
  };
  
  const handleConfirmDelete = () => {
    onDelete();
    setShow(false);
    setShowModal(false);
  };
  
  const handleCancelDelete = () => {
    setShow(false);
    setShowModal(false);
  };

  return (
    <nav className="flex flex-col justify-center self-start px-2.5 py-2.5 gap-2 text-sm whitespace-nowrap bg-white rounded-xl shadow-2xl text-neutral-400 w-[102px]">
      <button
        className="font-semibold text-neutral-800"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        className="font-semibold text-red-500"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        name={name}
      />
    </nav>
  );
}

export default ActionMenu;