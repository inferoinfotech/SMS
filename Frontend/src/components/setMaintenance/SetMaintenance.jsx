import React, { useState } from "react";
import "./style.css";
import MaintenanceDetail from "../maintenanceDetail/MaintenanceDetailPopUp";
import { checkPassword } from "../../api/maintenanceApi"; // Import the API function
import images from "@/Images";

const SetMaintenance = ({ onClose }) => {
  const [showAddMaintenance, setShowAddMaintenance] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onMainSave = async () => {
    try {
      const response = await checkPassword(password);
      if (response.success) {
        setShowAddMaintenance(true);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while checking the password.");
    }
  };

  return (
    <div className="element-set-maintenance">
      {!showAddMaintenance ? (
        <div className="frame-116 popup-overlay">
          <div className="frame-117">
            <div className="frame-118-1">
              <div className="text-wrapper-73">Set Maintenance</div>
            </div>
            <div className="frame-119">
              <div className="frame-118">
                <div className="input-field-wrapper">
                  <div className="input-field-2">
                    <p className="label-6">
                      <span className="text-wrapper-74"> Password</span>
                      <span className="text-wrapper-75">*</span>
                    </p>
                    <div className="component-29">
                      <div className="select-menu-trigger-2">
                        <input
                          className="input"
                          id="input-1"
                          type={showPassword ? "text" : "password"}
                          fdprocessedid="583dvb"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <img
                          src={images.smallEye}
                          alt="show"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <label className="text-wrapper-76" htmlFor="input-1">
                        {errorMessage || "Incorrect Email Address."}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="frame-306">
                  <div className="frame-307">
                    <div className="frame-308">
                      <button
                        type="button"
                        className="hover-button-yes-wrapper hover-button-false border-button-true gray-button-false component-30 rounded-lg mr-5"
                        onClick={onClose}
                      >
                        <div className="buttons component-31">Cancel</div>
                      </button>
                      <button
                        type="submit"
                        className="hover-button-yes-wrapper hover-button-true border-button-false gray-button-false component-32 rounded-lg"
                        onClick={onMainSave}
                        onCancel={onClose}
                      >
                        <div className="buttons component-33">Continue</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <MaintenanceDetail onMainClose={() => setShowAddMaintenance(false)} />
        <MaintenanceDetail
          onMainClose={() => {
            setShowAddMaintenance(false); // Close MaintenanceDetail
            onClose(); // Execute onClose
          }}
        />
      )}
    </div>
  );
};

export default SetMaintenance;