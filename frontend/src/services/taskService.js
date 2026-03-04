import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

export const createTask = async (userId, task) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}`, task);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const getTasksByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const updateTask = async (userId, taskId, task) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}/${taskId}`, task);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const deleteTask = async (userId, taskId) => {
    try {
        await axios.delete(`${API_URL}/${userId}/${taskId}`);
    }  catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};