import React, { useState, useEffect } from "react";
import "./style.css";
import images from "../../Images";
import CustomButton from "../customButton/CustomButton";

const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AddAnnouncement = ({ onClose, onAdd, onUpdate, itemToEdit }) => {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [announcementType, setAnnouncementType] = useState("Event"); // Default to "Event"
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setAnnouncementTitle(itemToEdit.Announcement_title || "");
      setDescription(itemToEdit.description || "");
      setAmount(itemToEdit.amount || "");
      setDate(formatDateForInput(itemToEdit.date) || "");
      setTime(itemToEdit.time || "");
      setAnnouncementType(itemToEdit.Announcement_type ? "Event" : "Activity"); // Set based on Announcement_type
    } else {
      setAnnouncementTitle("");
      setDescription("");
      setAmount("");
      setDate("");
      setTime("");
      setAnnouncementType("Event"); // Default to "Event"
      setErrors({});
    }
  }, [itemToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!announcementTitle)
      newErrors.announcementTitle = "Announcement Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!amount) newErrors.amount = "Amount is required";
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (!announcementType) newErrors.announcementType = "Announcement Type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const announcement = {
        Announcement_title: announcementTitle,
        description,
        amount,
        date,
        time,
        Announcement_type: announcementType === "Event" // Set Announcement_type based on the selected value
      };
      if (itemToEdit) {
        onUpdate(itemToEdit.index, announcement);
      } else {
        onAdd(announcement);
      }
      onClose();
    }
  };

  return (
    <div className="element-announcement-wrapper">
      <div className="frame-389">
        <div className="frame-390">
          <div className="frame-380">
            <div className="frame-391">
              <div className="text-wrapper-124">
                {itemToEdit ? "Edit Announcement" : "Add Announcement"}
              </div>
              <img className="line-71" alt="Line" src={images.line94} />
            </div>
            <form className="number-from w-full" onSubmit={handleSubmit}>
              <div className="frame-388 w-full">
                <div className="w-full mb-4">
                  <p className="label-34 mb-2">
                    <span className="text-wrapper-125">Announcement Type</span>
                    <span className="text-wrapper-126">*</span>
                  </p>
                  <select
                    name="announcementType"
                    id="announcementType"
                    value={announcementType}
                    onChange={(e) => setAnnouncementType(e.target.value)}
                    className="custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-103"
                  >
                    <option value="Event">Event</option>
                    <option value="Activity">Activity</option>
                  </select>
                </div>
                <div className="input-field-18">
                  <p className="label-34">
                    <span className="text-wrapper-125">Announcement Title</span>
                    <span className="text-wrapper-126">*</span>
                  </p>
                  <input
                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-103 ${errors.announcementTitle ? "error" : ""
                      }`}
                    type="text"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="Enter Title"
                  />
                  {errors.announcementTitle && (
                    <div className="incorrect-email error-false rupee-error-0-false undefined">
                      {errors.announcementTitle}
                    </div>
                  )}
                </div>
                <div className="input-field-19">
                  <p className="label-34">
                    <span className="text-wrapper-125">Description</span>
                    <span className="text-wrapper-126">*</span>
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
                <div className="input-field-20">
                  <p className="label-34">
                    <span className="text-wrapper-125">Amount</span>
                    <span className="text-wrapper-126">*</span>
                  </p>
                  <input
                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-106 ${errors.amount ? "error" : ""
                      }`}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                  />
                  {errors.amount && (
                    <div className="incorrect-email error-false rupee-error-0-false component-107">
                      {errors.amount}
                    </div>
                  )}
                </div>
                <div className="frame-382 w-full">
                  <div className="input-field-20">
                    <p className="label-34">
                      <span className="text-wrapper-125">Date</span>
                      <span className="text-wrapper-126">*</span>
                    </p>
                    <input
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-106 ${errors.date ? "error" : ""
                        }`}
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Select Date"
                    />
                    {errors.date && (
                      <div className="incorrect-email error-false rupee-error-0-false component-107">
                        {errors.date}
                      </div>
                    )}
                  </div>
                  <div className="input-field-20">
                    <p className="label-34">
                      <span className="text-wrapper-125">Time</span>
                      <span className="text-wrapper-126">*</span>
                    </p>
                    <input
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-106 ${errors.time ? "error" : ""
                        }`}
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Select Time"
                    />
                    {errors.time && (
                      <div className="incorrect-email error-false rupee-error-0-false component-107">
                        {errors.time}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="frame-392">
                <button
                  type="button"
                  className="component hover-button-false border-button-true gray-button-false component-55 !w-[175px]"
                  onClick={onClose}
                >
                  <div className="buttons component-56">Cancel</div>
                </button>

                <CustomButton
                  text={itemToEdit ? "Update" : "Save"}
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

export default AddAnnouncement;