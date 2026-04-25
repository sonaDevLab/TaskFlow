import axios from "axios";

const api = axios.create({
   baseURL: "https://taskflow-backend-4xqj.onrender.com"
});

// Interceptor para agregar Authorization header automátiacmente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;