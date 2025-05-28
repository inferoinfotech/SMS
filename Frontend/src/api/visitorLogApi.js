// src/api/visitorLogApi.js

import axiosInstance, { endpoints } from '../axios';

export const getVisitorLogs = async () => {
    try {
        const response = await axiosInstance.get(endpoints.VisitorLogs.getVisitorLog);
        return response.data;
    } catch (error) {
        console.error("Error fetching visitor logs:", error);
        throw error;
    }
};

export const createVisitorLogs = async (visitorData) => {
  try {
      const response = await axiosInstance.post(endpoints.VisitorLogs.addVisitorLog, visitorData);
      return response.data;
  } catch (error) {
      console.error("Error creating visitor log:", error);
      throw error;
  }
};

export const getVisitorSecurityPannel = async () => {
  try {
      const response = await axiosInstance.get(endpoints.VisitorLogs.getvisitorLogSecurityPannel);
      return response.data;
  } catch (error) {
      console.error("Error fetching visitor logs:", error);
      throw error;
  }
};