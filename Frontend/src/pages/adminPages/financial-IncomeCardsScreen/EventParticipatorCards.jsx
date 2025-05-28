import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import EditEventModal from "./EditEventModal";
import { fetchAnnouncements, updateAnnouncement, deleteAnnouncement } from "../../../api/AnnouncementApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const EventParticipatorCards = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await fetchAnnouncements();
      const eventData = data
        .filter((announcement) => announcement.Announcement_type) // Filter events
        .map((event) => ({
          ...event,
          date: formatDate(event.date),
          createdAt: formatDate(event.createdAt),
          totalMembers: calculateTotalMembers(event), // Calculate total members
        }));

      const uniqueEvents = eventData.filter((event, index, self) =>
        index === self.findIndex(t => t.participatorId === event.participatorId)
      );

      setEvents(uniqueEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const calculateTotalMembers = (event) => {
    // Check if the status is "Done" before counting members
    if (event.status === "Done") {
      return event.residentId.members.length + 1; // +1 for the resident themselves
    }
    return 0; // Return 0 if status is not "Done"
  };

  const handleOpenPopup = (event = null) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setShowPopup(false);
  };

  const handleSave = async (event) => {
    try {
      if (selectedEvent) {
        const updatedEvent = await updateAnnouncement(selectedEvent._id, {
          Announcement_title: event.title,
          amount: event.amount,
          totalMembers: event.totalMembers,
          date: event.date,
          dueDate: event.dueDate,
          description: event.description,
        });
        setEvents(
          events.map((evt) => (evt._id === selectedEvent._id ? updatedEvent : evt))
        );
      } else {
        setEvents([...events, { ...event, _id: events.length + 1 }]);
      }
      handleClosePopup();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
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
            <div className="text-wrapper-184 mt-5 mb-3">Event </div>
            {showPopup && (
              <div className="popup-overlay">
                <EditEventModal
                  event={selectedEvent}
                  onCancel={handleClosePopup}
                  onSave={handleSave}
                />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 items-start mt-5 max-md:max-w-full h-[614px] overflow-y-scroll">
            {events.length === 0 ? (
              <div className="text-center text-gray-500 font-bold p-4">
                Data not found
              </div>
            ) : (
              events.map((event, index) => (
                <div key={index} className="flex income-card">
                  <EventCard
                    {...event}
                    onEdit={() => handleOpenPopup(event)}
                    onDelete={() => handleDelete(event._id)}
                    onView= {event.participatorId} 
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

export default EventParticipatorCards;