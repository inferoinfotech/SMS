import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MaintenanceHeader from './MaintenanceHeader';
import MaintenanceTable from './MaintenanceTable';
import OtherIncomeCards from '../financial-IncomeCardsScreen/OtherIncomeCards';
import EventParticipatorCards from '../financial-IncomeCardsScreen/EventParticipatorCards';
import ActivityParticipatorCards from '../financial-IncomeCardsScreen/ActivityParticipatorCards';

function MaintenanceDetail() {
  const [activeTab, setActiveTab] = useState('Maintenance');
  const location = useLocation();
  const { tabState } = location.state || {}; 
  

  useEffect(() => {
    if (tabState) {
      setActiveTab(tabState);
    }
  }, [tabState]);

  return (
    <div className="flex flex-col rounded-none h-full">
      {activeTab === 'Maintenance' && <MaintenanceHeader />}
      <div className="flex flex-col mt-5 w-full h-full max-md:max-w-full">
        <div className="flex md:flex-row flex-col items-center self-start text-sm font-semibold text-center">
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[135px] ${activeTab === 'Maintenance'
              ? 'text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]'
              : 'bg-white text-neutral-800'
              }`}
            style={{ borderBottom: '2px solid', borderImage: 'linear-gradient(to right, #FE512E, #F09619) 1' }}
            onClick={() => setActiveTab('Maintenance')}
          >
            Maintenance
          </button>
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[135px] ${activeTab === 'OtherIncome'
              ? 'text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]'
              : 'bg-white text-neutral-800'
              }`}
            style={{ borderBottom: '2px solid', borderImage: 'linear-gradient(to right, #FE512E, #F09619) 1' }}
            onClick={() => setActiveTab('OtherIncome')}
          >
            Other Income
          </button>
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[155px] ${activeTab === 'Event'
              ? 'text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]'
              : 'bg-white text-neutral-800'
              }`}
            style={{ borderBottom: '2px solid', borderImage: 'linear-gradient(to right, #FE512E, #F09619) 1' }}
            onClick={() => setActiveTab('Event')}
          >
            Event 
          </button>
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[235px] ${activeTab === 'Activity'
              ? 'text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]'
              : 'bg-white text-neutral-800'
              }`}
            style={{ borderBottom: '2px solid', borderImage: 'linear-gradient(to right, #FE512E, #F09619) 1' }}
            onClick={() => setActiveTab('Activity')}
          >
            Activity 
          </button>
        </div>
        {
          activeTab === 'Maintenance' &&
          <div className="flex flex-col p-5 h-[704px] w-full bg-white rounded-xl rounded-tl-none">
            {activeTab === 'Maintenance' && <MaintenanceTable />}
          </div>
        }
        {activeTab === 'OtherIncome' &&
          <div className="flex flex-col p-5 h-[704px] w-full bg-white rounded-xl rounded-tl-none">
            {activeTab === 'OtherIncome' && <OtherIncomeCards />}
          </div>
        }
        {activeTab === 'Event' &&
          <div className="flex flex-col p-5 h-[704px] w-full bg-white rounded-xl rounded-tl-none">
            {activeTab === 'Event' && <EventParticipatorCards />}
          </div>
        }
        {activeTab === 'Activity' &&
          <div className="flex flex-col p-5 h-[704px] w-full bg-white rounded-xl rounded-tl-none">
            {activeTab === 'Activity' && <ActivityParticipatorCards />}
          </div>
        }
      </div>
    </div>
  );
}

export default MaintenanceDetail;