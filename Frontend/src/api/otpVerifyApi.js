// api/otpVerifyApi.js
import axiosInstance, { endpoints } from "../axios";

export const verifyOTP = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.verifyOTP, data);
    console.log("response", response);
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};
