import { useCustom, useGetIdentity } from '@refinedev/core';
import { F22_API_URL, F22_TOKEN } from 'utils/env';

interface PostUniqueCheckResponse {
    balances: {
        amount: string;
        currency: string;
    }[];
    username: string;
    vip: string;
}

export const useUserAPI = () => {
    // console.log('useUserAPI');
    const { data: identity } = useGetIdentity<{ id: number }>();

    const apiUrl = `${F22_API_URL}/users/${identity?.id}`;
    const apiToken = F22_TOKEN;
    const headers = {
        Authorization: `Bearer ${apiToken}`,
    };
    const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
        url: apiUrl,
        method: 'get',
        config: {
            headers: headers,
            query: {
                'populate[0]': 'balances',
                'populate[1]': 'vip',
            },
        },
    });

    console.log('data', data);

    // 將 data 和 isLoading 包裝在物件中並返回
    const apiData = {
        data,
        isLoading,
    };
    return apiData;
};
