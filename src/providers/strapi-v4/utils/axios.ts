import { notification } from 'antd';
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('⭐  error:', error);
        const requestUrl = error?.config?.url || '';
        const response = error?.response?.data?.error || 'Error';
        const message = typeof response === 'string' ? response : response?.message || JSON.stringify(response);

        if (!requestUrl.toLowerCase().includes('/api/users/me')) {
            notification.error({
                message,
            });
            return Promise.reject(error);
        }
    },
);

export { axiosInstance };
