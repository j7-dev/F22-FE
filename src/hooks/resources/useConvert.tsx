import { useCustomMutation, useGetIdentity, useApiUrl, useInvalidate } from '@refinedev/core';
import { notification } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { TTransactionFields, TMe } from '@/types';
/**
 * @module useConvert
 * 將Rolling Point(洗碼)轉換成Cash(現金)(1:1)=>現金前端叫Total Balance
 * TURNOVER_BONUS_TO_CASH
 * 洗碼負數TURNOVER_BONUS
 * 現金正數CASH
 */
export const useConvert = () => {
    const invalidate = useInvalidate();
    const queryClient = useQueryClient();
    const { mutate: add, isLoading } = useCustomMutation<TTransactionFields>();
    const { data: identity } = useGetIdentity<TMe>();
    const updated_by_user_id = identity?.id;
    const apiUrl = useApiUrl();
    const handleClick = ({ rollingPoint }: { rollingPoint?: number }) => {
        add(
            {
                url: `${apiUrl}/wallet-api/balance/add`,
                method: 'post',
                values: {
                    amount: rollingPoint, //FIXME 要怎麼帶兩個金額參數
                    amount_type: 'CASH',
                    by: 'USER',
                    userId: updated_by_user_id,
                },
            },
            {
                onSuccess: () => {
                    invalidate({
                        resource: 'users',
                        invalidates: ['all'],
                    });
                    queryClient.invalidateQueries(['wallet-api', 'balance', 'get']);
                    notification.success({
                        key: 'add balance',
                        message: 'Convert Rolling Point To Cash',
                    });
                },
            },
        );
    };
    return { handleClick, isLoading };
};
