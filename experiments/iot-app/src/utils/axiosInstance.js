import axios from 'axios';

const baseURL = 'http://localhost';
const port = '8888';

const axiosInstance = axios.create({
    baseURL: `${baseURL}:${port}`,
    timeout: 5001
});

export default axiosInstance;