// src/pages/residentPages/serviceAndComplaintScreen/ServiceAndComplaint.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

import ComplaintModal from "./ComplaintModal";
import ServiceAndComplaintCard from "./ServiceAndComplaintCard";
import RequestSubmitionCard from "./RequestSubmitionCard";
import RequestModal from "./RequestModal";

import CustomButton from "../../../components/customButton/CustomButton";
import {
  getComplaintsResident,
  createComplaintResident,
  deleteComplaintResident,
} from "../../../api/createComplaintApi";
import { createRequestComplaintResident, getRequestComplaintsResident } from "@/api/requestComplaintApi";

function ServiceAndComplaint() {
  const [activeTab, setActiveTab] = useState("complain");
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupRequestOpen, setIsPopupRequestOpen] = useState(false);
  const [servicesAndCom, setServicesAndCom] = useState([]);
  const [requestSubmition, setRequestSubmition] = useState([]);
  const [selectedServices, setSelectedServices] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleRequestPopup = () => {
    setIsPopupRequestOpen(!isPopupRequestOpen);
  };

  const closeRequestPopup = () => {
    setIsPopupRequestOpen(false);
    setSelectedRequest(null);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedServices(null);
  };

  const handleAddServices = async (newServicesAndCom) => {
    try {
      const response = await createComplaintResident(newServicesAndCom);
      setServicesAndCom([...servicesAndCom, response]);
      closePopup();
    } catch (error) {
      console.error("Error creating complaint:", error);
    }
  };

  const handleAddRequest = async () => {
    try {
      const response = await createRequestComplaintResident();
      setRequestSubmition([...requestSubmition, response]);
      closePopup();
    } catch (error) {
      console.error("Error creating complaint:", error);
    }
  };

  // const handleAddRequest = (newRequestData) => {
  //   if (selectedRequest) {
  //     // Update existing facility
  //     setRequestSubmition(
  //       requestSubmition.map((request) =>
  //         request.id === selectedRequest.id ? newRequestData : request
  //       )
  //     );
  //   } else {
  //     // Add new facility
  //     setRequestSubmition([
  //       ...requestSubmition,
  //       { ...newRequestData, id: requestSubmition.length + 1 },
  //     ]);
  //   }
  //   closePopup();
  // };

  const handleEditServices = (services) => {
    setSelectedServices(services);
    togglePopup();
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    togglePopup();
  };

  const handleDeleteComplaint = async (complaintId) => {
    console.log(complaintId,"complaintId");
    
    try {
      await deleteComplaintResident(complaintId);
      setServicesAndCom(
        servicesAndCom.filter((complaint) => complaint._id !== complaintId)
      );
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    console.log(requestId,"requestId");
    
    try {
      await deleteComplaintResident(requestId);
      setRequestSubmition(
        servicesAndCom.filter((complaint) => complaint._id !== requestId)
      );
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getComplaintsResident();
        console.log("KKKKKKKKKKKKKKKKKKKK: ",response);
        setServicesAndCom(response);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequestComplaintsResident();
        console.log("TTTTTTTTTTTTTTTTTT: ",response);
        setRequestSubmition(response.requests);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="service_com_management h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex md:flex-row flex-col items-start self-start text-sm font-semibold text-center w-full">
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] md:w-[183px] w-full ${
              activeTab === "complain"
                ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                : "bg-white text-neutral-800"
            }`}
            style={{
              borderBottom: "1px solid",
              borderImage: "linear-gradient(to right, #FE512E, #F09619) 1",
            }}
            onClick={() => setActiveTab("complain")}
          >
            Complaint Submission
          </button>
          <button
            className={`rounded-t-xl border-b-2 border-solid min-h-[57px] md:w-[183px] w-full ${
              activeTab === "request"
                ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                : "bg-white text-neutral-800"
            }`}
            style={{
              borderBottom: "2px solid",
              borderImage: "linear-gradient(to right, #FE512E, #F09619) 1",
            }}
            onClick={() => setActiveTab("request")}
          >
            Request Submission
          </button>
        </div>
        <div className="bg-white p-[20px] rounded-[15px]">
          {activeTab === "complain" ? (
            <>
              <div className="flex md:flex-row flex-col items-center justify-between font-semibold w-full">
                <h1 className="my-0 text-[20px] font-semibold text-[#202224] md:mb-0 mb-5">
                  Complaint
                </h1>
                <CustomButton
                  text="Create Complaint"
                  imageType=""
                  onClick={togglePopup}
                />
              </div>
              <div className="flex flex-wrap gap-4 items-start mt-5 max-md:max-w-full overflow-y-scroll">
                {/* {servicesAndCom.map((servicesCom) => (
                  <div key={servicesCom._id} className="flex services-card">
                    <ServiceAndComplaintCard
                      {...servicesCom}
                      onDelete={handleDeleteComplaint}
                      onEdit={() => handleEditServices(servicesCom)}
                    />
                  </div>
                ))} */}

                {servicesAndCom.length === 0 ? (
                  <div className="text-center text-gray-500 font-bold p-4">
                    Data not found
                  </div>
                ) : (
                  servicesAndCom.map((servicesCom, index) => (
                    <div key={servicesCom._id} className="flex services-card">
                      <ServiceAndComplaintCard
                        {...servicesCom}
                        onDelete={handleDeleteComplaint}
                        onEdit={() => handleEditServices(servicesCom)}
                      />
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div>
              <div className="flex md:flex-row flex-col items-center justify-between font-semibold w-full">
                <h1 className="my-0 text-[20px] font-semibold text-[#202224] md:mb-0 mb-5">
                  Request
                </h1>
                <CustomButton
                  text="Create Request"
                  imageType=""
                  onClick={toggleRequestPopup}
                />
              </div>
              <div className="flex flex-wrap gap-4 items-start mt-5 max-md:max-w-full overflow-y-scroll">
                {/* {requestSubmition.map((reqData) => (
                  <div key={reqData.id} className="flex services-card">
                    <RequestSubmitionCard
                      {...reqData}
                      onEdit={() => handleEditRequest(reqData)}
                    />
                  </div>
                ))} */}

                {requestSubmition.length === 0 ? (
                  <div className="text-center text-gray-500 font-bold p-4">
                    Data not found
                  </div>
                ) : (
                  requestSubmition.map((reqData, index) => (
                    <div key={reqData._id} className="flex services-card">
                      <RequestSubmitionCard
                        {...reqData}
                        onEdit={() => handleEditRequest(reqData)}
                        onDelete={handleDeleteRequest}
                      />
                    </div>
                  ))
                )}
              </div>
              {/* Add your request submission content here */}
            </div>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <ComplaintModal
              closePopup={closePopup}
              onSubmit={handleAddServices}
              services={selectedServices}
            />
          </div>
        </div>
      )}

      {isPopupRequestOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <RequestModal
              closeRequestPopup={closeRequestPopup}
              onSubmit={handleAddRequest}
              services={selectedRequest}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceAndComplaint;
