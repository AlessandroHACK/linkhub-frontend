import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true // Esto es esencial para enviar cookies
});


export default api;