// src/pages/adminPages/securityProtocolScreen/SecurityProtocol.jsx

import React, { useState, useEffect } from 'react';
import ProtocolDetailList from './RequestDetailList';
import CustomButton from '../../../components/customButton/CustomButton';
import SecurityProtocolPopUp from '../../../components/securityProtocol/SecurityProtocolPopUp';
import DeleteNumber from '../../../components/deleteNumber/DeleteNumber';
import ViewProtocol from '../../../components/viewProtocol/ViewProtocol';
import { getSecurityProtocols, createSecurityProtocol, updateSecurityProtocol, deleteSecurityProtocol } from '../../../api/securityProtocolsMnagementApi';

const SecurityProtocol = () => {
  const [protocols, setProtocols] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToView, setItemToView] = useState(null);

  useEffect(() => {
    // Fetch all protocols when the component mounts
    fetchProtocols();
  }, []);

  const fetchProtocols = async () => {
    try {
      const data = await getSecurityProtocols();
      // Format the time and date for each protocol
      const formattedData = data.map(protocol => ({
        ...protocol,
        time: new Date(`1970-01-01T${protocol.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(protocol.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
      }));
      setProtocols(formattedData);
    } catch (error) {
      console.error('Error fetching protocols:', error);
    }
  };

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

  const addProtocol = async (protocol) => {
    try {
      const newProtocol = await createSecurityProtocol(protocol);
      // Format the time and date before adding to the state
      newProtocol.time = new Date(`1970-01-01T${newProtocol.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      newProtocol.date = new Date(newProtocol.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setProtocols([...protocols, newProtocol]);
      closePopup();
    } catch (error) {
      console.error('Error adding protocol:', error);
    }
  };

  const updateProtocol = async (index, updatedProtocol) => {
    try {
      const updated = await updateSecurityProtocol(updatedProtocol._id, updatedProtocol);
      // Format the time and date before updating the state
      updated.time = new Date(`1970-01-01T${updated.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      updated.date = new Date(updated.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const updatedProtocols = [...protocols];
      updatedProtocols[index] = updated;
      setProtocols(updatedProtocols);
      closePopup();
    } catch (error) {
      console.error('Error updating protocol:', error);
    }
  };

  const deleteProtocol = async (index) => {
    try {
      await deleteSecurityProtocol(protocols[index]._id);
      const updatedProtocols = protocols.filter((_, i) => i !== index);
      setProtocols(updatedProtocols);
      closeDeletePopup();
    } catch (error) {
      console.error('Error deleting protocol:', error);
    }
  };

  const handleEdit = (index) => {
    setItemToEdit({ ...protocols[index], index });
    setIsPopupOpen(true);  // Ensure the popup opens
  };

  const handleDelete = (index) => {
    setItemToDelete(index);
    toggleDeletePopup();
  };

  const handleView = (index) => {
    setItemToView(protocols[index]);
    toggleViewPopup();
  };

  const handleCancel = () => {
    closeDeletePopup();
  };

  return (
    <div className="flex overflow-hidden flex-col p-5 h-[904px] w-full bg-white rounded-xl max-md:max-w-full">
      <div className="flex flex-col h-full max-md:max-w-full">
        <div className="flex flex-col sm:flex-row justify-between font-semibold w-full">
          <h1 className="self-stretch my-auto text-xl text-neutral-800">
            Security Protocol
          </h1>
          <CustomButton text='Create Protocol' imageType='Add' onClick={togglePopup} />
        </div>
        <ProtocolDetailList
          protocols={protocols}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView} // Pass the onView handler
        />
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <SecurityProtocolPopUp
              onClose={closePopup}
              onAdd={addProtocol}
              onUpdate={updateProtocol}
              itemToEdit={itemToEdit}
            />
          </div>
        </div>
      )}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <DeleteNumber onCancel={handleCancel}
              onClose={closeDeletePopup}
              onDelete={() => deleteProtocol(itemToDelete)}
            />
          </div>
        </div>
      )}
      {isViewPopupOpen && (
        <ViewProtocol
          protocol={itemToView}
          onClose={closeViewPopup}
        />
      )}
    </div>
  );
};

export default SecurityProtocol;