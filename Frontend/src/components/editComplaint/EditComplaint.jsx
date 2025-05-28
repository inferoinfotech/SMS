import React, { useState, useEffect } from "react";
import "./style.css";
import images from "../../Images";
import WingSelectBox from "../WingSelectBox/WingSelectBox";
import CustomButton from "../customButton/CustomButton";

const EditComplaint = ({ onClose, onAdd, onUpdate, itemToEdit }) => {
  const [complainerName, setComplainerName] = useState("");
  const [complaintName, setComplaintName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [wing, setWing] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Open");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setComplainerName(itemToEdit.complainerName || "");
      setComplaintName(itemToEdit.complaintName || "");
      setDescription(itemToEdit.description || "");
      setUnit(itemToEdit.unit || "");
      setWing(itemToEdit.wing || "");
      setPriority(itemToEdit.priority || "");
      setStatus(itemToEdit.status || "Open");
    } else {
      setComplainerName("");
      setComplaintName("");
      setDescription("");
      setUnit("");
      setWing("");
      setPriority("");
      setStatus("Open");
      setFile(null);
      setErrors({});
    }
  }, [itemToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!complainerName)
      newErrors.complainerName = "Complainer Name is required";
    if (!complaintName) newErrors.complaintName = "Complaint Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!unit) newErrors.unit = "Unit is required";
    if (!wing) newErrors.wing = "Wing is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const complaint = {
        complainerName,
        complaintName,
        description,
        unit,
        wing,
        priority,
        status,
        file,
      };
      if (itemToEdit) {
        onUpdate(itemToEdit.index, complaint);
      } else {
        onAdd(complaint);
      }
      onClose();
    }
  };

  return (
    <div className="element-edit-complain-pop">
      <form onSubmit={handleSubmit}>
        <div className="frame-608">
          <div className="frame-609">
            <div className="frame-605">
              <div className="text-wrapper-349">
                {itemToEdit ? "Edit Complaint" : "Create Complaint"}
              </div>
              <img className="line-124" alt="Line" src={images.line94} />
            </div>

            <div className="input-field-17">
              <p className="label-14">
                <span className="text-wrapper-371">Complainer Name</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <input
                type="text"
                value={complainerName}
                placeholder="Enter Name"
                onChange={(e) => setComplainerName(e.target.value)}
                className="form-control custom-input"
              />
              {errors.complainerName && (
                <div className="text-red-500">{errors.complainerName}</div>
              )}
            </div>

            <div className="input-field-17">
              <p className="label-14">
                <span className="text-wrapper-371">Complaint Name</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <input
                type="text"
                value={complaintName}
                placeholder="Enter Name"
                onChange={(e) => setComplaintName(e.target.value)}
                className="form-control custom-input"
              />
              {errors.complaintName && (
                <div className="text-red-500">{errors.complaintName}</div>
              )}
            </div>

            <div className="input-field-18">
              <p className="label-14">
                <span className="text-wrapper-371">Description</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <textarea
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                className="form-control custom-input"
              />
              {errors.description && (
                <div className="text-red-500">{errors.description}</div>
              )}
            </div>
            <div className="flex justify-between w-full">
              <div className="frame-610">
                <div className="input-field-19 mr-5">
                  <WingSelectBox value={wing} onChange={setWing} error={errors.wing} />
                </div>
              </div>
              <div className="frame-610">
                <div className="input-field-19">
                  <p className="label-14">
                    <span className="text-wrapper-371">Unit</span>
                    <span className="text-wrapper-372">*</span>
                  </p>
                  <input
                    type="text"
                    value={unit}
                    placeholder="Enter Unit"
                    onChange={(e) => setUnit(e.target.value)}
                    className="form-control custom-input"
                  />
                  {errors.unit && (
                    <div className="text-red-500">{errors.unit}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="frame-611">
              <p className="div-3">
                <span className="text-wrapper-371">Priority</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <div className="flex gap-2">
                <label
                  className={`complaint-checkbox ${priority === "High" ? "active" : ""
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
                  className={`complaint-checkbox ${priority === "Medium" ? "active" : ""
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
                  className={`complaint-checkbox ${priority === "Low" ? "active" : ""
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
                  className={`complaint-checkbox ${status === "Open" ? "active" : ""
                    }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={status === "Open"}
                    onChange={() => setStatus("Open")}
                    disabled={!itemToEdit}
                  />
                  Open
                </label>
                <label
                  className={`complaint-checkbox ${status === "Pending" ? "active" : ""
                    }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={status === "Pending"}
                    onChange={() => setStatus("Pending")}
                    disabled={!itemToEdit}
                  />
                  Pending
                </label>
                <label
                  className={`complaint-checkbox ${status === "Solved" ? "active" : ""
                    }`}
                >
                  <input
                    type="radio"
                    className="complaint-checkbox-input"
                    checked={status === "Solved"}
                    onChange={() => setStatus("Solved")}
                    disabled={!itemToEdit}
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
                className="component border-button-true mr-5 !w-[220px]"
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

export default EditComplaint;