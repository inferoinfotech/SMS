import axiosInstance, { endpoints } from '../axios';

export const getRequestComplaints = async () => {
  try {
    const response = await axiosInstance.get(endpoints.request.getRequest);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const createRequestComplaint = async (complaintRequestData) => {
  try {
    const response = await axiosInstance.post(endpoints.request.addRequest, complaintRequestData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateRequestComplaint = async (requestId, complaintRequestData) => {
  try {
    const response = await axiosInstance.put(endpoints.request.updateRequest(requestId), complaintRequestData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteRequestComplaint = async (requestId) => {
  try {
    const response = await axiosInstance.delete(endpoints.request.deleteRequest(requestId));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const getRequestComplaintsResident = async () => {
  try {
    const response = await axiosInstance.get(endpoints.requestSubmission.getRequestSub);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const createRequestComplaintResident = async (complaintRequestSubData) => {
  try {
    const response = await axiosInstance.post(endpoints.requestSubmission.addRequestSub, complaintRequestSubData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};



export const deleteRequestComplaintResident = async (requestSubId) => {
  try {
    const response = await axiosInstance.delete(endpoints.requestSubmission.deleteRequestSub(requestSubId));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};