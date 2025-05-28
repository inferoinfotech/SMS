// src/components/addFacility/AddFacility.jsx

import React, { useState, useEffect } from "react";
import "./style.css";
import CustomButton from "../customButton/CustomButton";
import images from "../../Images";
import { createFacility, updateFacility } from "../../api/facilityMnagementApi";

const AddFacility = ({ closePopup, onSubmit, facility, mode }) => {
  const [name, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceDate, setDate] = useState("");
  const [remindBeforeDate, setRemindBeforeDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (facility) {
      setTitle(facility.name);
      setDescription(facility.description);
      setDate(facility.serviceDate || "");
      setRemindBeforeDate(facility.remindBeforeDate || "");
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setRemindBeforeDate("");
    }
  }, [facility]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!serviceDate) newErrors.date = "Date is required";
    if (!remindBeforeDate)
      newErrors.remindBeforeDate = "Remind Before Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facilityData = { name, description, serviceDate, remindBeforeDate };
    if (validateForm()) {
      try {
        if (mode === "add") {
          await createFacility(facilityData);
        } else {
          await updateFacility(facility._id, facilityData);
        }
        onSubmit(facilityData);
        closePopup();
      } catch (error) {
        console.error("Error submitting facility:", error);
      }
    }
  };

  return (
    <div className="element-add-facility-screen">
      <div className="frame-627">
        <div className="frame-628">
          <div className="frame-620">
            <div className="frame-629">
              <div className="text-wrapper-194">
                {mode === "add" ? "Create Facility" : "Edit Facility"}
              </div>
              <img className="line-111" alt="Line" src={images.line94} />
            </div>
            <div className="frame-626">
              <div className="input-field-39">
                <p className="label-44">
                  <span className="text-wrapper-195">Facility Name</span>
                  <span className="text-wrapper-196">*</span>
                </p>
                <input
                  className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-241 ${
                    errors.name ? "error" : ""
                  }`}
                  type="text"
                  value={name}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
                {errors.name && (
                  <div className="incorrect-email error-false rupee-error-0-false undefined">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="input-field-40">
                <p className="label-44">
                  <span className="text-wrapper-195">Description</span>
                  <span className="text-wrapper-196">*</span>
                </p>
                <input
                  className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${
                    errors.description ? "error" : ""
                  }`}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                />
                {errors.description && (
                  <div className="incorrect-email error-false rupee-error-0-false undefined">
                    {errors.description}
                  </div>
                )}
              </div>
              <div className="input-field-39 mt-4">
                <p className="label-44">
                  <span className="text-wrapper-195">
                    Schedule Service Date
                  </span>
                  <span className="text-wrapper-196">*</span>
                </p>
                <input
                  className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-241 ${
                    errors.date ? "error" : ""
                  }`}
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Select Date"
                />
                {errors.date && (
                  <div className="incorrect-email error-false rupee-error-0-false undefined">
                    {errors.serviceDate}
                  </div>
                )}
              </div>
              <div className="w-full">
                <p className="label-34 mb-2">
                  <span className="text-wrapper-125">Remind Before</span>
                </p>
                <select
                  name="remindBefore"
                  id="remindBefore"
                  value={remindBeforeDate}
                  onChange={(e) => setRemindBeforeDate(e.target.value)}
                  className="custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-103"
                >
                  <option value="">Select Day</option>
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                </select>
              </div>
            </div>
            <div className="frame-630">
              <button
                type="button"
                className="component hover-button-false border-button-true gray-button-false component-55"
                onClick={closePopup}
              >
                <div className="buttons component-56">Cancel</div>
              </button>
              <CustomButton text="Save" width="190px" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;
