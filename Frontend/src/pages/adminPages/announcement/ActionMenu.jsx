import React from 'react';

function ActionMenu({ onEdit, onDelete, onView }) {
  return (
    <nav className="flex flex-col justify-center self-start px-2.5 text-sm whitespace-nowrap bg-white rounded-xl shadow-2xl h-[102px] text-neutral-400 w-[102px]">
      <button className="font-semibold text-neutral-800" onClick={onEdit}> Edit </button>
      <button className="mt-2.5" onClick={onView}> View </button>
      <button className="mt-2.5" onClick={onDelete}> Delete </button>
    </nav>
  );
} 

export default ActionMenu;