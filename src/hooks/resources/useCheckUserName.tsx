/**
 * useCheckUserName
 * 暴露一個checkUserName方法，用於檢查用戶名是否已存在
 */
import { useList } from '@refinedev/core';
export const useCheckUserName = () => {
    const checkUserName = async (username: string): Promise<boolean> => {
        const { data } = useList({
            resource: 'users',
            filters: [
                {
                    field: 'username',
                    operator: 'eq',
                    value: username,
                },
            ],
        });

        if (data && data?.total > 0) return true;
        return false;
    };
    return {
        checkUserName,
    };
};
