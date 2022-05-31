import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_DOMAIN,
    headers: {
        "Content-type": "application/json"
    }
})

export default api;