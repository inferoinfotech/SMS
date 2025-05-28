import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import './style.css';

import { SearchBox } from '../searchBox/SearchBox';
import Notification from '../notification/Notification';

import NotificationIcon from '../../../static/img/notification-icon.svg';
import line91 from '../../../static/img/line-91.svg';

import imagesIcon from '../../Images';
import { getAdminProfileDetails, getSecurityGuardProfile, getUserProfileDetails } from '../../api/profileApi';
import AsideBar from '../../pages/navigationStructure/asideBar/AsideBar';

const HeaderMain = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    profileImage: imagesIcon.noUser, // Default profile image
    name: '',
    type: 'Admin',
  });

  // console.log("profileDetails", profileDetails);


  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchShortProfileDetailForHeader = async () => {
      const token = localStorage.getItem('token');

      // const h_token = Cookies.get('token'); // Get the token from the cookie
      // console.log("Header Screen token", h_token);

      if (!token) {
        console.error("Token not found in cookie/local storage");
        return;
      }

      try {
        const role = localStorage.getItem("role");
        let data;
        if (role === "admin") {
          data = await getAdminProfileDetails(token);
        } else if (role === "resident") {
          const residentId = localStorage.getItem("residentId");
          data = await getUserProfileDetails(residentId);
        } else if (role === "security") {
          const securityId = localStorage.getItem("securityId");
          data = await getSecurityGuardProfile(securityId);
        }
        
        const { firstName, lastName, name, profileImage, images, photo } = data;
        setProfileDetails({
          profileImage: (role === "admin" ? profileImage : (role === "resident" ? images.profilePhoto : photo)) || imagesIcon.noUser,
          name: (role === "security" ? name : ((firstName || "Name") + " " + (lastName || "Unavailable"))),
          type: role,
        });
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };

    fetchShortProfileDetailForHeader();
  }, []);

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/profileScreen':
        return 'Home > Edit Profile';

      // Resident Routes
      case '/residentManagementScreen':
        return 'Home > Resident Management';
      case '/addOwnerDetails':
        return 'Home > Resident Management > Owner Form';
      case '/addTenantDetails':
        return 'Home > Resident Management > Tanate Form';
      case '/maintenanceDetail':
        return 'Home > Financial Maintenance';
      case '/otherIncomeDetails':
        return 'Home > Income';
      case '/expanse':
        return 'Home > Expenses';
      case '/financialNote':
        return 'Home > Note';
      case '/facilityManagement':
        return 'Home > Facility Management';
      case '/createComplain':
        return 'Home > Create Complain';
      case '/requestTracking':
        return 'Home > Request Tracking';
      case '/visitorLogs':
        return 'Home > Visitor Logs';
      case '/securityProtocol':
        return 'Home > Security Protocol';
      case '/securityGuard':
        return 'Home > Security Guard';
      case '/announcementDiv':
        return 'Home > Announcement';

      // Resident Routes
      case '/resident/event-table':
        return 'Home > Announcement Invoice Table';
      case '/userPersonalDetail':
        return 'Home > User Personal Details';
      case '/serviceAndComplaint':
        return 'Home > Service and Complaint';
      case '/eventParticipation':
        return 'Home > Event Participation';
      case '/chatScreen':
        return 'Home > Chat Screen';
      case '/chatScreen/:roomId':
        return 'Home > Chat Screen > Video Call';
      case '/communityPoll':
        return 'Home > Community Polls';
      case '/maintenanceInvoices':
        return 'Home > Maintenance Invoices';
      case '/viewMaintenanceInvoice':
        return 'Home > View Maintenance Invoice';
      case '/otherInvoice':
        return 'Home > Other Income Invoice';
      case '/securityProtocolsScreen':
        return 'Home > Security Protocols';
      case '/communityDiscussionScreen':
        return 'Home > Community Discussion';
      case '/userFacilityManagementScreen':
        return 'Home > User Facility Management';

      // Security Routes
      case '/visitortrackingScreen':
        return 'Home > Visitor Tracking';
      case '/emergencyManagementScreen':
        return 'Home > Emergency Management';

      default:
        return '';
    }
  };

  return (
    <div id="header" className="fixed top-0 left-0 w-full h-[100px] z-10 bg-white shadow-md">
      <div className="flex items-center justify-between h-full px-6 header-specing">
        <button
          className="menu-icon md:hidden text-2xl"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        {(location.pathname === '/' || location.pathname === '/dashboard') && <SearchBox />}
        {location.pathname !== '/' && location.pathname !== '/dashboard' && (
          <div className="breadcrumb sm:flex hidden items-center">
            <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 transition">
              Home
            </Link>
            <span className="mx-2 text-gray-500">{'>'}</span>
            <span className="text-blue-600 font-semibold">{getBreadcrumb().split('>')[1]}</span>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button className="vuesax-bold-wrapper" onClick={() => setShowNotification(!showNotification)}>
            <img className="notify" alt="Search" src={NotificationIcon} />
          </button>
          <img className="line" alt="Line" src={line91} />
          <Link className="flex items-center" to="/profileScreen">
            {/* Profile Image */}
            <img className="w-10 h-10 rounded-full" alt="Profile" src={profileDetails.profileImage} />
            <div className="ml-3 sm:block hidden">
              {/* Profile Name */}
              <div className="font-medium text-gray-900">{profileDetails.name}</div>
              {/* Profile Type */}
              <div className="text-sm text-gray-500">{profileDetails.type}</div>
            </div>
          </Link>
        </div>
      </div>
      {/* Render AsideBar */}
      <AsideBar isVisible={isSidebarOpen} onClose={toggleSidebar} />
      {showNotification && <Notification setShowNotification={setShowNotification} />}
    </div>
  );
};

export default HeaderMain;