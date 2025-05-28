import axiosInstance, { endpoints } from "../axios";
export const getOwnPolls = async () => {
    try {
        const response = await axiosInstance.get(endpoints.polls.getownPolls);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPoll = async (pollData) => {
    try {
        const response = await axiosInstance.post(endpoints.polls.createPoll, pollData);
        return response.data;
    } catch (error) {
        console.error("Error creating poll:", error);
        throw error;
    }
};

export const newPoll = async (pollData) => {
    try {
        const response = await axiosInstance.post(endpoints.polls.getotherResidentsPolls, pollData);
        return response.data;
    } catch (error) {
        console.error("Error creating poll:", error);
        throw error;
    }
};


export const previousPolls = async () => {
    try {
        const response = await axiosInstance.get(endpoints.polls.getAllperiousPolls);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitPoll = async (pollData) => {
    try {
        const response = await axiosInstance.post(endpoints.polls.submitPoll, pollData);
        return response.data;
    } catch (error) {
        console.error("Error submitting poll:", error);
        throw error;
    }
};

