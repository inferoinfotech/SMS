import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../adminPages/dashboardScreen/Dashboard';
import ResidentManagementScreen from '../adminPages/residentManagementScreen/ResidentManagementScreen';
import SecurityGuard from '../adminPages/securityGuardScreen/SecurityGuard';
import FinancialExpanse from '../adminPages/financialExpanseScreen/ExpanseDetails';
import MaintenanceDetail from '../adminPages/maintenanceDetailScreen/MaintenanceDetail';
import FinancialNote from '../adminPages/financialNoteScreen/FinancialNote';
import Profile from '../adminPages/profileScreen/Profile';
import SecurityVisitor from '../adminPages/securityVisitorScreen/SecurityVisitor';
import OtherIncomeDetails from '../adminPages/financial-IncomeDetails/OtherIncomeDetails';
import OtherIncomeCards from '../adminPages/financial-IncomeCardsScreen/OtherIncomeCards';
import CreateComplaint from '../adminPages/createComplaintScreen/CreateComplaint';
import CreateRequest from '../adminPages/requestTrackingScreen/CreateRequest';
import SecurityProtocol from '../adminPages/securityProtocolScreen/SecurityProtocol';
import FacilityManagement from '../adminPages/facilityManagementScreen/FacilityManagement';
import Announcement from '../adminPages/announcement/Announcement';
import AddOwnerTenantForm from '../adminPages/addOwnerForm/AddOwnerTenantForm';
import ViewOwner from '../../components/viewOwner/ViewOwner';

import UserPersonalDetails from '../residentPages/userPersonalDetailScreen/UserPersonalDetails';
import ServiceAndComplaint from '../residentPages/serviceAndComplaintScreen/ServiceAndComplaint';
import EventParticipation from '../residentPages/eventParticipation/EventParticipation';
import UserFacilityManagementScreen from '../residentPages/UserFacilityManagementScreen/UserFacilityManagementScreen';

import PageNotFound from './PageNotFound';
import ChatContainer from '../residentPages/chatScreen/ChatContainer';
import VideoCallModal from '../residentPages/chatScreen/VideoCallModal';
import MaintenanceInvoices from '../residentPages/PaymentPortal/MaintenanceInvoices';
import ViewMantenaceInvoice from '../residentPages/PaymentPortal/ViewMantenaceInvoice';
import OtherIncomeInvoice from '../residentPages/PaymentPortal/OtherIncomeInvoice';
import SecurityProtocols from '../residentPages/SecurityProtocols/SecurityProtocols';
import CommunityPolls from '../residentPages/communityPolls/CommunityPolls';
import VisitortrackingScreen from '../security/visitortrackingscreen';
import EmergencyManagement from '../security/emergencymanagement';
import CommunitiesDiscussionScreen from '../residentPages/CommunitiesDiscussion/CommunitiesDiscussionScreen';
import EventTable from '../residentPages/PaymentPortal/EventTable';

const NavigationLayout = () => {
  return (
    <Routes>
      {/* SOCIETY ADMIN ROUTES */}
      <Route path="/profileScreen" element={<ProtectedRoute ><Profile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/residentManagementScreen" element={<ProtectedRoute><ResidentManagementScreen /></ProtectedRoute>} />
      <Route path="/addOwnerTenantForm" element={<ProtectedRoute><AddOwnerTenantForm /></ProtectedRoute>} />
      <Route path="/viewOwner" element={<ProtectedRoute><ViewOwner /></ProtectedRoute>} />
      <Route path="/maintenanceDetail" element={<ProtectedRoute><MaintenanceDetail /></ProtectedRoute>} />
      <Route path="/otherIncomeCards" element={<ProtectedRoute><OtherIncomeCards /></ProtectedRoute>} />
      <Route path="/otherIncomeDetails" element={<ProtectedRoute><OtherIncomeDetails /></ProtectedRoute>} />
      <Route path="/expanse" element={<ProtectedRoute><FinancialExpanse /></ProtectedRoute>} />
      <Route path="/financialNote" element={<ProtectedRoute><FinancialNote /></ProtectedRoute>} />
      <Route path="/facilityManagement" element={<ProtectedRoute><FacilityManagement /></ProtectedRoute>} />
      <Route path="/createComplain" element={<ProtectedRoute><CreateComplaint /></ProtectedRoute>} />
      <Route path="/requestTracking" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
      <Route path="/visitorLogs" element={<ProtectedRoute><SecurityVisitor /></ProtectedRoute>} />
      <Route path="/securityProtocol" element={<ProtectedRoute><SecurityProtocol /></ProtectedRoute>} />
      <Route path="/securityGuard" element={<ProtectedRoute><SecurityGuard /></ProtectedRoute>} />
      <Route path="/announcementDiv" element={<ProtectedRoute><Announcement /></ProtectedRoute>} />

      {/* RESIDENT USER ROUTES */}
      <Route path="/resident/event-table" element={<ProtectedRoute><EventTable /></ProtectedRoute>} />
      <Route path="/userPersonalDetail" element={<ProtectedRoute><UserPersonalDetails /></ProtectedRoute>} />
      <Route path="/serviceAndComplaint" element={<ProtectedRoute><ServiceAndComplaint /></ProtectedRoute>} />
      <Route path="/eventParticipation" element={<ProtectedRoute><EventParticipation /></ProtectedRoute>} />
      <Route path="/chatScreen" element={<ProtectedRoute><ChatContainer /></ProtectedRoute>} />
      <Route path="/chatScreen/:roomId" element={<VideoCallModal />} />
      <Route path="/communityPoll" element={<ProtectedRoute><CommunityPolls /></ProtectedRoute>} />
      <Route path="/maintenanceInvoices" element={<ProtectedRoute><MaintenanceInvoices /></ProtectedRoute>} />
      <Route path="/viewMaintenanceInvoice" element={<ProtectedRoute><ViewMantenaceInvoice /></ProtectedRoute>} />
      <Route path="/otherInvoice" element={<ProtectedRoute><OtherIncomeInvoice /></ProtectedRoute>} />
      <Route path="/securityProtocolsScreen" element={<ProtectedRoute><SecurityProtocols /></ProtectedRoute>} />
      <Route path="/communityDiscussionScreen" element={<ProtectedRoute><CommunitiesDiscussionScreen /></ProtectedRoute>} />
      <Route path="/userFacilityManagementScreen" element={<ProtectedRoute><UserFacilityManagementScreen /></ProtectedRoute>} />

      {/* SECURITY USER ROUTES */}
      <Route path="/visitortrackingScreen" element={<ProtectedRoute><VisitortrackingScreen /></ProtectedRoute>} />
      <Route path="/emergencyManagementScreen" element={<ProtectedRoute><EmergencyManagement /></ProtectedRoute>} />

      {/* SOCIETY SECURITY ROUTES */}
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default NavigationLayout;