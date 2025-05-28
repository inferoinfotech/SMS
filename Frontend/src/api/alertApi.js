import axiosInstance, { endpoints } from '../axios';
export const createAlert = async (alertData) => {
    try {
      const response = await axiosInstance.post(endpoints.alert.addAlert, alertData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };