/**
 * useCheckUserName
 * 暴露一個checkUserName方法，用於檢查用戶名是否已存在
 */
import { useList } from '@refinedev/core';
export const useCheckUserName = () => {
    const checkUserName = (username: string) => {
        const { data, isFetching } = useList<{ username: string }>({
            resource: 'users',
            filters: [
                {
                    field: 'username',
                    operator: 'eq',
                    value: username,
                },
            ],
        });
        return {
            isFetching,
            isExist: data?.length > 0,
        };
    };
    // const { data, isFetching } = useList<{ username: string }>({
    //     resource: 'users',
    //     filters: [
    //         {
    //             field: 'username',
    //             operator: 'eq',
    //             value: username,
    //         },
    //     ],
    // });

    return {
        checkUserName,
    };
};
