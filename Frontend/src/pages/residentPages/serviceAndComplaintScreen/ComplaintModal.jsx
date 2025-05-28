import WingSelectBox from "@/components/WingSelectBox/WingSelectBox";
import images from "@/Images";
import React, { useEffect, useState } from "react";

const ComplaintModal = ({ closePopup, onSubmit, services }) => {
  const [complainantName, setComplainantName] = useState("");
  const [complaintName, setComplaintName] = useState("");
  const [description, setDescription] = useState("");
  const [wing, setWing] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Open"); // Default status is "Open"
  const [isEditing, setIsEditing] = useState(false); // To check if it's an edit operation

  useEffect(() => {
    if (services) {
      setComplainantName(services.complainerName);
      setComplaintName(services.complaintName);
      setDescription(services.description);
      setWing(services.wing);
      setUnit(services.unit);
      setPriority(services.priority);
      setStatus(services.status);
      setIsEditing(true); // Set to true if editing an existing complaint
    } else {
      setComplainantName("");
      setComplaintName("");
      setDescription("");
      setWing("");
      setUnit("");
      setPriority("");
      setStatus("Open"); // Default status for new complaints
      setIsEditing(false); // Set to false if creating a new complaint
    }
  }, [services]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      complainerName: complainantName,
      complaintName,
      description,
      wing,
      unit,
      priority,
      status,
    });
  };

  return (
    <div className="elements-create-complain-pop">
      <form onSubmit={handleSubmit}>
        <div className="frame-608">
          <div className="frame-609">
            <div className="frame-605">
              <div className="text-wrapper-349">
                {isEditing ? "Edit Complaint" : "Create Complaint"}
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
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                className="form-control custom-input"
              />
            </div>

            <div className="input-field-17">
              <p className="label-14">
                <span className="text-wrapper-371">Complaint Name</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <input
                type="text"
                value={complaintName}
                onChange={(e) => setComplaintName(e.target.value)}
                className="form-control custom-input"
              />
            </div>

            <div className="input-field-18">
              <p className="label-14">
                <span className="text-wrapper-371">Description</span>
                <span className="text-wrapper-372">*</span>
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control custom-input"
              />
            </div>
            <div className="flex md:flex-row flex-col w-full">
              <div className="mr-5">
                <WingSelectBox value={wing} onChange={setWing} />
              </div>
              <div className="frame-610 md:mt-0 mt-5">
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
                    disabled={!isEditing} // Disable during creation
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
                    disabled={!isEditing} // Disable during creation
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
                    disabled={!isEditing} // Disable during creation
                  />
                  Solved
                </label>
              </div>
            </div>

            <div className="frame-265 mb-5">
              <button
                type="button"
                className="component hover-button-false border-button-true gray-button-false component-55 mr-5"
                onClick={closePopup}
              >
                <div className="buttons component-56">Cancel</div>
              </button>
              <button
                type="submit"
                className="component-9 rounded-lg hover-button-true border-button-false gray-button-true component-57"
              >
                <div className="buttons undefined">
                  {isEditing ? "Update" : "Create"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComplaintModal;