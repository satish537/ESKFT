import axios from 'axios';

// Create an Axios instance
const httpService = axios.create({
    baseURL: 'http://localhost:3000/', // Set your base URL
});


// Request interceptor
httpService.interceptors.request.use(
    (config) => {
        // Log the request details
        // { method: config.method, url: config.url, headers: config.headers, data: config.data }
        return config; // Important to return the config!
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
httpService.interceptors.response.use(
    (response) => {
        // Log the response details
        return response; // Important to return the response!
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpService;