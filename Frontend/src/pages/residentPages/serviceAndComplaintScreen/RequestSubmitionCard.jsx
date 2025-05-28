import images from "@/Images";
import React, { useEffect, useRef, useState } from "react";
import ServiceActionMenu from "./ServiceActionMenu";
import { deleteRequestComplaintResident } from "../../../api/requestComplaintApi";
import moment from "moment";

const RequestSubmitionCard = ({
  requestName,
  date,
  description,
  status,
  _id,
}) => {
  const RequestDate = moment(date).format('MMM DD, YYYY');
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleDelete = async () => {
    try {
      await deleteRequestComplaintResident(_id);
    } catch (error) {
      console.error("Error deleting request complaint:", error);
    }
  };

  return (
    <div className="flex flex-col grow shrink-0 mr-0 basis-0 w-fit relative">
      <div className="flex flex-col w-full text-base font-medium text-white max-w-[370px]">
        <div className="flex gap-5 justify-between p-4 bg-[#5577E6] rounded-t-xl">
          <h2>{requestName}</h2>
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
              <div className="self-stretch my-auto text-neutral-600">
                Request Date
              </div>
              <div className="font-medium text-neutral-800">{RequestDate}</div>
            </div>
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="self-stretch my-auto text-neutral-600">
                Status
              </div>
              <div className="font-medium text-neutral-800">{status}</div>
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
          <ServiceActionMenu onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default RequestSubmitionCard;
