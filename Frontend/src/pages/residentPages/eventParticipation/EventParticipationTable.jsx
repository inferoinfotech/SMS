import React, { useState, useEffect } from 'react';
import ParticipatorHeader from './ParticipatorHeader';
import ParticipatedLogEntry from './ParticipatedLogEntry';
import { getAnnouncements } from '../../../api/AnnouncementApi';

function EventParticipationTable({ activeTab }) {
  const [eventData, setEventData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipatorData = async () => {
      try {
        const data = await getAnnouncements();
        const eventRecords = data.announcements.filter(record => record.Announcement_type === false && record.status === "Done");
        const activityRecords = data.announcements.filter(record => record.Announcement_type === true && record.status === "Done");
        setEventData(eventRecords);
        setActivityData(activityRecords);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchParticipatorData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const dataToDisplay = activeTab === "Owner" ? eventData : activityData;

  return (
    <div className="flex overflow-hidden h-full flex-wrap gap-2 pt-5 px-5 bg-white rounded-3xl rounded-tl-none">
      <div className="flex flex-col w-full h-full">
        <h1 className="self-start text-xl font-semibold text-neutral-800">
          {activeTab === "Owner" ? "Events Participation" : "Activities Participation"}
        </h1>
        <ParticipatorHeader />

        <div className="flex flex-col w-full h-[784px] overflow-y-scroll">
          {dataToDisplay.map((participator, index) => (
            <ParticipatedLogEntry
              key={index}
              name={participator.residentId.firstName + " " + participator.residentId.lastName}
              description={participator.description}
              time={new Date(participator.date).toLocaleTimeString()}
              date={new Date(participator.date).toLocaleDateString()}
              eventName={participator.Announcement_title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventParticipationTable;