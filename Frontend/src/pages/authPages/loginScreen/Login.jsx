import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import images from "../../../Images";
import { login } from "../../../api/authApi";
// import Cookies from 'js-cookie'; // Import js-cookie

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // });
  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
    // setTouched((prevTouched) => ({
    //   ...prevTouched,
    //   [name]: true,
    // }));
    // setTouched((prevTouched) => ({
    //   ...prevTouched,
    //   [name]: true,
    // }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
    // setTouched((prevTouched) => ({
    //   ...prevTouched,
    //   [name]: true,
    // }));
    // setTouched((prevTouched) => ({
    //   ...prevTouched,
    //   [name]: true,
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();

    const newErrors = {};
    let allFieldsFilled = true;

    // Validate email
    if (!document.getElementById("input-2").value) {
      newErrors.email = "Email is required";
      allFieldsFilled = false;
    }

    // Validate password
    if (!document.getElementById("input-8").value) {
      newErrors.password = "Password is required";
      allFieldsFilled = false;
    }

    setFormErrors(newErrors);

    if (allFieldsFilled) {
      const email = document.getElementById("input-2").value;
      const password = document.getElementById("input-8").value;

      try {
        const { token, adminId, residentId, securityId, role } = await login(email, password);
        localStorage.setItem('token', token);
        localStorage.setItem('adminId', adminId);
        localStorage.setItem('residentId', residentId);
        localStorage.setItem('securityId', securityId);
        localStorage.setItem('role', role);
        if (role === "security")
          {
            navigate("/visitortrackingScreen");
          } else {
            navigate("/dashboard");
          }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="element-login-screen mx-auto">
      <div className="overlap-group-30">
        <img className="group-440" alt="Group" src={images.group4} />
        <div className="rectangle-27" />
        <img className="bright-web-15" alt="Bright web" src={images.brightWeb20} />
        <form onSubmit={handleSubmit} className="group-441">
          <div className="frame-548">
            <div className="text-wrapper-328">Login</div>
            <div className="frame-549">
              <div className="frame-549">
                <div className="frame-550">
                  <div className="input-field-15">
                    <p className="label-12">
                      <span className="text-wrapper-329">Email or Phone</span>
                      <span className="text-wrapper-330">*</span>
                    </p>
                    <div className="component-125">
                      <div className="select-menu-trigger-9">
                        <input
                          className="text-88"
                          id="input-2"
                          name="email"
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          autoComplete=""
                        />
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-1">
                        {formErrors.email}
                      </label>
                    </div>
                  </div>
                  <div className="input-field-15">
                    <p className="label-12">
                      <span className="text-wrapper-329">Password</span>
                      <span className="text-wrapper-330">*</span>
                    </p>
                    <div className="component-125">
                      <div className="select-menu-trigger-9">
                        <input
                          className="text-88"
                          id="input-8"
                          name="password"
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          type={showPassword ? "text" : "password"}
                          autoComplete=""
                        />
                        <button
                          className="eye-button"
                          onClick={(e) => {
                            e.preventDefault();
                            togglePasswordVisibility();
                          }}
                        >
                          {showPassword ? (
                            <i className="ri-eye-fill"></i>
                          ) : (
                            <i className="ri-eye-off-fill"></i>
                          )}
                        </button>
                      </div>
                      <label className="text-wrapper-331" htmlFor="input-2">
                        {formErrors.password}
                      </label>
                    </div>
                  </div>
                  <div className="frame-551">
                    <div className="frame-550">
                      <div className="group-442">
                        <input
                          type="checkbox"
                          className="checkbox-custom check-box-instance-custom-2"
                        />
                        <div className="text-wrapper-332">Remember me</div>
                      </div>
                    </div>
                    <div className="frame-550">
                      <div className="group-443">
                        <Link className="text-wrapper-333" to="/forgotPassword">
                          Forgot Password ?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="login-btn">
                Sign In
              </button>
              <Link to="/registration">
                <p className="don-t-have-an">
                  <span className="text-wrapper-334">
                    Don’t have an account?{" "}
                  </span>
                  <span className="text-wrapper-335">Registration</span>
                </p>
              </Link>
            </div>
          </div>
        </form>
        <div className="group-444">
          <div className="group-445">
            <img
              className="your-space-your"
              alt="Your space your"
              src={images.connectCollaborate}
            />
            <img className="group-446" alt="Group" src={images.group2} />
          </div>
          <div className="frame-552">
            <div className="rectangle-28" />
            <div className="ellipse-26" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;