import axios from "axios";
import store from "../Components/redux/store";

const instance = axios.create({
    baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(
    (config) => {
        const authData = JSON.parse(localStorage.getItem('auth') || '{}');
        const state = store.getState();
        const jwt = state.auth.jwt || authData.jwt;

        if (jwt) {
            config.headers['Authorization'] = `${jwt}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);



export default instance;