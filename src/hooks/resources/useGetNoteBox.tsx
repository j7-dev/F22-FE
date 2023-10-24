import { HttpError, useGetIdentity } from '@refinedev/core';
import { useTable } from '@refinedev/antd';
import { TMe } from '@/types';
/**
 * 使用useTable取得站內通知資料
 * @returns tableProps dataCount
 */
export const useGetNoteBox = () => {
    const { data: identity } = useGetIdentity<TMe>();

    const { tableProps } = useTable<HttpError>({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: {
            initial: [
                {
                    field: 'post_type',
                    operator: 'eq',
                    value: 'siteNotify',
                },
                //取得send_to_user_ids為null或是當前user id的資料
                // {
                //     field: 'send_to_user_ids',
                //     operator: 'in',
                //     value: identity?.id,
                // },
                // //排除hide_to_user_ids為當前user id的資料
                // {
                //     field: 'hide_to_user_ids',
                //     operator: 'nin',
                //     value: identity?.id,
                // },
            ],
        },
        queryOptions: {
            enabled: !!identity?.id,
        },
    });

    const dataCount = tableProps?.dataSource?.length || 0;
    return {
        tableProps,
        dataCount,
    };
};
