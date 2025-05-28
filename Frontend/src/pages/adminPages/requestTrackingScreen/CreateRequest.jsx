import React, { useState, useEffect } from 'react';
import RequestDetailList from './RequestDetailList';
import CustomButton from '../../../components/customButton/CustomButton';
import DeleteNumber from '../../../components/deleteNumber/DeleteNumber';
import EditRequest from '../../../components/editRequest/EditRequest';
import ViewTracking from '../../../components/viewTracking/ViewTracking';
import { getRequestComplaints, createRequestComplaint, updateRequestComplaint, deleteRequestComplaint } from '../../../api/requestComplaintApi';

const CreateRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToView, setItemToView] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getRequestComplaints();
      setRequests(response.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
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

  const addRequest = async (request) => {
    try {
      const response = await createRequestComplaint(request);
      setRequests([...requests, response]);
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  const updateRequest = async (index, updatedRequest) => {
    try {
      const response = await updateRequestComplaint(updatedRequest._id, updatedRequest);
      const updatedRequests = [...requests];
      updatedRequests[index] = response;
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const deleteRequest = async (index) => {
    try {
      const requestId = requests[index]._id;
      await deleteRequestComplaint(requestId);
      const updatedRequests = requests.filter((_, i) => i !== index);
      setRequests(updatedRequests);
      closeDeletePopup();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleEdit = (index) => {
    setItemToEdit({ ...requests[index], index });
    togglePopup();
  };

  const handleDelete = (index) => {
    setItemToDelete(index);
    toggleDeletePopup();
  };

  const handleView = (index) => {
    setItemToView(requests[index]);
    toggleViewPopup();
  };

  return (
    <div className="flex overflow-hidden flex-col p-5 h-[904px] w-full bg-white rounded-xl max-md:max-w-full">
      <div className="flex flex-col h-full max-md:max-w-full">
        <div className="flex flex-col sm:flex-row justify-between font-semibold w-full">
          <h1 className="self-stretch my-auto text-xl text-neutral-800">
            Track Request
          </h1>
          <CustomButton text='Create Request' imageType='Add' onClick={togglePopup} />
        </div>
        <RequestDetailList
          requests={requests}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <EditRequest
              onClose={closePopup}
              onAdd={addRequest}
              onUpdate={updateRequest}
              itemToEdit={itemToEdit}
            />
          </div>
        </div>
      )}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <DeleteNumber 
              onCancel={closeDeletePopup}
              onDelete={() => deleteRequest(itemToDelete)}
            />
          </div>
        </div>
      )}
      {isViewPopupOpen && (
        <ViewTracking
          complaint={itemToView}
          onClose={closeViewPopup}
        />
      )}
    </div>
  );
};

export default CreateRequest;