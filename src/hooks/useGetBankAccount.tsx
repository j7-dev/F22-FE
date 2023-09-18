import { useGetIdentity, useList } from '@refinedev/core';
// import { F22_API_URL, F22_TOKEN } from 'utils/env';

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
    // const apiUrl = `${F22_API_URL}/users/${identity?.id}`;
    // const apiToken = F22_TOKEN;
    // const headers = {
    //     Authorization: `Bearer ${apiToken}`,
    // };
    // const { data, isLoading } = useCustom({
    //     url: apiUrl,
    //     method: 'get',
    //     config: {
    //         headers: headers,
    //         query: {
    //             'populate[0]': 'bank_accounts',
    //         },
    //     },
    //     queryOptions: {
    //         queryKey: ['useGetBankAccount'],
    //     },
    // });
    // 將 data 和 isLoading 包裝在物件中並返回
    return {
        data,
        isLoading,
    };
};
