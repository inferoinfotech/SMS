// src/components/securityProtocol/SecurityProtocolPopUp.jsx

import React, { useState, useEffect } from "react";
import "./style.css";
import images from "../../Images";
import {
  createSecurityProtocol,
  updateSecurityProtocol,
} from "../../api/securityProtocolsMnagementApi";
import CustomButton from "../customButton/CustomButton";

const SecurityProtocolPopUp = ({ onClose, onAdd, onUpdate, itemToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title || "");
      setDescription(itemToEdit.description || "");
      setDate(itemToEdit.date || "");

      const formattedTime = itemToEdit.time ? itemToEdit.time.slice(0, 5) : "";
      setTime(formattedTime);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setErrors({});
    }
  }, [itemToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const protocol = {
        title,
        description,
        date,
        time,
      };
      try {
        if (itemToEdit) {
          await updateSecurityProtocol(itemToEdit._id, protocol);
          onUpdate(itemToEdit.index, protocol);
        } else {
          await createSecurityProtocol(protocol);
          onAdd(protocol);
        }
        onClose();
      } catch (error) {
        console.error("Error:", error);
        // Handle error (e.g., show error message to the user)
      }
    }
  };

  return (
    <div className="element-security-protocol">
      <div className="frame-627">
        <div className="frame-628">
          <div className="frame-620">
            <div className="frame-629">
              <div className="text-wrapper-194">Security Protocol</div>
              <img className="line-111" alt="Line" src={images.line94} />
            </div>
            <form className="number-from" onSubmit={handleSubmit}>
              <div className="frame-626">
                <div className="input-field-39">
                  <p className="label-44">
                    <span className="text-wrapper-195">Title</span>
                    <span className="text-wrapper-196">*</span>
                  </p>
                  <input
                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-241 ${errors.title ? "error" : ""
                      }`}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                  />
                  {errors.title && (
                    <div className="incorrect-email error-false rupee-error-0-false undefined">
                      {errors.title}
                    </div>
                  )}
                </div>
                <div className="input-field-40">
                  <p className="label-44">
                    <span className="text-wrapper-195">Description</span>
                    <span className="text-wrapper-196">*</span>
                  </p>
                  <input
                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.description ? "error" : ""
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
                <div className="flex items-center w-full">
                  <div className="input-field-40 mr-5">
                    <p className="label-44">
                      <span className="text-wrapper-195">Date</span>
                      <span className="text-wrapper-196">*</span>
                    </p>
                    <input
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.date ? "error" : ""
                        }`}
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Enter Date"
                    />
                    {errors.date && (
                      <div className="incorrect-email error-false rupee-error-0-false undefined">
                        {errors.date}
                      </div>
                    )}
                  </div>
                  <div className="input-field-40">
                    <p className="label-44">
                      <span className="text-wrapper-195">Time</span>
                      <span className="text-wrapper-196">*</span>
                    </p>
                    <input
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.time ? "error" : ""
                        }`}
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Enter Time"
                    />
                    {errors.time && (
                      <div className="incorrect-email error-false rupee-error-0-false undefined">
                        {errors.time}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="frame-630">
                <button
                  type="button"
                  className="component hover-button-false border-button-true gray-button-false component-55"
                  onClick={onClose}
                >
                  <div className="buttons component-56">Cancel</div>
                </button>
                <CustomButton
                  text={itemToEdit ? "Update" : "Done"}
                  width="175px"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityProtocolPopUp;
