import { useCustom, useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { API_URL } from '@/utils';

/**
 * 取得BTI遊戲商的token
 * 返回identity, data, isFetching
 */
export const useGetBtiOperatorToken = () => {
    const { data: identity } = useGetIdentity<TMe>();
    const { data, isFetching } = useCustom({
        url: `${API_URL}/api/bti/token-info`,
        method: 'get',
        config: {
            query: {
                user_id: identity?.id,
            },
        },
        queryOptions: {
            enabled: !!identity?.id,
        },
    });

    return { identity, data, isFetching };
};
