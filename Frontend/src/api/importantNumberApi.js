
import axiosInstance, { endpoints } from '../axios';

export const addImportantNumber = async (number) => {
  try {
    const URL = endpoints.importantNumbers.add;
    const response = await axiosInstance.post(URL, number);
    return response.data.data;
  } catch (error) {
    console.error('Error adding important number:', error);
    throw error.response.data;
  }
};

export const getImportantNumbers = async () => {
  try {
    const URL = endpoints.importantNumbers.getAll;
    const response = await axiosInstance.get(URL);
    return response.data.data;
  } catch (error) {
    console.error('Error getting important numbers:', error);
    throw error.response.data;
  }
};

export const updateImportantNumber = async (id, number) => {
  try {
    const URL = endpoints.importantNumbers.update(id);
    const response = await axiosInstance.put(URL, number);
    return response.data.data;
  } catch (error) {
    console.error('Error updating important number:', error);
    throw error.response.data;
  }
};

export const deleteImportantNumber = async (id) => {
  try {
    const URL = endpoints.importantNumbers.delete(id);
    const response = await axiosInstance.delete(URL);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting important number:', error);
    throw error.response.data;
  }
};


export const getImportantNumbersForResident = async () => {
  try {
    const URL = endpoints.importantNumbers.getAllForResident;
    const response = await axiosInstance.get(URL);
    return response.data.data;
  } catch (error) {
    console.error('Error getting important numbers:', error);
    throw error.response.data;
  }
};


export const getMaintencePending = async () => {
  try {
    const URL = endpoints.getPendingMaintence.getPendingMaintence;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error getting maintenance:', error);
    throw error.response.data;
  }
};

export const getUpcomingactivity = async () => {
  try {
    const URL = endpoints.getPendingMaintence.getUpcomingactivity;
    const response = await axiosInstance.get(URL);

    // Return the response data directly if it's an array
    return response.data; // This should be the array of records
  } catch (error) {
    console.error('Error getting all announcements numbers:', error);
    throw error.response.data;
  }
};

export const getalltotal = async () => {
  try {
    const URL = endpoints.getPendingMaintence.getalltotal;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error getting total numbers:', error);
    throw error.response.data;
  }
}

export const getchart = async () => {
  try {
    const URL = endpoints.getPendingMaintence.getchart;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error getting total numbers:', error);
    throw error.response.data;
  }
}

export const getresidentPendingMaintence = async () => {
  try {
    const URL = endpoints.residentdashbord.getresidentPendingMaintence;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching resident pending maintenance:', error);
    throw error.response.data;
  }
};
export const getresidentUpcomingactivity = async () => {
  try {
    const URL = endpoints.residentdashbord.getresidentUpcomingactivity;
    const response = await axiosInstance.get(URL);

    // Return the response data directly if it's an array
    return response.data; // This should be the array of records
  } catch (error) {
    console.error('Error getting resident upcoming activities:', error);
    throw error.response.data;
  }
};

export const getresidentalltotal = async () => {
  try {
    const URL = endpoints.residentdashbord.getresidentalltotal;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error getting total numbers:', error);
    throw error.response.data;
  }
}