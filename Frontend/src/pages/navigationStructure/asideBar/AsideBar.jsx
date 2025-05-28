import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./style.css";
import images from "../../../Images";

const AsideBar = ({ isVisible, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [role, setRole] = useState(localStorage.getItem('role') || "admin");

  useEffect(() => {
    setRole(localStorage.getItem('role') || "admin");
  }, []);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleDropdownItemClick = () => {
    setOpenDropdown(null);
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      id="asideBar"
      className={`${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform fixed top-0 left-0 h-[1064px] bg-white shadow-none group-27 z-20 overflow-none`}
    >
      <div className="group-28">
        <div className="frame-51">
          <div className="flex items-center justify-between">
            <div className="logo border-b border-solid border-[#F4F4F4] pb-10">
              <img
                className="bright-web-2"
                alt="Bright web"
                src={images.brightWeb9}
              />
            </div>
            <button
              className="close-btn text-xl p-4 md:hidden"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          {/* <div className="line-8" /> */}
        </div>

        <div className="frame-52">
          {/* ADMIN ROUTES HANDELER */}
          {role === "admin" && (
            <>
            <Link
              className={`group-29 ${isActive("/dashboard") ? "active-tab" : ""}`}
              to="/dashboard"
              onClick={handleLinkClick}
            >
              <div className="group-32">
                <div className="frame-55">
                  <div className="frame-54">
                    <img
                      className="img-2 image-1"
                      alt="Bold settings fine"
                      src={images.m1Dark}
                    />
                    <img
                      className="img-2 image-2"
                      alt="Bold settings fine"
                      src={images.m1Light}
                    />
                    <div className="text-18">Dashboard</div>
                  </div>
                </div>
              </div>
            </Link>
              <Link
                className={`group-29 ${
                  isActive("/residentManagementScreen") ? "active-tab" : ""
                }`}
                to="/residentManagementScreen"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-55">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Resident Management"
                        src={images.m2Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Resident Management"
                        src={images.m2Light}
                      />
                      <div className="text-18">Resident Management</div>
                    </div>
                  </div>
                </div>
              </Link>
              <div
                className={`second-div ${
                  openDropdown === "financialManagement" ? "dropdown-open" : ""
                } group-29 ${
                  isActive("/financialManagement") ||
                  openDropdown === "financialManagement"
                    ? "active-tab"
                    : ""
                }`}
                onClick={() => toggleDropdown("financialManagement")}
              >
                <Link to="/maintenanceDetail">
                  <div
                    className={`group-32 ${
                      isActive("/financialManagement") ||
                      openDropdown === "financialManagement"
                        ? "active-tab"
                        : ""
                    }`}
                  >
                    <div className="frame-56">
                      <div className="frame-54">
                        <img
                          className="img-2 image-1"
                          alt="Financial Management"
                          src={images.m3Dark}
                        />
                        <img
                          className="img-2 image-2"
                          alt="Financial Management"
                          src={images.m3Light}
                        />
                        <div className="text-18">Financial Management</div>
                      </div>
                    </div>
                    <button className="dropdown-toggle">
                      <span
                        className={`icon ${
                          openDropdown === "financialManagement"
                            ? "rotate-up"
                            : "rotate-down"
                        }`}
                      >
                        <img src={images.arrowDown} alt="Arrow" />
                      </span>
                    </button>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu-1 ${
                    openDropdown === "financialManagement" ? "open" : ""
                  }`}
                  onClick={handleDropdownItemClick}
                >
                  <Link
                    className={`dropdown-item ${
                      isActive("/maintenanceDetail") ? "bold-text" : ""
                    }`}
                    to="/maintenanceDetail"
                    onClick={handleLinkClick}
                  >
                    Income
                  </Link>
                  <Link
                    className={`dropdown-item ${
                      isActive("/expanse") ? "bold-text" : ""
                    }`}
                    to="/expanse"
                    onClick={handleLinkClick}
                  >
                    Expense
                  </Link>
                  <Link
                    className={`dropdown-item ${
                      isActive("/financialNote") ? "bold-text" : ""
                    }`}
                    to="/financialNote"
                    onClick={handleLinkClick}
                  >
                    Note
                  </Link>
                </div>
              </div>
              <Link
                className={`group-29 ${
                  isActive("/facilityManagement") ? "active-tab" : ""
                }`}
                to="/facilityManagement"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-57">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Facility Management"
                        src={images.m4Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Facility Management"
                        src={images.m4Light}
                      />
                      <div className="text-18">Facility Management</div>
                    </div>
                  </div>
                </div>
              </Link>
              <div
                className={`second-div-complaint ${
                  openDropdown === "complaintTracking"
                    ? "dropdown-open-complaint"
                    : ""
                } group-29 ${
                  isActive("/complaintTracking") ||
                  openDropdown === "complaintTracking"
                    ? "active-tab"
                    : ""
                }`}
                onClick={() => toggleDropdown("complaintTracking")}
              >
                <Link to="/createComplain">
                  <div
                    className={`group-32 ${
                      isActive("/complaintTracking") ||
                      openDropdown === "complaintTracking"
                        ? "active-tab"
                        : ""
                    }`}
                  >
                    <div className="frame-57">
                      <div className="frame-54">
                        <img
                          className="img-2 image-1"
                          alt="Complaint Tracking"
                          src={images.m5Dark}
                        />
                        <img
                          className="img-2 image-2"
                          alt="Complaint Tracking"
                          src={images.m5Light}
                        />
                        <div className="text-18">Complaint Tracking</div>
                      </div>
                    </div>
                    <button className="dropdown-toggle">
                      <span
                        className={`icon-1 ${
                          openDropdown === "financialManagement"
                            ? "rotate-up"
                            : "rotate-down"
                        }`}
                      >
                        <img src={images.arrowDown} alt="Arrow" />
                      </span>
                    </button>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu-complaint ${
                    openDropdown === "complaintTracking" ? "open" : ""
                  }`}
                  onClick={handleDropdownItemClick}
                >
                  <Link
                    className={`dropdown-item-complaint ${
                      isActive("/createComplain") ? "bold-text" : ""
                    }`}
                    to="/createComplain"
                    onClick={handleLinkClick}
                  >
                    Create Complain
                  </Link>
                  <Link
                    className={`dropdown-item-complaint ${
                      isActive("/requestTracking") ? "bold-text" : ""
                    }`}
                    to="/requestTracking"
                    onClick={handleLinkClick}
                  >
                    Request Tracking
                  </Link>
                </div>
              </div>
              <div
                className={`second-div-managment ${
                  openDropdown === "securityManagement"
                    ? "dropdown-open-managment"
                    : ""
                } group-29 ${
                  isActive("/securityManagement") ||
                  openDropdown === "securityManagement"
                    ? "active-tab"
                    : ""
                }`}
                onClick={() => toggleDropdown("securityManagement")}
              >
                <Link to="/visitorLogs">
                  <div
                    className={`group-32 ${
                      isActive("/securityManagement") ||
                      openDropdown === "securityManagement"
                        ? "active-tab"
                        : ""
                    }`}
                  >
                    <div className="frame-57">
                      <div className="frame-54">
                        <img
                          className="img-2 image-1"
                          alt="Security Management"
                          src={images.m6Dark}
                        />
                        <img
                          className="img-2 image-2"
                          alt="Security Management"
                          src={images.m6Light}
                        />
                        <div className="text-18">Security Management</div>
                      </div>
                    </div>
                    <button className="dropdown-toggle">
                      <span
                        className={`icon-1 ${
                          openDropdown === "financialManagement"
                            ? "rotate-up"
                            : "rotate-down"
                        }`}
                      >
                        <img src={images.arrowDown} alt="Arrow" />
                      </span>
                    </button>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu-managment ${
                    openDropdown === "securityManagement" ? "open" : ""
                  }`}
                  onClick={handleDropdownItemClick}
                >
                  <Link
                    className={`dropdown-item-managment ${
                      isActive("/visitorLogs") ? "bold-text" : ""
                    }`}
                    to="/visitorLogs"
                    onClick={handleLinkClick}
                  >
                    Visitor Logs
                  </Link>
                  <Link
                    className={`dropdown-item-managment ${
                      isActive("/securityProtocol") ? "bold-text" : ""
                    }`}
                    to="/securityProtocol"
                    onClick={handleLinkClick}
                  >
                    Security Protocols
                  </Link>
                </div>
              </div>
              <Link
                className={`group-29 ${
                  isActive("/securityGuard") ? "active-tab" : ""
                }`}
                to="/securityGuard"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-57">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Security Guard"
                        src={images.m7Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Security Guard"
                        src={images.m7Light}
                      />
                      <div className="text-18">Security Guard</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                className={`group-29 ${
                  isActive("/announcement") ? "active-tab" : ""
                }`}
                to="/announcementDiv"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-57">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Announcement"
                        src={images.m8Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Announcement"
                        src={images.m8Light}
                      />
                      <div className="text-18">Announcement</div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          )}

          {/* RESIDENT ROUTES HANDELER */}
          {role === "resident" && (
            <>
            <Link
              className={`group-29 ${isActive("/dashboard") ? "active-tab" : ""}`}
              to="/dashboard"
              onClick={handleLinkClick}
            >
              <div className="group-32">
                <div className="frame-55">
                  <div className="frame-54">
                    <img
                      className="img-2 image-1"
                      alt="Bold settings fine"
                      src={images.m1Dark}
                    />
                    <img
                      className="img-2 image-2"
                      alt="Bold settings fine"
                      src={images.m1Light}
                    />
                    <div className="text-18">Dashboard</div>
                  </div>
                </div>
              </div>
            </Link>
              <Link
                className={`group-29 ${
                  isActive("/userPersonalDetail") ? "active-tab" : ""
                }`}
                to="/userPersonalDetail"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-55">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Personal Detail"
                        src={images.m2Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Personal Detail"
                        src={images.m2Light}
                      />
                      <div className="text-18">Personal Detail</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                className={`group-29 ${
                  isActive("/serviceAndComplaint") ? "active-tab" : ""
                }`}
                to="/serviceAndComplaint"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-55">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Service And Complaint"
                        src={images.m2Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Service And Complaint"
                        src={images.m2Light}
                      />
                      <div className="text-18">Service And Complaint</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                className={`group-29 ${
                  isActive("/userFacilityManagementScreen") ? "active-tab" : ""
                }`}
                to="/userFacilityManagementScreen"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-57">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="User Facility Management"
                        src={images.m4Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="User Facility Management"
                        src={images.m4Light}
                      />
                      <div className="text-18">Society Facilities</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                className={`group-29 ${
                  isActive("/eventParticipation") ? "active-tab" : ""
                }`}
                to="/eventParticipation"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-55">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Events Participation"
                        src={images.m2Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Events Participation"
                        src={images.m2Light}
                      />
                      <div className="text-18">Events Participation</div>
                    </div>
                  </div>
                </div>
              </Link>

              <div
                className={`second-div-managment ${
                  openDropdown === "community"
                    ? "!mb-[130px] transition-all duration-300 ease-in-out"
                    : ""
                } group-29 ${
                  isActive("/chatScreen") || openDropdown === "community" ? "active-tab" : ""
                }`}
                onClick={() => toggleDropdown("community")}
              >
                <Link to="/chatScreen">
                  <div
                    className={`group-32 ${
                      isActive("/chatScreen") || openDropdown === "community"
                        ? "active-tab"
                        : ""
                    }`}
                  >
                    <div className="frame-57">
                      <div className="frame-54">
                        <img
                          className="img-2 image-1"
                          alt="Community"
                          src={images.m6Dark}
                        />
                        <img
                          className="img-2 image-2"
                          alt="Community"
                          src={images.m6Light}
                        />
                        <div className="text-18">Community</div>
                      </div>
                    </div>
                    <button className="dropdown-toggle">
                      <span
                        className={`icon-1 ${
                          openDropdown === "paymentPortal"
                            ? "rotate-up"
                            : "rotate-down"
                        }`}
                      >
                        <img src={images.arrowDown} alt="Arrow" />
                      </span>
                    </button>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu-managment ${
                    openDropdown === "community" ? "open" : ""
                  }`}
                  onClick={handleDropdownItemClick}
                >
                  <Link
                    className={`dropdown-item-managment ${
                      isActive("/chatScreen") ? "bold-text" : ""
                    }`}
                    to="/chatScreen"
                    onClick={handleLinkClick}
                  >
                    Access Forums
                  </Link>
                  <Link
                    className={`dropdown-item-managment ${isActive("/communityPoll") ? "bold-text" : ""
                      }`}
                    to="/communityPoll"
                    onClick={handleLinkClick}
                  >
                    Polls
                  </Link>
                  <Link
                    className={`dropdown-item-managment ${isActive("/communityDiscussionScreen") ? "bold-text" : ""
                      }`}
                    to="/communityDiscussionScreen"
                    onClick={handleLinkClick}
                  >
                    Community Discussion
                  </Link>
                </div>
              </div>

              <div
                className={`second-div-managment ${
                  openDropdown === "paymentPortal" ? "dropdown-open-managment" : ""
                } group-29 ${
                  isActive("/maintenanceInvoices") || openDropdown === "paymentPortal"
                    ? "active-tab"
                    : ""
                }`}
                onClick={() => toggleDropdown("paymentPortal")}
              >
                <Link to="/maintenanceInvoices">
                  <div
                    className={`group-32 ${
                      isActive("/maintenanceInvoices") || openDropdown === "paymentPortal"
                        ? "active-tab"
                        : ""
                    }`}
                  >
                    <div className="frame-57">
                      <div className="frame-54">
                        <img
                          className="img-2 image-1"
                          alt="paymentPortal"
                          src={images.m9Dark}
                        />
                        <img
                          className="img-2 image-2"
                          alt="paymentPortal"
                          src={images.m9Light}
                        />
                        <div className="text-18">Payment Portal</div>
                      </div>
                    </div>
                    <button className="dropdown-toggle">
                      <span
                        className={`icon-1 ${
                          openDropdown === "paymentPortal"
                            ? "rotate-up"
                            : "rotate-down"
                        }`}
                      >
                        <img src={images.arrowDown} alt="Arrow" />
                      </span>
                    </button>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu-managment ${
                    openDropdown === "paymentPortal" ? "open" : ""
                  }`}
                  onClick={handleDropdownItemClick}
                >
                  <Link
                    className={`dropdown-item-managment ${
                      isActive("/maintenanceInvoices") ? "bold-text" : ""
                    }`}
                    to="/maintenanceInvoices"
                    onClick={handleLinkClick}
                  >
                    Maintenance Invoices
                  </Link>
                  <Link
                    className={`dropdown-item-managment ${isActive("/otherInvoice") ? "bold-text" : ""
                      }`}
                    to="/otherInvoice"
                    onClick={handleLinkClick}
                  >
                    Other Invoice
                  </Link>
                </div>
              </div>

              {/* <Link
                className={`group-29 ${
                  isActive("/communityScreen") ? "active-tab" : ""
                }`}
                to="/communityScreen"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-55">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Community"
                        src={images.m2Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Community"
                        src={images.m2Light}
                      />
                      <div className="text-18">Community</div>
                    </div>
                  </div>
                </div>
              </Link> */}
              <Link
                className={`group-29 ${
                  isActive("/securityProtocolsScreen") ? "active-tab" : ""
                }`}
                to="/securityProtocolsScreen"
                onClick={handleLinkClick}
              >
                <div className="group-32">
                  <div className="frame-55">
                    <div className="frame-54">
                      <img
                        className="img-2 image-1"
                        alt="Payment Portal"
                        src={images.m10Dark}
                      />
                      <img
                        className="img-2 image-2"
                        alt="Payment Portal"
                        src={images.m10Light}
                      />
                      <div className="text-18">Security Protocols</div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          )}

          {/* SECURITY ROUTES HANDELER */}
          {role === "security" && (
            <>
              <div
                className={`second-div-managment ${
                  openDropdown === "Security" ? "dropdown-open-managment" : ""
                } group-29 ${
                  isActive("/visitortrackingScreen") || openDropdown === "Security"
                    ? "active-tab"
                    : ""
                }`}
                onClick={() => toggleDropdown("Security")}
              >
                <Link to="/visitortrackingScreen">
                  <div
                    className={`group-32 ${
                      isActive("/visitortrackingScreen") || openDropdown === "Security"
                        ? "active-tab"
                        : ""
                    }`}
                  >
                    <div className="frame-57">
                      <div className="frame-54">
                        <img
                          className="img-2 image-1"
                          alt="Security"
                          src={images.m6Dark}
                        />
                        <img
                          className="img-2 image-2"
                          alt="Security"
                          src={images.m6Light}
                        />
                        <div className="text-18">Security</div>
                      </div>
                    </div>
                    <button className="dropdown-toggle">
                      <span
                        className={`icon-1 ${
                          openDropdown === "Security"
                            ? "rotate-up"
                            : "rotate-down"
                        }`}
                      >
                        <img src={images.arrowDown} alt="Arrow" />
                      </span>
                    </button>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu-managment ${
                    openDropdown === "Security" ? "open" : ""
                  }`}
                  onClick={handleDropdownItemClick}
                >
                  <Link
                    className={`dropdown-item-managment ${
                      isActive("/visitortrackingScreen") ? "bold-text" : ""
                    }`}
                    to="/visitortrackingScreen"
                    onClick={handleLinkClick}
                  >
                    Visitor Tracking
                  </Link>
                  <Link
                    className={`dropdown-item-managment ${isActive("/emergencyManagementScreen") ? "bold-text" : ""
                      }`}
                    to="/emergencyManagementScreen"
                    onClick={handleLinkClick}
                  >
                    Emergency Management
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* LogOut Button */}
      <div id="logOut" className="frame-58">
        <img className="line-9" alt="Line" src={images.line18} />
        <button className="frame-60" onClick={handleLogout}>
          <img className="logout" alt="Line" src={images.logout} />
          <div className="text-wrapper-38">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default AsideBar;
