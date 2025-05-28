import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import images from "../../../Images";
import { verifyOTP } from "../../../api/otpVerifyApi";
import { sendForgotPasswordEmail } from "../../../api/forgetPassApi";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

const ChangeOTP = ({ email }) => {
  const navigate = useNavigate();

  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]); // Array for 6 digits
  const [formErrors, setFormErrors] = useState({});
  const inputRefs = useRef([]); // Refs to manage focus on input boxes
  const [countdown, setCountdown] = useState(30); // Countdown timer
  const [isCounting, setIsCounting] = useState(true); // To control the countdown

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [countdown, isCounting]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      // Update the specific index
      const newOtpArray = [...otpArray];
      newOtpArray[index] = value;
      setOtpArray(newOtpArray);

      // Auto-focus the next box
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Clear errors as the user types
      setFormErrors({});
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to the previous box if empty
    }
  };

  const handleSubmit = async () => {
    const otp = otpArray.join(""); // Concatenate the OTP array into a single string
    if (otp.length < 6) {
      setFormErrors({ otp: "OTP must be 6 digits" });
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      console.log("Calling verifyOTP API with OTP:", otp);
      const response = await verifyOTP({ otp });
      console.log("API Response:", response);
      toast.success("OTP verified successfully! Redirecting to reset password page.");
      setTimeout(() => {
        navigate("/resetPassword");
      }, 2000); // Delay for 2 seconds to show the toast
    } catch (error) {
      console.error("Verify OTP Error:", error);
      toast.error(error.message || "Verification failed. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      console.log("Calling sendForgotPasswordEmail API with email:", email);
      await sendForgotPasswordEmail({ email });
      setCountdown(30); // Reset the countdown
      setIsCounting(true); // Start the countdown again
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.error("Resend OTP Error:", error);
      toast.error(error.message || "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="element-OTP-screen-unfill mx-auto">
      <div className="overlap-group-5">
        <img className="group-11" alt="Group" src={images.group4} />
        <div className="rectangle-6" />
        <img className="bright-web" alt="Bright web" src={images.brightWeb20} />
        <img className="element-2" alt="Element" src={images.grp20602818632524513} />
        <div className="group-12">
          <div className="frame-38">
            <div className="frame-39">
              <div className="frame-40">
                <div className="text-wrapper-30">Enter OTP</div>
                <p className="text-wrapper-31">
                  Please enter the 6 digit code that was sent to your phone number.
                </p>
              </div>

              {/* New OTP Input Boxes */}
              <div className="w-full flex gap-9">
                {otpArray.map((digit, index) => (
                  <input
                    key={index}
                    type="tel"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="border border-solid w-full h-[50px] rounded-md text-center"
                  />
                ))}
              </div>
            </div>
            <div className="frame-41">
              <div className="frame-42">
                <div className="text-wrapper-32">00:{countdown < 10 ? `0${countdown}` : countdown} sec</div>
                <label
                  className="text-wrapper-33-1"
                  style={{ top: "64px" }}
                  htmlFor="input-1"
                >
                  {formErrors.otp}
                </label>
              </div>
              <div className="group-wrapper">
                <div className="group-20">
                  <div 
                    className="text-wrapper-33" 
                    onClick={isCounting ? null : handleResendOTP}
                    style={{ color: isCounting ? 'gray' : 'blue', cursor: isCounting ? 'not-allowed' : 'pointer' }}
                  >
                    Resend OTP
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} className="otp-btn">
              Verify
            </button>

            <Link className="component-17-wrapper" to="/resetPassword"></Link>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
};

export default ChangeOTP;