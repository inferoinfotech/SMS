import React, { useState, useEffect } from "react";
import "./style.css";
import images from "../../Images";
import CustomButton from "../customButton/CustomButton";

const SecurityGuardPopUp = ({ onClose, onAdd, onUpdate, itemToEdit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Renamed phone to phoneNumber
  const [shift, setShift] = useState("Day");
  const [shiftDate, setShiftDate] = useState(""); // Renamed date to shiftDate
  const [shiftTime, setShiftTime] = useState(""); // Renamed time to shiftTime
  const [gender, setGender] = useState("Male");
  const [photo, setPhoto] = useState(null); // State to manage the photo URL
  const [aadharCard, setAadharCard] = useState(null); // State to manage the Aadhar card image URL
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name || "");
      setEmail(itemToEdit.email || "");
      setPhoneNumber(itemToEdit.phoneNumber || ""); // Updated to phoneNumber
      setShift(itemToEdit.shift || "Day");
      setShiftDate(itemToEdit.shiftDate ? new Date(itemToEdit.shiftDate).toISOString().split('T')[0] : ""); // Convert to YYYY-MM-DD format
      const formattedTime = itemToEdit.shiftTime ? itemToEdit.shiftTime.slice(0, 5) : ""; // Updated to shiftTime
      setShiftTime(formattedTime); // Updated to shiftTime
      setGender(itemToEdit.gender || "Male");
      setPhoto(itemToEdit.photo || null); // Set the photo if available
      setAadharCard(itemToEdit.aadharCard || null); // Set the Aadhar card image if available
    } else {
      setName("");
      setEmail("");
      setPhoneNumber(""); // Updated to phoneNumber
      setShift("Day");
      setShiftDate(""); // Updated to shiftDate
      setShiftTime(""); // Updated to shiftTime
      setGender("Male");
      setPhoto(null); // Reset the photo state
      setAadharCard(null); // Reset the Aadhar card image state
      setErrors({});
    }
  }, [itemToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required"; // Updated to phoneNumber
    if (!shiftDate) newErrors.shiftDate = "Shift Date is required"; // Updated to shiftDate
    if (!shiftTime) newErrors.shiftTime = "Shift Time is required"; // Updated to shiftTime
    if (!photo) newErrors.photo = "Photo is required";
    if (!aadharCard) newErrors.aadharCard = "Aadhar card image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("shift", shift);
      formData.append("shiftDate", shiftDate);
      formData.append("shiftTime", shiftTime);
      formData.append("gender", gender);
      if (photo instanceof File) formData.append("photo", photo);
      if (aadharCard instanceof File) formData.append("aadharCard", aadharCard);

      // Include _id for updates
      if (itemToEdit) {
        formData.append("_id", itemToEdit._id);
      }

      // Debugging: Log the FormData object
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const addOrUpdate = itemToEdit ? onUpdate : onAdd;
      addOrUpdate(formData);
      onClose();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleAadharCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadharCard(file);
    }
  };

  return (
    <div className="element-security-guard">
      <div className="frame-627">
        <div className="frame-628">
          <div className="frame-620">
            <div className="frame-629">
              <div className="text-wrapper-194">
                {itemToEdit ? "Update Security" : "Add Security"}
              </div>
              <img className="line-111" alt="Line" src={images.line94} />
            </div>
            <form className="number-from w-full" onSubmit={handleSubmit}>
              <div className="frame-626">
                <div className="flex items-center w-full mb-5">
                  {/* Parent div to handle the click */}
                  <div
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{ cursor: 'pointer' }}
                    className="flex items-center"
                  >
                    {/* Image */}
                    {photo ? (
                      <img
                        src={
                          photo instanceof File
                            ? URL.createObjectURL(photo)
                            : photo
                        }
                        alt="Selected"
                        style={{ width: "65px", height: "65px" }}
                        className="rounded-full"
                      />
                    ) : (
                      <img
                        src={images.dummyImage}
                        alt="Dummy"
                        style={{ width: "65px", height: "65px" }}
                        className="rounded-full"
                      />
                    )}

                    {/* Label (no htmlFor attribute, as it's handled by the parent div) */}
                    <div className="text-[#5678E9] text-[16px] font-semibold ml-5">
                      <div className="buttons undefined">Add Photo</div>
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                    id="fileInput"
                  />
                </div>
                <div className="input-field-39">
                  <p className="label-44">
                    <span className="text-wrapper-195">Full Name</span>
                    <span className="text-wrapper-196">*</span>
                  </p>
                  <input
                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-241 ${errors.name ? "error" : ""
                      }`}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                  />
                  {errors.name && (
                    <div className="incorrect-email error-false rupee-error-0-false undefined">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="input-field-39">
                  <p className="label-44">
                    <span className="text-wrapper-195">Email</span>
                    <span className="text-wrapper-196">*</span>
                  </p>
                  <input
                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-241 ${errors.email ? "error" : ""
                      }`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <div className="incorrect-email error-false rupee-error-0-false undefined">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="input-field-40">
                  <p className="label-44">
                    <span className="text-wrapper-195">Phone Number</span>
                    <span className="text-wrapper-196">*</span>
                  </p>
                  <input
                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.phoneNumber ? "error" : ""
                      }`}
                    type="text"
                    value={phoneNumber} // Updated to phoneNumber
                    onChange={(e) => setPhoneNumber(e.target.value)} // Updated to phoneNumber
                    placeholder="Enter Phone Number" // Updated to Phone Number
                  />
                  {errors.phoneNumber && (
                    <div className="incorrect-email error-false rupee-error-0-false undefined">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
                <div className="flex items-center w-full">
                  <div className="input-field-40 mr-5">
                    <p className="label-44">
                      <span className="text-wrapper-195">Gender</span>
                      <span className="text-wrapper-196">*</span>
                    </p>
                    <select
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.gender ? "error" : ""
                        }`}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && (
                      <div className="incorrect-email error-false rupee-error-0-false undefined">
                        {errors.gender}
                      </div>
                    )}
                  </div>
                  <div className="input-field-40">
                    <p className="label-44">
                      <span className="text-wrapper-195">Shift</span>
                      <span className="text-wrapper-196">*</span>
                    </p>
                    <select
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.shift ? "error" : ""
                        }`}
                      value={shift}
                      onChange={(e) => setShift(e.target.value)}
                    >
                      <option value="Day">Day</option>
                      <option value="Night">Night</option>
                    </select>
                    {errors.shift && (
                      <div className="incorrect-email error-false rupee-error-0-false undefined">
                        {errors.shift}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="input-field-40 mr-5">
                    <p className="label-44">
                      <span className="text-wrapper-195">Shift Date</span>
                      <span className="text-wrapper-196">*</span>
                    </p>
                    <input
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.shiftDate ? "error" : ""
                        }`}
                      type="date"
                      value={shiftDate} // Updated to shiftDate
                      onChange={(e) => setShiftDate(e.target.value)} // Updated to shiftDate
                      placeholder="Enter Shift Date" // Updated to Shift Date
                    />
                    {errors.shiftDate && (
                      <div className="incorrect-email error-false rupee-error-0-false undefined">
                        {errors.shiftDate}
                      </div>
                    )}
                  </div>
                  <div className="input-field-40">
                    <p className="label-44">
                      <span className="text-wrapper-195">Shift Time</span>
                      <span className="text-wrapper-196">*</span>
                    </p>
                    <input
                      className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.shiftTime ? "error" : ""
                        }`}
                      type="time"
                      value={shiftTime} // Updated to shiftTime
                      onChange={(e) => setShiftTime(e.target.value)} // Updated to shiftTime
                      placeholder="Enter Shift Time" // Updated to Shift Time
                    />
                    {errors.shiftTime && (
                      <div className="incorrect-email error-false rupee-error-0-false undefined">
                        {errors.shiftTime}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sm:w-full w-auto mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Aadhar Card <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAadharCardChange}
                      style={{ display: "none" }}
                      id="aadharFileInput"
                    />
                    <label
                      htmlFor="aadharFileInput"
                      className="cursor-pointer flex items-center flex-col w-full border-2 border-dashed border-[#D3D3D3] p-6 rounded-md text-center"
                    >
                      {aadharCard ? (
                        <img
                          src={
                            aadharCard instanceof File
                              ? URL.createObjectURL(aadharCard)
                              : aadharCard
                          }
                          alt="Selected Aadhar Card"
                          className="w-[200px] h-[50px] object-cover mb-3"
                        />
                      ) : (
                        <img
                          src={images.aadharImage}
                          alt="Dummy"
                          className="max-w-full mb-3"
                        />
                      )}
                      <div className="text-blue-500 font-bold">
                        Upload a file{" "}
                        <span className="text-[#4F4F4F]">or drag and drop</span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        PNG, JPG, GIF up to 10MB
                      </div>
                    </label>

                    {errors.aadharCard && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.aadharCard}
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
                  text={itemToEdit ? "Update" : "Create"}
                  width="175px"
                />
                {/* <button
                  type="submit"
                  className="component-9 hover-button-true rounded-lg border-button-false gray-button-true component-57"
                >
                  <div className="buttons undefined">
                    {itemToEdit ? "Update" : "Create"}
                  </div>
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityGuardPopUp;