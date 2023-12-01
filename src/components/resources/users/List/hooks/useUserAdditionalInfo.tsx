import { useCustom, useApiUrl } from '@refinedev/core';

type additionalInfo = {
    latestBetAt: string | null;
    referrals: number;
};

const useUserAdditionalInfo = ({ user_id }: { user_id: number }) => {
    const apiUrl = useApiUrl();
    const result = useCustom<{
        data: additionalInfo;
    }>({
        url: `${apiUrl}/utility/users/additional-info`,
        method: 'get',
        config: {
            query: {
                user_id,
            },
        },
        queryOptions: {
            enabled: !!user_id,
        },
    });

    return result?.data?.data || { data: {} };
};

export default useUserAdditionalInfo;
