import axiosInstance, { endpoints } from '../axios';


export const getFacilities  = async () => {
    try {
      const URL = endpoints.facility.getFacility;
      const response = await axiosInstance.get(URL);
      return response.data;
    } catch (error) {
      console.error('Error getting important numbers:', error);
      throw error.response.data;
    }
  };

export const getFacilitiesResident  = async () => {
  try {
    const URL = endpoints.facility.getFacilityResident;
    const response = await axiosInstance.get(URL);
    console.log(response,"facility");
    
    return response.data;
  } catch (error) {
    console.error('Error getting important numbers:', error);
    throw error.response.data;
  }
};

export const createFacility = async (facilityData) => {
    try {
        const response = await axiosInstance.post(endpoints.facility.createFacility, facilityData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
export const updateFacility = async (facilityId, facilityData) => {
  try {
    const response = await axiosInstance.put(endpoints.facility.updateFacility(facilityId), facilityData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFacility = async (id) => {
  try {
      const response = await axiosInstance.delete(`${endpoints.facility.deleteFacility}/${id}`);
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : error.message;
  }
};
