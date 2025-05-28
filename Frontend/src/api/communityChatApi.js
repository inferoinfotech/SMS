import axiosInstance, { endpoints } from '../axios';

export const getAllMembers = async () => {
  try {
    const response = await axiosInstance.get(endpoints.chatWith.getAllMembers);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat members:', error);
    throw error;
  }
};