import axiosInstance, { endpoints } from '../axios';

export const getAdminProfileDetails = async (token) => {  
  try {
    const URL = endpoints.auth.getAdmin;
    const response = await axiosInstance.get(URL);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const updatedResponse = {
      ...response.data.data,
      profileImage: response.data.data.profileImage ? `${baseURL}/uploads/${response.data.data.profileImage}` : null
    };
    
    return updatedResponse;
  } catch (error) {
    console.error('Error getting admin profile details:', error);
    throw error;
  }
};

export const updateAdminProfile = async (token, formData) => {
  try {
    const URL = endpoints.auth.updateAdmin;
    const response = await axiosInstance.put(URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Res Z:", response );
    return response.data.data;
  } catch (error) {
    console.error('Error updating admin profile:', error);
    throw error;
  }
};

export const getUserProfileDetails = async (residentId) => {
  try {
    const URL = `${endpoints.userPersonalDetail.getuserprofile}/${residentId}`;
    const response = await axiosInstance.get(URL);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const updatedResponse = {
      ...response.data,
      profileImage: response.data.images.profilePhoto
        ? `${baseURL}/uploads/${response.data.images.profilePhoto}`
        : null,
    };
    return updatedResponse;
  } catch (error) {
    console.error("Error getting user profile details:", error);
    throw error;
  }
};
export const getSecurityGuardProfile = async (securityId) => {
  try {
    const URL = `${endpoints.securityGuardprofile.getSecurityGuardProfile}/${securityId}`;
    const response = await axiosInstance.get(URL);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const updatedResponse = {
      ...response.data.data,
      photo: response.data.data.photo
        ? `${baseURL}/${response.data.data.photo}`
        : null,
      aadharCard: response.data.data.aadharCard
        ? `${baseURL}/${response.data.data.aadharCard}`
        : null,
    };
    return updatedResponse;
  } catch (error) {
    console.error("Error getting security guard profile details:", error);
    throw error;
  }
};