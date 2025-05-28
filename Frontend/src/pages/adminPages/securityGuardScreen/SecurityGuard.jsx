import React, { useState, useContext, useEffect } from "react";
import GuardTable from "./GuardTable";
import CustomButton from "../../../components/customButton/CustomButton";
import DeleteNumber from "../../../components/deleteNumber/DeleteNumber";
import SecurityGuardPopUp from "../../../components/securityGuard/SecurityGuardPopUp";
import ViewGuard from "../../../components/viewGuard/ViewGuard";
import { SecurityGuardContext } from "@/contexts/SecurityGuardProvider";

const SecurityGuard = () => {
  const { guards, addGuard, updateGuard, deleteGuard } = useContext(SecurityGuardContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToView, setItemToView] = useState(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setItemToEdit(null); // Clear itemToEdit when opening the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setItemToEdit(null); // Clear itemToEdit when closing the popup
  };

  const toggleDeletePopup = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setItemToDelete(null); // Clear itemToDelete when closing the delete popup
  };

  const toggleViewPopup = () => {
    setIsViewPopupOpen(!isViewPopupOpen);
  };

  const closeViewPopup = () => {
    setIsViewPopupOpen(false);
    setItemToView(null); // Clear itemToView when closing the view popup
  };

  const handleAddGuard = async (guard) => {
    await addGuard(guard);
    closePopup();
  };

  const handleUpdateGuard = async (index, guardData) => {
    await updateGuard(index, guardData);
    closePopup();
  };

  const handleDeleteGuard = async (index) => {
    await deleteGuard(index);
    closeDeletePopup();
  };

  const handleEdit = (index) => {
    setItemToEdit({ ...guards[index], index });
    setIsPopupOpen(true); // Ensure the popup opens
  };

  const handleDelete = (index) => {
    setItemToDelete(index);
    toggleDeletePopup();
  };

  const handleView = (index) => {
    setItemToView(guards[index]);
    toggleViewPopup();
  };

  return (
    <div className="flex overflow-hidden flex-col p-5 h-[904px] w-full bg-white rounded-xl max-md:max-w-full">
      <div className="flex flex-col h-full max-md:max-w-full">
        <div className="flex flex-col sm:flex-row justify-between font-semibold w-full">
          <h1 className="self-stretch my-auto text-xl text-neutral-800">
            Security Guard Details
          </h1>
          <CustomButton
            text="Add Security"
            imageType=""
            onClick={togglePopup}
          />
        </div>
        <GuardTable
          guards={guards}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView} // Pass the onView handler
        />
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <SecurityGuardPopUp
              onClose={closePopup}
              onAdd={handleAddGuard}
              onUpdate={(guardData) =>
                handleUpdateGuard(itemToEdit.index, guardData)
              }
              itemToEdit={itemToEdit}
            />
          </div>
        </div>
      )}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <DeleteNumber
              onCancel={closeDeletePopup}
              onDelete={() => handleDeleteGuard(itemToDelete)}
            />
          </div>
        </div>
      )}
      {isViewPopupOpen && (
        <ViewGuard guard={itemToView} onClose={closeViewPopup} />
      )}
    </div>
  );
};

export default SecurityGuard;