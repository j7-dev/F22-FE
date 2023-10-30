/**取得IGX的otp_id
 * 返回identity, otp_id, isFetching
 */
import { useState } from 'react';
import { useCustom, useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { API_URL } from '@/utils';
import xml2js from 'xml2js';

export const useIgxTopId = () => {
    const parseString = new xml2js.Parser({ explicitArray: true, ignoreAttrs: true });
    const [otpId, setOtpId] = useState('');
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
    if (data?.data) {
        parseString(data?.data, (err, result) => {
            if (err) {
                console.log(err);
            }
            const otpIdValue = result.get_otp_id.otp_id[0];
            setOtpId(otpIdValue);
        });
    }

    return { identity, otpId, isFetching };
};
