import { useList } from '@refinedev/core';
import { TTransaction } from '@/types';

/**
 * 傳入type, userID, pageSize預設10筆
 * type傳入的參數是一個陣列如['DEPOSIT', 'WITHDRAW']
 * @returns
 */

export const useGetTransactionRecords = ({ type, userID, pageSize = 10 }: { type: string[]; userID: number; pageSize?: number }) => {
    //取得交易紀錄
    const { data, isLoading } = useList<TTransaction>({
        resource: 'transaction-records',
        meta: {
            populate: {
                user: {
                    fields: ['id'],
                },
            },
        },
        filters: [
            {
                field: 'user.id',
                operator: 'eq',
                value: userID,
            },
            {
                field: 'type',
                operator: 'in',
                value: type,
            },
        ],
        pagination: {
            mode: 'client', //要怎麼設定成service端分頁同時又出現分頁
            pageSize: pageSize,
        },
    });
    // 將 data 和 isLoading 包裝在物件中並 返回
    return {
        data,
        isLoading,
    };
};
