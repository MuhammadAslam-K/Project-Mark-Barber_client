import axios from "axios";

const authURL = import.meta.env.VITE_SERVER_PORT;

export const adminAxios = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "application/json",
    },
});

adminAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

