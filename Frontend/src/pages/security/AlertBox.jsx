import React, { useState } from "react";
import { createAlert } from "../../api/alertApi"; // Import the createAlert function

const AlertBox = () => {
  const [alertType, setAlertType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({}); // State for error messages

  const validateForm = () => {
    const newErrors = {};
    if (!alertType) {
      newErrors.alertType = "Alert type is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If form is valid, proceed with form submission
      const alertData = {
        alertType,
        description,
      };

      try {
        const response = await createAlert(alertData);
        console.log("Alert created successfully:", response);
        // Optionally, you can add a success message or redirect the user
      } catch (error) {
        console.error("Error creating alert:", error);
        // Handle the error, e.g., show an error message to the user
      }
    }
  };

  // Determine if the Submit button should be enabled
  const isSubmitDisabled = !alertType || !description.trim();

  return (
    <div
      className="flex justify-center items-center relative top-52"
      role="alert"
    >
      <div className="bg-white rounded-[15px] shadow-md p-10 w-2/6">
        <h2 className="text-2xl font-semibold mb-5">Alert</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <label
              htmlFor="alertType"
              className="block text-sm font-medium text-gray-800"
            >
              Alert Type<span className="text-red-500">*</span>
            </label>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className="block w-full mt-2 p-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-gray-100 focus:border-orange-500 sm:text-sm"
            >
              <option>Select Alert</option>
              <option value="Fire">Fire</option>
              <option value="Medical">Medical</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </select>
            {errors.alertType && (
              <p className="text-red-500 text-sm">{errors.alertType}</p>
            )}
          </div>
          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-800"
            >
              Description<span className="text-red-500">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-gray-100 focus:border-orange-500 sm:text-sm rounded-[10px]"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#F6F8FB] hover:bg-gradient-to-r from-[#fe512e] to-[#f09619] text-[#202224] hover:text-white font-semibold py-2 px-4 w-full rounded-[10px] cursor-pointer"
            disabled={isSubmitDisabled}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlertBox;