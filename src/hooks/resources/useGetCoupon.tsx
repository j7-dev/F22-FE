/**
 * 取得coupon 紀錄
 * 傳入userID, pageSize預設10筆
 * @returns
 */
import { HttpError } from '@refinedev/core';
import { useTable } from '@refinedev/antd';
import dayjs from 'dayjs';

export const useGetCoupon = ({ userID, pageSize = 10 }: { userID?: number; pageSize?: number }) => {
    //取得當前時間
    const now = dayjs();
    const { tableProps } = useTable<HttpError>({
        resource: 'coupons',
        meta: {
            populate: '*',
        },
        filters: {
            initial: [
                {
                    field: 'user.id',
                    operator: 'eq',
                    value: userID,
                },
                //篩選沒有period的coupon或是開始時間小於當前時間的coupon
                {
                    operator: 'or',
                    value: [
                        {
                            field: 'period.start_datetime',
                            operator: 'null',
                            value: true,
                        },
                        {
                            operator: 'and',
                            value: [
                                {
                                    field: 'period.start_datetime',
                                    operator: 'nnull',
                                    value: true,
                                },
                                //篩選掉尚未開始的coupon=>開始時間小於當前時間才會顯示
                                {
                                    field: 'period.start_datetime',
                                    operator: 'lte',
                                    value: now.unix(),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        pagination: {
            mode: 'server',
            pageSize: pageSize,
        },
        sorters: {
            initial: [{ field: 'createdAt', order: 'desc' }],
        },
        queryOptions: {
            enabled: userID !== undefined,
        },
    });
    return {
        tableProps,
    };
};
