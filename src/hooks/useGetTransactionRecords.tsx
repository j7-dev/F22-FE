import { useGetIdentity, useList } from '@refinedev/core';
import { TUser, TTransaction } from '@/types';

export const useGetTransactionRecords = (props: any) => {
    //這個要怎麼設定型別?
    //目的在於這支hook可以被重複使用，所以props要可以傳入不同的型別
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
