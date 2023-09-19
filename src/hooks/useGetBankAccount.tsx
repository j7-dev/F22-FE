import { useGetIdentity, useList } from '@refinedev/core';

export const useGetBankAccount = () => {
    const { data: identity } = useGetIdentity<{ id: number }>();
    // console.log('identity', identity);
    const { data, isLoading } = useList({
        resource: 'bank-accounts',
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'user.id',
                operator: 'eq',
                value: identity?.id,
            },
        ],
    });
    // 將 data 和 isLoading 包裝在物件中並返回
    return {
        data,
        isLoading,
    };
};
