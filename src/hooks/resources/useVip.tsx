import { useList, useGetIdentity } from '@refinedev/core';
import { sortBy } from 'lodash-es';
import { TMe, TVip } from '@/types';

export const useVip = () => {
    const { data: user } = useGetIdentity<TMe>();
    const vip_id = user?.vip?.id;
    if (!user || !vip_id) return null;

    const { data: vipData } = useList({
        resource: 'vips',
        pagination: {
            pageSize: 20,
        },
        filters: [
            {
                field: 'activated',
                operator: 'eq',
                value: true,
            },
            {
                field: 'order',
                operator: 'nnull',
                value: true,
            },
        ],
    });
    const vips = (vipData?.data || []) as TVip[];
    const sortedVips = sortBy(vips, ['order']);

    //find index of vip_id
    const index = sortedVips.findIndex((vip) => vip.id === vip_id);
    const nextVip = sortedVips?.[index + 1] || null;
    const prevVip = sortedVips?.[index - 1] || null;
    const diff = {
        deposit_upgrade_threshold: nextVip?.deposit_upgrade_threshold - user?.deposit,
        valid_bet_amount_upgrade_threshold: nextVip?.valid_bet_amount_upgrade_threshold - user?.validBetAmount,
    };

    return {
        nextVip,
        prevVip,
        diff,
    };
};
