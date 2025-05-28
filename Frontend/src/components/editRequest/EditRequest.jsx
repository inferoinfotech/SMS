import React, { useState, useEffect } from "react";
import "./style.css";
import images from "../../Images";
import WingSelectBox from "../WingSelectBox/WingSelectBox";
import CustomButton from "../customButton/CustomButton";

const EditRequest = ({ onClose, onAdd, onUpdate, itemToEdit }) => {
  const [requestName, setRequestName] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [unit, setUnit] = useState("");
  const [wing, setWing] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Open"); // Default status to "Open"
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setRequestName(itemToEdit.requestName || "");
      setRequesterName(itemToEdit.requesterName || "");
      setDescription(itemToEdit.description || "");
      setDate(itemToEdit.date || "");
      setUnit(itemToEdit.unit || "");
      setWing(itemToEdit.wing || "");
      setPriority(itemToEdit.priority || "");
      setStatus(itemToEdit.status || "Open"); // Ensure status is set correctly
    } else {
      setRequestName("");
      setRequesterName("");
      setDescription("");
      setDate("");
      setUnit("");
      setWing("");
      setPriority("");
      setStatus("Open"); // Default status to "Open"
      setErrors({});
    }
  }, [itemToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!requestName) newErrors.requestName = "Request is required";
    if (!requesterName) newErrors.requesterName = "Request Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!date) newErrors.date = "Date is required";
    if (!unit) newErrors.unit = "Unit is required";
    if (!wing) newErrors.wing = "Wing is required";
    if (!priority) newErrors.priority = "Priority is required";
    // if (!status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    console.log("Hello  Vibs");
    
    e.preventDefault();
    if (validateForm()) {
      const requestData = {
        _id: itemToEdit?._id,
        requestName,
        requesterName,
        description,
        date,
        unit,
        wing,
        priority,
        status,
      };
      console.log("requestData", requestData);
      if (itemToEdit) {
        console.log("button if button", requestData);
        onUpdate(itemToEdit.index, requestData);
      } else {
        console.log("button else button", requestData);
        onAdd(requestData);
      }
      onClose();
    }
  };

  return (
    <div className="element-edit-request-pop">
      <form onSubmit={handleSubmit}>
        <div className="frame-608">
          <div className="frame-609">
            <div className="frame-605">
              <div className="text-wrapper-349">
                {itemToEdit ? "Edit Request" : "Create Request"}
              </div>
              <img className="line-124" alt="Line" src={images.line94} />
            </div>

            <div className="input-field-17">
              <p className="label-14">
                <span className="text-wrapper-371">Requester Name</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <input
                type="text"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                className="form-control custom-input"
              />
              {errors.requesterName && <div className="text-red-500">{errors.requesterName}</div>}
            </div>

            <div className="input-field-17">
              <p className="label-14">
                <span className="text-wrapper-371">Requester Name</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <input
                type="text"
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                className="form-control custom-input"
              />
              {errors.requestName && (
                <div className="text-red-500">{errors.requestName}</div>
              )}
            </div>

            <div className="input-field-17">
              <p className="label-14">
                <span className="text-wrapper-371">Description</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control custom-input"
              />
              {errors.description && (
                <div className="text-red-500">{errors.description}</div>
              )}
            </div>

            <div className="input-field-17">
              <p className="label-14">
                <span className="text-wrapper-371">Request Date</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control custom-input"
              />
              {errors.date && <div className="text-red-500">{errors.date}</div>}
            </div>

            <div className="frame-610">
              <WingSelectBox value={wing} onChange={setWing} error={errors.wing} />
              <div className="input-field-19">
                <p className="label-14">
                  <span className="text-wrapper-371">Unit</span>
                  <span className="text-wrapper-372">*</span>
                </p>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="form-control custom-input"
                />
                {errors.unit && (
                  <div className="text-red-500">{errors.unit}</div>
                )}
              </div>
            </div>

            <div className="frame-611">
              <p className="div-3">
                <span className="text-wrapper-371">Priority</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <div className="flex gap-2">
                <label
                  className={`complaint-checkbox ${
                    priority === "High" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={priority === "High"}
                    onChange={() => setPriority("High")}
                  />
                  High
                </label>
                <label
                  className={`complaint-checkbox ${
                    priority === "Medium" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={priority === "Medium"}
                    onChange={() => setPriority("Medium")}
                  />
                  Medium
                </label>
                <label
                  className={`complaint-checkbox ${
                    priority === "Low" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={priority === "Low"}
                    onChange={() => setPriority("Low")}
                  />
                  Low
                </label>
              </div>
              {errors.priority && (
                <div className="text-red-500">{errors.priority}</div>
              )}

              <p className="div-3">
                <span className="text-wrapper-371">Status</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <div className="flex gap-2">
                <label
                  className={`complaint-checkbox ${
                    status === "Open" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={status === "Open"}
                    onChange={() => setStatus("Open")}
                  />
                  Open
                </label>
                <label
                  className={`complaint-checkbox ${
                    status === "Pending" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={status === "Pending"}
                    onChange={() => setStatus("Pending")}
                    disabled={!itemToEdit} // Disable if not editing
                  />
                  Pending
                </label>
                <label
                  className={`complaint-checkbox ${
                    status === "Solved" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={status === "Solved"}
                    onChange={() => setStatus("Solved")}
                    disabled={!itemToEdit} // Disable if not editing
                  />
                  Solved
                </label>
              </div>
              {errors.status && (
                <div className="text-red-500">{errors.status}</div>
              )}
            </div>

            <div className="frame-265 mb-5">
              <button
                type="button"
                className="component hover-button-false border-button-true gray-button-false component-55 mr-5 !w-[220px]"
                onClick={onClose}
              >
                <div className="buttons component-56">Cancel</div>
              </button>
              <CustomButton
                text={itemToEdit ? "Update" : "Create"}
                width="220px"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRequest;