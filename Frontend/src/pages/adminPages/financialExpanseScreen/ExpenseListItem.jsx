import React, { useState } from "react";
import images from "../../../Images";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import moment from "moment";

function ExpenseListItem({ title, description, date, amount, bill, onEdit, onView, onDelete }) {
  
  const formattedDate = moment(date).format('DD/MM/YYYY');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBillFormatLogo = (filePath) => {
    const fileExtension = getFileExtension(filePath);

    switch (fileExtension) {
      case "PDF":
        return images.pdfIcon;
      case "JPG":
      case "JPEG":
      case "PNG":
        return images.jpgIcon; // Assuming jpgIcon is a generic image icon for images
      default:
        return images.pdfIcon; // Default to PDF icon if format is unknown
    }
  };

  // Function to extract the file extension from the file path
  const getFileExtension = (filePath) => {
    if (!filePath) {
      return "PDF"; // Default to PDF if filePath is null or undefined
    }

    const fileName = filePath.split('\\').pop(); // Extract the file name from the path
    const fileExtension = fileName.split('.').pop().toUpperCase(); // Extract the file extension and convert to uppercase
    return fileExtension;
  };

  // Function to handle the delete button click
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle the cancel delete action
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  // Function to handle the confirm delete action
  const handleConfirmDelete = () => {
    onDelete(); // Call the onDelete prop to handle the actual deletion
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex items-center px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full">
        <div className="w-[246px] grow flex items-center md:text-base text-[14px] font-medium text-neutral-600">
          {title}
        </div>

        <div className="w-[580px] flex items-center md:text-base text-[14px] font-medium text-neutral-600">
          {description}
        </div>

        <div className="w-[166px] flex items-center justify-center md:text-base text-[14px] font-medium text-center text-neutral-600">
          {formattedDate}
        </div>

        <div className="w-[173px] flex items-center justify-center md:text-base text-[14px] font-medium text-center text-green-600">
          <img
            loading="lazy"
            src={images.rupeeGreen}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
          />
          <div className="self-stretch my-auto">{amount}</div>
        </div>

        <div className="w-[227px] flex items-center justify-center md:text-base text-[14px] font-medium text-center text-neutral-600">
          <Link className="flex items-start self-stretch gap-2">
            <div className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50">
              <img
                loading="lazy"
                src={getBillFormatLogo(bill)}
                alt=""
                className="object-contain w-6 aspect-square"
              />
            </div>
            <div className="self-stretch my-auto">{getFileExtension(bill)}</div>
          </Link>
        </div>

        <div className="w-[143px] flex items-center justify-center gap-2">
          <button
            onClick={onEdit}
            className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50"
          >
            <img
              loading="lazy"
              src={images.edit}
              alt=""
              className="object-contain w-6 aspect-square"
            />
          </button>
          <button onClick={onView} className="frame-50">
            <img src={images.showIcon} alt="" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50"
          >
            <img
              loading="lazy"
              src={images.deleteIcon}
              alt=""
              className="object-contain w-6 aspect-square"
            />
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ExpenseListItem;