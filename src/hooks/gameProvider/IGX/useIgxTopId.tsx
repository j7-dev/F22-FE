/**取得IGX的otp_id
 * 返回identity, otp_id, isFetching
 */
import { useState, useEffect } from 'react';
import { useGetIdentity, useCustom } from '@refinedev/core';
import { TMe } from '@/types';
import { API_URL } from '@/utils';
import { XMLParser } from 'fast-xml-parser';

export const useIgxTopId = () => {
    const [otpId, setOtpId] = useState('');
    const [gameServer, setGameServer] = useState('');
    const parser = new XMLParser();
    const { data: identity } = useGetIdentity<TMe>();
    const { data: otpData, isFetching } = useCustom({
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
    useEffect(() => {
        if (otpData) {
            setOtpId(parser.parse(otpData?.data as unknown as string).get_otp_id.otp_id);
            setGameServer(parser.parse(otpData?.data as unknown as string).get_otp_id.game_server);
        }
    }, [otpData]);
    return { identity, isFetching, otpId, gameServer };
};
