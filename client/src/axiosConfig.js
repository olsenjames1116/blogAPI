import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL || 'http://localhost:4000/api',
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (
			error.response.status === 403 &&
			originalRequest.url === '/user/refresh'
		) {
			cookies.remove('accessToken');
			cookies.remove('refreshToken');
			cookies.remove('username');
			localStorage.removeItem('isLoggedIn');
			localStorage.removeItem('isAdmin');
			document.location.href = '/';
			return await api.get('/user/log-out');
		}

		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const response = await api.get('/user/refresh');
				const { accessToken, refreshToken, username } = response.data;
				cookies.set('accessToken', accessToken);
				cookies.set('refreshToken', refreshToken);
				cookies.set('username', username);
				return await api.get(originalRequest.url);
			} catch {
				return await api.get('/user/log-out');
			}
		}
		return Promise.reject(error);
	}
);

export default api;
