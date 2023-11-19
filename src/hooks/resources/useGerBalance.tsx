import { useCustom, useApiUrl } from '@refinedev/core';
import { TBalance } from '@/types';
/**
 * 取得用戶餘額
 * @returns {data} Balance Array
 * @returns {boolean} isLoading
 * @param {number} userId
 */
export const useGetBalance = ({ userId }: { userId: number }) => {
    const apiUrl = useApiUrl();
    const { data: fetchData, isLoading } = useCustom<{ data: TBalance[] }>({
        url: `${apiUrl}/wallet-api/balance/get`,
        method: 'get',
        config: {
            query: {
                user_id: userId,
            },
        },
        queryOptions: {
            enabled: !!userId,
            refetchInterval: 5000,
            refetchIntervalInBackground: false,
        },
    });
    const data = fetchData?.data || undefined;
    return { data, isLoading };
};
