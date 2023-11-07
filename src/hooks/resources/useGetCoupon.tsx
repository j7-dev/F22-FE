/**
 * 取得coupon 紀錄
 * 傳入userID, pageSize預設10筆
 * @returns
 */
import { HttpError } from '@refinedev/core';
import { useTable } from '@refinedev/antd';

export const useGetCoupon = ({ userID, pageSize = 10 }: { userID?: number; pageSize?: number }) => {
    const { tableProps } = useTable<HttpError>({
        resource: 'coupons',
        meta: {
            populate: '*',
        },
        filters: {
            initial: [
                {
                    field: 'users.id',
                    operator: 'eq',
                    value: userID,
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
