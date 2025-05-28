// ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import images from "../../../Images";
import { resetPassword } from "../../../api/resetpassApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: localStorage.getItem("emailforreset"),
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = `${key} is required`;
        isValid = false;
      }
    });

    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const payload = {
          email: formValues.email,
          newPassword: formValues.password,
          confirmPassword: formValues.confirmPassword,
        };

        await resetPassword(payload);
        alert("Password reset successful!");
        navigate("/");
      } catch (error) {
        alert(error.message || "Failed to reset password");
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
    <div className="element-reset-password-screen mx-auto">
      <div className="overlap-group-15">
        <img className="group-157" alt="Group" src={images.group4} />
        <div className="rectangle-11" />
        <img className="bright-web-6" alt="Bright web" src={images.brightWeb20} />
        <img className="element-4" alt="Element" src={images.grp20602818632524513} />
        <div className="group-158">
          <div className="frame-210">
            <div className="text-wrapper-130">Reset Password</div>
            <div className="frame-211">
              <form onSubmit={handleSubmit}>
                <div className="input-field-8 hidden">

                  <input
                    className="input hidden"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  <span className="text-wrapper-133">{formErrors.email}</span>
                </div>
                <div className="input-field-8">
                  <p className="label-6">
                    <span className="text-wrapper-131">New Password</span>
                    <span className="text-wrapper-132">*</span>
                  </p>
                  <div className="flex w-full p-2 border border-solid border-gray-300 rounded-md mb-6">
                    <input
                      className="input"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formValues.password}
                      onChange={handleInputChange}
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
                  <span className="text-wrapper-133">{formErrors.password}</span>
                </div>
                <div className="input-field-8">
                  <p className="label-6">
                    <span className="text-wrapper-131">Confirm Password</span>
                    <span className="text-wrapper-132">*</span>
                  </p>
                  <div className="flex w-full p-2 border border-solid border-gray-300 rounded-md mb-6">
                    <input
                      className="input"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formValues.confirmPassword}
                      onChange={handleInputChange}
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
                  <span className="text-wrapper-133">{formErrors.confirmPassword}</span>
                </div>
                <button type="submit" className="reset-btn">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <img className="line-41" alt="Line" src={images.line11} />
    </div>
  );
};

export default ResetPassword;
