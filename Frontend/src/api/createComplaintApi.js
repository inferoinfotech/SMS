import axiosInstance, { endpoints } from '../axios';

export const getComplaints = async () => {
  try {
    const response = await axiosInstance.get(endpoints.complaintTracking.getComplaint);
    
    // console.log("COMPLLSSSSSSSSSSS:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createComplaint = async (complaintData) => {
    try {
      const response = await axiosInstance.post(endpoints.complaintTracking.createComplaint, complaintData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateComplaint = async (complaintId, complaintData) => {
    try {
      const response = await axiosInstance.put(endpoints.complaintTracking.updateComplaint(complaintId), complaintData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
 
  export const deleteComplaint = async (complaintId) => {
    try {
      const response = await axiosInstance.delete(endpoints.complaintTracking.deleteComplaint(complaintId));
      return response.data;
    } catch (error) {
      throw error;
    }
  };



export const getComplaintsResident = async () => {
  try {
    const response = await axiosInstance.get(endpoints.complaintTrackingResident.getComplaintResident);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createComplaintResident = async (complaintResidentData) => {
    try {
      const response = await axiosInstance.post(endpoints.complaintTrackingResident.createComplaintResident, complaintResidentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateComplaintResident = async (complaintResidentId, complaintResidentData) => {
    try {
      const response = await axiosInstance.put(endpoints.complaintTrackingResident.updateComplaintResident(complaintResidentId), complaintResidentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
 
  export const deleteComplaintResident = async (complaintResidentId) => {
    try {
      const response = await axiosInstance.delete(endpoints.complaintTrackingResident.deleteComplaintResident(complaintResidentId));
      return response.data;
    } catch (error) {
      throw error;
    }
  };