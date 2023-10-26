import axios from "axios";

const authURL = import.meta.env.VITE_SERVER_PORT;

export const staffAxios = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "application/json",
    },
});

staffAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('staffToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

