// Announcement.jsx
import React, { useState, useEffect } from "react";
import AnnouncementCard from "./AnnouncementCard";
import AddAnnouncement from "../../../components/addAnnouncement/AddAnnouncement";
import CustomButton from "../../../components/customButton/CustomButton";
import DeleteNumber from "../../../components/deleteNumber/DeleteNumber";
import ViewAnnouncement from "../../../components/viewAnnouncement/ViewAnnouncement";
import "./style.css";
import { fetchAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from "../../../api/AnnouncementApi";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToView, setItemToView] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements();
        const uniqueAnnouncements = data.filter((announcement, index, self) =>
          index === self.findIndex(t => t.participatorId === announcement.participatorId)
        );
        setAnnouncements(uniqueAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    getAnnouncements();
  }, [refreshKey]);

  const refreshAnnouncements = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setItemToEdit(null);
  };

  const toggleDeletePopup = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setItemToDelete(null);
  };

  const toggleViewPopup = () => {
    setIsViewPopupOpen(!isViewPopupOpen);
  };

  const closeViewPopup = () => {
    setIsViewPopupOpen(false);
    setItemToView(null);
  };

  const handleAddAnnouncement = async (announcement) => {
    try {
      await addAnnouncement(announcement);
      refreshAnnouncements();
      closePopup();
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleUpdateAnnouncement = async (index, updatedAnnouncement) => {
    try {
      const id = announcements[index]._id;
      await updateAnnouncement(id, updatedAnnouncement);
      refreshAnnouncements();
      closePopup();
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleDeleteAnnouncement = async (index) => {
    try {
      await deleteAnnouncement(announcements[index]._id);
      refreshAnnouncements();
      closeDeletePopup();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleEdit = (index) => {
    setItemToEdit({ ...announcements[index], index });
    togglePopup();
  };

  const handleDelete = (index) => {
    setItemToDelete(index);
    toggleDeletePopup();
  };

  const handleView = (index) => {
    setItemToView(announcements[index]);
    toggleViewPopup();
  };

  const calculateTotalMembers = (announcement) => {
    const participants = announcements.filter(
      (resident) => resident.participatorId === announcement.participatorId && resident.status === "Done"
    );

    return participants.length;
  };

  return (
    <div className="financialNote h-full w-full">
      <div className="flex flex-col gap-[10px] p-5 bg-white rounded-2xl max-h-[904px]">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-wrapper-184">Announcement</div>
          <CustomButton
            text="Create Announcement"
            width=""
            onClick={togglePopup}
          />
        </div>
        <div className="flex flex-wrap gap-4 items-start mt-5 max-md:max-w-full max-h-full overflow-y-scroll">
          {announcements.length === 0 ? (
            <div className="text-center text-gray-500 font-bold p-4">
              Data not found
            </div>
          ) : (
            announcements.map((announcement, index) => (
              <div key={index} className="flex w-[370px]">
                <AnnouncementCard
                  {...announcement}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleDelete(index)}
                  onView={() => handleView(index)}
                  totalMembers={calculateTotalMembers(announcement)} // Pass total members
                />
              </div>
            ))
          )}
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <AddAnnouncement
              onClose={closePopup}
              onAdd={handleAddAnnouncement}
              onUpdate={handleUpdateAnnouncement}
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
              onDelete={() => handleDeleteAnnouncement(itemToDelete)}
            />
          </div>
        </div>
      )}
      {isViewPopupOpen && (
        <ViewAnnouncement announcement={itemToView} onClose={closeViewPopup} />
      )}
    </div>
  );
};

export default Announcement;