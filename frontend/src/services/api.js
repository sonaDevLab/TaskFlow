import axios from "axios";

const api = axios.create({
   baseURL: "https://taskflow-production-2900.up.railway.app"
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