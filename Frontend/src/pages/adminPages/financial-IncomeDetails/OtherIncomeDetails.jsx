import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MemberListHeader from './MemberListHeader';
import MemberListItem from './MemberListItem';
import CustomButton from '../../../components/customButton/CustomButton';
import { fetchAnnouncements } from '../../../api/AnnouncementApi';

function OtherIncomeDetails() {
  const [members, setMembers] = useState([]);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { onView, tabState } = location.state || {}; 
  const participatorId = onView; 

  // console.log("TABBBBBBB:", tabState);
  

  useEffect(() => {
    if (!participatorId) {
      console.error("participatorId is missing or undefined");
      return;
    }
    fetchIncomes();
  }, [participatorId]);

  const fetchIncomes = async () => {
    try {
      console.log('Fetching incomes...');
      const data = await fetchAnnouncements();
      console.log('Announcements fetched:', data); // Debugging

      // Filter data and extract the title
      const filteredData = data.filter(
        (announcement) =>
          announcement.participatorId === participatorId &&
          announcement.status === 'Done'
      );

      if (filteredData.length > 0) {
        setAnnouncementTitle(filteredData[0].Announcement_title); // Set the title
      }

      console.log('Filtered data:', filteredData); // Debugging
      setMembers(filteredData);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const handleNavigate = () => {
    // navigate("/maintenanceDetail");
    navigate("/maintenanceDetail", { state: { tabState: tabState } });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-wrap gap-2 p-5 w-full h-full bg-white rounded-2xl max-md:max-w-full">
        <div className="flex flex-col grow shrink-0 basis-0 w-full max-md:max-w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="self-start my-auto text-xl font-semibold text-neutral-800 max-md:max-w-full">
              {announcementTitle} {/* Display the title here */}
            </h1>
            <CustomButton text='Back' onClick={handleNavigate} imageType='Back' width='100px' />
          </div>
          <MemberListHeader />
          <div className='h-[776px] overflow-scroll'>
            {members.map((member, index) => (
              <MemberListItem key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherIncomeDetails;