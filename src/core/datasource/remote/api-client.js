import { getItem } from '../local/local-storage';
import axios from 'axios';

const BASE_BE_URL = import.meta.env.VITE_APP_BE_URL;
if (!BASE_BE_URL) {
	throw new Error('Rest not defined!');
}

const REST_API = `${BASE_BE_URL}/api`;
const apiClient = axios.create({
	baseURL: REST_API,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
});

const requestHandler = (request) => {
	const auth = getItem('auth', true);
	const lang = localStorage.getItem('i18nextLng') || 'en';
	const { accessToken = '' } = auth.token || {};

	request.headers['Authorization'] = `Bearer ${accessToken}`;
	request.headers['Accept-Language'] = lang;

	return request;
}

const requestErrorHandler = (error) => {
	return Promise.reject(error);
}

const responseHandler = (response) => {
	return response;
}

const responseErrorHandler = async (error) => {
	// Do something with response error before they thrown to catch block.
	if (error) {
		const originalRequest = error.config;

		if (error.response) {
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				// TODO: Handle this to renew token
				const result = true; // await renewToken();
				if (result) {
					return apiClient(originalRequest);
				}
			}
		}
	}

	return Promise.reject(error);
}

// axios.defaults.withCredentials = true;
apiClient.interceptors.request.use(requestHandler, requestErrorHandler);
apiClient.interceptors.response.use(responseHandler, responseErrorHandler);

export default apiClient;