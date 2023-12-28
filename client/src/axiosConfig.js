import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL || 'http://localhost:4000/api',
	withCredentials: true,
});

const origin = import.meta.env.VITE_FRONT_URL || 'http://localhost:5173';

api.interceptors.request.use(
	function (config) {
		config.headers = {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': origin,
		};

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default api;
