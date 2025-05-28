// src/api/securityGuardApi.js
import axiosInstance, { endpoints } from '../axios';

export const getSecurityGuards = async () => {
  try {
    const response = await axiosInstance.get(endpoints.securityGuard.getSecurityGuard);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const updatedResponse = response.data.data.map(guard => ({
      ...guard,
      photo: guard.photo ? `${baseURL}/uploads/${guard.photo}` : null,
      aadharCard: guard.aadharCard ? `${baseURL}/${guard.aadharCard}` : null
    }));
    return updatedResponse;
  } catch (error) {
    throw error;
  }
};

export const addSecurityGuard = async (guardData) => {
  try {
    const response = await axiosInstance.post(endpoints.securityGuard.addSecurityGuard, guardData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSecurityGuard = async (id, guardData) => {
  try {
    const response = await axiosInstance.put(endpoints.securityGuard.updateSecurityGuard(id), guardData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSecurityGuard = async (id) => {
  try {
    const response = await axiosInstance.delete(endpoints.securityGuard.deleteSecurityGuard(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};
