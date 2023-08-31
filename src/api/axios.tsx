import axios, { AxiosInstance } from 'axios';
import { apiUrl, apiTimeout } from '@/utils';

// TODO STRAPI API

const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: parseInt(apiTimeout, 10),
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response) =>
        // Any status code that lie within the range of 2xx cause this function to trigger

        // const type = response?.data?.type
        // const method = response?.config?.method || ''
        // const statusText = response?.statusText
        // const typeText = getTypeText(type, method, statusText)
        // if (method !== 'get') {
        //   console.log(`${typeText} success`)
        // }

        response,
    async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger

        console.log('error', error);

        return Promise.reject(error);
    },
);

export default instance;
