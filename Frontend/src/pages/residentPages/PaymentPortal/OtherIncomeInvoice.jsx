import React, { useState, useEffect } from "react";
import DueEventPaymentCard from "./DueEventPaymentCard";
import EventModal from "./EventModal";
import DueActivityPaymentCard from "./DueActivityPaymentCard";
import ActivityModal from "./ActivityModal";
import { useLocation, useNavigate } from "react-router-dom";
import { getsingleuserAnnouncement } from "../../../api/AnnouncementApi";

const OtherIncomeInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getsingleuserAnnouncement();
        if (data && data.announcements) {
          setMaintenanceData(data.announcements);
          console.log("Fetched announcements:", data.announcements);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, [refreshKey]);

  const refreshAnnouncements = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleViewEventTable = () => {
    navigate("/resident/event-table");
  };

  const handleViewEventInvoice = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleViewActivityInvoice = (event) => {
    setSelectedActivity(event);
    setIsActivityModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refreshAnnouncements();
  };

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false);
    refreshAnnouncements();
  };

  const eventData = React.useMemo(() => 
    maintenanceData.filter((maintenance) => maintenance.Announcement_type === true),
    [maintenanceData]
  );

  const activityData = React.useMemo(() => 
    maintenanceData.filter((maintenance) => maintenance.Announcement_type === false),
    [maintenanceData]
  );

  return (
    <section className="flex overflow-hidden flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
      <div className="flex flex-col max-md:max-w-full w-full">
        <div>
          <div className="flex items-start self-start text-sm font-semibold text-center whitespace-nowrap mb-4">
            <button
              className={`gap-2.5 px-2.5 py-3.5 rounded-xl rounded-b-none border-b-2 border-solid min-h-[49px] w-[135px] ${
                activeTab === "events"
                  ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] border-b-red-500"
                  : "bg-white text-neutral-800 border-b-red-500"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Event Invoice
            </button>
            <button
              className={`gap-2.5 px-2.5 py-3.5 rounded-xl rounded-b-none border-b-2 border-solid min-h-[49px] w-[135px] ${
                activeTab === "activity"
                  ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] border-b-red-500"
                  : "bg-white text-neutral-800 border-b-red-500"
              }`}
              onClick={() => setActiveTab("activity")}
            >
              Activity Invoice
            </button>
          </div>
        </div>
        {activeTab === "events" && (
          <>
            <div>
              <div className="flex md:flex-row flex-col items-center justify-between w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Event Payment
                </h2>
                <button
                  onClick={handleViewEventTable}
                  className="gap-2.5 px-2.5 py-3.5 rounded-xl min-h-[49px] w-[135px] text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                >
                  View Invoice
                </button>
              </div>
              <div className="flex flex-wrap justify-start gap-5 mt-4 w-full">
                {eventData.length > 0 ? (
                  eventData.map((maintenance, index) => (
                    <DueEventPaymentCard
                      key={index}
                      status={maintenance.status}
                      member={maintenance.residentId.members.length}
                      amount={maintenance.amount}
                      eventDate={maintenance.date}
                      date={maintenance.createdAt}
                      eventName={maintenance.Announcement_title}
                      descriptions={maintenance.description}
                      isDue={maintenance.status === "Pending"}
                      _id={maintenance._id}
                    />
                  ))
                ) : (
                  <p className="text-neutral-600">No Due Event Payment</p>
                )}
              </div>

              {isModalOpen && (
                <EventModal event={selectedEvent} onClose={handleCloseModal} />
              )}
            </div>
          </>
        )}

        {activeTab === "activity" && (
          <>
            <div>
              <div className="flex md:flex-row flex-col items-center justify-between w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Activity Payment
                </h2>
                <button
                  onClick={handleViewEventTable}
                  className="gap-2.5 px-2.5 py-3.5 rounded-xl min-h-[49px] w-[135px] text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                >
                  View Invoice
                </button>
              </div>
              <div className="flex flex-wrap justify-start gap-5 mt-4 w-full">
                {activityData.length > 0 ? (
                  activityData.map((maintenance, index) => (
                    <DueActivityPaymentCard
                      key={index}
                      status={maintenance.status}
                      member={maintenance.residentId.members.length}
                      amount={maintenance.amount}
                      activityDate={maintenance.date}
                      date={maintenance.createdAt}
                      activityName={maintenance.Announcement_title}
                      descriptions={maintenance.description}
                      isDue={maintenance.status === "Pending"}
                      _id={maintenance._id}
                    />
                  ))
                ) : (
                  <p className="text-neutral-600">No Due Activity Payment</p>
                )}
              </div>
              {isActivityModalOpen && (
                <ActivityModal
                  event={selectedActivity}
                  onClose={handleCloseActivityModal}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default OtherIncomeInvoice;