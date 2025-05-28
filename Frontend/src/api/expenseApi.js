import axiosInstance, { endpoints } from '../axios';

export const getExpense = async () => {
  try {
    const response = await axiosInstance.get(endpoints.expense.getExpense);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createExpense = async (expenseData) => {
  try {
    const response = await axiosInstance.post(endpoints.expense.addExpense, expenseData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExpense = async (expenseId, expenseData) => {
  try {
    const response = await axiosInstance.put(endpoints.expense.updateExpense(expenseId), expenseData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axiosInstance.delete(endpoints.expense.deleteExpense(expenseId));
    return response.data;
  } catch (error) {
    throw error;
  }
};