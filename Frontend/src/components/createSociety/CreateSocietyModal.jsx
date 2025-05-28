import React, { useState } from "react";
import "./style.css";
import images from "../../Images";
import { createSociety } from "../../api/societyApi";

const CreateSocietyModal = ({ onClose, onAddSociety }) => {
  const [formData, setFormData] = useState({
    societyName: "",
    societyAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { societyName, societyAddress, country, state, city, zipCode } = formData;

    if (societyName && societyAddress && country && state && city && zipCode) {
      try {
        const newSociety = await createSociety({
          name: societyName,
          address: societyAddress,
          country: country,
          state: state,
          city: city,
          zipCode: zipCode,
        });

        onAddSociety(newSociety); // Pass the newly created society data
        onClose();
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="frame-646">
          <div className="frame-647">
            <div className="frame-641">
              <div className="frame-648">
                <div className="text-wrapper-406">Create New Society</div>
                <img className="line-129" alt="Line" src={images.line94} />
              </div>
              <div className="frame-642">
                <div className="input-field-27">
                  <p className="label-19">
                    <span className="text-wrapper-399">Society Name</span>
                    <span className="text-wrapper-401">*</span>
                  </p>
                  <div className="select-menu-trigger-14">
                    <input
                      className="text-115"
                      id="societyName"
                      name="societyName"
                      value={formData.societyName}
                      onChange={handleChange}
                    />
                  </div>
                  <label className="text-wrapper-407" htmlFor="societyName">
                    Incorrect Email Address.
                  </label>
                </div>
                <div className="input-field-27">
                  <p className="label-19">
                    <span className="text-wrapper-399">Society Address</span>
                    <span className="text-wrapper-401">*</span>
                  </p>
                  <div className="component-174">
                    <div className="select-menu-trigger-14">
                      <input
                        className="text-115"
                        id="societyAddress"
                        name="societyAddress"
                        value={formData.societyAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <label className="text-wrapper-407" htmlFor="societyAddress">
                      Incorrect Email Address.
                    </label>
                  </div>
                </div>
                <div className="frame-649">
                  <div className="input-field-28">
                    <p className="label-19">
                      <span className="text-wrapper-399">Country</span>
                      <span className="text-wrapper-401">*</span>
                    </p>
                    <div className="component-175">
                      <div className="select-menu-trigger-15">
                        <input
                          className="text-115"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                      <label className="text-wrapper-408" htmlFor="country">
                        Incorrect Email Address.
                      </label>
                    </div>
                  </div>
                  <div className="input-field-28">
                    <p className="label-19">
                      <span className="text-wrapper-399">State</span>
                      <span className="text-wrapper-401">*</span>
                    </p>
                    <div className="component-175">
                      <div className="select-menu-trigger-15">
                        <input
                          className="text-115"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                      <label className="text-wrapper-408" htmlFor="state">
                        Incorrect Email Address.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="frame-649">
                  <div className="input-field-28">
                    <p className="label-19">
                      <span className="text-wrapper-399">City</span>
                      <span className="text-wrapper-401">*</span>
                    </p>
                    <div className="component-175">
                      <div className="select-menu-trigger-15">
                        <input
                          className="text-115"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <label className="text-wrapper-408" htmlFor="city">
                        Incorrect Email Address.
                      </label>
                    </div>
                  </div>
                  <div className="input-field-28">
                    <p className="label-19">
                      <span className="text-wrapper-399">Zip Code</span>
                      <span className="text-wrapper-401">*</span>
                    </p>
                    <div className="component-175">
                      <div className="select-menu-trigger-15">
                        <input
                          className="text-115"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                      <label className="text-wrapper-408" htmlFor="zipCode">
                        Incorrect Email Address.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-668">
              <button
                className="component hover-button-false border-button-true gray-button-false component-197"
                onClick={onClose}
              >
                <div className="buttons component-198">Cancel</div>
              </button>
              <button
                className="component hover-button-true border-button-false gray-button-false component-199"
                onClick={handleSave}
              >
                <div className="buttons undefined">Save</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSocietyModal;