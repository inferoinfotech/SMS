import React, { useEffect, useRef, useState } from 'react';
import ActionMenu from './ActionMenu';
import images from '../../../Images';

function FinancialNotesCard({ title, description, onEdit }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="flex flex-col grow shrink-0 mr-0 basis-0 w-fit relative">
      <div className="flex flex-col w-full text-base font-medium text-white max-w-[370px]">
        <div className="flex gap-5 justify-between p-4 bg-[#5577E6] rounded-t-xl">
          <h2>{title}</h2>
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
      <div className="flex flex-col max-w-full text-sm rounded-none w-[370px] financial-note-card">
        <div className="flex flex-col justify-center p-4 bg-white rounded-none border-r border-b border-l border-solid border-[#CAD4F5] rounded-b-xl border-x-opacity-30">
          <div className="flex flex-col w-full">
            <div className="text-neutral-600">Description</div>
            <div className="font-medium text-neutral-800">{description}</div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div ref={menuRef} className="absolute top-10 right-4 z-10">
          <ActionMenu onEdit={onEdit} />
        </div>
      )}
    </div>
  );
}

export default FinancialNotesCard;