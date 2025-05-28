// societyApi.js
import axiosInstance, { endpoints } from "../axios";

export const createSociety = async (societyData) => {
  const URL = endpoints.society.create;
//   const token = 'Society_Management_System'; // Ensure this token is correct
  try {
    const response = await axiosInstance.post( URL, societyData );

    if (response.status === 201) {
      console.log("Society Successfully Created Just Now..!!");
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error("Error creating society: Conflict", error.response.data);
      throw new Error("Society already exists. Please try a different name.");
    } else {
      console.error("Error creating society:", error);
      throw new Error("Failed to create society. Please try again.");
    }
  }
};

export const getAllSociety = async () => {
  try {
    const response = await axiosInstance.get(endpoints.society.getAll);
    console.log("response :", response);
    
    if (Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error("API did not return an array of societies", response.data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch societies", error);
    throw new Error("Failed to fetch societies. Please try again.");
  }
};


export const getSocietyById = async (id) => {
  try {
    const response = await axiosInstance.get(endpoints.society.getbyId(id));
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch society by ID", error);
    throw new Error("Failed to fetch society by ID. Please try again.");
  }
};