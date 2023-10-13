import { useCustom, useApiUrl } from '@refinedev/core';

const useDpWdUserInfo = ({ user_id }: { user_id: number }) => {
    const apiUrl = useApiUrl();
    const result = useCustom({
        url: `${apiUrl}/utility/dp-wd/user-info`,
        method: 'get',
        config: {
            query: {
                user_id,
            },
        },
    });

    return result;
};

export default useDpWdUserInfo;
