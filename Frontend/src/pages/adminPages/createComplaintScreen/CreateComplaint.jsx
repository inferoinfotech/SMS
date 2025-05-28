// src/pages/adminPages/createComplaintScreen/CreateComplaint.jsx

import React, { useState, useEffect } from 'react';
import './style.css';
import ComplaintDetailList from './ComplaintDetailList';
import CustomButton from '../../../components/customButton/CustomButton';
import DeleteNumber from '../../../components/deleteNumber/DeleteNumber';
import ViewComplaint from '../../../components/viewComplaint/ViewComplaint';
import EditComplaint from '../../../components/editComplaint/EditComplaint';
import { getComplaints, createComplaint, updateComplaint, deleteComplaint } from '../../../api/createComplaintApi';

const CreateComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToView, setItemToView] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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

  const addComplaint = async (complaint) => {
    try {
      const newComplaint = await createComplaint(complaint);
      setComplaints([...complaints, newComplaint]);
    } catch (error) {
      console.error('Error adding complaint:', error);
    }
  };

  const updateComplaintHandler = async (index, updatedComplaint) => {
    try {
      const complaintId = complaints[index]?._id;
      if (!complaintId) {
        console.error('Complaint ID is undefined');
        return;
      }
      const updatedComplaintData = await updateComplaint(complaintId, updatedComplaint);
      const updatedComplaints = [...complaints];
      updatedComplaints[index] = updatedComplaintData;
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  const deleteComplaintHandler = async (index) => {
    try {
      const complaintId = complaints[index]?._id;
      if (!complaintId) {
        console.error('Complaint ID is undefined');
        return;
      }
      await deleteComplaint(complaintId);
      const updatedComplaints = complaints.filter((_, i) => i !== index);
      setComplaints(updatedComplaints);
      closeDeletePopup();
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  const handleEdit = (index) => {
    setItemToEdit({ ...complaints[index], index });
    togglePopup();
  };

  const handleDelete = (index) => {
    setItemToDelete(index);
    toggleDeletePopup();
  };

  const handleView = (index) => {
    setItemToView(complaints[index]);
    toggleViewPopup();
  };

  return (
    <div className="flex overflow-hidden flex-col p-5 h-[904px] w-full bg-white rounded-xl rounded-tl-none max-md:max-w-full">
      <div className="flex flex-col h-full max-md:max-w-full">
        <div className="flex flex-col sm:flex-row justify-between font-semibold w-full">
          <h1 className="self-stretch my-auto text-xl text-neutral-800">
            Create Complaint
          </h1>
          <CustomButton text='Create Complaint' imageType='Add' onClick={togglePopup} />
        </div>
        <ComplaintDetailList
          complaints={complaints}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg">
            <EditComplaint
              onClose={closePopup}
              onAdd={addComplaint}
              onUpdate={updateComplaintHandler}
              itemToEdit={itemToEdit}
            />
          </div>
        </div>
      )}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg">
            <DeleteNumber 
              onCancel={closeDeletePopup}
              onDelete={() => deleteComplaintHandler(itemToDelete)}
            />
          </div>
        </div>
      )}
      {isViewPopupOpen && (
        <ViewComplaint
          complaint={itemToView}
          onClose={closeViewPopup}
        />
      )}
    </div>
  );
};

export default CreateComplaint;