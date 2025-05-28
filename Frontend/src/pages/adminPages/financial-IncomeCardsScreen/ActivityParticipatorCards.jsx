import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import EditActivityModal from "./EditActivityModal";
import { fetchAnnouncements, updateAnnouncement, deleteAnnouncement } from "../../../api/AnnouncementApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ActivityParticipatorCards = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await fetchAnnouncements();
      const activityData = data
        .filter((announcement) => !announcement.Announcement_type)
        .map((activity) => ({
          ...activity,
          date: formatDate(activity.date),
          createdAt: formatDate(activity.createdAt),
          totalMembers: calculateTotalMembers(activity), // Calculate total members
        }));
      const uniqueActivities = activityData.filter((activity, index, self) =>
        index === self.findIndex(t => t.participatorId === activity.participatorId)
      );

      setActivities(uniqueActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const calculateTotalMembers = (activity) => {
    // Check if the status is "Done" before counting members
    if (activity.status === "Done") {
      return activity.residentId.members.length + 1; // +1 for the resident themselves
    }
    return 0; // Return 0 if status is not "Done"
  };

  const handleOpenPopup = (activity = null) => {
    setSelectedActivity(activity);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedActivity(null);
    setShowPopup(false);
  };

  const handleSave = async (activity) => {
    try {
      if (selectedActivity) {
        const updatedActivity = await updateAnnouncement(selectedActivity._id, {
          Announcement_title: activity.title,
          amount: activity.amount,
          totalMembers: activity.totalMembers,
          date: activity.date,
          dueDate: activity.dueDate,
          description: activity.description,
        });
        setActivities(
          activities.map((act) =>
            act._id === selectedActivity._id ? updatedActivity : act
          )
        );
      } else {
        setActivities([
          ...activities,
          { ...activity, _id: activities.length + 1 },
        ]);
      }
      handleClosePopup();
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleView = (participatorId) => {
    navigate(`/otherIncomeDetails/${participatorId}`, { state: { participatorId } });
  };

  return (
    <div className="otherIncome">
      <div className="frame-577">
        <div className="frame-578">
          <div className="frame-579 flex-col sm:flex-row">
            <div className="text-wrapper-184 mt-5 mb-3">Activity </div>
            {showPopup && (
              <div className="popup-overlay">
                <EditActivityModal
                  activity={selectedActivity}
                  onCancel={handleClosePopup}
                  onSave={handleSave}
                />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 items-start mt-5 max-md:max-w-full h-[614px] overflow-y-scroll">
            {activities.length === 0 ? (
              <div className="text-center text-gray-500 font-bold p-4">
                Data not found
              </div>
            ) : (
              activities.map((activity, index) => (
                <div key={index} className="flex income-card">
                  <ActivityCard
                    {...activity}
                    onEdit={() => handleOpenPopup(activity)}
                    onDelete={() => handleDelete(activity._id)}
                    onView= {activity.participatorId} 
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityParticipatorCards;