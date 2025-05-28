// src/pages/IncomeCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import images from '../../../Images';
import IncomeActionMenu from './IncomeActionMenu';

function IncomeCard({ id, title, amount, date, time, description, onEdit, onDelete }) {
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
      <div className="flex flex-col max-w-full text-sm rounded-none w-[370px] income-card">
        <div className="flex flex-col justify-center p-4 bg-white rounded-none border-r border-b border-l border-solid border-[#CAD4F5] rounded-b-xl border-x-opacity-30">
          <div className="flex flex-col justify-center w-full max-w-[340px]">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="self-stretch my-auto text-neutral-600">Amount</div>
              <div className="flex items-center justify-center gap-0.5 font-medium text-[#5577E6] whitespace-nowrap bg-[#CAD4F5] min-h-[30px] rounded-[60px] w-[68px]">
                <img src={images.rupeeBlue} alt="" />
                {amount}
              </div>
            </div>
            <div className="flex gap-10 justify-between items-center mt-2 w-full whitespace-nowrap">
              <div className="self-stretch my-auto text-neutral-600">Date</div>
              <div className="self-stretch my-auto font-medium text-neutral-800">{date}</div>
            </div>
            <div className="flex gap-10 justify-between items-center mt-2 w-full">
              <div className="self-stretch my-auto text-neutral-600">Time</div>
              <div className="self-stretch my-auto font-medium text-neutral-800">{time}</div>
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
          <IncomeActionMenu onEdit={onEdit} onDelete={onDelete} title={title}/>
        </div>
      )}
    </div>
  );
}

export default IncomeCard;