import { useList, useGetIdentity } from '@refinedev/core';
import { sortBy } from 'lodash-es';
import { TMe, TVip } from '@/types';

/**
 * 如果用戶有登入   且身上有VIP等級
 *
 * @returns
 * nextVip - 下個VIP等級  如果沒有  就回null
 * prevVip - 上個VIP等級  如果沒有  就回null
 * diff - 是距離下個等級還要多少存款 & 有效投注
 *
 * ⚠️需要注意的是  這邊有可能是負數@@  如果後台亂設定的化
 * 因為VIP等級排序是用一個 order的數字排
 * 如果故意把  VIP2 比VIP1  門檻還低  就會有這種狀況
 */

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
