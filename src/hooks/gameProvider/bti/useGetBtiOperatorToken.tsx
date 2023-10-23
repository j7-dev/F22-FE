import { useCustom, useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { API_URL } from '@/utils';

export const useGetBtiOperatorToken = () => {
    const { data: user } = useGetIdentity<TMe>();
    const { data, isFetching } = useCustom({
        url: `${API_URL}/api/bti-token-infos/${user?.id}`,
        method: 'get',
        queryOptions: {
            enabled: !!user?.id,
        },
    });
    console.log('🚀 ~ data:', data);

    return { data, isFetching };
};
