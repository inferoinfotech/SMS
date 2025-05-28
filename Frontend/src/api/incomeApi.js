import axiosInstance, { endpoints } from '../axios';

export const getIncome = async () => {
  try {
    const response = await axiosInstance.get(endpoints.income.getIncome);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createIncome = async (incomeData) => {
    try {
      const response = await axiosInstance.post(endpoints.income.addIncome, incomeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateIncome = async (incomeId, incomeData) => {
    try {
      const response = await axiosInstance.put(endpoints.income.updateIncome(incomeId), incomeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
 
  export const deleteIncome = async (incomeId) => {
    try {
      const response = await axiosInstance.delete(endpoints.income.deleteIncome(incomeId));
      return response.data;
    } catch (error) {
      throw error;
    }
  };