import { AuthBindings } from '@refinedev/core';
import { AuthHelper } from './AuthHelper';
import { API_URL } from '@/utils';
import { axiosInstance } from '@/providers/strapi-v4/';
import axios from 'axios';
import { notification } from 'antd';

const strapiAuthHelper = AuthHelper(`${API_URL}/api`);

export const authProvider: AuthBindings = {
    login: async (props) => {
        const userName = props?.userName || props?.email || '';
        const password = props?.password || '';
        const redirectPath = props?.redirectPath || '/refine/home';

        const loginResult = await strapiAuthHelper.login(userName, password);
        const confirmed = loginResult?.data?.user?.confirmed || false;

        if (!confirmed) {
            const message = 'Your account is not confirmed yet';
            notification.error({
                message,
            });

            return {
                success: false,
                error: {
                    message: 'Login Failed',
                    name: message,
                },
            };
        }

        if (loginResult.status === 200 && confirmed) {
            const token = loginResult.data.jwt;
            localStorage.setItem('API_TOKEN', token);

            // set header axios instance
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            //TODO 這邊加了setTimeout會導致無法跳轉=>這麼加是因為要等待localStorage.setItem寫入完成(AI產生)=>為啥???
            // setTimeout(() => {
            //     return {
            //         success: true,
            //         redirectTo: redirectPath,
            //     };
            // }, 0);
            return {
                success: true,
                redirectTo: redirectPath,
            };
        }
        return {
            success: false,
            error: {
                message: 'Login Failed',
                name: 'Invalid username or password',
            },
        };
    },
    logout: async (props) => {
        const redirectPath = props?.redirectPath || '/';
        localStorage.removeItem('API_TOKEN');
        return {
            success: true,
            redirectTo: redirectPath,
        };
    },
    register: async (props) => {
        const userName = props?.userName || '';
        const userEmail = props?.userEmail || '';
        const userPhone = props?.userPhone || '';
        const password = props?.password || '';
        const redirectPath = props?.redirectPath || '/';
        const url = `${API_URL}/api/auth/local/register`;
        const registerPayload = {
            username: userName,
            email: userEmail,
            password: password,
            phone: userPhone,
        };
        const { data, status } = await axios.post(url, registerPayload);

        const loginResult = await strapiAuthHelper.login(userName, password);
        const confirmed = loginResult?.data?.user?.confirmed || false;

        if (!confirmed) {
            const message = 'You have registered successfully, please wait for the administrator to confirm it.';
            notification.error({
                message,
            });

            return {
                success: false,
                error: {
                    message: 'Login Failed',
                    name: message,
                },
            };
        }

        if (status === 200 && confirmed) {
            const token = data?.jwt || '';
            localStorage.setItem('API_TOKEN', token);
            // set header axios instance
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return {
                success: true,
                redirectTo: redirectPath,
            };
        }
        return {
            success: false,
            error: {
                message: data.error.message,
                name: data.error.name,
            },
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = localStorage.getItem('API_TOKEN');
        // TODO 跟後端CHECK
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: 'Check failed',
                name: 'Token not found',
            },
            logout: true,
            redirectTo: '/login',
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = localStorage.getItem('API_TOKEN');
        if (!token) {
            return null;
        }

        const { data, status } = await strapiAuthHelper.me(token, {
            meta: {
                populate: '*',
            },
        });

        if (status === 200) {
            return data;
        }

        return null;
    },
};
