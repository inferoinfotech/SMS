import WingSelectBox from "@/components/WingSelectBox/WingSelectBox";
import React, { useEffect, useState } from "react";
import { createRequestComplaintResident } from "../../../api/requestComplaintApi";

const RequestModal = ({ closeRequestPopup, onSubmit, services }) => {
  const [requesterName, setRequesterName] = useState("");
  const [requestName, setRequestName] = useState("");
  const [date, setReqDate] = useState("");
  const [wing, setWing] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("open"); // Default status is "Open"
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false); // To check if it's an edit operation

  useEffect(() => {
    if (services) {
      setRequesterName(services.requesterName);
      setRequestName(services.requestName);
      setReqDate(services.date);
      setWing(services.wing);
      setUnit(services.unit);
      setPriority(services.priority);
      setStatus(services.status);
      setDescription(services.description);
      setIsEditing(true); // Set to true if editing an existing request
    } else {
      setRequesterName("");
      setRequestName("");
      setReqDate("");
      setWing("");
      setUnit("");
      setPriority("");
      setStatus("open"); // Default status for new requests
      setDescription("");
      setIsEditing(false); // Set to false if creating a new request
    }
  }, [services]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const complaintRequestSubData = {
        requesterName,
        requestName,
        date,
        wing,
        unit,
        priority: capitalizeFirstLetter(priority), // Capitalize priority
        status: capitalizeFirstLetter(status), // Capitalize status
        description,
      };
      const response = await createRequestComplaintResident(
        complaintRequestSubData
      );
      onSubmit(response);
      closeRequestPopup();
    } catch (error) {
      console.error("Error creating request complaint:", error);
    }
  };

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-[20px] font-semibold mb-4 border-b border-solid border-[#F4F4F4] pb-3">
          {isEditing ? "Edit Request" : "Create Request"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="requesterName"
              className="block text-sm font-medium mb-2"
            >
              Requester Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="requesterName"
              placeholder="Enter Name"
              value={requesterName}
              onChange={(e) => setRequesterName(e.target.value)}
              className="border rounded-[10px] px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="requestName"
              className="block text-sm font-medium mb-2"
            >
              Request Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="requestName"
              placeholder="Enter Name"
              value={requestName}
              onChange={(e) => setRequestName(e.target.value)}
              className="border rounded-[10px] px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-[10px] px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Request Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setReqDate(e.target.value)}
              className="border rounded-[10px] px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
            <WingSelectBox value={wing} onChange={setWing} />
            <div>
              <label htmlFor="unit" className="block text-sm font-medium mb-2">
                Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="unit"
                value={unit}
                placeholder="Enter Unit"
                onChange={(e) => setUnit(e.target.value)}
                className="border rounded-[10px] px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Priority <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center w-full">
              <label className="mr-2 flex items-center bg-white w-full shadow-sm border border-solid border-[#D3D3D3] px-3 py-2 rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === "high"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                High
              </label>
              <label className="mr-2 flex items-center bg-white w-full shadow-sm border border-solid border-[#D3D3D3] px-3 py-2 rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                Medium
              </label>
              <label className="flex items-center bg-white w-full shadow-sm border border-solid border-[#D3D3D3] px-3 py-2 rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === "low"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                Low
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center w-full">
              <label className="mr-2 flex items-center bg-white w-full shadow-sm border border-solid border-[#D3D3D3] px-3 py-2 rounded-[10px]">
                <input
                  type="radio"
                  name="status"
                  value="open"
                  checked={status === "open"}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={!isEditing} // Disable during creation
                />
                Open
              </label>
              <label className="mr-2 flex items-center bg-white w-full shadow-sm border border-solid border-[#D3D3D3] px-3 py-2 rounded-[10px]">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  checked={status === "pending"}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={!isEditing} // Disable during creation
                />
                Pending
              </label>
              <label className="flex items-center bg-white w-full shadow-sm border border-solid border-[#D3D3D3] px-3 py-2 rounded-[10px]">
                <input
                  type="radio"
                  name="status"
                  value="solved"
                  checked={status === "solved"}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={!isEditing} // Disable during creation
                />
                Solved
              </label>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <button
              className="bg-transparent border border-solid border-[#D3D3D3] text-[#202224] font-medium py-3 px-3 rounded-[10px] mr-2 w-full"
              type="button"
              onClick={closeRequestPopup}
            >
              Cancel
            </button>
            <button
              className="bg-[#F6F8FB] hover:bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] text-[#202224] hover:text-white font-medium py-2 px-4 rounded-[10px] w-full"
              type="submit"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;