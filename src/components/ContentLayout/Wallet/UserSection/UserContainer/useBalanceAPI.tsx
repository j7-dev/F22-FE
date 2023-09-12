import { useCustom, useGetIdentity } from '@refinedev/core';
import { F22_API_URL, F22_TOKEN } from 'utils/env';

interface PostUniqueCheckResponse {
    data: {
        amount: string;
        currency: string;
    }[];
    message: string;
    status: number;
}

export const useBalanceAPI = () => {
    console.log('useBalanceAPI');
    const { data: identity } = useGetIdentity<{ id: number }>();

    const apiUrl = `${F22_API_URL}/wallet-api/balance/get`;
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
                user_id: identity?.id,
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
