import axiosInstance, { endpoints } from "../axios";

export const createResident = async (residentData) => {
  const URL = endpoints.resident.create;
  try {
    
    const response = await axiosInstance.post(URL, residentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    if (response.status === 201) {
      console.log("Resident Successfully Created Just Now..!!");
      return response.data;
    }
  } catch (error) {
    console.error("Error creating resident:", error);
    if (error.response && error.response.status === 409) {
      console.error("Error creating resident: Conflict", error.response.data);
      throw new Error("Resident already exists. Please try a different name.");
    } else {
      console.error("Error creating resident:", error);
      throw new Error("Failed to create resident. Please try again.");
    }
  }
};


export const updateResident = async (id, residentData) => {
  try {
    const response = await axiosInstance.put(`${endpoints.resident.update}/${id}`, residentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteResident = async (wing, unit) => {
  try {
    console.log('Deleting resident with wing:', wing, 'and unit:', unit); // Log the data being sent
    const response = await axiosInstance.delete(endpoints.resident.delete, {
      data: { wing, unit },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting resident:', error);
    throw error;
  }
};


export const getAllResidents = async () => {
  try {
    const response = await axiosInstance.get(endpoints.resident.getAll);
    const baseURL = import.meta.env.VITE_BASE_URL;

    // Check if response.data is an array
    if (Array.isArray(response.data)) {
      // Map through each object in the array to add profileImage field
      const updatedResponse = response.data.map((resident) => ({
        ...resident,
        profileImage: resident.images?.profilePhoto
          ? `${baseURL}/uploads/${resident.images.profilePhoto}`
          : null,
      }));
      return updatedResponse;
    } else {
      throw new Error("Expected response.data to be an array");
    }
  } catch (error) {
    console.error("Error fetching residents:", error);
    throw error;
  }
};


export const getResidentById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.resident.getById}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const createMaintenance = async (maintenanceData) => {
  try {
    const response = await axiosInstance.post(endpoints.createMaintenance, maintenanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};