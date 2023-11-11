/**
 * useCheckUserName
 * 暴露一個checkUserName方法，用於檢查用戶名是否已存在
 */
import { API_URL } from '@/utils';
import { useCustom } from '@refinedev/core';
export const useCheckUserName = () => {
    const checkUserName = (username: string) => {
        console.log('🚀 ~ username:', username);
        const { data } = useCustom({
            url: `${API_URL}/api/utility/users/can-register`,
            method: 'get',
            config: {
                query: {
                    username: username,
                },
            },
        });
        if (data) return data;
    };
    return {
        checkUserName,
    };
};
