import api from "./api.js";

const API_URL = "/tasks";

export const createTask = async (task) => {
    try {
        const response = await api.post(API_URL, task);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const updateTask = async (taskId, task) => {
    try {
        const response = await api.put(`${API_URL}/${taskId}`, task);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        await api.delete(`${API_URL}/${taskId}`);
    }  catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const toggleTask = async (taskId) => {
    try{
        const response = await api.patch(`${API_URL}/${taskId}/completed`);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};