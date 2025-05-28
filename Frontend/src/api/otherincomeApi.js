// src/api/otherincomeApi.js
import axiosInstance, { endpoints } from '../axios';

export const getOtherIncomes = async () => {
  try {
    const response = await axiosInstance.get(endpoints.OtherIncome.getOtherIncome);
    return response.data;
  } catch (error) {
    console.error('Error fetching other incomes:', error);
    throw error;
  }
};

export const addOtherIncome = async (income) => {
  try {
    const response = await axiosInstance.post(endpoints.OtherIncome.addOtherIncome, income);
    return response.data;
  } catch (error) {
    console.error('Error adding other income:', error);
    throw error;
  }
};

export const updateOtherIncome = async (id, income) => {
  try {
    const response = await axiosInstance.put(`${endpoints.OtherIncome.updateOtherIncome}/${id}`, income);
    return response.data;
  } catch (error) {
    console.error('Error updating other income:', error);
    throw error;
  }
};

export const deleteOtherIncome = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.OtherIncome.deleteOtherIncome}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting other income:', error);
    throw error;
  }
};

export const eventparticipent = async () => {
  try {
    const response = await axiosInstance.get(endpoints.OtherIncome.eventparticipent);
    return response.data;
  } catch (error) {
    console.error('Error fetching other income:', error);
    throw error;
  }
};

export const activityparticipent  = async () => {
  try {
    const response = await axiosInstance.get(endpoints.OtherIncome.activityparticipent);
    return response.data;
  } catch (error) {
    console.error('Error fetching other income:', error);
    throw error;
  }
};