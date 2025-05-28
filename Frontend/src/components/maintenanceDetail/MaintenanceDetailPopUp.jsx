import React, { useState, useEffect } from "react";
import "./style.css";
import CustomButton from "../customButton/CustomButton";
import images from "../../Images";
import { createMaintenance } from "../../api/maintenanceApi"; // Import the API function

const MaintenanceDetailPopUp = ({ income, onMainClose, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    totalMembers: "",
    date: "",
    dueDate: "",
    description: "",
    penaltyAmount: "",
    maintenanceType: "",
  });

  useEffect(() => {
    if (income) {
      setFormData(income);
    }
  }, [income]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    // Allow only numbers and empty string
    if (value === "" || /^[0-9]*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const maintenanceData = {
        maintenanceAmount: formData.amount,
        penaltyAmount: formData.penaltyAmount,
        maintenanceDueDate: formData.date,
        penaltyAppliedAfterDays: formData.maintenanceType,
      };
      const response = await createMaintenance(maintenanceData);
      console.log("response", response);
      onMainClose();
      // onCancel();
      if (response.success) {
        alert("Maintenance created successfully");
      }
    } catch (error) {
      console.error("Error creating maintenance:", error);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]"
      onClick={onMainClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={handleClick}
      >
        <div className="text-[20px] font-semibold mb-4">
          Add Maintenance Detail
        </div>
        <div className="border-b border-gray-200 mb-4"></div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Amount
            </label>
            <div className="flex items-center border border-[#D3D3D3] border-solid rounded-[10px] p-2">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2498 4.53117C16.1647 4.44594 16.0558 4.40341 15.9233 4.40341H13.4944C13.3333 3.61768 13.0303 2.93564 12.5853 2.35802H15.8948C16.0275 2.35802 16.1362 2.31543 16.2216 2.23041C16.3064 2.14523 16.349 2.03623 16.349 1.90369V0.45453C16.349 0.321893 16.3064 0.213086 16.2216 0.127812C16.1361 0.0427369 16.0274 3.77423e-07 15.8947 3.77423e-07H4.07669C3.94405 3.77423e-07 3.83509 0.0427369 3.74997 0.127762C3.66494 0.213036 3.62221 0.321843 3.62221 0.45448V2.34364C3.62221 2.46673 3.66718 2.57325 3.75713 2.6632C3.84708 2.75315 3.9536 2.79812 4.07669 2.79812H6.13635C8.13432 2.79812 9.40328 3.333 9.94298 4.40316H4.07669C3.94405 4.40316 3.83509 4.44569 3.74997 4.53092C3.66494 4.61624 3.62221 4.725 3.62221 4.85764V6.3066C3.62221 6.43914 3.66474 6.54809 3.74997 6.63312C3.83524 6.71844 3.94425 6.76088 4.07669 6.76088H10.1421C9.93378 7.5376 9.4484 8.12934 8.68601 8.53656C7.92357 8.94383 6.91765 9.14746 5.66759 9.14746H4.07669C3.9536 9.14746 3.84708 9.19248 3.75713 9.28238C3.66713 9.37239 3.62221 9.47895 3.62221 9.60194V11.4061C3.62221 11.5294 3.66474 11.6335 3.74997 11.7186C5.56804 13.6504 7.92606 16.3537 10.8237 19.8294C10.9091 19.9431 11.0274 19.9998 11.1789 19.9998H13.9487C14.1477 19.9998 14.2851 19.9148 14.3607 19.744C14.4553 19.5736 14.4368 19.4126 14.3038 19.261C11.539 15.8708 9.36557 13.333 7.78412 11.6475C9.39398 11.4581 10.7008 10.9372 11.7046 10.0851C12.7083 9.23288 13.319 8.12472 13.537 6.76113H15.9233C16.0558 6.76113 16.1648 6.71864 16.2498 6.63337C16.3352 6.54834 16.3778 6.43939 16.3778 6.30685V4.85803C16.3778 4.72525 16.3352 4.61644 16.2498 4.53117Z"
                  fill="#202224"
                />
              </svg>
              <input
                className="w-full"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                onInput={handleNumberInput}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Penalty Amount
            </label>
            <div className="flex items-center border border-[#D3D3D3] border-solid rounded-[10px] p-2">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2498 4.53117C16.1647 4.44594 16.0558 4.40341 15.9233 4.40341H13.4944C13.3333 3.61768 13.0303 2.93564 12.5853 2.35802H15.8948C16.0275 2.35802 16.1362 2.31543 16.2216 2.23041C16.3064 2.14523 16.349 2.03623 16.349 1.90369V0.45453C16.349 0.321893 16.3064 0.213086 16.2216 0.127812C16.1361 0.0427369 16.0274 3.77423e-07 15.8947 3.77423e-07H4.07669C3.94405 3.77423e-07 3.83509 0.0427369 3.74997 0.127762C3.66494 0.213036 3.62221 0.321843 3.62221 0.45448V2.34364C3.62221 2.46673 3.66718 2.57325 3.75713 2.6632C3.84708 2.75315 3.9536 2.79812 4.07669 2.79812H6.13635C8.13432 2.79812 9.40328 3.333 9.94298 4.40316H4.07669C3.94405 4.40316 3.83509 4.44569 3.74997 4.53092C3.66494 4.61624 3.62221 4.725 3.62221 4.85764V6.3066C3.62221 6.43914 3.66474 6.54809 3.74997 6.63312C3.83524 6.71844 3.94425 6.76088 4.07669 6.76088H10.1421C9.93378 7.5376 9.4484 8.12934 8.68601 8.53656C7.92357 8.94383 6.91765 9.14746 5.66759 9.14746H4.07669C3.9536 9.14746 3.84708 9.19248 3.75713 9.28238C3.66713 9.37239 3.62221 9.47895 3.62221 9.60194V11.4061C3.62221 11.5294 3.66474 11.6335 3.74997 11.7186C5.56804 13.6504 7.92606 16.3537 10.8237 19.8294C10.9091 19.9431 11.0274 19.9998 11.1789 19.9998H13.9487C14.1477 19.9998 14.2851 19.9148 14.3607 19.744C14.4553 19.5736 14.4368 19.4126 14.3038 19.261C11.539 15.8708 9.36557 13.333 7.78412 11.6475C9.39398 11.4581 10.7008 10.9372 11.7046 10.0851C12.7083 9.23288 13.319 8.12472 13.537 6.76113H15.9233C16.0558 6.76113 16.1648 6.71864 16.2498 6.63337C16.3352 6.54834 16.3778 6.43939 16.3778 6.30685V4.85803C16.3778 4.72525 16.3352 4.61644 16.2498 4.53117Z"
                  fill="#202224"
                />
              </svg>
              <input
                className="w-full"
                type="number"
                name="penaltyAmount"
                value={formData.penaltyAmount}
                onInput={handleNumberInput} // Use only onInput for validation
              />
            </div>
          </div>
        </div>
        <div className="my-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maintenance Due Date
          </label>
          <input
            className="border border-[#D3D3D3] border-solid rounded-[10px] p-2 w-full"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Penalty Applied After Day Selection
          </label>
          <select
            className="border border-[#D3D3D3] border-solid rounded-[10px] p-2 w-full"
            name="maintenanceType"
            value={formData.maintenanceType}
            onChange={handleChange}
          >
            <option value="">Select Penalty Applied After Day Selection</option>
            {[...Array(10).keys()].map((day) => (
              <option key={day + 1} value={day + 1}>
                Day {day + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex items-center justify-end space-x-4 w-full">
          <button
            className="p-3 bg-white border border-[#D3D3D3] rounded-[10px] w-full"
            onClick={onMainClose}
          >
            Cancel
          </button>
          <CustomButton text="Apply" width={"100%"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetailPopUp;