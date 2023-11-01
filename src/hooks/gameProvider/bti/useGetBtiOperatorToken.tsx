import { useCustom, useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { API_URL } from '@/utils';
import { useGetSiteSetting } from '@/hooks/useGetSiteSetting';

/**
 * 取得BTI遊戲商的token
 * 返回identity, data, isFetching
 */
export const useGetBtiOperatorToken = () => {
    const { support_game_providers } = useGetSiteSetting();
    const inSupport = support_game_providers.includes('BTI');

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
            enabled: !!identity?.id && inSupport,
        },
    });

    return { identity, data, isFetching, inSupport };
};
