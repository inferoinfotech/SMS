// forgetPassApi.js
import axiosInstance, { endpoints } from '../axios';

export const sendForgotPasswordEmail = async (email) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.forgotPassword, { email });
    return response.data; // You can modify this as per your response structure
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while sending the forgot password request';
  }
};
