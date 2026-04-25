import axios from "axios";

const API_URL = "https://taskflow-backend-4xqj.onrender.com";

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

    const { token, user } = response.data;

    //Guardamos token y usuario
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getToken = () => {
    return localStorage.getItem("token");
}

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};