// api/AnnouncementApi.js
import axiosInstance, { endpoints } from '../axios';

export const getAnnouncements = async () => {
  try {
    const response = await axiosInstance.get(endpoints.Announcment.getAnnouncment);
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};

export const getsingleuserAnnouncement = async () => {
  try {
    const response = await axiosInstance.get(endpoints.Announcment.getsingleAnnouncment);
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};

export const getAnnouncementById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.Announcment.getAnnouncmentById}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching announcement by ID:", error);
    throw error;
  }
};

export const initiatePayment = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.Announcment.payAnnouncment, data);
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};

export const handlePaymentCallback = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.Announcment.callbackAnnouncment, data);
    return response.data;
  } catch (error) {
    console.error("Error handling payment callback:", error);
    throw error;
  }
};

export const getCompletedAnnouncements = async () => {
    try {
      const response = await axiosInstance.get(endpoints.Announcment.getAnnouncementinvoice);
      return response.data;
    } catch (error) {
      console.error("Error fetching completed announcement records:", error);
      throw error;
    }
  };
  
  export const getAnnouncementinvoiceById = async (id) => {
    try {
      const response = await axiosInstance.get(`${endpoints.Announcment.getAnnouncementinvoiceById}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching announcement record by ID:", error);
      throw error;
    }
  };



// Fetch all announcements
export const fetchAnnouncements = async () => {
  try {
    const response = await axiosInstance.get(endpoints.adminannouncement.getAnnouncements);
    console.log("Fetched announcements:", response.data);
    return response.data.announcements;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};

// Add a new announcement
export const addAnnouncement = async (announcement) => {
  try {
    console.log("Adding announcement:", announcement);
    const response = await axiosInstance.post(endpoints.adminannouncement.addAnnouncement, announcement);
    console.log("Added announcement:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding announcement:", error);
    throw error;
  }
};

// Update an existing announcement
export const updateAnnouncement = async (id, announcement) => {
  try {
    console.log("Updating announcement:", announcement);
    const response = await axiosInstance.put(`${endpoints.adminannouncement.updateAnnouncement}/${id}`, announcement);
    console.log("Updated announcement:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw error;
  }
};

// Delete an announcement
export const deleteAnnouncement = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.adminannouncement.deleteAnnouncement}/${id}`);
    console.log("Deleted announcement:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
};

export const getNotification = async () => {
  try {
    const response = await axiosInstance.get(endpoints.notification.getNotification);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const acceptAnnouncementCashPayment = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.notification.acceptAnnouncementCashPayment, {announcementId:data,approved:true});
    return response.data;
  } catch (error) {
    console.error("Error accepting announcement cash payment:", error);
    throw error;
  }
};

export const declineAnnouncementCashPayment = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.notification.declineAnnouncementCashPayment, {announcementId:data, approved:false});
    return response.data;
  } catch (error) {
    console.error("Error declining announcement cash payment:", error);
    throw error;
  }
};

export const acceptMaintenanceCashPayment = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.notification.acceptMaintenance, {announcementId:data});
    return response.data;
  } catch (error) {
    console.error("Error accepting maintenance cash payment:", error);
    throw error;
  }
};

export const declineMaintenanceCashPayment = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.notification.declineMaintenance, {announcementId:data});
    return response.data;
  } catch (error) {
    console.error("Error declining maintenance cash payment:", error);
    throw error;
  }
};
