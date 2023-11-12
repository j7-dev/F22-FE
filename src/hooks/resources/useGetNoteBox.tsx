import { HttpError, useGetIdentity } from '@refinedev/core';
import { useTable } from '@refinedev/antd';
import { TMe } from '@/types';
/**
 * 使用useTable取得站內通知資料
 * @returns tableProps dataCount
 */
export const useGetNoteBox = ({ pageSize = 10 }: { pageSize?: number }) => {
    const { data: identity } = useGetIdentity<TMe>();
    // const uuid = identity?.uuid;
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
        pagination: {
            mode: 'server',
            pageSize: pageSize,
        },
        queryOptions: {
            enabled: !!identity,
        },
    });

    const dataCount = tableProps?.dataSource?.length || 0;
    // console.log('🚀 ~ dataSource:', tableProps?.dataSource);
    return {
        tableProps,
        dataCount,
    };
};
