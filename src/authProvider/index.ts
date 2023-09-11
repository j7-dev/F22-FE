import { AuthBindings } from '@refinedev/core';
import { AuthHelper } from '@refinedev/strapi-v4';
import { API_URL, API_TOKEN } from '@/utils';
import { axiosInstance } from '@/authProvider/axiosInstance';
export * from '@/authProvider/axiosInstance';

const strapiAuthHelper = AuthHelper(`${API_URL}/api`);

export const authProvider: AuthBindings = {
    login: async ({ email, password, redirectPath }) => {
        const { data, status } = await strapiAuthHelper.login(email, password);
        if (status === 200) {
            const token = data.jwt;
            localStorage.setItem(API_TOKEN, token);

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
                message: 'Login failed',
                name: 'Invalid email or password',
            },
        };
    },
    logout: async (props) => {
        const redirectPath = props?.redirectPath || '/';
        localStorage.removeItem(API_TOKEN);
        return {
            success: true,
            redirectTo: redirectPath,
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = localStorage.getItem(API_TOKEN);
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
        const token = localStorage.getItem(API_TOKEN);
        if (!token) {
            return null;
        }

        const { data, status } = await strapiAuthHelper.me(token, {
            meta: {
                populate: ['role'],
            },
        });

        if (status === 200) {
            return data;
        }

        return null;
    },
};
