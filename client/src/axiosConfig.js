import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL || 'http://localhost:4000/api',
	withCredentials: true,
});

export default api;
