/**
 * useCheckUserName
 * 暴露一個checkUserName方法，用於檢查用戶名是否已存在
 */
import { API_URL } from '@/utils';
import axios from 'axios';

export const useCheckUserName = () => {
    const checkUserName = async (username: string) => {
        try {
            const response = await axios.get(`${API_URL}/api/utility/users/can-register`, {
                params: {
                    username: username,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    return {
        checkUserName,
    };
};
