import { useCustom, useApiUrl } from '@refinedev/core';

type TDpWdUserInfo = {
    user_id: number;
    dayDp: number;
    monthDp: number;
    totalDp: number;
    dayWd: number;
    monthWd: number;
    totalWd: number;
};

const useDpWdUserInfo = ({ user_ids }: { user_ids: number[] }) => {
    const apiUrl = useApiUrl();
    const result = useCustom<{
        data: TDpWdUserInfo[];
    }>({
        url: `${apiUrl}/utility/dp-wd/user-info`,
        method: 'get',
        config: {
            query: {
                user_ids,
            },
        },
        queryOptions: {
            enabled: !!user_ids.length,
        },
    });

    return result;
};

export default useDpWdUserInfo;
