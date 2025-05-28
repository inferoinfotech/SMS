// src/api/userPersonalDetailApi.js
import axiosInstance, { endpoints } from '../axios';
import moment from "moment";

export const getUserDetailsById = async (userId) => {
  try {
    const response = await axiosInstance.get(endpoints.userPersonalDetail.getDetail(userId));
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};


export const getMaintenceDetails = async () => {
  try {
    const response = await axiosInstance.get(endpoints.userPersonalDetail.getMaintenceDetails);
    if (!Array.isArray(response.data.records)) {
      throw new Error('Expected an array of records from the API response');
    }
    const filteredRecords = response.data.records.filter(record => record.status === "Pending");
    const maintenanceData = {
      pendingMaintenance: [],
      dueMaintenance: []
    };

    filteredRecords.forEach(record => {
      const dueDate = moment(record.maintenanceDueDate);
      const now = moment();

      if (dueDate.isBefore(now)) {
        maintenanceData.pendingMaintenance.push(record);
      } else {
        maintenanceData.dueMaintenance.push(record);
      }
    });

    return maintenanceData;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getAnnouncement = async () => {
  try {
    const response = await axiosInstance.get(endpoints.userPersonalDetail.getAnnouncment);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
