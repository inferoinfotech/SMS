import React from 'react';

function ActionMenu({ onEdit }) {
  return (
    <nav className="flex flex-col justify-center self-start px-2.5 text-sm whitespace-nowrap bg-white rounded-xl shadow-2xl h-[41px] text-neutral-400 w-[102px]">
      <button
        className="font-semibold text-neutral-800"
        onClick={onEdit}
      >
        Edit
      </button>
    </nav>
  );
}

export default ActionMenu;