import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:8000/api/',
	timeout: 10000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error?.response?.data?.detail ||
			error?.response?.data?.message ||
			error?.message ||
			'Error de red';
		return Promise.reject(new Error(message));
	}
);

export const STUDENT_KEY = '2511101ALLC';

