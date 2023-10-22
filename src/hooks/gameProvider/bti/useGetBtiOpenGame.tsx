import { useCustom, useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { API_URL } from '@/utils';

export const useGetBtiOpenGame = () => {
    const { data: user } = useGetIdentity<TMe>();
    const { data, isFetching } = useCustom({
        url: `${API_URL}/api/bti/opengame`,
        method: 'get',
        // dependency query
        config: {
            query: {
                user_id: user?.id,
            },
        },
        queryOptions: {
            enabled: !!user?.id,
        },
    });

    return { data, isFetching };
};
