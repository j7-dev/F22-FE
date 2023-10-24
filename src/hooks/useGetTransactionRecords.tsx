import { HttpError } from '@refinedev/core';
import { useTable } from '@refinedev/antd';

/**
 * 傳入type, userID, pageSize預設10筆
 * type傳入的參數是一個陣列如['DEPOSIT', 'WITHDRAW']
 * @returns
 */

export const useGetTransactionRecords = ({ type, userID, pageSize = 10 }: { type: string[]; userID: number; pageSize?: number }) => {
    //取得交易紀錄
    const { tableProps } = useTable<HttpError>({
        resource: 'transaction-records',
        meta: {
            populate: {
                user: {
                    fields: ['id'],
                },
            },
        },
        filters: {
            initial: [
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
        },
        pagination: {
            mode: 'server',
            pageSize: pageSize,
        },
    });

    // 將 tableProps 包裝在物件中並 返回
    return {
        tableProps,
    };
};
