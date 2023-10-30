/**取得IGX的otp_id
 * 返回identity, otp_id, isFetching
 */
// import { useState } from 'react';
import { useCustom, useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { API_URL } from '@/utils';

export const useIgxTopId = () => {
    // const [otpId, setOtpId] = useState('');
    const { data: identity } = useGetIdentity<TMe>();
    const { data, isFetching } = useCustom({
        url: `${API_URL}/api/igx/login-11a`,
        method: 'post',
        config: {
            query: {
                login_id: identity?.id,
                name: identity?.username,
            },
        },
        queryOptions: {
            enabled: !!identity?.id,
        },
    });
    // if (data?.data) return

    return { data, identity, isFetching };
};
