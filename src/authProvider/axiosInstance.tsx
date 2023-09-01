// import { HttpError } from '@refinedev/core';
import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// axiosInstance.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 			const customError: HttpError = {
// 					...error,
// 					message: error.response?.data?.message,
// 					statusCode: error.response?.status,
// 			};

// 			return Promise.reject(customError);
// 	},
// );

export { axiosInstance };
