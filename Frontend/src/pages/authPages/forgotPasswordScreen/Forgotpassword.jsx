import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import images from "../../../Images";
import { sendForgotPasswordEmail } from "../../../api/forgetPassApi"; // Import the API function
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    let allFieldsFilled = true;

    // Validate email
    const email = document.getElementById("input-2").value;
    if (!email) {
      newErrors.email = "Email is required";
      allFieldsFilled = false;
    }

    setFormErrors(newErrors);

    if (allFieldsFilled) {
      try {
        await sendForgotPasswordEmail(email);
        localStorage.setItem("emailforreset", email);
        toast.success("OTP sent successfully! Redirecting to OTP verification page.");
        setTimeout(() => {
          navigate("/changeOtp", { state: { email } }); // Pass email to the next step
        }, 2000); // Delay for 2 seconds to show the toast
      } catch (error) {
        console.error("Forgot Password Error:", error);
        toast.error(error.message || "Failed to send OTP. Please try again.");
      }
    }
  };

  return (
    <div className="element-forget-paassword mx-auto">
      <div className="overlap-group-40">
        <img className="group-545" alt="Group" src={images.group4} />
        <div className="rectangle-49" />
        <img className="bright-web-24" alt="Bright web" src={images.brightWeb20} />
        <img className="element-7" alt="Element" src={images.grp20602818632524513} />
        <div className="group-546">
          <div className="frame-669">
            <div className="frame-670">
              <div className="frame-671">
                <div className="text-wrapper-426">Forget Password</div>
                <p className="text-wrapper-427">
                  Enter your email and we’ll send you a OTP to reset your password.
                </p>
              </div>
              <div className="input-field-37">
                <p className="label-24">
                  <span className="text-wrapper-428">Email or Phone</span>
                  <span className="text-wrapper-429">*</span>
                </p>
                <div className="select-menu-trigger-9">
                  <input
                    className="text-88"
                    id="input-2"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                <label className="text-wrapper-429" htmlFor="input-1">
                  {formErrors.email}
                </label>
              </div>
            </div>

            <button onClick={handleSubmit} className="forgot-btn">
              Get OTP
            </button>

            <div className="frame-672">
              <Link className="text-wrapper-430" to="/">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
};

export default Forgotpassword;