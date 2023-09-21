import { notification } from 'antd';
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const response = error?.response?.data?.error;
        notification.error({
            message: response?.name || 'Error',
            description: response?.message || 'Error',
        });

        return Promise.reject(error);
    },
);

export { axiosInstance };
