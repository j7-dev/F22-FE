import { notification } from 'antd';
import axios from 'axios';
import { IS_LOCAL } from '@/utils';

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
            if (!IS_LOCAL) {
                sessionStorage.removeItem('API_TOKEN');
            }
            notification.error({
                message,
            });
            return Promise.reject(error);
        }
    },
);

export { axiosInstance };
