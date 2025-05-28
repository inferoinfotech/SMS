import React, { useState } from "react";
import VisitorTrackingTable from "./VisitorTrackingTable";
import CustomButton from "@/components/customButton/CustomButton";
import AddVisitorDetailsModal from "./AddVisitorDetailsModal";
import { createVisitorLogs } from "../../api/visitorLogApi"; // Import the API function

export default function VisitortrackingScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    visitorName: "",
    wing: "",
    unit: "",
    date: "",
    time: "",
    number:"",
  });
  const [errors, setErrors] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.visitorName.trim()) {
      newErrors.visitorName = "Visitor Name is required.";
    }
    if (!formData.wing.trim()) {
      newErrors.wing = "Wing is required.";
    }
    if (!formData.unit.trim()) {
      newErrors.unit = "Unit is required.";
    }
    if (!formData.date) {
      newErrors.date = "Date is required.";
    }
    if (!formData.time) {
      newErrors.time = "Time is required.";
    }
    if (!formData.number) {
      newErrors.number = "number is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const visitorData = {
        name: formData.visitorName,
        wing: formData.wing,
        unitNumber: formData.unit,
        date: formData.date,
        time: formData.time,
        number:formData.number,
      };

      try {
        const newVisitor = await createVisitorLogs(visitorData);
        // Handle successful submission (e.g., update state or show success message)
        console.log("Visitor created:", newVisitor);
        closeModal(); // Close the dialog after successful submission
      } catch (error) {
        console.error("Error creating visitor log:", error);
        // Handle error (e.g., show error message to the user)
      }
    }
  };

  return (
    <div className="mx-auto p-5 w-full bg-white rounded-2xl max-md:max-w-full">
      <div>
        <div className="flex md:flex-row flex-col items-center justify-between">
          <h1 className="text-2xl font-bold md:mb-0 mb-4">Visitor Tracking</h1>
          <div className="flex md:flex-row flex-col items-center">
            <select
              id="week"
              className="mt-1 block pl-3 pr-4 py-3 font-medium text-base border border-[#D3D3D3] rounded-[10px] focus:outline-none focus:ring-[#D3D3D3] focus:border-[#D3D3D3] sm:text-sm mr-5 md:mb-0 mb-4"
            >
              <option value="Week">Week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
            <div className="md:mb-0 mb-4">
              <CustomButton
                text="Add Visitor details"
                onClick={openModal}
                imageType="Add"
                width="250px"
                type="submit"
              />
            </div>
          </div>
        </div>
        <VisitorTrackingTable />
      </div>
      {/* Modal */}
      <AddVisitorDetailsModal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 border-b border-solid border-[#F4F4F4] pb-2">
          Add Visitor Details.
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="visitorName"
            >
              Visitor Name <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="visitorName"
              name="visitorName"
              type="text"
              placeholder="Enter Name"
              value={formData.visitorName}
              onChange={handleChange}
            />
            {errors.visitorName && (
              <p className="text-red-500 text-sm">{errors.visitorName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="number"
              name="number"
              type="number"
              placeholder="Enter number"
              value={formData.number}
              onChange={handleChange}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="mb-4 mr-5">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="wing"
              >
                Wing <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="wing"
                name="wing"
                type="text"
                placeholder="Enter Wing"
                value={formData.wing}
                onChange={handleChange}
              />
              {errors.wing && (
                <p className="text-red-500 text-sm">{errors.wing}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="unit"
              >
                Unit <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="unit"
                name="unit"
                type="text"
                placeholder="Enter Unit"
                value={formData.unit}
                onChange={handleChange}
              />
              {errors.unit && (
                <p className="text-red-500 text-sm">{errors.unit}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="mb-4 mr-5 w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="date"
              >
                Date <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="time"
              >
                Time <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-3 border border-solid border-[#D3D3D3] text-gray-600 rounded-[10px] w-full mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-[10px] w-full"
            >
              Save
            </button>
          </div>
        </form>
      </AddVisitorDetailsModal>
    </div>
  );
}