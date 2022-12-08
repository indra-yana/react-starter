import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';
const REST_API = `${BASE_URL}/api`;

const apiClient = axios.create({
	baseURL: REST_API,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
});

const requestHandler = (request) => {
	// TODO: Change this from local storage or state
	request.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IklKOWZGWE5jVWVGci1FVDkiLCJuYW1lIjoiSW5kcmEgTXVsaWFuYSIsInVzZXJuYW1lIjoic3VwdXNlciIsImVtYWlsIjoiaW5kcmEubmRyYTI2QGdtYWlsLmNvbSIsImVtYWlsVmVyaWZpZWRBdCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0xMi0wNlQwNzo0MjoxMS44NTVaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0wOFQwMDoyMDoyNy4xNjhaIiwiaWF0IjoxNjcwNDg2MTEwLCJleHAiOjE2NzMwNzgxMTB9.2pQcLxyVPDkDJjpzpjLIkzP_VtJ2xDBadr6gIty_vy0	`;
	request.headers['Accept-Language'] = 'id';

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