import React, { useEffect, useRef, useState } from 'react';
import ActionMenu from './ActionMenu';
import images from '../../../Images';

function FacilityCard({ name, description, serviceDate, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const formattedDate = new Date(serviceDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col grow shrink-0 mr-0 basis-0 w-fit relative">
      <div className="flex flex-col w-full text-base font-medium text-white max-w-[370px]">
        <div className="flex gap-5 justify-between p-4 bg-[#5577E6] rounded-t-xl">
          <h2>{name}</h2>
          <button onClick={toggleMenu} aria-label="Toggle menu">
            <img
              loading="lazy"
              src={images.menuIcon}
              className="object-contain shrink-0 w-6 aspect-square"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col max-w-full text-sm rounded-none facility-card">
        <div className="flex flex-col justify-center p-4 bg-white rounded-none border-r border-b border-l border-solid border-[#CAD4F5] rounded-b-xl border-x-opacity-30">
          <div className="flex flex-col justify-center w-full max-w-[340px]">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="self-stretch my-auto text-neutral-600">Due Date</div>
              <div className="font-medium text-neutral-800">{formattedDate}</div>
            </div>
            <div className="flex flex-col mt-2 w-full">
              <div className="text-neutral-600">Description</div>
              <div className="font-medium text-neutral-800">{description}</div>
            </div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div ref={menuRef} className="absolute top-10 right-4 z-10">
          <ActionMenu onEdit={onEdit} onDelete={onDelete} setShow={setShowMenu} name={name} />
        </div>
      )}
    </div>
  );
}

export default FacilityCard;