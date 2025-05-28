// resetpassApi.js
import axiosInstance, { endpoints } from '../axios';

/**
 * Function to reset the admin password
 * @param {Object} data - The data for the reset password request
 * @returns {Promise} - Axios promise
 */
export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.resetPassword, data);
    return response.data;
  } catch (error) {
    console.error('Error in resetPassword API:', error);
    throw error.response?.data || { message: 'Something went wrong!' };
  }
};
