import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {email, password});

    //Guardamos usuario o token
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};