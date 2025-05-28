import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../../components/dropdown/Dropdown";
import "../../../../static/css/remixicon.css";
import "./style.css";
import images from "../../../Images";
import axiosInstance, { endpoints } from "../../../axios";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    society: "", // This will store the society ID
    password: "",
    conformpassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    society: "", // Add society to formErrors
    password: "",
    conformpassword: "",
    termsAccepted: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const handleTermsChange = (e) => {
    const { checked } = e.target;
    setTermsAccepted(checked);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      termsAccepted: checked ? "" : "You must accept the terms and conditions",
    }));
  };

  const handleSubmit = async (e) => {
    console.log("FormData", formData);
    
    e.preventDefault();
    const newErrors = {};
    let allFieldsFilled = true;

    // Validate each field
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
        allFieldsFilled = false;
      }
    });

    // Validate terms and conditions
    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
      allFieldsFilled = false;
    }

    setFormErrors(newErrors);

    if (allFieldsFilled) {
      try {
        const URL = endpoints.auth.register;
        const response = await axiosInstance.post(URL, {
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          society: formData.society, // Pass the society ID
          password: formData.password,
          confirmPassword: formData.conformpassword,
        });
        console.log('Registration successful:', response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        setRegistrationError(error.response ? error.response.data.message : 'An error occurred');
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="element-register-screen mx-auto">
      <div className="overlap-group-27">
        <img className="group-390" alt="Group" src={images.group4} />
        <div className="rectangle-23" />
        <img className="bright-web-13" alt="Bright web" src={images.brightWeb20} />
        <form className="group-391" onSubmit={handleSubmit}>
          <div className="frame-489">
            <div className="text-wrapper-289">Registration</div>
            <div className="frame-490">
              <div className="frame-490">
                <div className="frame-491">
                  <div className="frame-492">
                    <div className="input-field-12">
                      <p className="label-10">
                        <span className="text-wrapper-290">First Name</span>
                        <span className="text-wrapper-291">*</span>
                      </p>
                      <div className="select-menu-trigger-8">
                        <input
                          className="text-79"
                          id="input-1"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-1">
                        {formErrors.firstname}
                      </label>
                    </div>
                    <div className="input-field-12">
                      <p className="label-10">
                        <span className="text-wrapper-290">Last Name</span>
                        <span className="text-wrapper-291">*</span>
                      </p>
                      <div className="component-109">
                        <div className="select-menu-trigger-8">
                          <input
                            className="text-79"
                            id="input-2"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-2">
                        {formErrors.lastname}
                      </label>
                    </div>
                  </div>
                  <div className="frame-492">
                    <div className="input-field-12">
                      <p className="label-10">
                        <span className="text-wrapper-290">Email Address</span>
                        <span className="text-wrapper-291">*</span>
                      </p>
                      <div className="component-109">
                        <div className="select-menu-trigger-8">
                          <input
                            className="text-79"
                            id="input-3"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-3">
                        {formErrors.email}
                      </label>
                    </div>
                    <div className="input-field-12">
                      <p className="label-11">
                        <span className="text-wrapper-290">PhoneNumber Number</span>
                        <span className="text-wrapper-293">*</span>
                      </p>
                      <div className="component-109">
                        <div className="select-menu-trigger-8">
                          <input
                            className="text-79"
                            id="input-4"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-4">
                        {formErrors.phoneNumber}
                      </label>
                    </div>
                  </div>
                  <div className="frame-493">
                    <div className="input-field-13">
                      <p className="label-10">
                        <span className="text-wrapper-290">Country</span>
                        <span className="text-wrapper-291">*</span>
                      </p>
                      <div className="component-109">
                        <div className="select-menu-trigger-8">
                          <input
                            className="text-79"
                            id="input-5"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-5">
                        {formErrors.country}
                      </label>
                    </div>
                    <div className="input-field-13">
                      <p className="label-10">
                        <span className="text-wrapper-290">State</span>
                        <span className="text-wrapper-291">*</span>
                      </p>
                      <div className="component-109">
                        <div className="select-menu-trigger-8">
                          <input
                            className="text-79"
                            id="input-6"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-6">
                        {formErrors.state}
                      </label>
                    </div>
                    <div className="input-field-13">
                      <p className="label-10">
                        <span className="text-wrapper-290">City</span>
                        <span className="text-wrapper-291">*</span>
                      </p>
                      <div className="component-109">
                        <div className="select-menu-trigger-8">
                          <input
                            className="text-79"
                            id="input-7"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-7">
                        {formErrors.city}
                      </label>
                    </div>
                  </div>

                  <div className="input-field-14">
                    <p className="label-10">
                      <span className="text-wrapper-290">Select Society</span>
                      <span className="text-wrapper-291">*</span>
                    </p>
                    <Dropdown onChange={(id) => setFormData((prevData) => ({ ...prevData, society: id }))} />
                    <label className="text-wrapper-331" htmlFor="input-8">
                      {formErrors.society}
                    </label>
                  </div>

                  <div className="input-field-14">
                    <p className="label-10">
                      <span className="text-wrapper-290">Password</span>
                      <span className="text-wrapper-291">*</span>
                    </p>
                    <div className="component-109">
                      <div className="select-menu-trigger-8">
                        <input
                          className="text-79"
                          id="input-8"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          type={showPassword ? "text" : "password"}
                          autoComplete=""
                        />
                        <button
                          className="eye-button"
                          onClick={(e) => {
                            e.preventDefault();
                            togglePasswordVisibility("password");
                          }}
                        >
                          {showPassword ? (
                            <i className="ri-eye-fill"></i>
                          ) : (
                            <i className="ri-eye-off-fill"></i>
                          )}
                        </button>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-8">
                        {formErrors.password}
                      </label>
                    </div>
                  </div>
                  <div className="frame-491">
                    <div className="input-field-14">
                      <p className="label-10">
                        <span className="text-wrapper-290">
                          Confirm Password
                        </span>
                        <span className="text-wrapper-291">*</span>
                      </p>
                      <div className="component-109">
                        <div className="select-menu-trigger-8">
                          <input
                            className="text-79"
                            id="input-9"
                            name="conformpassword"
                            value={formData.conformpassword}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete=""
                          />
                          <button
                            className="eye-button"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePasswordVisibility("confirmPassword");
                            }}
                          >
                            {showConfirmPassword ? (
                              <i className="ri-eye-fill"></i>
                            ) : (
                              <i className="ri-eye-off-fill"></i>
                            )}
                          </button>
                        </div>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-9">
                        {formErrors.conformpassword}
                      </label>
                    </div>
                    <div className="group-392">
                      <p className="i-agree-to-all-the">
                        <input
                          type="checkbox"
                          className="checkbox-custom check-box-instance-custom"
                          checked={termsAccepted}
                          onChange={handleTermsChange}
                        />
                        <span className="text-wrapper-296">
                          I agree to all the Terms and
                        </span>
                        <span className="text-wrapper-297">&nbsp;</span>
                        <span className="text-wrapper-298">
                          Privacy Policies.
                        </span>
                      </p>
                    </div>
                    <label className="text-wrapper-331">
                      {formErrors.termsAccepted}
                    </label>
                  </div>
                </div>
              </div>
              <button className="register-btn" type="submit">
                Register
              </button>
              {registrationError && (
                <div className="error-message">{registrationError}</div>
              )}
              <Link to="/">
                <p className="already-have-an">
                  <span className="text-wrapper-296">
                    Already have an account?{" "}
                  </span>
                  <span className="text-wrapper-298">Login</span>
                </p>
              </Link>
              {registrationError && (
                <div className="error-message">{registrationError}</div>
              )}
            </div>
          </div>
        </form>
        <div className="group-393">
          <div className="group-394">
            <img
              className="connect-collaborate"
              alt="Connect collaborate"
              src={images.connectCollaborate}
            />
            <img className="group-395" alt="Group" src={images.group1} />
          </div>
          <div className="frame-494">
            <div className="ellipse-23" />
            <div className="rectangle-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;