// src/api/securityManagementApi.js
import axiosInstance, { endpoints } from '../axios';

// Function to get all security protocols
export const getSecurityProtocols = async () => {
  try {
    const response = await axiosInstance.get(endpoints.securityManagement.getSecurity);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a new security protocol
export const createSecurityProtocol = async (protocol) => {
  try {
    const response = await axiosInstance.post(endpoints.securityManagement.addSecurity, protocol);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a security protocol
export const updateSecurityProtocol = async (id, protocol) => {
  try {
    const response = await axiosInstance.put(endpoints.securityManagement.updteSecurity(id), protocol);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a security protocol (soft delete)
export const deleteSecurityProtocol = async (id) => {
  try {
    const response = await axiosInstance.delete(endpoints.securityManagement.deleteSecurity(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};  


export const getSecurityProtocolsResident = async () => {
  try {
    const response = await axiosInstance.get(endpoints.securityManagementResident.getSecurityResident);
    return response.data;
  } catch (error) {
    throw error;
  }
};
