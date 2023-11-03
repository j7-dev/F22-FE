import { HttpError, useGetIdentity } from '@refinedev/core';
import { useTable } from '@refinedev/antd';
import { TMe } from '@/types';
/**
 * 使用useTable取得站內通知資料
 * @returns tableProps dataCount
 */
export const useGetNoteBox = () => {
    const { data: identity } = useGetIdentity<TMe>();
    //FIXME 麻煩Jerry再開API來接站內通知
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
                {
                    field: 'send_to_user_ids',
                    operator: 'in',
                    value: identity?.id,
                },
            ],
        },
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc',
                },
            ],
        },
        queryOptions: {
            enabled: !!identity?.id,
        },
    });

    const dataCount = tableProps?.dataSource?.length || 0;
    console.log('🚀 ~ dataSource:', tableProps?.dataSource);
    return {
        tableProps,
        dataCount,
    };
};
