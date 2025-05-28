// src/api/residentApi.js
import axiosInstance, { endpoints } from "../axios";

export const createResident = async (residentData) => {
  try {
    const response = await axiosInstance.post(endpoints.resident.create, residentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};