import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // const ax_token = Cookies.get('token'); // Get the token from the cookie
    // console.log("axios api hit token", ax_token);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const endpoints = {
  auth: {
    register: '/admin/api/auth/register',
    adminLogin: '/admin/api/auth/login', //ADMIN LOGIN
    residentLogin: '/resident/api/auth/login', //RESIDENT LOGIN
    securityLogin: '/security/api/auth/login', //SECURITY LOGIN
    getAdmin: '/admin/api/auth/getAdminProfile',
    updateAdmin: '/admin/api/auth/updateAdminProfile',
    forgotPassword: '/admin/api/auth/forgotPassword',
    verifyOTP: '/admin/api/auth/verifyOTP',
    resetPassword: '/admin/api/auth/resetPassword',
    checkPassword: '/admin/api/auth/checkPassword',
  },
  adminannouncement: {
    addAnnouncement: '/admin/api/announcement/',
    getAnnouncements: '/admin/api/announcement/',
    createAnnouncement: '/admin/api/announcement/',
    updateAnnouncement: `/admin/api/announcement`,
    deleteAnnouncement: `/admin/api/announcement`,
  },
  society: {
    create: '/admin/api/societies/',
    getAll: '/admin/api/societies/',
    getbyId: (id) => `/admin/api/societies/${id}`,
  },
  invoices: {
    getInvoices: '/resident/api/maintenance/invoices',
    getInvoicesById: '/resident/api/maintenance/invoices',
  },
  getPendingMaintence: {
    getPendingMaintence: '/admin/api/dashboard/final-summary-pending-maintence',
    getUpcomingactivity: '/admin/api/dashboard/final-summary-upcoming-activity',
    getalltotal: '/admin/api/dashboard/final-summary',
    getchart: '/admin/api/dashboard/daily-activity'
  },

  importantNumbers: {
    add: '/admin/api/important-numbers',
    getAll: '/admin/api/important-numbers/',
    getAllForResident: '/resident/api/important-numbers/',
    update: (id) => `/admin/api/important-numbers/${id}`,
    delete: (id) => `/admin/api/important-numbers/${id}`,
  },
  facility: {
    getFacility: '/admin/api/facilities/',
    getFacilityResident: 'resident/api/facilities/',
    createFacility: '/admin/api/facilities/',
    updateFacility: (id) => `/admin/api/facilities/${id}`,
    deleteFacility: `/admin/api/facilities/`,
  },
  resident: {
    create: '/admin/api/residents/',
    getAll: '/admin/api/residents/',
    getById: '/admin/api/residents/',
    update: '/admin/api/residents/',
    delete: '/admin/api/residents',
  },
  maintance: {
    getMaintance: '/resident/api/maintenance/',
    payMaintance: 'resident/api/maintenance/pay',
    callback: '/resident/api/maintenance/callback'
  },
  securityManagement: {
    addSecurity: '/admin/api/security-protocol/',
    getSecurity: '/admin/api/security-protocol/',
    updteSecurity: (id) => `/admin/api/security-protocol/${id}`,
    deleteSecurity: (id) => `/admin/api/security-protocol/${id}`,
  },
  securityManagementResident: {
    getSecurityResident: '/resident/api/security-protocol/',
  },
  VisitorLogs: {
    getVisitorLog: '/admin/api/visitor-log/',
    addVisitorLog: '/security/api/visitor-log/',
    getvisitorLogSecurityPannel: '/security/api/visitor-log/'
  },
  alert: {
    addAlert: '/security/api/emergency-alert/send-alert'
  },
  securityGuard: {
    addSecurityGuard: '/admin/api/security-guard/',
    getSecurityGuard: '/admin/api/security-guard/',
    updateSecurityGuard: (id) => `/admin/api/security-guard/${id}`,
    deleteSecurityGuard: (id) => `/admin/api/security-guard/${id}`,
  },
  residentdashbord: {
    getresidentUpcomingactivity: '/resident/api/dashboard/final-summary-upcoming-activity',
    getresidentalltotal: '/resident/api/dashboard/final-summary',
    getresidentPendingMaintence: '/resident/api/dashboard/final-summary-pending-maintence',
  },
  complaintTracking: {
    getComplaint: '/admin/api/complaints/',
    createComplaint: '/admin/api/complaints/',
    updateComplaint: (id) => `/admin/api/complaints/${id}`,
    deleteComplaint: (id) => `/admin/api/complaints/${id}`,
  },
  complaintTrackingResident: {
    getComplaintResident: '/resident/api/complaint-submission/',
    createComplaintResident: '/resident/api/complaint-submission/',
    updateComplaintResident: (id) => `/resident/api/complaint-submission/${id}`,
    deleteComplaintResident: (id) => `/resident/api/complaint-submission/${id}`,
  },
  request: {
    getRequest: '/admin/api/requests/',
    addRequest: '/admin/api/requests/',
    updateRequest: (id) => `/admin/api/requests/${id}`,
    deleteRequest: (id) => `/admin/api/requests/${id}`,
  },
  requestSubmission: {
    getRequestSub: '/resident/api/request-submission/',
    addRequestSub: '/resident/api/request-submission/',
    updateRequestSub: (id) => `/resident/api/request-submission/${id}`,
    deleteRequestSub: (id) => `/resident/api/request-submission/${id}`,
  },
  note: {
    getNote: '/admin/api/notes/',
    addNote: '/admin/api/notes/',
    updateNote: (id) => `/admin/api/notes/${id}`,
    deleteNote: (id) => `/admin/api/notes/${id}`,
  },
  expense: {
    getExpense: '/admin/api/expenses/',
    addExpense: '/admin/api/expenses/',
    updateExpense: (id) => `/admin/api/expenses/${id}`,
    deleteExpense: (id) => `/admin/api/expenses/${id}`,
  },
  income: {
    getIncome: '/admin/api/expenses/',
    addIncome: '/admin/api/expenses/',
    updateIncome: (id) => `/admin/api/expenses/${id}`,
    deleteIncome: (id) => `/admin/api/expenses/${id}`,
  },

  OtherIncome: {
    getOtherIncome: '/admin/api/incomes/',
    addOtherIncome: '/admin/api/incomes/',
    updateOtherIncome: `/admin/api/incomes/`,
    deleteOtherIncome: `/admin/api/incomes`,
    eventparticipent: `/admin/api/announcement/event-participator`,
    activityparticipent: `/admin/api/announcement/activity-participator`
  },

  participation: {
    getParticipation: '/resident/api/incomes/event-participator',
  },
  maintenance: {
    createMaintenance: '/admin/api/maintenance/',
    getMaintenance: '/admin/api/maintenance/',
    getMaintenanceOne: `/admin/api/maintenance/`,
  },
  Announcment: {
    getAnnouncment: `/resident/api/announcement/`,
    getsingleAnnouncment: `/resident/api/announcement/get-single-user`,
    getAnnouncmentById: `/resident/api/announcement/`,
    payAnnouncment: `/resident/api/announcement/pay`,
    callbackAnnouncment: `/resident/api/announcement/callback`,
    getAnnouncementinvoice: `/resident/api/announcement/`,
    getAnnouncementinvoiceById: `/resident/api/announcement/invoices`,
  },
  userPersonalDetail: {
    getDetail: (id) => `/resident/api/auth/${id}`,
    getMaintenceDetails: '/resident/api/maintenance/',
    getAnnouncment: `/resident/api/announcement/`,
    getuserprofile: `/resident/api/auth`
  },
  securityGuardprofile: {
    getSecurityGuardProfile: '/security/api/auth'
  },
  chatWith: {
    getAllMembers: '/resident/api/chat/',
    sendMessage: '/resident/api/chat/message',
    getMessageHistory: (senderId, receiverId) => `/resident/api/chat/history/${senderId}/${receiverId}`
  },
  communityChat: {
    createInitialGroups: '/resident/api/community-chat/creategroup',
    getGroups: '/resident/api/community-chat/groups',
    askQuestion: '/resident/api/community-chat/ask-question',
    answerQuestion: '/resident/api/community-chat/answer-question',
    getGroupQue: (groupId) => `/resident/api/community-chat/${groupId}/questions`
  },
  notification:{
    getNotification:'/notification/api',
    createNotification:'/notification/api',
    updateNotificationStatus:'/notification/api',
    markAsRead:'/notification/api',
    acceptAnnouncementCashPayment:'/admin/api/announcement/approve-cash-payment',
    declineAnnouncementCashPayment:'/admin/api/announcement/approve-cash-payment',
    acceptMaintenance:'/admin/api/maintenance/approve-cash-payment',
    declineMaintenance:'/admin/api/maintenance/cash-callback',
    // acceMaintenanceCashPayment:'/resident/api/maintenance/cash-callback',
  },
  polls : {
    getownPolls:'/resident/api/community-polls/own-polls',
    createPoll:'/resident/api/community-polls/',
    getotherResidentsPolls:'/resident/api/community-polls/new-polls',
    getAllperiousPolls:'/resident/api/community-polls/previous-polls',
    getpollresult:'/resident/api/community-polls/poll-results',
    submitPoll:'/resident/api/community-polls/submit-response',
  },
};

export default axiosInstance;