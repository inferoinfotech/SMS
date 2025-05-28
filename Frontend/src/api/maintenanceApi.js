// api/maintenanceApi.js
import axiosInstance, { endpoints } from '../axios';

export const getMaintenanceData = async () => {
  try {
    const response = await axiosInstance.get(endpoints.maintance.getMaintance);
    return response.data.records;
  } catch (error) {
    console.error('Error fetching maintenance data:', error);
    throw error;
  }
};

export const initiatePayment = async (maintenanceId) => {
  try {
    const response = await axiosInstance.post(endpoints.maintance.payMaintance, { maintenanceId });
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};
/******  fb4db50f-5a66-498d-a148-ec88010a37e4  *******/

export const handlePaymentCallback = async (maintenanceId, razorpayPaymentId) => {
  try {
    const response = await axiosInstance.post(endpoints.maintance.callback, { maintenanceId, razorpayPaymentId });
    return response.data;     
  } catch (error) {
    console.error('Error handling payment callback:', error);
    throw error;
  }
};


export const checkPassword = async (password) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.checkPassword, { password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createMaintenance = async (maintenanceData) => {
  try {
    const response = await axiosInstance.post(endpoints.maintenance.createMaintenance, maintenanceData);
    console.log("createMaintenance response ===>", response.data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMaintenance = async () => {
  try {
    const response = await axiosInstance.get(endpoints.maintenance.getMaintenance);
    console.log("getMaintenance response ===>", response.data.records);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMaintenanceOne = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.maintenance.getMaintenanceOne}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};