import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import EventParticipationTable from "./EventParticipationTable";

function EventParticipation() {
  const [activeTab, setActiveTab] = useState("Owner");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  return (
    <div className="service_com_management h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-start self-start text-sm font-semibold text-center">
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[183px] ${
              activeTab === "Owner"
                ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                : "bg-white text-neutral-800"
            }`}
            style={{
              borderBottom: "1px solid",
              borderImage: "linear-gradient(to right, #FE512E, #F09619) 1",
            }}
            onClick={() => setActiveTab("Owner")}
          >
            Event Participate
          </button>
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[183px] ${
              activeTab === "Tenant"
                ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                : "bg-white text-neutral-800"
            }`}
            style={{
              borderBottom: "2px solid",
              borderImage: "linear-gradient(to right, #FE512E, #F09619) 1",
            }}
            onClick={() => setActiveTab("Tenant")}
          >
            Activity Participate
          </button>
        </div>
        <EventParticipationTable activeTab={activeTab} />
      </div>
    </div>
  );
}

export default EventParticipation;
