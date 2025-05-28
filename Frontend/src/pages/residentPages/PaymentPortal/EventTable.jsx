import React, { useState, useEffect } from "react";
import images from "@/Images";
import { getCompletedAnnouncements } from "../../../api/AnnouncementApi";
import EventModal from "./EventModal";

const EventTable = () => {
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // useEffect(() => {
  //   const fetchCompletedAnnouncements = async () => {
  //     try {
  //       const data = await getCompletedAnnouncements();
  //       console.log("Fetched Announcements:", data); // Log the response to check the data
  //       setEvents(data.announcements || []); // Update to handle 'announcements' key
  //     } catch (error) {
  //       console.error("Error fetching completed announcement records:", error);
  //     } finally {
  //       setIsLoading(false); // Set loading to false after fetching
  //     }
  //   };

  //   fetchCompletedAnnouncements();
  // }, []);

  useEffect(() => {
    const fetchCompletedAnnouncements = async () => {
      try {
        const data = await getCompletedAnnouncements();
        console.log("Fetched Announcements:", data); // Log the response to check the data

        const residentId = localStorage.getItem("residentId"); // Get residentId from localStorage

        // Filter events for matching residentId and status 'Done'
        const filteredData = (data.announcements || []).filter(
          (event) => event.residentId._id === residentId && event.status === "Done"
        );

        setEvents(data.announcements || []);
        setFilteredEvents(filteredData);
      } catch (error) {
        console.error("Error fetching completed announcement records:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchCompletedAnnouncements();
  }, []);

  const handleViewEvent = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filter events to include only those with an invoiceId
  // const filteredEvents = events.filter((event) => event.invoiceId);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="flex flex-col max-md:max-w-full">
      {/* Header */}
      <div className="flex flex-col max-w-full w-full">
        <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full">
          <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-2xl max-md:pr-5 max-md:max-w-full">
            <div className="sm:min-w-[100px] shrink-0 grow-0">Invoice ID</div>
            <div className="sm:w-[595px] grow w-full text-center">Event Name</div>
            <div className="sm:w-[250px] shrink-0 grow-0 w-full text-center">Event Due Date</div>
            <div className="sm:w-[250px] shrink-0 grow-0 w-full text-center">Date</div>
            <div className="sm:w-[250px] shrink-0 grow-0 w-full text-center">Amount</div>
            <div className="sm:w-[100px] shrink-0 grow-0 w-full text-center">Action</div>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="w-full bg-white rounded-b-2xl h-[847px]">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="flex justify-between items-center px-5 py-4 w-full bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full"
            >
              <div className="sm:min-w-[100px] flex shrink-0 grow-0 gap-2.5 items-center text-[16px] font-medium text-[#4F4F4F]">
                {event.invoiceId || "N/A"}
              </div>
              <div className="sm:w-[595px] flex grow items-center justify-center text-[16px] font-medium text-[#4F4F4F]">
                {event.Announcement_title}
              </div>
              <div className="min-w-[250px] flex shrink-0 grow-0 gap-2.5 items-center justify-center text-[16px] font-medium text-[#4F4F4F]">
                {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
              </div>
              <div className="sm:w-[250px] flex shrink-0 grow-0 items-center justify-center text-[16px] font-medium text-[#4F4F4F]">
                {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : "N/A"}
              </div>
              <div className="sm:w-[250px] flex shrink-0 grow-0 items-center justify-center text-[16px] font-medium text-[#39973D]">
                {event.amount}
              </div>
              <div className="sm:w-[100px] flex shrink-0 grow-0 items-center justify-center">
                <button onClick={() => handleViewEvent(event._id)}>
                  <img src={images.viewIcon} alt="View" className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-[16px] font-medium text-[#4F4F4F] py-4">
            No events found
          </div>
        )}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <EventModal eventId={selectedEvent?._id} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EventTable;