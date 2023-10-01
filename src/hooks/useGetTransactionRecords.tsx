import { useGetIdentity, useList } from '@refinedev/core';
import { TUser, TTransaction } from '@/types';

export const useGetTransactionRecords = (props: { type: string[] }) => {
    //這支hook可以被重複使用，type傳入的參數是一個陣列如[DEPOSIT', 'WITHDRAW]
    const { type } = props;
    const { data: identity } = useGetIdentity<TUser>();
    // console.log('identity', identity);
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
                value: identity?.id,
            },
            {
                field: 'type',
                operator: 'in',
                value: type,
            },
        ],
    });
    // 將 data 和 isLoading 包裝在物件中並 返回
    return {
        data,
        isLoading,
    };
};
