import { AuthBindings } from '@refinedev/core';
import { AuthHelper } from './AuthHelper';
import { API_URL } from '@/utils';
import { axiosInstance } from '@/providers/strapi-v4/';
import axios from 'axios';
import { Modal } from 'antd';

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
            Modal.warning({
                centered: true,
                title: <div className="text-center">{message}</div>,
                icon: null,
                okButtonProps: {
                    className: 'w-full text-center bg-[#5932EA] rounded-2xl',
                },
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
        const { userName, userEmail, userPhone, password, bank_account, redirectPath = '/' } = props;
        const url = `${API_URL}/api/auth/local/register`;
        const registerPayload = {
            username: userName,
            email: userEmail,
            password: password,
            phone: userPhone,
            bank_account: bank_account,
        };
        const { data, status } = await axios.post(url, registerPayload);

        const loginResult = await strapiAuthHelper.login(userName, password);
        const confirmed = loginResult?.data?.user?.confirmed || false;
        //FIXME 這邊的翻譯怎麼改
        const message = 'Your account is not confirmed yet';
        if (!confirmed) {
            Modal.success({
                centered: true,
                icon: null,
                title: <div className="text-center">회원가입신청</div>,
                content: (
                    <div className="flex flex-col text-content">
                        <span>가입 신청이 완료 되었습니다. </span>
                        <span>잠시 기다려 주시면 확인 후 처리 도와 드리겠습니다</span>
                    </div>
                ),
                okButtonProps: {
                    className: 'w-full text-center bg-[#5932EA] rounded-2xl',
                },
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
