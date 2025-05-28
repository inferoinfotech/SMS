import axiosInstance, { endpoints } from '../axios';

export const getParticipator = async () => {
  try {
    const response = await axiosInstance.get(endpoints.participation.getParticipation);
    return response.data;
  } catch (error) {
    throw error;
  }
};
